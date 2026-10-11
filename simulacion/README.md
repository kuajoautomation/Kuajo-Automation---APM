# Simulación de la línea de yogures

El [sim.py](sim.py) original usa únicamente la biblioteca estándar de Python 3. Representa preparación y tratamiento térmico, cuatro fermentadores, separación, pulmón, maduración, llenadoras, cambios de formato, fallas y turnos con un paso de un minuto.

## Ejecutar

Desde la raíz del repositorio:

```bash
cd simulacion
python3 sim.py 10
```

El argumento indica el número de réplicas por escenario. Por defecto son diez. Cada réplica cubre trece semanas con una de calentamiento y usa una semilla entre 0 y 9 en la ejecución de referencia. Se imprimen los promedios y desviaciones poblacionales y se escribe `sim_results.json` en el directorio actual. Ese archivo generado se excluye de Git; los valores verificados se conservan en [resultados_referencia.json](resultados_referencia.json).

## Referencia reproducida

| Identificador del código | Escenario | Vendible, media ± desviación (kg/día) |
|---|---|---:|
| actual | Mix actual y pausas fijas | 41.186 ± 202 |
| actual_demanda | Demanda objetivo con equipo y parámetros actuales | 38.657 ± 312 |
| propuesta_escalonadas | Mejoras y pausas escalonadas | 50.874 ± 39 |
| propuesta | Mejoras con pausas fijas | 48.960 ± 210 |

Los resultados publicados coinciden con la hoja Simulacion del Excel. El JSON incluye producción por receta, OEE de vasos (`oee`), ocupación de vasos (`occ`), fermentadores (`ferm`) y botellas (`bocc`), MLT de Y1 en horas (`mlt`) y lotes en cola al final (`backlog`). Excepto `kg`, los valores son pares `[media, desviación poblacional]`; las fracciones se convierten a porcentaje multiplicándolas por 100.

Las ventanas de llenado son distintas: pausas fijas, 06:00–13:00 y 14:00–21:00; escalonadas, 06:00–22:00, de lunes a sábado. El tiempo disponible cambia también el denominador del OEE. La meta calculada de 78 % no es el OEE obtenido en el escenario escalonado, que entrega 58,7 %.

Los parámetros son supuestos del caso. La [lista de observaciones](../documentacion/OBSERVACIONES.md) registra diferencias en la descripción de semillas y sobretiempos. Se conserva el código sin cambios para que la referencia siga siendo reproducible. El modelo de Tecnomatix Plant Simulation figura como pendiente y no está incluido.
