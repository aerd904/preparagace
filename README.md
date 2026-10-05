# PreparaGACE

Página web estática para un servicio de preparación de la oposición **GACE**
(Cuerpo de Gestión de la Administración Civil del Estado, subgrupo A2 — INAP).

Prueba de concepto: landing page de una sola página con secciones de la oposición,
método de trabajo, servicios, testimonios, sobre mí, FAQ y contacto.

## Estructura

```
preparagace-kiro/
├── index.html          # Página principal (todo el contenido)
├── assets/
│   ├── styles.css      # Estilos (responsive, sin dependencias)
│   ├── main.js         # Menú móvil, animaciones y validación del formulario
│   └── favicon.svg     # Icono del sitio
├── CNAME               # Dominio personalizado para GitHub Pages
├── .nojekyll           # Evita el procesado Jekyll en GitHub Pages
├── robots.txt          # SEO
├── sitemap.xml         # SEO
└── README.md
```

No usa framework ni paso de compilación: es HTML + CSS + JS puro. Esto lo hace
ideal para GitHub Pages (se sirve tal cual, sin build).

## Ver la web en local

Basta con abrir `index.html` en el navegador. Para una vista más fiel (rutas
absolutas, etc.), levanta un servidor local:

```bash
# Con Python (ya viene en la mayoría de sistemas)
python -m http.server 8000
# Luego abre http://localhost:8000
```

## Personalizar antes de publicar

Edita estos puntos en `index.html`:

- **Datos de contacto**: email `hola@preparagace.es`, teléfono y enlaces de redes.
- **Formulario de contacto (Formspree)**: ver sección "Activar el formulario" abajo.
- **Textos, precios y testimonios**: están marcados como "prueba de concepto".
- **Sobre mí / foto**: sustituye el bloque `.about-photo` por tu imagen real.

## Activar el formulario de contacto

El formulario ya está totalmente preparado para [Formspree](https://formspree.io)
(gratis hasta 50 envíos/mes). Solo falta un paso que debe hacer la dueña del Gmail:

1. Entra en [formspree.io](https://formspree.io) y crea una cuenta con el Gmail
   que debe recibir los mensajes (`estefania.preparagace@gmail.com`).
2. Crea un formulario nuevo ("+ New form"). Formspree te dará un endpoint con la
   forma `https://formspree.io/f/XXXXXXXX`, donde `XXXXXXXX` es el ID del formulario.
3. En `index.html`, busca `TU_ID_FORMSPREE` dentro del atributo `action` del
   formulario y sustitúyelo por ese ID. Debe quedar, por ejemplo:
   `action="https://formspree.io/f/myzgabcd"`.
4. Guarda, haz commit y push. El primer envío real pedirá confirmar el correo en
   Formspree (solo la primera vez); a partir de ahí los mensajes llegan al Gmail.

Mientras ponga `TU_ID_FORMSPREE`, el formulario funciona en "modo demo": valida los
campos y muestra un aviso, pero no envía nada. Así se puede probar sin configurar nada.

Extras ya incluidos:
- `_subject`: asunto del email que recibe Estefanía.
- `_gotcha`: campo oculto anti-spam que Formspree filtra automáticamente.
- Validación en el navegador (nombre, email con formato, mensaje y aceptación de privacidad).
- Envío por `fetch` sin recargar la página, con estados "Enviando…", éxito y error.

## Despliegue a producción (resumen)

1. Sube el repositorio a GitHub.
2. Activa GitHub Pages (rama `main`, carpeta raíz).
3. Configura el dominio `preparagace.es` en Pages (el archivo `CNAME` ya lo hace).
4. En GoDaddy, apunta el DNS a GitHub Pages (ver guía detallada abajo).
5. Activa "Enforce HTTPS" en GitHub.

> La guía paso a paso con los registros DNS exactos está más abajo en este README
> y en la respuesta que acompaña a esta prueba de concepto.
