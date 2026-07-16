# Cerdo Icario — El sueño de volar

Juego de plataformas/inercia estilo *Tiny Wings*, hecho en HTML5 Canvas puro
(sin dependencias, sin build, un solo archivo). Un cerdito aviador con
goggles, gorro de cuero y alas de pluma de ganso salta del techo de su
granero, gana velocidad en las bajadas, come zanahorias y elotes, y cada
5000m rampea hacia una fase de vuelo con obstáculos (pájaros, ovnis, orbes)
y un tramo de agua peligrosa. 10 biomas distintos se van sucediendo mientras
más lejos llega.

## Cómo abrir el proyecto en VSCode

1. Abre la carpeta `el-cerdo-volador` completa en VSCode
   (`Archivo → Abrir carpeta...`).
2. Instala la extensión **Live Server** (de Ritwick Dey) si no la tienes —
   VSCode debería sugerirla automáticamente al abrir la carpeta, porque ya
   viene recomendada en `.vscode/extensions.json`.
3. Click derecho sobre `index.html` → **"Open with Live Server"**
   (o el botón "Go Live" en la barra inferior de VSCode).
4. Se abrirá el juego en el navegador en `http://127.0.0.1:5501/`.

También puedes abrir `index.html` directamente con doble clic desde el
explorador de archivos — el juego funciona igual sin servidor, ya que todo
(HTML, CSS, JS, sprites, sonido) vive en un solo archivo autocontenido.
Solo la fuente pixel-art ("Press Start 2P") requiere internet la primera vez
(se carga desde Google Fonts); el resto del juego es 100% local.

## Controles

- **Tocar/clic y mantener presionado**: pica cuesta abajo en las colinas /
  aletea y sube en la fase de vuelo.
- **Soltar**: se endereza en las colinas / cae por gravedad en vuelo.
- **[R]** en el título o pantalla de resultados: ver el Salón de la Fama.

## Estructura

```
el-cerdo-volador/
├── index.html          ← el juego completo (HTML + CSS + JS en un archivo)
├── .vscode/
│   ├── extensions.json ← recomienda la extensión Live Server
│   └── settings.json   ← puerto y configuración de Live Server
└── README.md            ← este archivo
```

## Notas técnicas

- Todo el arte es pixel art generado por código (canvas 2D, sin imágenes
  externas) y todo el audio es sintetizado con WebAudio (sin archivos MP3).
- Los récords se guardan con la API `window.storage` cuando está disponible
  (Claude.ai); si abres el archivo fuera de ese entorno (VSCode/Live Server,
  Netlify, etc.), el juego detecta que no existe y simplemente no persiste
  el Salón de la Fama entre sesiones — el resto del juego funciona igual.
- Pensado para landscape en computadora y celular (16:9), con escalado
  adaptativo: entero y nítido en pantallas grandes, ajustado para llenar
  bien la pantalla en celulares.
