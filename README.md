# Kuajo Automation · Proyecto Integrador APM 2026-2

**Conectamos cada lote con cada decisión.**

Propuesta de Transformación Digital Industrial para la línea 1 (yogures) de Lácteos Pomar, planta Cajicá: integración de proceso, PLC, SCADA, MES y SAP bajo ISA-95 e ISA-88, gemelo digital, celda robotizada y evaluación PM4R.
Curso Automatización de Procesos de Manufactura · Universidad Nacional de Colombia · Equipo 2.

> Caso académico. Lácteos Pomar es una empresa real usada como referencia de escala y portafolio; los problemas, indicadores y datos operativos son supuestos del curso.

- **Página web:** `https://<usuario>.github.io/<repositorio>/` (se publica sola, ver abajo)
- **Video:** pendiente
- **Informe:** [informes/Informe_Kuajo_APM_2026-2_Linea1_Yogures.pdf](informes/Informe_Kuajo_APM_2026-2_Linea1_Yogures.pdf)

## Organización del repositorio

Una carpeta por módulo, como indica el informe (sección 15.1). Cada integrante sube su trabajo con commits propios en la carpeta de su módulo.

| Carpeta | Contenido | Responsable |
|---|---|---|
| [`00_curso/`](00_curso) | Programa, enunciado del proyecto integrador y guía PM4R del BID | — |
| [`01_proceso/`](01_proceso) | Diagrama de bloques (5.1), PFD actual (5.2a) y propuesto (5.2b), distribución de planta (5.3), rutas de recetas (7.1) y P&ID (12.1), en SVG, PDF y PNG | R3 David Felipe · R5 Jose Luis |
| [`02_isa88/`](02_isa88) | Modelo físico (10.1) y procedimental (10.2) | R2 Paula |
| [`03_isa95/`](03_isa95) | Arquitectura ISA-95 (11.1) y red OT/IT (11.2) | R2 Paula · R6 Ian |
| [`04_produccion/`](04_produccion) | VSM actual y futuro; [`simulacion/sim.py`](04_produccion/simulacion/sim.py) (anexo D) | R4 Juan |
| [`05_pm4r/`](05_pm4r) | Libro de planeación `Planeacion_PM4R_Kuajo_Pomar.xlsx` (anexo A) y gráficas de Gantt, histograma, curva S y flujo | R1 Duvan |
| [`informes/`](informes) | Informe (Word y PDF), anexo B (figuras A3) y anexo C (líneas 2 y 3) | Todos |
| [`gestion/`](gestion) | Auditoría interna, prompts de trabajo y fotos originales del equipo | R1 Duvan |
| [`web/`](web) | Página web del proyecto (Astro). Ver [web/README.md](web/README.md) | R6 Ian |

## La página web

La página vive en [`web/`](web) y **no tiene copias propias** del informe, el Excel ni las figuras: al compilar las toma de las carpetas de módulos. Así, actualizar un archivo en su carpeta basta para que la página lo publique.

### Publicar por primera vez

1. En GitHub, crea un repositorio **público** vacío (por ejemplo `kuajo-automation`), sin README ni .gitignore. GitHub Pages es gratis solo en repositorios públicos.
2. En esta carpeta, conecta el repositorio y súbelo:
   ```bash
   git remote add origin https://github.com/<usuario>/kuajo-automation.git
   git push -u origin main
   ```
3. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. En la pestaña **Actions**, el flujo «Publicar la página en GitHub Pages» compila y publica. Si la primera ejecución falló porque Pages aún no estaba activado, ábrela y pulsa **Re-run all jobs**.
5. La página queda en `https://<usuario>.github.io/kuajo-automation/`. Pega esa URL, la del repositorio y la del video en `web/src/data/site.ts` (`site.repo` y `site.video`) y haz `push`.

### Actualizar

Cada `push` a `main` vuelve a compilar y publicar la página en 2 a 3 minutos, sin pasos manuales:

```bash
git add .
git commit -m "Actualiza el Excel de planeación"
git push
```

Antes de publicar, el flujo verifica que las cifras de la página coincidan con el Excel (`npm run check`). Si cambia una cifra del Excel que la página muestra escrita (precio, VPN, TIR…), la publicación se detiene y el error indica qué valor actualizar en `web/src/data/site.ts`.

### Trabajar en la página en local

Requiere Node.js 22.6 o superior.

```bash
cd web
npm install
npm run dev
```
