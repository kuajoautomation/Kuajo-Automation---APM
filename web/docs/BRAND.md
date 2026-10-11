# Kuajo Automation — Manual de marca v1.0

> **Conectamos cada lote con cada decisión**
> Kuajo Automation S.A.S. · Integradora de Transformación Digital Industrial (TDI) para alimentos y bebidas por lotes.

Archivos: logos en `assets/logo/`, íconos en `assets/icons/`, patrón en `assets/brand/`, tokens y componentes en `css/styles.css`.

---

## A. Concepto de marca

### Tres rutas exploradas

| Ruta | Idea central | Referencias visuales | Por qué encaja / límite |
|---|---|---|---|
| **1. Cuajada** | La transformación de líquido a sólido. Ondas que se solidifican en una retícula. | Texturas de lácteos, cortes de cuajada, gráficos de fase. | Cuenta el origen del nombre. Riesgo: ser demasiado "lácteo" y poco "ingeniería". |
| **2. Lote (recomendada)** | El **lote** como unidad mínima de decisión; nodos que conectan planta → sistemas → decisiones. | Etiquetas de trazabilidad, retículas modulares, diagramas de nodos. | Une el diferenciador (trazabilidad lote a lote) con la metáfora de transformación. Es técnica y cercana. |
| **3. Pirámide** | La pirámide ISA-95 como estructura de marca. | Esquemas por niveles, planos de arquitectura. | Muy fiel a la norma, pero genérica: muchas integradoras usan niveles. |

### Ruta recomendada: **Lote**

- **Símbolo:** un cuadrado de esquinas redondas (el lote) con una **K** formada por una línea y dos ramas que terminan en nodos (conexiones). El nodo lima es el dato que sube; el crema, la orden que baja.
- **Transformación:** el patrón de marca pasa de **ondas** (líquido) a **retícula de lotes** (cuajada). Se usa en portada y en piezas de marca.
- **Paleta:** verde botella ("Suero"), crema ("Cuajada") y un lima de acento. Evita azul oscuro con neón.
- **Voz:** frases cortas, datos concretos, sin relleno.

**Supuestos:** el color de marca no puede competir con los colores de estado (ISA-101). Por eso el acento no es ni rojo, ni ámbar, ni verde-semáforo.

---

## B. Logotipo

| Archivo | Uso |
|---|---|
| `kuajo-horizontal.svg` | Cabeceras, documentos (fondo claro) |
| `kuajo-horizontal-negative.svg` | Fondo oscuro |
| `kuajo-horizontal-mono.svg` | Un solo color (negro `#151A19`) |
| `kuajo-stacked*.svg` | Portadas, avatares, formatos cuadrados |
| `kuajo-mark.svg`, `kuajo-mark-negative.svg`, `kuajo-mark-mono.svg` | Solo símbolo |
| `assets/favicon.svg` | Favicon (legible a 16 px: trazo de 6 sobre 64) |

`kuajo-mark-mono.svg` usa `currentColor` y la variable `--k-cut` para el color del recorte.

**Nota técnica:** el nombre del logotipo es texto SVG (Bricolage Grotesque 700). Antes de enviar a imprenta, conviértelo a contornos (Inkscape: *Objeto → Objeto a trayecto*). Al usar el logo con `<img>`, el navegador muestra la fuente de respaldo si Bricolage no está instalada.

**Área de protección:** alrededor del logo, un margen mínimo igual a la altura de la letra **K** (≈ 0,5 × la altura del símbolo).
**Tamaño mínimo:** símbolo 16 px; horizontal 120 px de ancho; apilado 80 px de ancho.

**Usos incorrectos**
1. Cambiar los colores o el orden de los nodos.
2. Estirar, rotar o añadir sombras.
3. Usar el logo sobre fondos con contraste menor a 3:1.
4. Reescribir el nombre con otra tipografía.
5. Usar el verde de marca para indicar "en marcha" (el color de estado es otro).

---

## C. Color

### Marca (modo claro → modo oscuro)

| Token | Nombre | Claro | Oscuro | RGB (claro) | Rol |
|---|---|---|---|---|---|
| `--k-primary` | Verde Suero | `#0E5A52` | `#5FC7B3` | 14, 90, 82 | Primario: botones, enlaces, símbolo |
| `--k-secondary` | Pizarra | `#35566B` | — | 53, 86, 107 | Secundario: capa TI en diagramas |
| `--k-cream` | Cuajada | `#EFE6CF` | — | 239, 230, 207 | Secundario: fondos cálidos |
| `--k-accent` | Lima Cuajo | `#C8D94A` | `#C8D94A` | 200, 217, 74 | Acento: solo marca y fondos oscuros |

### Neutros (verde-grisáceos)
`50 #F6F5F0` · `100 #ECEAE2` · `200 #D9D6CB` · `300 #BDBAAD` · `400 #96968A` · `500 #6F7469` · `600 #535A55` · `700 #3A423F` · `800 #252C2A` · `900 #151A19`

Superficies: fondo `#FBF8F2` / `#121715`; tarjeta `#FFFFFF` / `#1A211F`; texto `#1B2422` / `#EAEDE6`; texto secundario `#4A5754` / `#A7B1AC`.

### Estados industriales (ISA-101)
Regla: **la pantalla es neutra; el color se reserva para lo anormal.** El estado "en marcha" se muestra en gris/neutro en el SCADA; el verde se usa en la web solo para indicadores positivos fuera del HMI.

| Estado | Claro | Oscuro | Uso |
|---|---|---|---|
| Correcto / en marcha | `#2E7D32` | `#66BB6A` | Confirmación (web). En HMI: gris. |
| Advertencia | `#F2A900` (texto `#8A5300`) | `#FFC233` | Desviación que requiere atención |
| Alarma | `#C62828` | `#FF6B6B` | Condición crítica |
| Detenido | `#5F6B73` | `#9AA5AC` | Equipo parado, sin falla |

Estos estados van siempre acompañados de **texto o forma**, no solo color.

### Recetas (mismos colores del PFD, Fig. 5.2b y 7.1; siempre acompañados del código Y1/Y2/Y3)
| Receta | Claro | Oscuro |
|---|---|---|
| Y1 Yogur de fresa | `#C0392B` | `#F08A7E` |
| Y2 Yogur griego | `#6C3FB0` | `#B393F0` |
| Y3 Kéfir | `#0F7C8C` | `#52C3D2` |

### Contraste WCAG 2.1 AA (calculado)
| Combinación | Ratio | Resultado |
|---|---|---|
| Texto `#1B2422` sobre `#FBF8F2` | 14,99 | AAA |
| Secundario `#4A5754` sobre `#FBF8F2` | 7,12 | AAA |
| Blanco sobre primario `#0E5A52` | 8,07 | AAA |
| Blanco sobre Pizarra `#35566B` | 7,79 | AAA |
| Tinta `#151A19` sobre lima `#C8D94A` | 11,29 | AAA |
| Blanco sobre OK / Alarma / Detenido | 5,13 / 5,62 / 5,47 | AA |
| Tinta sobre advertencia `#F2A900` | 8,75 | AAA |
| Texto de advertencia `#8A5300` sobre claro | 5,97 | AA |
| Y1 / Y2 / Y3 sobre claro | 5,21 / 6,76 / 4,70 | AA |
| Oscuro: texto / secundario / primario | 15,32 / 8,22 / 8,89 | AAA |
| Oscuro: ok / warn / alarma / detenido | 7,66 / 11,23 / 6,53 / 7,21 | AAA |
| Oscuro: Y1 / Y2 / Y3 | 7,94 / 7,67 / 9,27 | AAA |

Nota: el ámbar `#F2A900` sobre fondo claro tiene bajo contraste (<3:1). Por eso se usa como relleno con texto oscuro, o `#8A5300` como color de texto.

---

## D. Tipografía

| Rol | Familia | Por qué |
|---|---|---|
| Títulos | **Bricolage Grotesque** 600/700 | Grotesca con carácter, cálida y moderna. Aleja la marca del look "industrial frío". |
| Texto | **IBM Plex Sans** 400/500/600 | Diseñada para interfaces técnicas; excelente en tamaños pequeños y tablas. |
| Datos | **IBM Plex Mono** 500/600 | Tags (`U-221`, `TT-221`), KPIs y código. Cifras tabulares. |

| Nivel | px / rem | Altura de línea | Peso |
|---|---|---|---|
| H1 | 36–60 / 2,25–3,75 (fluido) | 1,05 | 700 |
| H2 | 28–40 / 1,75–2,5 | 1,15 | 700 |
| H3 | 22–28 / 1,375–1,75 | 1,25 | 600 |
| H4 | 20 / 1,25 | 1,3 | 600 |
| H5 | 18 / 1,125 | 1,35 | 600 |
| H6 | 16 / 1 | 1,4 | 600 |
| Lead | 19 / 1,1875 | 1,6 | 400 |
| Cuerpo | 16 / 1 | 1,6 | 400 |
| Pequeño | 14 / 0,875 | 1,5 | 400 |
| Pie de foto | 13 / 0,8125 | 1,5 | 400 |
| Etiqueta (mono) | 12 / 0,75 | 1,2 | 500, mayúsculas, +0,12em |
| KPI (mono) | 40–56 / 2,5–3,5 | 1 | 500 |

---

## E. Elementos gráficos

- **Íconos:** 24×24, trazo de **1,75 px**, terminaciones y uniones redondeadas, sin relleno, `currentColor`. Los 12: recepción de leche, tanque, fermentación, llenado, robot, PLC, SCADA, MES, ERP, trazabilidad, KPI, inocuidad. Se usan con `mask-image` (ver `.icon` en el CSS).
- **Patrón:** `assets/brand/pattern-lotes.svg`. Ondas a la izquierda (líquido), retícula de cuadrados redondeados a la derecha (lotes). Un lote en lima marca "el lote en proceso".
- **Diagramas técnicos:** cajas de 1,5 px; esquinas de 10 px; **capa OT** en verde suave con borde verde; **capa TI** en crema con borde pizarra; flechas grises de 1,5 px; lo importante con borde de **3 px** en verde primario. Texto en IBM Plex Sans; tags en IBM Plex Mono. Siempre con título (`<title>`), descripción (`<desc>`) y pie de figura.
- **Gráficos de datos:** barras y líneas en neutros; solo el dato "después" en verde primario; "antes" en gris con tachado. Recetas con la paleta categórica. Sin 3D, sin degradados, ejes con 1 px de gris `--border`.
- **Fotografía/ilustración:** fotos reales de planta y de los integrantes, luz natural, fondos limpios, tomas de producto (leche, cuajada, yogur). Ilustración: geometría de lotes y nodos. Evitar: personas mirando pantallas, engranajes, circuitos, robots humanoides.

---

## F. Sistema de diseño web

Todo en `css/styles.css`.

- **Tokens:** colores, tipografía, espaciado de 8 px (`--s-1` … `--s-9`), radios (`6/12/20/999`), sombras, anchos (`68ch` texto, `1120px` contenido), breakpoints **600 / 840 / 1120 px**. Modo oscuro con `prefers-color-scheme`.
- **Componentes (HTML en `index.html`):** `.nav` (fija, menú móvil), `.hero`, `.member` (equipo), `.kpi` (antes → después), `.table-wrap > .table` (con `.table--stack` que se apila en móvil), `.figure` (diagrama + pie), `.timeline`, `.btn--primary` / `.btn--secondary`, `.callout`, `.footer`, `.badge` (estados y recetas).
- **Accesibilidad:** enlace "saltar al contenido", foco visible, objetivos táctiles ≥ 44 px, `prefers-reduced-motion`, HTML semántico.
- **Rendimiento:** sin frameworks; 25 líneas de JS; tres fuentes con `display=swap`.

---

## G. Estructura de la página

| # | Sección (`id`) | Escritorio | Móvil (360 px) |
|---|---|---|---|
| 1 | Inicio (`inicio`) + Equipo | Hero a 2 columnas con patrón; equipo en 3 columnas | Una columna; CTAs a ancho completo |
| 2 | Cliente y problema (`cliente`) | 2 columnas: necesidades / requerimientos | Apiladas |
| 3 | Proceso (`proceso`) | 3 tarjetas de línea + tabla técnica | Tarjetas apiladas; tabla en formato de fichas |
| 4 | Solución (`solucion`) | Diagrama ISA-95 + lista | Diagrama arriba, lista abajo |
| 5 | ISA-88 (`isa88`) | Diagrama + tabla de recetas | Apilados |
| 6 | Resultados (`resultados`) | 5 módulos en rejilla de 3 | 1 columna |
| 7 | Simulación (`simulacion`) | Línea de tiempo + aviso | Apiladas |
| 8 | Evaluación (`evaluacion`) | 3 tarjetas KPI + tabla económica | 1 columna |
| 9 | Conclusiones (`conclusiones`) | Banda verde con cita | Igual |
| 10 | Aprendizaje (`aprendizaje`) | Reflexión grupal + 6 acordeones | 1 columna |
| 11 | Enlaces (`enlaces`) | 2 tarjetas | 1 columna |

Pie de página con el aviso: *"Caso académico. Lácteos Pomar es una empresa real usada como referencia de escala y portafolio; los problemas, indicadores y datos operativos son supuestos del curso."*

**Pendiente por completar:** enlaces reales de GitHub y YouTube, resultados de cada módulo, tabla económica y reflexiones. Los valores de KPI, recetas y referencias Q1–Q3 / U1–U3 son **ilustrativos**.

---

## H. Aplicaciones de marca

| Pieza | Archivo |
|---|---|
| Diapositivas (portada, sección, contenido, cierre) | `docs/brand/slides-template.html` |
| Miniatura de YouTube 1280×720 | `assets/brand/youtube-thumbnail.svg` |
| Imagen para redes 1200×630 | `assets/brand/og-image.svg` |
| README con encabezado de marca | `README.md` |

**Nota:** WhatsApp, LinkedIn y X no muestran SVG en las vistas previas. Exporta `og-image.svg` a PNG (por ejemplo, abriéndolo en el navegador o en Inkscape) y cambia la ruta en `index.html`.

---

## I. Uso rápido

1. Cargar las fuentes de Google Fonts (ver `<head>` de `index.html`).
2. Usar solo los tokens `--k-*`, `--st-*`, `--rc-*`.
3. Color de estado solo para estados.
4. Cada figura lleva título, descripción y pie.
5. Texto en español, frases cortas, datos concretos.
