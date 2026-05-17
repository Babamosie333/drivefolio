import * as THREE from 'three/webgpu'

const text = `
██╗   ██╗██╗██╗  ██╗██████╗  █████╗ ███╗   ███╗
██║   ██║██║██║ ██╔╝██╔══██╗██╔══██╗████╗ ████║
██║   ██║██║█████╔╝ ██████╔╝███████║██╔████╔██║
╚██╗ ██╔╝██║██╔═██╗ ██╔══██╗██╔══██║██║╚██╔╝██║
 ╚████╔╝ ██║██║  ██╗██║  ██║██║  ██║██║ ╚═╝ ██║
  ╚═══╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝

███████╗██╗███╗   ██╗ ██████╗ ██╗  ██╗
██╔════╝██║████╗  ██║██╔════╝ ██║  ██║
███████╗██║██╔██╗ ██║██║  ███╗███████║
╚════██║██║██║╚██╗██║██║   ██║██╔══██║
███████║██║██║ ╚████║╚██████╔╝██║  ██║
╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝

╔═ Intro ═══════════════╗
║ Thank you for visiting my portfolio, you sneaky developer!
║ If you are curious about the stack and how I built this project, here's everything you need to know.
╚═══════════════════════╝

╔═ Socials ═══════════════╗
║ Mail           ⇒ vikramsingh14052006@gmail.com
║ X              ⇒ https://x.com/SinghVikra70305
║ BlueSky        ⇒ https://bsky.app/profile/babamosie.bsky.social
║ Discord public ⇒ https://discord.com/channels/
║ Discord PM     ⇒ https://discord.com/
║ Youtube        ⇒ https://www.youtube.com/@DevBabaMosie
║ Twitch         ⇒ https://www.twitch.tv/babamosie333
║ GitHub         ⇒ https://github.com/babamosie333
║ LinkedIn       ⇒ https://www.linkedin.com/in/vikram14052006/
╚═══════════════════════╝

╔═ Debug ═══════════════╗
║ You can access the debug mode by adding #debug at the end of the URL and reloading.
║ Press [V] to toggle the free camera.
╚═══════════════════════╝

╔═ Three.js ════════════╗
║ Three.js is the library I'm using to render this 3D world (release: ${THREE.REVISION})
║ https://threejs.org/
║ It was created by mrdoob (https://twitter.com/mrdoob, https://github.com/mrdoob) in 2010
║ and has been maintained ever since by him and the community.
║ I'm Vikram Singh (https://x.com/SinghVikra70305, https://github.com/babamosie333)
║ and I used Three.js + WebGPU to build this portfolio!
╚═══════════════════════╝

╔═ Source code ═════════╗
║ The code is available on GitHub under MIT license.
║ https://github.com/babamosie333/folio-2025
║ For security reasons, I'm not sharing the server code, but the portfolio works without it.
╚═══════════════════════╝

╔═ Devlogs ═════════════╗
║ I've been making devlogs and videos on my Youtube channel.
║ https://www.youtube.com/@DevBabaMosie
╚═══════════════════════╝

╔═ Musics ══════════════╗
║ The music you hear in this portfolio is under CC0 license.
║ Meaning you can do whatever you want with them!
║ Download them here.
║ https://github.com/babamosie333/folio-2025/tree/main/static/sounds/musics
╚═══════════════════════╝

╔═ Some more links ═════╗
║ Rapier (Physics library)  ⇒ https://rapier.rs/
║ Howler.js (Audio library) ⇒ https://howlerjs.com/
║ Amatic SC (Fonts)         ⇒ https://fonts.google.com/specimen/Amatic+SC
║ Nunito (Fonts)            ⇒ https://fonts.google.com/specimen/Nunito?query=Nunito
╚═══════════════════════╝
`
let finalText = ''
let finalStyles = []
const stylesSet = {
    letter: 'color: #ffffff; font: 400 1em monospace;',
    pipe: 'color: #D66FFF; font: 400 1em monospace;',
}
let currentStyle = null
for(let i = 0; i < text.length; i++)
{
    const char = text[i]

    const style = char.match(/[╔║═╗╚╝╔╝]/) ? 'pipe' : 'letter'
    if(style !== currentStyle)
    {
        currentStyle = style
        finalText += '%c'

        finalStyles.push(stylesSet[currentStyle])
    }
    finalText += char
}

export default [finalText, ...finalStyles]