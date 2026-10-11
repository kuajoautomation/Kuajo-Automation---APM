# Observaciones documentales y tareas pendientes

Estas observaciones acompañan la síntesis de la versión B del 11/10/2026. Los originales publicados mantienen sus cifras; no se corrigieron silenciosamente. Las fuentes externas de precios, tasas y normas no se volvieron a verificar para esta publicación.

| Tema | Evidencia | Acción pendiente |
|---|---|---|
| Metas frente a simulación | Meta: 52.400 kg/día, OEE 78 % y MLT Y1 72,5 h. Simulación escalonada: 50.874 kg/día vendibles, OEE 58,7 % y MLT 81 h. | Mantener cada indicador identificado y evaluar cómo cubrir toda la demanda vendible. |
| Restricción | El cálculo excluye esperas de tanques; el simulador incluye bloqueo y alcanza cerca del 98 % de ocupación. | Validar secuencia y pulmón en Plant Simulation. |
| Riesgo R12 y rentabilidad | R12 afirma VPN positivo sin beneficio de volumen. Sección 13.10 y hoja Sensibilidad: escenario de eficiencia sin volumen con VPN cercano a −3.938 millones COP. | Corregir la respuesta de R12 y alinear el mensaje de viabilidad con la sensibilidad. |
| Semillas aleatorias | La hoja Simulacion describe 1 a 10; el código usa 0 a 9. Las cifras del libro coinciden con 0 a 9. | Ajustar la descripción metodológica. |
| Sobretiempo de fermentación | Código: extra=75 min en incubación actual y 30 min adicionales de CIP. Tabla 6.12: 0,75 h (45 min) en incubación y 0,5 h de CIP. | Reconciliar parámetros y narrativa antes de modificar el modelo. |
| Layout | Nombre de archivo y algunas láminas: 5.5; informe: Figura 5.3. | Unificar referencias en la próxima revisión. |
| Anexo C y medios internos | El Word fuente tenía 17 PNG; solo image2 y image3 están insertados. | La copia publicada conserva todo el contenido visible y esas dos figuras; se retiraron únicamente 15 medios no insertados y sus relaciones. |
| Cotizaciones | Cerca del 73 % del valor de suministros es estimado. | Obtener cotizaciones antes de consolidar el presupuesto. |
| Artefactos referenciados | No se recibieron enunciado, actas, auditoría previa, modelo .spp, programas de PLC/SCADA/RobotStudio, web ni video. | Completar y enlazar los entregables cuando existan. |

## Verificación realizada

Se revisaron 45 archivos originales, incluidas 23 hojas y 5.096 fórmulas del Excel. No se encontraron errores de fórmula en los valores almacenados; no se recalculó todo el libro con un motor de Excel. La ejecución del Python original con diez réplicas reproduce los resultados de la hoja Simulacion. Los [resultados de referencia](../simulacion/resultados_referencia.json) conservan la precisión original.

El [manifiesto de fuentes](MANIFIESTO_FUENTES.csv) documenta las copias publicadas y sus hashes. Las imágenes seleccionadas conservan exactamente sus bytes originales; las variantes antiguas no insertadas quedan fuera de la selección.
