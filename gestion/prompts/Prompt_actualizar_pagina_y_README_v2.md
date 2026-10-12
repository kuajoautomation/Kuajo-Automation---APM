# Prompt · Actualizar la página web y el README (entrega intermedia, versión preliminar)

Copia todo lo que sigue y pégalo en Claude Code abierto en la raíz del repositorio `Kuajo-Automation---APM`.

---

Eres el desarrollador de la página de Kuajo Automation (Astro, carpeta `web/`) y del `README.md` de la raíz. Tienes que actualizar las dos cosas para que coincidan con la presentación y el guion del video de la entrega intermedia. Esos dos son ahora la referencia del equipo.

Antes de editar, lee estos archivos: `README.md`, `web/README.md`, `web/src/data/site.ts`, `web/scripts/check-data.mjs`, `web/scripts/copy-assets.mjs` y los componentes `Hero`, `Actual`, `Vsm`, `Simulacion`, `Resultados`, `Planeacion`, `Evaluacion`, `Oferta`, `Lineas`, `Conclusiones`, `Aprendizaje` y `Descargas`.

## 0. Reglas que no se negocian

1. **No borres ni modifiques** `informes/` (informe y anexos), `05_pm4r/Planeacion_PM4R_Kuajo_Pomar.xlsx` ni `00_curso/`. Se usan en la entrega final, con el cálculo detallado.
2. **No cambies los valores numéricos** del objeto `economics`, de `lines23` ni de `teamHours` en `site.ts`, ni nada de `excel.json`. `npm run check` los compara con el Excel. Lo que se redondea es **solo el texto que se muestra**, por ejemplo con un formateador.
3. **Conserva el dinamismo actual de la página**: contadores, barras, trazado SVG, pestañas, visor, Lenis y GSAP. Debe seguir respetando `prefers-reduced-motion` y verse completa sin JavaScript. Mantén las 19 secciones y el menú.
4. Español de Colombia, con coma decimal y punto de miles. Frases cortas, sin jerga innecesaria.
5. Al final deben pasar `npm run check`, `npm run typecheck` y `npm run build` sin errores. `[PENDIENTE]` debe seguir apareciendo una sola vez en `site.ts`, en la constante `PENDING`.

## 1. Mensaje central: las metas y las finanzas son estimaciones preliminares

El equipo decidió presentar las metas futuras del proceso y todas las cifras financieras como **estimaciones basadas en cálculos preliminares**, más sencillas de leer. Hubo poco tiempo desde la publicación del proyecto y los datos operativos son supuestos del caso académico.

### 1.1 Texto y componente reutilizable

- Agrega en `site.ts` la propiedad `site.preliminar` con este texto: «Las metas de proceso y las cifras financieras son estimaciones basadas en cálculos preliminares, con datos supuestos del caso académico. Se confirmarán con la medición de la línea base y con cotizaciones. El cálculo completo está en el informe y en el libro de planeación (anexo A).»
- Crea `web/src/components/Preliminar.astro`: una etiqueta pequeña tipo píldora que reciba como texto «Estimación preliminar», «Cifras preliminares», «Metas preliminares» o «Referencia preliminar ±30 %».
  - Ponle borde y texto ámbar oscuro (≈ `#8A5300`) sobre crema (`#EFE6CF`) como tokens OKLCH equivalentes, con versión para el modo oscuro y contraste de al menos 4,5:1.
  - Si `title` no es accesible en móvil, usa `popover` o `<details>` para mostrar `site.preliminar`.
- Agrega en `web/src/lib/fmt.ts` el helper `aprox(valor, opciones)`. Debe devolver «≈ $15.000 M», «≈ 49 %», etc., redondeando a cifras legibles.

### 1.2 Dónde va la etiqueta y qué cifras se redondean

Usa la misma lógica que la presentación: los valores de **hoy**, que son la línea base supuesta, se dejan exactos. Las **metas y los resultados futuros** van con «≈» y con la etiqueta.

| Sección | Etiqueta | Cambios de texto |
|---|---|---|
| 00 Inicio (Hero) | «Metas estimadas» | `aria-label` = «Metas estimadas del proyecto». Los contadores terminan en «≈ 78 %», «< 30 min» y «≈ 35 min». Debajo, una línea pequeña con `site.preliminar` resumido. |
| 04 Situación actual / OEE | Estimación preliminar | OEE de 55,4 % a **≈ 78 %**. Producción de 43.700 a **≈ 52.400 kg/día**. Cumplimiento **≈ 100 %**. |
| 05 VSM futuro | Metas preliminares | Kaizen como «se estima», MLT de 4,2 a **≈ 3 días** y rechazo **≈ 1 %**. |
| 10 Simulación | Estimación preliminar | «La simulación preliminar **respalda** el aumento (≈ +24 % vendible) con datos supuestos». Mantén la condición: pausas escalonadas y secuencia del MES. |
| 12 Planeación PM4R | Cifras preliminares | Precio **≈ $8.500 M**. Aclara que el 73 % de los suministros es estimación por cotizar. |
| 13 Evaluación financiera | Cifras preliminares | Ver la tabla 1.3. Cambia el título a condicional: «Con cálculos preliminares, Pomar recuperaría la inversión en unos 2 años, aun si los beneficios cayeran a ≈ 40 %.» |
| 14 Oferta | Cifras preliminares | Precio estimado y validez. Los hitos de pago no cambian. |
| 15 Líneas 2 y 3 | Referencia preliminar ±30 % | VPN UHT **≈ $6.400 M** (TIR ≈ 57 %), quesos **≈ $170 M** (TIR ≈ 15 %), combinado **≈ $20.800 M**. Se recomienda primero UHT. |
| 16 Conclusiones | Cálculos preliminares | Usa las 5 ideas de la sección 3. |

### 1.3 Evaluación financiera, más sencilla

- Cambia `economicsRows` a textos aproximados: inversión de Pomar **≈ $9.600 M**, beneficios anuales **≈ $8.500 M**, OPEX **≈ $590 M**, VPN **≈ $15.000 M**, TIR **≈ 49 %**, recuperación **≈ 2,2 años** (≈ 2,7 descontada), B/C **≈ 2,6**, punto de equilibrio **≈ 40 %**, utilidad de Kuajo **≈ $935 M (≈ 11 %)**, crédito rotativo **≈ $1.300 M** (cupo de $1.500 M) y cobertura de la contingencia **≈ 1,2**.
- **Vista principal:** solo los 4 indicadores grandes (VPN, TIR, recuperación y B/C), el flujo acumulado descontado y una frase de lectura.
- **Detalle plegable:** la sensibilidad completa, el PyG y el flujo mensual de Kuajo pasan a `<details class="fold">` con el título «Ver el detalle del cálculo preliminar». **No se elimina nada** de la página, solo queda plegado. Dentro del plegable, la sensibilidad muestra primero los 6 escenarios principales, como en la presentación, y el resto debajo.
- Agrega una explicación corta del **crédito rotativo**: el proyecto es rentable, pero cada hito se cobra a 30 días y los robots, tableros y montaje se pagan antes, sobre todo en el mes 8. Por eso Kuajo usa un cupo rotativo: saca solo lo que falta, por el tiempo que falta, y paga intereses solo sobre lo usado (≈ $20 M, ya descontados). Un crédito normal desembolsaría todo desde el primer día.
- Agrega el bloque **«¿Cómo sabemos que la meta es alcanzable?»**, en Evaluación o en Situación actual, con tres razones:
  1. El OEE se descompone pérdida por pérdida: disponibilidad ≈ 86 %, rendimiento ≈ 91 % y calidad ≈ 99 %, cada una ligada a una mejora concreta.
  2. Para cumplir el +20 % basta un OEE de **≈ 70 %** (9,72 de 14 h), así que la meta de ≈ 78 % deja margen.
  3. La simulación preliminar da un resultado parecido. Primer próximo paso: medir la línea base para confirmar.

### 1.4 Libro resumido de estimaciones

- **Mueve** (no copies) `Resumen_Estimaciones_Kuajo.xlsx` de la raíz a `05_pm4r/`. `copy-assets.mjs` falla si hay dos archivos con el mismo nombre.
- Agrégalo a la lista `descargas` de `copy-assets.mjs` y a `downloads` en `site.ts`, en primer lugar entre los Excel. Nota: «Resumen de 5 hojas: cifras clave, supuestos y la referencia a la hoja y celda del libro completo de donde sale cada una».
- En Evaluación y en Simulación, agrega el enlace «¿De dónde salen estas cifras? → Resumen de estimaciones (Excel)».

## 2. Trabajo en equipo (sección 17) y resultados por módulo (sección 11)

El guion cambió la forma de trabajo. La página y el README ya **no deben decir** que hay dos reuniones semanales con acta, consenso con desempate, GitHub Projects ni la revisión de 61 hallazgos.

### 2.1 `teamRules` y la sección Aprendizaje

Reemplaza `teamRules` por:

- **Reuniones:** una reunión semanal por Google Meet. No llevamos actas: en cada reunión quedan tareas para la semana, con fecha de entrega.
- **Documento compartido:** durante la preparación trabajamos en un Google Docs compartido, al que todos teníamos acceso y que editábamos al mismo tiempo.
- **Repositorio:** al terminar esta etapa creamos el repositorio en GitHub para reunir los documentos finales.
- **Siguiente etapa:** usaremos GitHub para organizar y compartir los desarrollos de simulación, control, SCADA y gemelo digital.
- **Responsables:** cada módulo tiene dos responsables que revisan el trabajo del otro (ver 2.2).

Cambios en el componente:

- Título de `Aprendizaje.astro`: «Una reunión semanal, un documento compartido y GitHub para lo que sigue.» (o similar, sin cifras).
- Cambia «Bitácora de decisiones» por **«Hitos del trabajo»**:
  - 28/09/2026: arranque del proyecto, con empresa, roles, 9 referencias, línea a detalle y cliente.
  - Semanas siguientes: reuniones semanales y documento compartido.
  - 12/10/2026: repositorio en GitHub, página, presentación y video de la entrega intermedia.
  - Quita las entradas de la revisión interna y de los 61 hallazgos.
- En `commitments`, marca como hechos los tres compromisos del 12/10, con una marca visual. El video queda «en edición: 25 a 30 min con los 6 integrantes; intro y outro de Kuajo listos». El resto no cambia.

### 2.2 `modules` y la sección Resultados

Reemplaza `modules` por los 8 módulos de la presentación, cada uno con dos responsables:

| Módulo | Evidencia | Responsables | Estado |
|---|---|---|---|
| Transformación Digital Industrial | ISA-95, red OT/IT, ISA-88 físico y procedimental, P&ID | Paula · Jose Luis | Entregado |
| Gestión de la producción | VSM actual y futuro, KPIs, simulación en Python | Juan · David | Entregado |
| Planeación de proyectos | EDT, cronograma, presupuesto, flujos, oferta | Duvan · Ian | Entregado |
| Simulación en Tecnomatix | Mismos objetos y datos del modelo en Python | Juan · David | En curso |
| Controladores industriales | Grafcet y Ladder en Logix Emulate con recetas | Jose Luis · David | Entrega final |
| SCADA | Ignition con HMI ISA-101 y OPC | Ian · Paula | Entrega final |
| Digital Factory | Gemelo digital de la línea 1 con Logix Emulate | Ian · Juan | Entrega final |
| Celda robotizada | Diseño, simulación en RobotStudio y riesgos | Jose Luis · Duvan | Entrega final |

- Título de la sección: «Todo el equipo trabajó en esta entrega.»
- Mantén las tarjetas y la animación actuales, adaptadas a 8 elementos (3 estados con color distinto). Revisa que se vea bien a 360 px.

## 3. Conclusiones (sección 16)

Reemplaza `conclusions` y `nextSteps` con el texto del guion, que ahora presenta **Ian**:

1. Estimamos que la línea de yogures puede producir **20 % más sin comprar equipos de proceso**, subiendo el OEE de 55 % a cerca de 78 %.
2. La simulación preliminar lo respalda y dice qué cuidar en la operación: escalonar las pausas y secuenciar con el MES, porque la fermentación pasa a ser la restricción.
3. Un solo procedimiento ISA-88 produce las tres recetas, y el MES integrado con SAP bajaría la trazabilidad de 6 h a menos de 30 min.
4. Con cálculos preliminares, el proyecto valdría para Pomar unos **$15.000 M** en valor presente (inversión ≈ $9.600 M) y resiste escenarios adversos.
5. Para Kuajo es un buen contrato (≈ 11 % neto), con un riesgo de caja que se financia con un crédito rotativo, y deja la planta lista para seguir con UHT y quesos.

**Próximos pasos:** medir la línea base para confirmar estas estimaciones, terminar el modelo en Tecnomatix, reemplazar estimaciones por cotizaciones y preparar la Fase 2.

## 4. Equipo, video y presentación

- La foto de Jose Luis ya está en `web/src/assets/equipo/jose-luis.jpg`. Quítala de los pendientes en `web/README.md` y en `src/assets/equipo/LEEME.txt` si allí figura como pendiente.
- `site.video` sigue en `PENDING` hasta que haya enlace de YouTube. Donde se muestre, el texto acompañante dice «Video en edición (25 a 30 min)».
- **Mueve** `Kuajo_Intro.mp4` y `Kuajo_Intro_sin_audio.mp4` de la raíz a `Presentacion/`, donde ya están el outro, `guion.pdf` y la exportación HTML de la presentación. No los publiques en la página, porque pesan; basta con el enlace en el README.

## 5. README de la raíz

Actualízalo con el mismo criterio, sin perder estructura, insignias ni diagramas Mermaid:

1. **Nota inicial.** Al bloque `[!NOTE]` del caso académico agrega un segundo párrafo con `site.preliminar`, en versión README.
2. **Resumen ejecutivo.**
   - En la tabla de indicadores, la columna «Con la propuesta» pasa a llamarse **«Meta estimada»** y sus valores llevan «≈» donde aplique.
   - La tabla financiera queda así: precio ≈ $8.500 M (≈ US$2,6 M), VPN ≈ $15.000 M, TIR ≈ 49 %, recuperación ≈ 2,2 años y B/C ≈ 2,6.
   - Debajo, el enlace al libro resumido.
3. **Equipo · Forma de trabajo.** Reemplaza las tres viñetas por las 4 reglas nuevas de la sección 2.1 y quita la frase de las parejas R1–R2, R3–R4 y R5–R6. Pon en su lugar: «cada módulo tiene dos responsables que se revisan entre sí».
4. **Situación actual y VSM / Simulación / Evaluación financiera.**
   - En los títulos de las gráficas Mermaid, «propuesta» pasa a «meta estimada» y «Flujo…» a «Flujo… (cálculo preliminar)». Los valores de las series pueden seguir exactos porque vienen del Excel.
   - En la tabla de Evaluación, usa los valores aproximados de 1.3 y agrega la explicación corta del crédito rotativo y el bloque «¿Cómo sabemos que la meta es alcanzable?» en 3 viñetas.
5. **Oferta y líneas 2 y 3.** Agrega «(referencia preliminar ±30 %)» a las fases 2 y 3 y al combinado, con los valores redondeados.
6. **Estado por módulo.** Reemplaza la tabla por la de los 8 módulos de 2.2.
7. **Conclusiones.** Usa las 5 de la sección 3 y los nuevos próximos pasos.
8. **Entregables y enlaces.**
   - Agrega estas filas:
     - **Resumen de estimaciones** (`05_pm4r/Resumen_Estimaciones_Kuajo.xlsx`).
     - **Presentación**: `Presentacion/`, con la exportación HTML y `guion.pdf`.
     - **Intro y outro del video** (`Presentacion/Kuajo_Intro.mp4`, `Presentacion/Kuajo_Outro.mp4`).
   - En la fila del video pon «En edición · 25 a 30 min con los 6 integrantes» y cambia la insignia de «pendiente» a «en edición».
9. **Organización del repositorio.**
   - Agrega `Presentacion/` (responsable: R1 Duvan, con R6 Ian para el video) y `gestion/equipo/fotos/`.
   - En la descripción de `gestion/` quita «auditoría interna» si ya no se presenta como evidencia; los archivos no se borran.
10. **Página web: publicación y desarrollo.** Agrega una línea: «Las cifras escritas en la página se muestran redondeadas como estimaciones preliminares; `npm run check` sigue comparando los valores exactos de `site.ts` con el Excel».

En la tabla «Contenido» no debe quedar ningún enlace roto: revisa las anclas.

## 6. README de `web/`

- En la tabla de secciones, agrega «estimaciones preliminares» donde aplique y la fuente «Resumen_Estimaciones_Kuajo.xlsx» en las secciones 10 y 13.
- En «Datos: de dónde sale cada cifra», explica la regla: valores exactos en `site.ts` y en el Excel; texto mostrado con `aprox()` y la etiqueta `Preliminar`.
- En «Pendientes» quita la foto de Jose Luis. Quedan el enlace del video y las reflexiones grupal e individuales.
- En «Verificación», cambia la fecha a la de hoy y deja los resultados reales de tus pruebas, no los anteriores.

## 7. Verificación antes de terminar

1. Corre `npm run check`, `npm run typecheck` y `npm run build`, y corrige hasta que no haya errores.
2. Busca en `web/src/` y en `README.md` y confirma que no queden estos textos: «con acta», «Dos por semana», «dos reuniones», «GitHub Projects», «61 hallazgos», «desempata», «Video-pendiente».
3. Busca «VPN», «TIR», «8.526», «15.014» y «49,0» en los textos visibles. Fuera de las tablas plegadas de detalle y de los comentarios del código, deben aparecer redondeados y con la etiqueta.
4. Abre la página con `npm run preview` a 360, 768 y 1280 px, en modo claro y oscuro, y con movimiento reducido.
   - No debe haber desplazamiento horizontal y las etiquetas deben leerse.
   - Los plegables deben abrirse con el teclado.
   - Los contadores deben terminar en los valores con «≈».
5. Al final, resume en una lista qué archivos cambiaste y cualquier cifra que no hayas podido cuadrar.
