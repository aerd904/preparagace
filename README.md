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
- **Formulario**: el atributo `action` apunta a un placeholder de Formspree.
  Mientras no lo cambies, el formulario funciona en "modo demo" (no envía nada).
  Para recibir mensajes de verdad, crea un formulario gratis en
  [formspree.io](https://formspree.io) y pega tu URL en `action`.
- **Textos, precios y testimonios**: están marcados como "prueba de concepto".
- **Sobre mí / foto**: sustituye el bloque `.about-photo` por tu imagen real.

## Despliegue a producción (resumen)

1. Sube el repositorio a GitHub.
2. Activa GitHub Pages (rama `main`, carpeta raíz).
3. Configura el dominio `preparagace.es` en Pages (el archivo `CNAME` ya lo hace).
4. En GoDaddy, apunta el DNS a GitHub Pages (ver guía detallada abajo).
5. Activa "Enforce HTTPS" en GitHub.

> La guía paso a paso con los registros DNS exactos está más abajo en este README
> y en la respuesta que acompaña a esta prueba de concepto.
