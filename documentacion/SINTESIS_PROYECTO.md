# Síntesis del proyecto

Referencia: informe Kuajo Automation versión B, 11 de octubre de 2026. Todas las cifras operativas y económicas pertenecen al caso académico recibido. Sus fuentes externas no se actualizaron durante esta síntesis.

## Problema y alcance

Pomar necesita pasar de 43.700 a 52.400 kg/día de yogures sin construir otra línea. El cálculo base identifica la llenadora de vasos como restricción: opera al 100 % de ocupación, con OEE de 55,4 %, cambios de 90 minutos y rechazo de 3 %. Los PLC de fabricantes funcionan aislados, las recetas se ajustan manualmente y la trazabilidad en papel tarda unas seis horas.

La Fase 1 automatiza la línea 1 e instala una plataforma de planta compartida. Los tanques, tren térmico, fermentadores, separador y llenadoras existentes se conservan. Quesos y UHT están caracterizados como fases posteriores.

## Productos y rutas

| Receta | Presentación | Operación que la diferencia | Producción actual → objetivo |
|---|---|---|---:|
| Y1 · Yogur de fresa | Vaso 150 g; 24 por caja | Fermentación de unas 4,5 h y dosificación de fruta al 12 %. | 26.400 → 30.000 kg/día |
| Y2 · Yogur griego | Vaso 500 g; 12 por caja | Fermentación de unas 6 h y concentración con separación de suero ácido. | 5.900 → 10.000 kg/día |
| Y3 · Kéfir natural | Botella 1 L; 12 por caja | Fermentación de unas 20 h, maduración de 12 h y llenadora propia. | 11.400 → 12.400 kg/día |

Las tres recetas comparten preparación, tratamiento térmico y cuatro fermentadores de 10.000 L. Y1 y Y2 usan el pulmón y la llenadora de vasos; Y3 usa maduración y llenado de botellas. El kéfir requiere un fermentador dedicado y otro aproximadamente cada cuatro días. El orden Y2 → Y1 evita el cambio inverso más largo: la meta de 35 minutos corresponde a Y2 → Y1; Y1 → Y2 requiere aproximadamente 60 minutos.

## Solución de automatización e información

| Componente | Función y resultado buscado |
|---|---|
| Recetas ISA-88 y PLC de línea | Ejecutar fases genéricas con parámetros, rutas y permisos específicos de cada lote. |
| pH en línea, temperatura y CIP | Terminar automáticamente la incubación y registrar proceso y limpieza. |
| Inspección de peso, metales y visión | Controlar contenido, sello y código; rechazar automáticamente unidades defectuosas. |
| Dos robots delta y un paletizador | Encajonar las tres referencias, cambiar herramientas y construir patrones de pallet. |
| SCADA Ignition | Operación, alarmas, tendencias, historian y usuarios por rol. |
| MES Sepasoft | Programación de lotes, recetas, OEE, calidad y genealogía. |
| Integración con SAP | Bajar órdenes y subir cantidades, consumos, calidad e inventario liberado. |
| Arquitectura ISA-95 y DMZ | Organizar el flujo campo–control–supervisión–operaciones–negocio y el intercambio OT/IT. |
| Comisionamiento virtual | Probar PLC, SCADA y recetas con Logix Emulate antes del montaje. |

La trazabilidad enlaza leche, ingredientes y cultivo con fermentador, llenado, empaque, caja, pallet SSCC y cliente. La meta es reconstruir el recorrido en menos de 30 minutos.

## Producción calculada y simulación

El diseño calcula OEE de 78 % en vasos, MLT de Y1 de 72,5 h y producción de 52.400 kg/día. La simulación en Python representa el proceso por pasos de un minuto, fallas aleatorias y calendarios de turnos. Se reprodujeron los cuatro escenarios con diez réplicas de trece semanas, incluida una de calentamiento y semillas 0 a 9.

| Escenario | Vendible, media ± desviación (kg/día) | OEE vasos | Ocupación fermentadores | MLT Y1 | Atraso final, media de lotes |
|---|---:|---:|---:|---:|---:|
| Actual | 41.186 ± 202 | 51,8 % | 98,1 % | 116,7 h | 2,7 |
| Actual con demanda objetivo | 38.657 ± 312 | 51,2 % | 98,6 % | 116,7 h | 121,3 |
| Propuesta, pausas escalonadas | 50.874 ± 39 | 58,7 % | 98,3 % | 81,0 h | 2,0 |
| Propuesta, pausas fijas | 48.960 ± 210 | 64,7 % | 98,2 % | 82,0 h | 21,4 |

La propuesta escalonada aumenta el producto vendible aproximadamente un 23,5 % frente al escenario actual y cubre el 97,1 % de la demanda. Con pausas fijas crece el atraso. La simulación incluye tanques bloqueados y llenadoras esperando producto; la fermentación queda cerca de la saturación. La ventana escalonada de llenado es más amplia que la de pausas fijas, por lo que también cambia el denominador de su OEE.

Los 52.400 kg/día calculados y el OEE meta de 78 % no deben presentarse como resultados vendibles y OEE obtenidos en la simulación. El segundo pulmón o un llenado parcial dominical siguen como alternativas por evaluar.

## Planeación y economía del caso

La planeación PM4R comprende EDT, cronograma CPM, nivelación, curva S, riesgos, adquisiciones, comunicaciones y RACI. Se prevén 10.160 horas de ingeniería, 38 actividades y 48 semanas de ejecución industrial: 11/01/2027–12/12/2027. La parada se sitúa entre 30/08/2027 y 12/09/2027. La compra de robots, de 20 semanas, condiciona la ruta crítica.

| Indicador reportado | Valor |
|---|---:|
| Oferta de Kuajo, sin IVA | 8.526 millones COP |
| Inversión total de Pomar, antes del efecto fiscal | 9.605 millones COP |
| Flujo neto del año 0 de Pomar | −9.227 millones COP |
| Beneficios anuales estimados en régimen | 8.481 millones COP |
| OPEX anual base | 588 millones COP |
| VPN / TIR de Pomar | 15.014 millones COP / 49,0 % |
| Tasa de oportunidad / horizonte | 13,7 % / 7 años |
| Recuperación simple / descontada | 2,23 / 2,71 años |
| Utilidad neta de Kuajo | 935 millones COP, 11,0 % del contrato |
| Crédito rotativo máximo / cupo previsto | 1.316 / 1.500 millones COP |

El beneficio principal es el margen del volumen adicional. Aproximadamente el 73 % del valor de suministros son estimaciones pendientes de cotización. Los riesgos principales abarcan importación de robots, tasa de cambio, parada, integración MES–SAP y disponibilidad de leche/demanda. La [contradicción sobre R12](OBSERVACIONES.md) debe reconciliarse antes de actualizar la evaluación.

## Fases siguientes y entregables pendientes

| Fase | Línea | Referencias | Enfoque |
|---|---|---|---|
| 1 | Yogures | Fresa, griego, kéfir | Desarrollo detallado y plataforma compartida. |
| 2 | UHT y bebidas | Entera, deslactosada, achocolatada | Integrar esterilización, hidrólisis, llenado y cuarentena; referencia económica ±30 %. |
| 3 | Quesos | Campesino, doble crema, cuajada | Control de cuajado, corte, prensado/hilado y moldes; validar rendimiento; referencia económica ±30 %. |

El escenario de planta completa demanda aproximadamente el 98 % del acopio supuesto. Los pasos declarados son validar datos en visita, conseguir cotizaciones, completar Plant Simulation y desarrollar la celda RobotStudio, el gemelo, PLC y SCADA. La carpeta recibida contiene documentación y el simulador Python; no contiene esos modelos ni la web, video, actas o enunciado del curso citados por el informe.
