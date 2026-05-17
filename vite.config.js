import 'dotenv/config'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default ({ mode }) =>
{
    const isDev = mode === 'development'

    return {
        root: 'sources/',
        envDir: '../',
        publicDir: '../static/',
        base: './',
        server:
        {
            host: true,
            open: isDev, // Only open browser in dev, NOT on Vercel
        },
        build:
        {
            outDir: '../dist',
            emptyOutDir: true,
            sourcemap: false
        },
        plugins:
        [
            wasm(),
            topLevelAwait(),
            nodePolyfills(),
        ]
    }
}