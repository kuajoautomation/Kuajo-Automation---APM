# Kuajo Automation · Proyecto Integrador APM 2026-2

Transformación Digital Industrial de la **línea 1 de yogures** de Lácteos Pomar, planta de Cajicá. Proyecto académico de ingeniería mecatrónica de la Universidad Nacional de Colombia.

> **Caso académico:** Pomar es una empresa real utilizada como referencia. El problema, los datos operativos, los planos y las metas son supuestos del proyecto; no representan información operativa de la empresa.

Kuajo propone aumentar aproximadamente un **20 %** la producción de yogures, aprovechando los equipos de proceso existentes. Integra recetas ISA-88, instrumentación y control, inspección automática, encajonado y paletizado robotizados, SCADA Ignition, MES Sepasoft y SAP bajo una arquitectura ISA-95.

## Lectura recomendada

| Recurso | Para qué sirve |
|---|---|
| [Síntesis del proyecto](documentacion/SINTESIS_PROYECTO.md) | Problema, alcance, recetas, solución, resultados y planeación. |
| [Catálogo de 12 figuras clave](documentacion/CATALOGO_FIGURAS.md) | Miniaturas, descripciones y fuentes vectoriales disponibles. |
| [Anexos y fuentes](documentacion/anexos/README.md) | Informe completo, Excel PM4R, láminas A3 y caracterización de quesos/UHT. |
| [Simulación reproducible](simulacion/README.md) | Código original, ejecución y resultados de referencia. |
| [Observaciones documentales](documentacion/OBSERVACIONES.md) | Diferencias entre metas y simulación, inconsistencias y trabajo pendiente. |

## Metas del caso

| Indicador | Situación actual | Meta calculada |
|---|---:|---:|
| Producción | 43.700 kg/día | 52.400 kg/día |
| OEE de la llenadora de vasos | 55,4 % | 78,0 % |
| Cambio de formato Y2 → Y1 | 90 min | 35 min |
| Rechazo | 3 % | 1 % |
| MLT de Y1 | 4,2 días | 3,0 días |
| Tiempo para reconstruir la trazabilidad | 6 h | < 30 min |

**Resultado simulado:** la propuesta con pausas escalonadas entrega **50.874 kg/día vendibles**, aproximadamente el **97,1 %** de la demanda. El OEE simulado de vasos es **58,7 %** y el MLT de Y1 es **81 h**. Estos resultados se distinguen de las metas calculadas de la tabla.

## Proceso propuesto

![PFD de la línea de yogures con la propuesta de Kuajo](documentacion/figuras/png/Fig_5.2b_PFD_Linea1_Propuesta.png)

La línea produce **Y1 yogur de fresa**, **Y2 yogur griego** y **Y3 kéfir**. Comparte preparación, tratamiento térmico y cuatro fermentadores; cada receta habilita su ruta y sus fases específicas. El plan requiere escalonar pausas y programar los fermentadores, que trabajan cerca del 98 % de ocupación en la simulación cuando se incluyen bloqueos y esperas.

La Fase 1 instala el núcleo SCADA/MES/red que utilizarían las fases posteriores: **línea 3 UHT (Fase 2)** y **línea 2 quesos (Fase 3)**.

## Planeación reportada

Oferta Fase 1: **8.526 millones COP sin IVA**. Inversión total estimada de Pomar: **9.605 millones COP**. El modelo reporta un VPN de **15.014 millones COP**, TIR de **49,0 %** y recuperación simple de **2,23 años**. Son resultados del caso académico y dependen especialmente del volumen adicional.

Ejecución industrial prevista: **48 semanas, 11/01/2027–12/12/2027**, con parada de montaje de dos semanas. La entrega académica intermedia es el **12/10/2026**; es un calendario distinto del de implementación industrial.

## Equipo

| Rol | Integrante | Responsabilidad |
|---|---|---|
| R1 | Duvan Felipe Pacheco Rodriguez | Gerencia, PM4R y oferta. |
| R2 | Paula Valentina Alvarez Chaparro | Arquitectura OT/IT, ISA-88/95 y MES/ERP. |
| R3 | David Felipe Garcia Lopez | Proceso, recetas y balances. |
| R4 | Juan Angel Vargas Rodriguez | Producción, VSM y simulación. |
| R5 | Jose Luis Pulido Fonseca | Control, instrumentación y robótica. |
| R6 | Ian Saonni Rodriguez Pulido | SCADA, comunicaciones y gemelo digital. |

## Referencia documental

Síntesis basada en el **informe versión B del 11/10/2026** y sus anexos. La selección agrupa las figuras por su función y conserva los archivos originales elegidos. El [manifiesto](documentacion/MANIFIESTO_FUENTES.csv) registra su procedencia, transformación y huellas SHA-256. El anexo C conserva exactamente su contenido visible y sus dos figuras; se eliminaron de la copia los medios no insertados.
