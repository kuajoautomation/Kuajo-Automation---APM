# Kuajo Automation · Proyecto Integrador APM 2026-2

**Conectamos cada lote con cada decisión.**

Propuesta de Transformación Digital Industrial para la línea 1 (yogures) de Lácteos Pomar, planta Cajicá: integración de proceso, PLC, SCADA, MES y SAP bajo ISA-95 e ISA-88, gemelo digital, celda robotizada y evaluación PM4R.
Curso Automatización de Procesos de Manufactura · Universidad Nacional de Colombia · Equipo 2.

> Caso académico. Lácteos Pomar es una empresa real usada como referencia de escala y portafolio; los problemas, indicadores y datos operativos son supuestos del curso.

- **Página web:** https://kuajoautomation.github.io/Kuajo-Automation---APM/ (se publica sola, ver abajo)
- **Repositorio:** https://github.com/kuajoautomation/Kuajo-Automation---APM
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

### Publicación

- Repositorio: `git@github.com:kuajoautomation/Kuajo-Automation---APM.git` (rama `main`).
- En GitHub, **Settings → Pages → Build and deployment → Source: GitHub Actions** debe estar activado (una sola vez).
- El flujo «Publicar la página en GitHub Pages» (pestaña **Actions**) compila y publica en https://kuajoautomation.github.io/Kuajo-Automation---APM/.
- Para clonar con SSH, cada integrante registra su llave pública en GitHub (**Settings → SSH and GPG keys**) y luego:
  ```bash
  git clone git@github.com:kuajoautomation/Kuajo-Automation---APM.git
  ```

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
