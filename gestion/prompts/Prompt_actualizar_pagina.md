# Prompt: actualizar la página web de Kuajo con todo el contenido de los documentos

Trabaja en la carpeta `Proyecto APM`. La página está en `Pagina/` (Astro 7, salida estática). Tu tarea es actualizarla para que muestre **todo** el contenido del informe corregido y de sus anexos, **sin perder el dinamismo actual** ni la identidad visual.

## 1. Fuentes (en este orden de prioridad)

1. `Informe_Kuajo_APM_2026-2_Linea1_Yogures.docx` (o su `.pdf`, 112 páginas): la fuente principal. Si un dato de la página no coincide con el informe, gana el informe.
2. `Planeacion_PM4R_Kuajo_Pomar.xlsx` (23 hojas): todas las cifras de planeación, costos, flujos, cronograma, riesgos, instrumentos y simulación. Lee los valores calculados (por ejemplo, con openpyxl y `data_only=True`). No copies cifras de memoria.
3. `Anexo_C_Lineas_2_y_3.docx`: líneas 2 (quesos) y 3 (UHT).
4. `sim.py` y la hoja `Simulacion` del Excel: resultados de la simulación.
5. Figuras: `Fig_5.1…`, `Fig_5.2a…`, `Fig_5.2b…`, `Fig_5.5…`, `Fig_7.1…`, `Fig_10.1…`, `Fig_10.2…`, `Fig_11.1…`, `Fig_11.2…`, `Fig_12.1…`, `VSM_Actual_Yogures_Kuajo`, `VSM_Futuro_Yogures_Kuajo`, `gantt.png`, `histograma.png`, `curva_s.png` y `flujo_pomar.png`. Las figuras vienen en SVG, PNG y PDF; `Anexo_B_Figuras_A3.pdf` las reúne todas.
6. `Auditoría Kuajo · Entrega intermedia.md`: solo como lista de control de lo que el curso exige. No copies su texto en la página.

No uses `Informe_Avance_Kuajo_APM_2026-2_v8.docx` ni `Fig_5.2_PFD_Linea1_Yogures.*`, porque están obsoletos. Antes de empezar, lee `Pagina/README.md`, `Pagina/docs/BRAND.md`, `src/data/site.ts`, `src/scripts/motion.ts` y todos los componentes.

## 2. Lo que no se puede romper

- **Stack:** Astro 7 estático, CSS propio con tokens OKLCH (`tokens.css`, `global.css`), GSAP + ScrollTrigger + Lenis, y fuentes autoalojadas. No agregues frameworks (ni React, ni Tailwind, ni librerías de gráficas) ni CDNs.
- **Contenido centralizado:** todo el contenido nuevo va en `src/data/site.ts`, o en archivos nuevos dentro de `src/data/`. Los componentes no llevan cifras escritas a mano. Hoy `Simulacion.astro` tiene la carga de fermentadores fija en el código: muévela a `site.ts`.
- **Dinamismo existente:** reutiliza los mismos patrones en las secciones nuevas, en lugar de inventar otros:
  - `data-draw`: trazado SVG al entrar en pantalla.
  - `data-count-from` / `data-count-to`: contadores.
  - `data-bar`: barras del Gantt y de capacidad que crecen.
  - `data-arch` / `data-level`: diagrama fijo que se activa por niveles (ISA-95).
  - `data-plant`, `data-node` y `data-link`: diagrama de la planta en el hero.
  - `data-lines`: aparición de títulos por líneas.
  - `data-spy`: sección activa en el menú, junto con la barra de progreso, la navegación compacta, el índice en `popover` y el tema claro/oscuro con View Transitions.

  Si necesitas un efecto nuevo (por ejemplo, pestañas entre "actual" y "propuesta", o un visor de figuras), escríbelo en `motion.ts` con el mismo estilo y la misma curva `kuajo`.
- **Accesibilidad y rendimiento:**
  - El HTML debe verse completo sin JavaScript.
  - Con `prefers-reduced-motion` todo queda visible y estático.
  - No debe haber desplazamiento horizontal a 360 px.
  - El contraste debe ser de al menos 4,5:1 en ambos temas.
  - Toda figura lleva `alt` o `aria-label` descriptivo, y toda gráfica tiene su tabla equivalente.
  - Hay que mantener Lighthouse en 95 o más en las 4 categorías.
- **Marca:** respeta `docs/BRAND.md` (paleta Suero/Cuajada/lima, voz corta y con datos). Los colores de estado ISA-101 no se usan como decoración. Los colores de receta deben coincidir con los del PFD: Y1 `#c0392b`, Y2 `#6c3fb0`, Y3 `#0f7c8c`.
- **Aviso de caso académico:** se mantiene el aviso que ya tiene la página.

## 3. Correcciones obligatorias del contenido actual

`site.ts` se escribió con el informe v2. Actualiza como mínimo lo siguiente, y verifica cada cifra contra el informe y el Excel:

- **Tags:** la celda robotizada es **U-242/U-241** (antes U-235/241). Revisa todos los tags contra la hoja `Instrumentos` del Excel (86 tags) y las figuras 10.1 y 12.1, por ejemplo SC-2xx para variadores, AI-221…224, XI-2xx para lectores, TSL-212B, FDV-212 y P-220.
- **Cuello de botella:**
  - Ya no es la fermentación con "86 de 96 horas-tanque". Hoy limita la **llenadora de vasos** (OEE 55,4 %, 83 % de cumplimiento de la demanda).
  - Los fermentadores usan 76 % en el cálculo actual y 88,8 % con la propuesta.
  - En la simulación llegan a ≈ 98 % y pasan a ser la siguiente restricción.
  - Corrige `modules`, `conclusions`, `problems` y `Simulacion.astro`.
- **KPIs principales:**
  - OEE de la llenadora: 55,4 % → 78,0 % (86 % × 91 % × 99 %).
  - Trazabilidad de un lote: 6 h → menos de 30 min.
  - Cambio de receta: 90 → 35 min.
  - Toma de la Tabla 6.13 los demás KPIs: takt, throughput, MLT, utilización y otros.
- **`economics`:** quita todos los `[PENDIENTE]`. Cifras clave (confírmalas en el Excel):

  | Concepto | Valor |
  |---|---|
  | Precio del contrato | $8.526 M COP (validez de 90 días, cláusula de TRM sobre los ítems en US$) |
  | Inversión de Pomar en el año 0 | $9.605 M |
  | OPEX del año 1 | $588 M |
  | VPN | $15.014 M |
  | TIR | 49,0 % |
  | Recuperación | 2,23 años (2,71 descontada) |
  | B/C | 2,63 |
  | Punto de equilibrio | 39 % del beneficio |
  | Utilidad neta de Kuajo | $935 M (11,0 %) |
  | Crédito rotativo máximo de Kuajo | $1.316 M (mes 8) |
  | Cobertura de la contingencia | 1,23 |

- **`schedule`:** son **48 semanas**, hasta el 12/12/2027 (fechas de las hojas `Cronograma` y `Oferta`), no 12 meses. Usa las fases y los hitos reales del Gantt y la ruta crítica.
- **`modules`:** actualiza el estado y la descripción de cada módulo según lo que el informe muestra como hecho.
- **`isa95`:** SAP ECC, Ignition, driver Allen-Bradley, conducto C3 con firewall opcional (ISA/IEC 62443) y Power BI con las licencias de Pomar.
- **`recipes`, `profiles` y `stations`:** compáralos con la sección 7 y con la Figura 7.1.

## 4. Contenido nuevo que debe quedar en la página

Organiza el contenido como el informe y amplía el menú (`sections`) con códigos `KA-XXX`, manteniendo la numeración correlativa. Cada bloque usa un patrón dinámico existente:

1. **Situación actual:** diagrama de bloques de la planta (5.1), PFD actual (5.2a), distribución de planta (5.5) y balance de masa. Patrón: figura con `data-draw` o un visor que permita ampliar.
2. **VSM actual frente a VSM futuro:** pestañas o deslizador "antes/después". Añade contadores de lead time, MLT, inventario y OEE, y explica que en el VSM futuro la programación solo va al marcapasos, con FIFO aguas abajo.
3. **Propuesta de proceso:** PFD propuesto (5.2b) y rutas de recetas (7.1), con los colores de receta y una animación de la ruta por receta.
4. **ISA-88:** modelo físico (10.1) y procedimental (10.2), con la jerarquía que se despliega (procedimiento → procedimiento de unidad → operación → fase). Debe aclarar que el PCC 1 es vigilancia y no una fase.
5. **ISA-95 y red OT/IT:** conserva el diagrama por niveles actual y añade la red con zonas y conductos (11.2).
6. **Instrumentación y P&ID:** P&ID (12.1) y una tabla filtrable de los 86 tags (53 sensores) de la hoja `Instrumentos`, con filtro por unidad y tipo, hecha con JavaScript mínimo y que funcione completa sin él.
7. **Simulación:**
   - La tabla de escenarios de la hoja `Simulacion`:

     | Escenario | Producción vendible | OEE |
     |---|---|---|
     | Actual | 41.186 kg/día | 51,8 % |
     | Propuesta con pausas escalonadas | 50.874 kg/día (97 % de la demanda, +24 %) | 58,7 % |
     | Propuesta con pausas fijas | 48.960 kg/día, con atraso que crece | 64,7 % |

   - Contadores y barras para ilustrar esos resultados. La conclusión: hay que escalonar las pausas, y la fermentación es la siguiente restricción.
   - Una mención a que el modelo de Tecnomatix está en curso.
8. **Planeación PM4R:**
   - EDT, Gantt (puede reutilizar el `.gantt__rows` con `data-bar`), histograma de recursos (pico de 254 h/semana; nadie pasa de 46,5 h por persona) y horas por integrante: R1 1.749, R2 1.486, R3 1.799, R4 1.691, R5 1.772, R6 1.663.
   - Curva S y presupuesto: suministros $5.771 M, ingeniería $1.524 M (10.160 h), contingencia y precio.
   - Matrices de riesgos (mapa de calor), RACI, comunicaciones y adquisiciones.
9. **Evaluación financiera:** flujo de Pomar (gráfica `flujo_pomar` redibujada en SVG con `data-draw`, con su tabla), sensibilidad (TIO de 16, 18 y 20 %, TRM y eficiencia), y estado de resultados y flujo mensual de Kuajo con el crédito rotativo.
10. **Oferta comercial:** alcance, precio, forma de pago por hitos, garantía y fases siguientes: Fase 2 UHT (26 semanas) y Fase 3 quesos (32 semanas).
11. **Líneas 2 y 3 y planta completa** (anexo C y hoja `Lineas_2_3`):

    | Línea | Precio | VPN | TIR |
    |---|---|---|---|
    | Línea 2 (quesos) | $3.850 M | $172 M | 15,0 % |
    | Línea 3 (UHT) | $3.150 M | $6.408 M | 57,3 % |

    El VPN combinado es de $20.781 M.
12. **Trabajo en equipo:** roles, bitácora y compromisos de la sección 15. Conserva el texto como propuesta donde el informe lo dice así.
13. **Conclusiones:** reescríbelas con la sección 16.
14. **Descargas:** enlaces al informe (PDF), al Excel, al anexo B (figuras A3), al anexo C y a `sim.py`. Copia esos archivos a `public/descargas/`.
15. **Fuentes:** las 44 fuentes del informe, en una lista compacta y desplegable (`<details>`).

Copia las figuras a `src/assets/figuras/`. Usa `<Image>`/`<Picture>` de Astro (AVIF/WebP, `loading="lazy"`, `width`/`height` explícitos para no causar CLS). Cuando el SVG sea liviano, insértalo para poder animarlo con `data-draw`. Con los diagramas grandes usa un visor que amplíe la imagen (un `popover` o un `dialog` con zoom), sin librerías externas.

`site.repo` y `site.video` siguen como `[PENDIENTE]` hasta que existan los enlaces reales. No inventes URLs.

## 5. Verificación antes de terminar

1. Ejecuta `npm install` y `npm run build`, que deben terminar sin errores ni advertencias de tipos.
2. Escribe un script de verificación (por ejemplo, `scripts/check-data.mjs` o uno en Python) que compare las cifras de `site.ts` con el Excel: precio, VPN, TIR, recuperación, B/C, OPEX, horas, 48 semanas y resultados de la simulación. Debe fallar si alguna difiere.
3. Busca en `src/` los textos obsoletos y confirma que ya no aparecen: `U-235`, `86 de 96`, `12 meses`, `[PENDIENTE]` (salvo el repositorio y el video), `R-141` y `v2`.
4. Revisa con `npm run preview`:
   - a 360, 768 y 1440 px, en tema claro y oscuro;
   - sin JavaScript;
   - con movimiento reducido;
   - navegando solo con teclado, incluido el índice;
   - que cada sección nueva se active en el menú.
5. Pasa Lighthouse en móvil y escritorio y actualiza la tabla de verificación del `README.md`.
6. Regenera `og-image.png` con `npm run og` si cambió el texto del hero.
7. Actualiza el `README.md` con la nueva estructura de datos y secciones.

Al final, entrega un resumen corto con:

- las secciones añadidas o cambiadas;
- las cifras corregidas;
- las capturas de pantalla de escritorio y móvil;
- lo que sigue pendiente (repositorio, video y fotos del equipo).
