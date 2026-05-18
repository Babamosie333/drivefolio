import * as THREE from 'three/webgpu'
import { pass, renderOutput } from 'three/tsl'
import { bloom } from 'three/addons/tsl/display/BloomNode.js'
import { Game } from './Game.js'
import { cheapDOF } from './Passes/cheapDOF.js'
import { Inspector } from 'three/addons/inspector/Inspector.js'

export class Rendering
{
    constructor()
    {
        this.game = Game.getInstance()
        this.isWebGL = true
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        this.isLowEnd = this.detectLowEndDevice()

        if(this.game.debug.active)
        {
            this.debugPanel = this.game.debug.panel.addFolder({
                title: '📸 Rendering',
                expanded: false,
            })
        }
    }

    detectLowEndDevice()
    {
        // Detect low end by cores and memory
        const cores = navigator.hardwareConcurrency || 2
        const memory = navigator.deviceMemory || 2
        return cores <= 4 || memory <= 4
    }

    start()
    {
        this.setStats()

        this.game.ticker.events.on('tick', () =>
        {
            this.render()
        }, 998)

        this.game.viewport.events.on('change', () =>
        {
            this.resize()
        })
    }

    async setRenderer()
    {
        this.isWebGL = true

        // Pixel ratio settings based on device
        let pixelRatio = window.devicePixelRatio || 1
        if(this.isMobile)
            pixelRatio = Math.min(pixelRatio, 1.5) // Cap mobile at 1.5
        else if(this.isLowEnd)
            pixelRatio = Math.min(pixelRatio, 1)   // Cap low end at 1
        else
            pixelRatio = Math.min(pixelRatio, 2)   // Cap desktop at 2

        this.targetPixelRatio = pixelRatio

        console.log(`Rendering: WebGL | Mobile: ${this.isMobile} | LowEnd: ${this.isLowEnd} | PixelRatio: ${pixelRatio}`)

        this.renderer = new THREE.WebGPURenderer({
            canvas: this.game.canvasElement,
            powerPreference: this.isLowEnd ? 'low-power' : 'high-performance',
            forceWebGL: true,
            antialias: !this.isMobile && pixelRatio < 2
        })

        this.renderer.setSize(this.game.viewport.width, this.game.viewport.height)
        this.renderer.setPixelRatio(this.targetPixelRatio)
        this.renderer.sortObjects = false
        this.renderer.domElement.classList.add('experience')
        this.renderer.shadowMap.enabled = !this.isMobile // Disable shadows on mobile
        this.renderer.setOpaqueSort((a, b) =>
        {
            return a.renderOrder - b.renderOrder
        })
        this.renderer.setTransparentSort((a, b) =>
        {
            return a.renderOrder - b.renderOrder
        })

        if(location.hash.match(/inspector/i))
        {
            this.renderer.inspector = new Inspector()
        }

        this.renderer.setAnimationLoop((elapsedTime) => { this.game.ticker.update(elapsedTime) })

        return this.renderer.init()
    }

    setPostprocessing()
    {
        this.postProcessing = new THREE.RenderPipeline(this.renderer)

        const scenePass = pass(this.game.scene, this.game.view.camera)
        const scenePassColor = scenePass.getTextureNode('output')

        this.bloomPass = bloom(scenePassColor)

        // Aggressive optimization based on device
        if(this.isMobile)
        {
            // Mobile - minimal settings
            this.bloomPass._nMips = 2
            this.bloomPass.threshold.value = 1.2
            this.bloomPass.strength.value = 0.1
            this.bloomPass.smoothWidth.value = 0.5
        }
        else if(this.isLowEnd)
        {
            // Low end PC - reduced settings
            this.bloomPass._nMips = 3
            this.bloomPass.threshold.value = 1
            this.bloomPass.strength.value = 0.15
            this.bloomPass.smoothWidth.value = 1
        }
        else
        {
            // Normal PC
            this.bloomPass._nMips = this.game.quality.level === 0 ? 5 : 2
            this.bloomPass.threshold.value = 1
            this.bloomPass.strength.value = 0.25
            this.bloomPass.smoothWidth.value = 1
        }

        this.cheapDOFPass = cheapDOF(renderOutput(scenePass))

        // Disable DOF on mobile and low end
        if(this.isMobile || this.isLowEnd)
            this.cheapDOFPass.amount.value = 0

        const qualityChange = (level) =>
        {
            // Always simple pipeline on WebGL
            if(this.isMobile || this.isLowEnd)
            {
                // Minimal pipeline for weak devices
                this.postProcessing.outputNode = scenePassColor.add(this.bloomPass)
            }
            else if(level === 0)
            {
                this.postProcessing.outputNode = this.cheapDOFPass.add(this.bloomPass)
            }
            else
            {
                this.postProcessing.outputNode = scenePassColor.add(this.bloomPass)
            }

            this.postProcessing.needsUpdate = true
        }

        qualityChange(this.game.quality.level)
        this.game.quality.events.on('change', qualityChange)

        if(this.game.debug.active)
        {
            const bloomPanel = this.debugPanel.addFolder({
                title: 'bloom',
                expanded: false,
            })
            bloomPanel.addBinding(this.bloomPass.threshold, 'value', { label: 'threshold', min: 0, max: 2, step: 0.01 })
            bloomPanel.addBinding(this.bloomPass.strength, 'value', { label: 'strength', min: 0, max: 3, step: 0.01 })
            bloomPanel.addBinding(this.bloomPass.radius, 'value', { label: 'radius', min: 0, max: 1, step: 0.01 })
            bloomPanel.addBinding(this.bloomPass.smoothWidth, 'value', { label: 'smoothWidth', min: 0, max: 1, step: 0.01 })

            const blurPanel = this.debugPanel.addFolder({
                title: 'blur',
                expanded: true,
            })
            blurPanel.addBinding(this.cheapDOFPass.start, 'value', { label: 'start', min: 0, max: 0.5, step: 0.001 })
            blurPanel.addBinding(this.cheapDOFPass.end, 'value', { label: 'end', min: 0, max: 0.5, step: 0.001 })
            blurPanel.addBinding(this.cheapDOFPass.repeats, 'value', { label: 'repeats', min: 1, max: 100, step: 1 })
            blurPanel.addBinding(this.cheapDOFPass.amount, 'value', { label: 'amount', min: 0, max: 0.02, step: 0.0001 })
        }
    }

    setStats()
    {
        if(!location.hash.match(/stats/i))
            return

        this.stats = {}
        this.stats.feed = {}
        this.stats.update = () =>
        {
            this.stats.feed.drawCalls = this.renderer.info.render.drawCalls.toLocaleString()
            this.stats.feed.triangles = this.renderer.info.render.triangles.toLocaleString()
            this.stats.feed.geometries = this.renderer.info.memory.geometries.toLocaleString()
            this.stats.feed.textures = this.renderer.info.memory.textures.toLocaleString()
        }

        this.stats.update()

        if(this.game.debug.active)
        {
            const debugPanel = this.debugPanel.addFolder({
                title: 'Stats',
                expanded: true,
            })
            for(const feedName in this.stats.feed)
            {
                debugPanel.addBinding(this.stats.feed, feedName, { readonly: true })
            }
        }
    }

    resize()
    {
        this.renderer.setSize(this.game.viewport.width, this.game.viewport.height)
        this.renderer.setPixelRatio(this.targetPixelRatio)
    }

    async render()
    {
        this.postProcessing.render()

        if(this.stats)
            this.stats.update()

        if(this.game.monitoring?.stats)
        {
            this.game.rendering.renderer.resolveTimestampsAsync(THREE.TimestampQuery.RENDER)
            this.game.monitoring.stats.update()
        }
    }
}