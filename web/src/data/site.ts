// Contenido del sitio. Fuente principal: Informe_Kuajo_APM_2026-2_Linea1_Yogures (versión B, 11/10/2026).
// Las series largas (Gantt, histograma, flujos, instrumentos, matrices) vienen de excel.json,
// que se genera desde el libro Planeacion_PM4R_Kuajo_Pomar.xlsx con `npm run sync`.
// `npm run check` compara las cifras de este archivo con el Excel.
// Todo dato operativo es un supuesto del caso académico.

export const PENDING = '[PENDIENTE]';

export const site = {
  name: 'Kuajo Automation',
  legalName: 'Kuajo Automation S.A.S.',
  slogan: 'Conectamos cada lote con cada decisión',
  description:
    'Kuajo Automation integra proceso, PLC, SCADA, MES y ERP bajo ISA-95 e ISA-88. Propuesta de transformación digital industrial para la línea de yogures de Lácteos Pomar, Cajicá (caso académico).',
  repo: PENDING, // URL del repositorio en GitHub cuando exista
  video: PENDING, // URL del video en YouTube cuando exista
  course: 'Automatización de Procesos de Manufactura · 2026-2',
  university: 'Universidad Nacional de Colombia',
  disclaimer:
    'Caso académico. Lácteos Pomar es una empresa real usada como referencia de escala y portafolio; los problemas, indicadores y datos operativos son supuestos del curso.',
  coords: '04°55′N 74°02′W',
  rev: 'REV.D',
  informe: 'Informe versión B · 11 oct. 2026',
};

export const sections = [
  { id: 'inicio', n: '00', code: 'KA-INI', label: 'Inicio', short: 'Inicio' },
  { id: 'equipo', n: '01', code: 'KA-EQU', label: 'Equipo', short: 'Equipo' },
  { id: 'cliente', n: '02', code: 'KA-CLI', label: 'Cliente y problema', short: 'Cliente' },
  { id: 'proceso', n: '03', code: 'KA-PRO', label: 'Planta y 3 líneas', short: 'Planta' },
  { id: 'actual', n: '04', code: 'KA-ACT', label: 'Situación actual', short: 'Actual' },
  { id: 'vsm', n: '05', code: 'KA-VSM', label: 'VSM actual y futuro', short: 'VSM' },
  { id: 'propuesta', n: '06', code: 'KA-PFD', label: 'Proceso propuesto', short: 'Propuesta' },
  { id: 'recetas', n: '07', code: 'KA-REC', label: 'Recetas e ISA-88', short: 'ISA-88' },
  { id: 'arquitectura', n: '08', code: 'KA-ARQ', label: 'Arquitectura ISA-95', short: 'ISA-95' },
  { id: 'instrumentacion', n: '09', code: 'KA-INS', label: 'Instrumentación y P&ID', short: 'P&ID' },
  { id: 'simulacion', n: '10', code: 'KA-SIM', label: 'Simulación', short: 'Simulación' },
  { id: 'resultados', n: '11', code: 'KA-RES', label: 'Resultados por módulo', short: 'Módulos' },
  { id: 'planeacion', n: '12', code: 'KA-PM4R', label: 'Planeación PM4R', short: 'PM4R' },
  { id: 'evaluacion', n: '13', code: 'KA-EVA', label: 'Evaluación financiera', short: 'Finanzas' },
  { id: 'oferta', n: '14', code: 'KA-OFE', label: 'Oferta comercial', short: 'Oferta' },
  { id: 'lineas', n: '15', code: 'KA-LIN', label: 'Líneas 2 y 3', short: 'Líneas 2-3' },
  { id: 'conclusiones', n: '16', code: 'KA-CON', label: 'Conclusiones', short: 'Conclusiones' },
  { id: 'aprendizaje', n: '17', code: 'KA-APR', label: 'Trabajo en equipo', short: 'Equipo' },
  { id: 'descargas', n: '18', code: 'KA-DES', label: 'Descargas y fuentes', short: 'Descargas' },
] as const;
export type SectionId = (typeof sections)[number]['id'];
/** Secciones visibles en la barra de navegación de escritorio. */
export const navQuick: SectionId[] = ['actual', 'vsm', 'arquitectura', 'simulacion', 'planeacion', 'evaluacion', 'oferta'];

/* ------------------------------------------------------------------ */
/* KPIs principales y tabla de indicadores (Tablas 1.1 y 6.9)          */
/* ------------------------------------------------------------------ */
export const kpis = [
  { id: 'oee', label: 'OEE de la llenadora de vasos', from: 55.4, to: 78.0, decimals: 1, unit: '%', before: '55,4 %', prefix: '', note: '86 % × 91 % × 99 % (disponibilidad × rendimiento × calidad)' },
  { id: 'traza', label: 'Trazar un lote en un recall', from: 360, to: 30, decimals: 0, unit: 'min', before: '6 h', prefix: '< ', note: 'Genealogía en el MES, del silo al pallet' },
  { id: 'cambio', label: 'Cambio de receta Y2 → Y1', from: 90, to: 35, decimals: 0, unit: 'min', before: '90 min', prefix: '', note: 'Recetas ISA-88, CIP automático y formato con RFID' },
];

export const kpiTable: [string, string, string][] = [
  ['Producción (kg/día) · por turno', '43.700 · 21.850', '52.400 · 26.200'],
  ['Throughput (kg/h)', '3.121', '3.743'],
  ['Ritmo frente al takt time de 0,96 s/kg', '1,15 s/kg', '0,96 s/kg'],
  ['Cumplimiento de la demanda', '83,4 %', '100 %'],
  ['OEE de la llenadora (D · R · C)', '55,4 % (68 · 84 · 97 %)', '78,0 % (86 · 91 · 99 %)'],
  ['Utilización: llenadora · fermentadores', '100 % · 76 %', '89 % · 88,8 %'],
  ['MLT de un lote de Y1', '4,2 días', '3,0 días'],
  ['Cambio de receta · rechazo', '90 min · 3 %', '35 min · 1 %'],
  ['MTBF · MTTR de la llenadora', '4,4 h · 25 min', '8,1 h · 20 min'],
  ['Lotes conformes a la primera', '94 %', '98 %'],
  ['Trazabilidad de un lote', '6 h', '< 30 min'],
  ['Rezago de los KPIs', '7 días', 'En línea'],
  ['Operarios de fin de línea por día', '8', '2'],
  ['Producción simulada vendible (kg/día)', '41.200', '50.900'],
];

/* ------------------------------------------------------------------ */
/* Cliente y problema (secciones 3 y 4)                                */
/* ------------------------------------------------------------------ */
export const context = [
  { v: '43.700', u: 'kg/día', l: 'produce hoy la línea de yogures' },
  { v: '52.400', u: 'kg/día', l: 'exige el contrato (+20 %)' },
  { v: '83', u: '%', l: 'de la demanda se cumple hoy' },
  { v: '2 × 8', u: 'h', l: 'turnos, 6 días por semana' },
];

export const problemStatement =
  'Lácteos Pomar necesita aumentar un 20 % su producción y lanzar nuevas referencias sin construir una planta nueva. Hoy opera con islas de automatización, registros en papel y sin visibilidad en tiempo real, lo que limita su OEE al 55 %, alarga los cambios de producto y hace lenta la trazabilidad.';

export const problems = [
  { id: 'P1', t: 'Capacidad insuficiente', e: 'La llenadora de vasos es el cuello de botella (100 % de ocupación, OEE 55,4 %); la fermentación es la siguiente restricción.', m: 'VSM · Tecnomatix' },
  { id: 'P2', t: 'Cambios de receta lentos', e: 'Setup de 90 min con CIP manual y parámetros a mano.', m: 'ISA-88 · PLC' },
  { id: 'P3', t: 'Trazabilidad en papel', e: 'Rastrear un lote en un recall toma ≈ 6 h.', m: 'MES · ISA-95' },
  { id: 'P4', t: 'Variabilidad de calidad', e: '3 % de rechazo por peso o sellado; fermentaciones fuera de pH.', m: 'Control · inspección' },
  { id: 'P5', t: 'Datos aislados', e: 'KPIs calculados a mano cada semana en Excel.', m: 'SCADA · MES · Power BI' },
  { id: 'P6', t: 'Riesgo ergonómico', e: 'Paletizado manual de cajas de 12 a 18 kg.', m: 'Celda robotizada' },
  { id: 'P7', t: 'Consumos no medidos', e: 'Sin submedición de vapor, agua ni energía por lote.', m: 'SCADA · KPIs' },
];

export const requirements = [
  { id: 'RF1', t: 'Al menos 3 recetas por línea con cambio de producto automático; recetas maestras ISA-88.' },
  { id: 'RF2', t: 'Trazabilidad lote a lote del silo al pallet despachado, con genealogía de ingredientes.' },
  { id: 'RF3', t: 'Supervisión centralizada: alarmas, tendencias, estado del lote y receta activa.' },
  { id: 'RF4', t: 'Órdenes que bajan del ERP y resultados que suben solos: cantidades, consumos, calidad, paradas.' },
  { id: 'RF5', t: 'KPIs en línea por turno: OEE, throughput, disponibilidad y calidad.' },
  { id: 'RF6', t: 'Paletizado robotizado con zona segura.' },
  { id: 'RNF1', t: 'Arquitectura ISA-95 con convergencia OT/IT.' },
];

/* ------------------------------------------------------------------ */
/* Planta y líneas (sección 5)                                         */
/* ------------------------------------------------------------------ */
export const lines = [
  {
    id: 'L1', name: 'Yogures', volume: '70.000 L/día asignados', batch: 'Lote = fermentador de 10.000 L', detail: true,
    refs: [
      { id: 'Y1', name: 'Yogur batido de fresa', pack: 'Vaso 150 g · 24 por caja' },
      { id: 'Y2', name: 'Yogur griego alto en proteína', pack: 'Vaso 500 g · 12 por caja' },
      { id: 'Y3', name: 'Kéfir natural', pack: 'Botella PEAD 1 L · 12 por caja' },
    ],
  },
  {
    id: 'L2', name: 'Quesos', volume: '60.000 L/día asignados', batch: 'Lote = tina de cuajado de 10.000 L', detail: false,
    refs: [
      { id: 'Q1', name: 'Queso campesino', pack: 'Bolsa al vacío 500 g' },
      { id: 'Q2', name: 'Queso doble crema', pack: 'Bloque 2,5 kg al vacío' },
      { id: 'Q3', name: 'Cuajada', pack: 'Bolsa 500 g' },
    ],
  },
  {
    id: 'L3', name: 'UHT y bebidas', volume: '90.000 L/día asignados', batch: 'Lote = tanque de preparación de 15.000 L', detail: false,
    refs: [
      { id: 'U1', name: 'Leche entera UHT', pack: 'Caja aséptica 1 L' },
      { id: 'U2', name: 'Leche deslactosada UHT', pack: 'Caja aséptica 1 L' },
      { id: 'U3', name: 'Bebida achocolatada UHT', pack: 'Caja 200 mL · paquete de 24' },
    ],
  },
];

/** Tabla 5.2 — leche y producción por línea. */
export const milk = [
  { linea: '1 Yogures', hoy: '49.446', prop: '66.115', prod: '43.700 → 52.400' },
  { linea: '2 Quesos', hoy: '60.000', prop: '60.000', prod: '7.470' },
  { linea: '3 UHT y bebidas', hoy: '79.640', prop: '88.400', prod: '82.207 → 91.250' },
  { linea: 'Otros (fuera del alcance)', hoy: '40.000', prop: '40.000', prod: '—' },
  { linea: 'Total planta', hoy: '229.086', prop: '254.515', prod: 'Acopio ≈ 260.000 L/día · holgura 2 %' },
];

/** Tabla 5.3 — utilización de recursos compartidos (hoy · con la línea 1 · planta completa). */
export const shared = [
  { r: 'Acopio de leche', cap: '260.000 L/día', v: [88, 95, 98] },
  { r: 'Manejo de suero S-551', cap: '90.000 L/día', v: [73, 84, 84] },
  { r: 'Cámara refrigerada A-611', cap: '420 pallets', v: [84, 70, 70] },
  { r: 'Agua helada S-521', cap: '700 kW', v: [62, 70, 71] },
  { r: 'Vapor S-511 (pico)', cap: '4.000 kg/h', v: [61, 66, 68] },
  { r: 'Tratamiento inicial R-131', cap: '400.000 L/día', v: [57, 61, 64] },
  { r: 'Silos (3 × 80.000 L)', cap: '240.000 L', v: [48, 51, 53] },
  { r: 'Recepción R-111', cap: '1.000.000 L/día', v: [23, 25, 25] },
];

/* ------------------------------------------------------------------ */
/* Situación actual (sección 6.1 a 6.3)                                */
/* ------------------------------------------------------------------ */
export const mix = [
  { r: 'Y1', name: 'Fresa (vaso 150 g)', hoy: '26.400', prop: '30.000', crec: '14 %', unidades: '176.000 vasos', lotes: '2,3' },
  { r: 'Y2', name: 'Griego (vaso 500 g)', hoy: '5.900', prop: '10.000', crec: '69 %', unidades: '11.800 vasos', lotes: '1,9' },
  { r: 'Y3', name: 'Kéfir (botella 1 L)', hoy: '11.400', prop: '12.400', crec: '9 %', unidades: '11.068 botellas', lotes: '1,2' },
];

export const today = [
  { area: 'Automatización', hoy: 'PLC propios del fabricante en el tren térmico y las llenadoras, cada uno aislado. Válvulas manuales. Sin PLC de línea, SCADA ni MES.', p: 'P5' },
  { area: 'Recetas y cambios', hoy: 'El operario ajusta temperaturas, tiempos y velocidades en cada panel. Cambio de receta de 90 min con CIP manual.', p: 'P2' },
  { area: 'Fermentación', hoy: 'pH por muestreo manual cada 30–60 min: ≈ 0,75 h de sobretiempo por lote y lotes fuera de pH.', p: 'P4' },
  { area: 'Llenado e inspección', hoy: 'Peso a mano con ≈ 3 % de sobrellenado; sin pesadora dinámica ni visión; 3 % de rechazo.', p: 'P4' },
  { area: 'Fin de línea', hoy: '4 operarios por turno encajonan y paletizan cajas de 12–18 kg: 9.239 cajas y 99 pallets por día.', p: 'P6' },
  { area: 'Información y trazabilidad', hoy: 'Plan semanal en Excel, registros en papel y SAP solo para finanzas. Reconstruir un lote toma ≈ 6 h.', p: 'P3 · P5' },
];

/** Tabla 6.5 — descomposición del OEE de la llenadora de vasos (fracciones). */
export const oee = [
  { k: 'Disponibilidad', hoy: 0.685, prop: 0.863, por: 'Cambios de 2 × 90 → 2 × 35 min y menos paradas no planeadas (85 → 45 min/día)' },
  { k: 'Rendimiento', hoy: 0.835, prop: 0.913, por: 'Control de peso en lazo cerrado con la pesadora dinámica' },
  { k: 'Calidad', hoy: 0.97, prop: 0.99, por: 'Inspección automática y fermentación controlada' },
  { k: 'OEE', hoy: 0.554, prop: 0.78, por: 'Disponibilidad × rendimiento × calidad' },
];
export const bottleneck = {
  llenadoraHoy: 1.0, llenadoraProp: 0.89, fermHoy: 0.76, fermProp: 0.888, fermSim: 0.98,
  texto: 'Hoy la llenadora de vasos limita la línea: necesita 14,0 de las 14 h disponibles, aunque a velocidad nominal bastarían 7,8 h. Con la propuesta produce 20 % más en 12,5 h (89 %) y la restricción pasa a la fermentación, que depende de la biología del cultivo y no se puede acelerar.',
};

/* ------------------------------------------------------------------ */
/* VSM (secciones 6.2, 6.4 y 6.7)                                      */
/* ------------------------------------------------------------------ */
export const vsmCounters = [
  { label: 'MLT de un lote de Y1', from: 4.2, to: 3.0, d: 1, unit: 'días' },
  { label: 'Inventario de producto terminado', from: 48, to: 24, d: 0, unit: 'h' },
  { label: 'Espera en el pulmón U-226 (Y1)', from: 4, to: 1.5, d: 1, unit: 'h' },
  { label: 'OEE de la llenadora', from: 55.4, to: 78.0, d: 1, unit: '%' },
  { label: 'Tiempo que agrega valor (Y1)', from: 11.4, to: 15.1, d: 1, unit: '%' },
];
export const vsmRead = [
  'Flujo empujado y sin sincronizar: cada etapa sigue la orden impresa del turno y el producto fermentado espera ≈ 4 h a la llenadora.',
  'La llenadora de vasos es el cuello de botella; los fermentadores usan 73 de 96 horas-tanque (76 %).',
  'La línea va a 1,15 s/kg frente a un takt de 0,96 s/kg: 20 % por debajo del cliente.',
  'La información viaja en papel: los KPIs llegan con una semana de rezago y el plan semanal obliga a guardar 48 h de producto en cámara.',
];
export const vsmFuture =
  'En el VSM futuro la programación del MES (heijunka) llega solo al proceso marcapasos, los fermentadores. Aguas abajo el producto fluye en FIFO: del fermentador al enfriador y del pulmón a la llenadora, con máximo 1 lote. Preparación y tratamiento térmico forman un flujo continuo con el lote que entra al fermentador, y un supermercado de producto liberado se despacha por fecha de vencimiento.';
export const kaizen = [
  { k: 'K1', t: 'Recetas ISA-88 y CIP automático', ef: 'Cambio de 90 a 35 min', p: 'P2' },
  { k: 'K2', t: 'pH en línea y fin de fase automático', ef: '−1,25 h por lote; fermentación ±10 %', p: 'P4' },
  { k: 'K3', t: 'Pesadora, detector de metales y visión', ef: 'Rechazo 3 → 1 %; sobrellenado 3 → 1,3 %', p: 'P4' },
  { k: 'K4', t: 'Carril FIFO secuenciado por el MES', ef: 'Espera en el pulmón 4 → 1,5 h (Y1)', p: 'P1' },
  { k: 'K5', t: 'Celda robotizada', ef: 'De 4 a 1 operario por turno', p: 'P6' },
  { k: 'K6', t: 'Plan diario de SAP al MES', ef: 'Inventario 48 → 24 h', p: 'P5' },
  { k: 'K7', t: 'Genealogía del lote (Track & Trace)', ef: 'Trazabilidad 6 h → < 30 min', p: 'P3' },
  { k: 'K8', t: 'Submedición de energía, vapor y agua', ef: 'Consumos por lote; ahorro de 3 %', p: 'P7' },
];
export const mltByRecipe = [
  { r: 'Y1', hoy: '100,2 h (4,2 d)', prop: '72,5 h (3,0 d)', va: '11,4 % → 15,1 %' },
  { r: 'Y2', hoy: '99,9 h (4,2 d)', prop: '73,9 h (3,1 d)', va: '11,2 % → 14,8 %' },
  { r: 'Y3', hoy: '147,9 h (6,2 d)', prop: '121,3 h (5,1 d)', va: '25,1 % → 30,3 %' },
];

/* ------------------------------------------------------------------ */
/* Proceso propuesto y recetas (sección 7)                             */
/* ------------------------------------------------------------------ */
/** Estaciones de la línea de yogures (Tabla 7.1 y Figura 7.1). */
export const stations = [
  { tag: 'U-211', name: 'Preparación', use: ['Y1', 'Y2', 'Y3'] },
  { tag: 'U-212', name: 'Tren térmico', use: ['Y1', 'Y2', 'Y3'] },
  { tag: 'U-221…224', name: 'Fermentación', use: ['Y1', 'Y2', 'Y3'] },
  { tag: 'U-228', name: 'Separador', use: ['Y2'] },
  { tag: 'U-225', name: 'Enfriador', use: ['Y1', 'Y2', 'Y3'] },
  { tag: 'U-227', name: 'Maduración', use: ['Y3'] },
  { tag: 'U-226', name: 'Pulmón', use: ['Y1', 'Y2'] },
  { tag: 'U-231', name: 'Fruta', use: ['Y1'] },
  { tag: 'U-232/233', name: 'Llenado', use: ['Y1', 'Y2', 'Y3'] },
  { tag: 'U-234', name: 'Inspección', use: ['Y1', 'Y2', 'Y3'] },
  { tag: 'U-242/241', name: 'Celda robot', use: ['Y1', 'Y2', 'Y3'] },
];

export const recipes = [
  { id: 'Y1', name: 'Fresa', tank: '8 h', lots: '2,6' },
  { id: 'Y2', name: 'Griego', tank: '10,5 h', lots: '3,3' },
  { id: 'Y3', name: 'Kéfir', tank: '23,5 h', lots: '1,3' },
] as const;

/** Tabla 7.5 — parámetros de la receta maestra. */
export const recipeParams: [string, string, string, string][] = [
  ['Precalentamiento', '60 °C ± 2', '50 °C ± 2', '50 °C ± 2'],
  ['Homogeneización', '65 °C · 200/50 bar', 'No (descremada)', '65 °C · 150/40 bar'],
  ['Pasteurización', '90 °C · 5 min', '92 °C · 6 min', '92 °C · 5 min'],
  ['Caudal del tren térmico', '10.000 L/h', '8.300 L/h', '10.000 L/h'],
  ['Inoculación e incubación', '43 °C ± 0,5', '43 °C ± 0,5', '24 °C ± 0,5'],
  ['pH de fin de fermentación', '4,60', '4,50', '4,50'],
  ['Tiempo esperado · alarma', '4,5 h · 6 h', '6 h · 7,5 h', '20 h · 24 h'],
  ['Fase propia', 'Fruta 12 % en línea', 'Separador a 10 % de proteína', 'Maduración 12 h a 9 °C'],
  ['Espera máxima en el pulmón', '4 h a 20 °C', '12 h a ≤ 10 °C', 'No aplica'],
  ['Llenado nominal → objetivo', '150 → 152 g', '500 → 505 g', '1.000 → 1.008 mL'],
  ['Vida útil (2–6 °C)', '35 días', '35 días', '21 días'],
];

/** Perfil de temperatura simplificado [hora, °C] desde la preparación hasta el llenado. */
export const profiles: Record<'Y1' | 'Y2' | 'Y3', [number, number][]> = {
  Y1: [[0, 8], [0.4, 60], [1.2, 60], [1.4, 90], [1.5, 90], [1.9, 43], [6.4, 43], [6.6, 20], [7.5, 20]],
  Y2: [[0, 8], [0.4, 50], [0.6, 50], [0.8, 92], [0.95, 92], [1.4, 43], [7.4, 43], [7.6, 41], [9.6, 41], [9.8, 10], [10.5, 10]],
  Y3: [[0, 8], [0.4, 50], [0.6, 50], [0.8, 92], [0.9, 92], [1.4, 24], [21.4, 24], [21.6, 9], [33.6, 9], [34, 5], [35, 5]],
};

/** Tabla 7.13 — matriz de cambios de producto. */
export const changeovers = [
  { t: 'Y2 → Y1', donde: 'Llenadora de vasos', que: 'Cambio de formato de 500 a 150 g y enjuague', tiempo: '≈ 35 min' },
  { t: 'Y1 → Y2', donde: 'Llenadora de vasos', que: 'CIP completo y cambio de formato (se evita programando Y2 primero)', tiempo: '≈ 60 min' },
  { t: 'Y1 ↔ Y2', donde: 'Fermentador', que: 'CIP estándar después de cada lote', tiempo: '≈ 60 min' },
  { t: 'Y3 → Y1 o Y2', donde: 'Fermentador', que: 'CIP, ácido peracético e hisopado ATP (U-224 dedicado al kéfir)', tiempo: '≈ 75 min' },
  { t: 'Cualquiera', donde: 'Tren térmico', que: 'Empuje con agua y cambio automático de consignas', tiempo: '≈ 10 min' },
  { t: 'Cualquiera', donde: 'Celda robotizada', que: 'Cierre de pallet y cambio automático de herramienta', tiempo: '≈ 2 min' },
];

/* ------------------------------------------------------------------ */
/* ISA-88 (sección 10)                                                 */
/* ------------------------------------------------------------------ */
export const procedureTree = [
  { pu: 'PU1 Preparar mezcla', unidad: 'U-211', ops: 'Cargar · precalentar e hidratar', fases: 'Transferir leche · Dosificar polvos y azúcar (Y1) · Calentar · Agitar' },
  { pu: 'PU2 Tratar térmicamente', unidad: 'U-212', ops: 'Homogeneizar y pasteurizar · enfriar a inoculación', fases: 'Arrancar tren · Homogeneizar (Y1, Y3) · Pasteurizar · Enfriar' },
  { pu: 'PU3 Fermentar', unidad: 'U-221 a U-224', ops: 'Inocular · incubar · romper el coágulo', fases: 'Dosificar cultivo · Mezclar · Mantener temperatura · Esperar pH · Agitar' },
  { pu: 'PU4 Concentrar (Y2)', unidad: 'U-228', ops: 'Separar', fases: 'Alimentar separador · Medir proteína · Desviar suero' },
  { pu: 'PU5 Enfriar y almacenar (a, b, c)', unidad: 'U-225 · U-226 · U-227 (Y3)', ops: 'Enfriar · madurar (Y3)', fases: 'Enfriar · Transferir · Madurar (Y3) · Mantener' },
  { pu: 'PU6 Envasar (a, b, c)', unidad: 'U-231 · U-232 o U-233 · U-234', ops: 'Dosificar fruta (Y1) · llenar y sellar · inspeccionar', fases: 'Dosificar fruta (Y1) · Seleccionar formato · Llenar · Sellar o tapar · Pesar · Detectar metales · Verificar código' },
  { pu: 'PU7 Paletizar (a, b)', unidad: 'U-242 · U-241', ops: 'Encajonar · paletizar', fases: 'Cambiar herramienta · Encajonar · Armar pallet · Etiquetar SSCC' },
  { pu: 'PU8 Limpiar', unidad: 'Cada unidad usada (servicio CIP-200)', ops: 'CIP estándar o reforzado', fases: 'Preenjuague · Soda · Enjuague · Ácido · Sanitizar (después de Y3) · Enjuague final · Verificar' },
];
export const pccNote =
  'El desvío por temperatura del PCC 1 no es una fase: es lógica del módulo de equipo (enclavamiento de TSL-212B con FDV-212) y actúa aunque la fase no lo pida, incluso si falla el PLC.';
export const physicalModel = [
  { k: 'Empresa', v: 'Lácteos Pomar (El Pomar S.A.)' },
  { k: 'Sitio', v: 'Planta Cajicá · 6 áreas' },
  { k: 'Área 200', v: 'Yogures: celdas 210 preparación, 220 fermentación y concentración, 230 llenado e inspección, 240 robótica' },
  { k: 'Unidades', v: '13 unidades, de U-211 a U-242, con sus módulos de equipo y de control' },
];
export const recipeLevels = [
  { k: 'General', v: 'De la empresa, independiente del equipo' },
  { k: 'De sitio', v: 'Adaptada a la materia prima de Cajicá' },
  { k: 'Maestra', v: 'Por línea y equipo, con los parámetros de la Tabla 7.5' },
  { k: 'De control', v: 'Una por lote, con su ID: Y1-261005-T1-03' },
];

/* ------------------------------------------------------------------ */
/* ISA-95 y red OT/IT (sección 11)                                     */
/* ------------------------------------------------------------------ */
export const isa95 = [
  { n: 4, name: 'ERP', sys: 'SAP ECC', role: 'Negocio y logística', does: 'El ERP actual de Pomar emite las órdenes y recibe consumos reales, costo por lote y stock liberado. La interfaz B2MML queda compatible con S/4HANA.', data: ['API REST o IDoc con B2MML', 'Power BI con las licencias de Pomar'] },
  { n: 3, name: 'MES', sys: 'Sepasoft sobre Ignition', role: 'Gestión de operaciones', does: 'Batch Procedure ISA-88, Track & Trace, OEE y SPC. Programa los lotes, descarga la receta de control y arma la genealogía. La DMZ industrial (nivel 3.5) separa este nivel de la red corporativa.', data: ['ID de lote Y1-261005-T1-03', 'DMZ: firewall, réplica y gateway'] },
  { n: 2, name: 'SCADA', sys: 'Ignition', role: 'Supervisión', does: 'HMI según ISA-101 e historian cada 5 s. Habla con el PLC con el driver Allen-Bradley de Ignition (CIP sobre EtherNet/IP) y publica por OPC UA hacia el MES y la DMZ.', data: ['Driver Allen-Bradley', 'OPC UA y SQL hacia el MES'] },
  { n: 1, name: 'PLC', sys: 'ControlLogix', role: 'Control', does: 'Fases ISA-88 parametrizadas, lazos PID y enclavamientos. Se prueba antes en Logix Emulate contra el gemelo digital. Las llenadoras OEM y los robots se integran por EtherNet/IP con PackML.', data: ['PID de rango dividido', 'Transición por pH en línea'] },
  { n: 0, name: 'Proceso', sys: 'Instrumentos', role: 'Sensores y actuadores', does: '53 instrumentos de campo, 24 válvulas mix-proof, 13 válvulas de control y 12 variadores, en E/S remotas con 4–20 mA HART e IO-Link.', data: ['TT-221 · AT-221 · WT-211', 'FDV-212 y TSL-212B en el PCC 1'] },
];
export const interfaces = [
  { i: 'ERP ↔ MES', baja: 'Orden de producción y lista de materiales', sube: 'Cantidades, consumos, merma, costo por lote, stock liberado', p: 'API REST o IDoc con B2MML (ISA-95 parte 5)' },
  { i: 'MES ↔ SCADA', baja: 'Receta de control con ID de lote', sube: 'Fases, parámetros reales, alarmas, paradas', p: 'OPC UA y SQL' },
  { i: 'SCADA ↔ PLC', baja: 'Receta, consignas, arranque, pausa, aborto', sube: 'Estados de equipos y fases, variables', p: 'Driver Allen-Bradley de Ignition (CIP sobre EtherNet/IP)' },
  { i: 'PLC ↔ OEM y robots', baja: 'Formato, receta, ID de lote, permisos de zona', sube: 'Estados, contadores, fallas, pallets', p: 'EtherNet/IP con PackML' },
  { i: 'PLC ↔ campo', baja: 'Válvulas, bombas, variadores', sube: 'Temperatura, pH, nivel, caudal, peso', p: '4–20 mA HART, IO-Link, E/S remotas' },
  { i: 'Gemelo ↔ PLC', baja: 'Salidas a actuadores virtuales', sube: 'Sensores virtuales', p: 'Simulador conectado a Logix Emulate' },
];
export const network = [
  { z: 'Red corporativa', v: 'SAP ECC y usuarios de oficina, detrás del firewall corporativo existente.' },
  { z: 'DMZ industrial (3.5)', v: 'Único paso entre OT e IT: firewall industrial nuevo, servidor de réplica, gateway Ignition y acceso remoto con doble factor.' },
  { z: 'Supervisión', v: 'Servidores Ignition/MES redundantes y clientes HMI, con usuarios por rol.' },
  { z: 'Área 200 y celda 240', v: 'Anillo de fibra, PLC de línea, PLC de seguridad y dispositivos de campo.' },
  { z: 'Conducto C3', v: 'Supervisión ↔ área 200 con VLAN y listas de acceso en el núcleo. La ingeniería de detalle evaluará un firewall industrial opcional en este conducto (ISA/IEC 62443).' },
];

/* ------------------------------------------------------------------ */
/* Instrumentación (sección 12)                                        */
/* ------------------------------------------------------------------ */
export const loops = [
  { f: 'TIC-212', mide: 'TT-212A', actua: 'TCV-212', que: 'Pasteurización a 90 o 92 °C' },
  { f: 'FIC-212', mide: 'FT-212', actua: 'SC-212 (P-212)', que: 'Caudal del tren: retención de 5 o 6 min' },
  { f: 'TIC-221…224', mide: 'TT-221…224', actua: 'TCV-22xA/B (rango dividido)', que: 'Incubación ± 0,5 °C' },
  { f: 'AI-221…224', mide: 'AT-221…224', actua: 'Sin elemento final', que: 'Fin de la fase Esperar pH' },
  { f: 'AIC-228', mide: 'AT-228 (NIR)', actua: 'Separador M-228', que: 'Proteína del griego 10,0 % ± 0,3' },
  { f: 'FFIC-231', mide: 'FT-231 y velocidad de U-232', actua: 'SC-231 (P-231)', que: 'Razón fruta : base 12 : 88' },
];

/* ------------------------------------------------------------------ */
/* Simulación (sección 6.9)                                            */
/* ------------------------------------------------------------------ */
export const simScenarios = [
  { k: 'Actual', vendible: 41186, oee: 0.518, nota: 'Calibra el modelo: antes de merma y rechazo da 43.300 kg/día frente a 43.700 del cálculo.' },
  { k: 'Propuesta con pausas escalonadas', vendible: 50874, oee: 0.587, nota: '97 % de la demanda y +24 % frente a hoy; el atraso no crece.' },
  { k: 'Propuesta con pausas fijas', vendible: 48960, oee: 0.647, nota: 'El atraso crece ≈ 1,8 lotes por semana: 21 lotes al final de 13 semanas.' },
];
export const simKpis: [string, string, string, string, string, string][] = [
  ['Producción vendible (kg/día)', '—', '41.200 ± 202', '—', '50.900 ± 39', '49.000 ± 210'],
  ['Producción antes de merma y rechazo', '43.700', '43.300', '52.400', '52.400', '50.500'],
  ['OEE de la llenadora de vasos', '55,4 %', '51,8 %', '78,0 %', '58,7 %', '64,7 %'],
  ['Ocupación de la llenadora', '100 %', '95 %', '89 %', '76 %', '84 %'],
  ['Ocupación de fermentadores (con esperas)', '76 %', '98 %', '89 %', '98 %', '98 %'],
  ['MLT de un lote de Y1 (h)', '100,2', '116,7', '72,5', '81,0', '82,0'],
  ['Lotes atrasados a 13 semanas', '—', '3', '—', '2', '21 (crece)'],
];
export const simModel = [
  { k: 'Herramienta', v: 'Simulador propio de eventos discretos en Python, paso de 1 min (sim.py). El modelo en Tecnomatix Plant Simulation está en curso con los mismos datos.' },
  { k: 'Réplicas', v: '10 réplicas de 13 semanas (1 de calentamiento); promedio ± desviación estándar.' },
  { k: 'Fallas', v: 'Distribución exponencial por equipo con su MTBF y MTTR.' },
  { k: 'Reglas', v: 'U-224 dedicado al kéfir; un fermentador solo se vacía si hay sitio en el pulmón o en la maduración.' },
];
export const fermenters = [
  { tag: 'U-221', r: 'Y1', st: 'run', phase: 'Incubar', pv: 'pH 4,82', t: '3 h 12 min' },
  { tag: 'U-222', r: 'Y1', st: 'run', phase: 'Inocular', pv: '43,1 °C', t: '0 h 04 min' },
  { tag: 'U-223', r: '—', st: 'stop', phase: 'CIP', pv: 'Soda 75 °C', t: '0 h 38 min' },
  { tag: 'U-224', r: 'Y3', st: 'warn', phase: 'Incubar', pv: '25,1 °C', t: '14 h 50 min' },
];

/* ------------------------------------------------------------------ */
/* Resultados por módulo (estado según el informe)                     */
/* ------------------------------------------------------------------ */
export const modules = [
  { n: 'M01', t: 'Gestión de la producción', owner: 'Juan Vargas · David Felipe Garcia', tools: ['VSM', 'Simulación', 'Tecnomatix'], fig: '+24 % vendible', d: 'VSM actual y futuro, línea base de KPIs, OEE, MLT y simulación de eventos discretos con 3 escenarios. El modelo en Tecnomatix Plant Simulation está en curso (19/10/2026).', status: 'Hecho', },
  { n: 'M02', t: 'Planeación PM4R', owner: 'Duvan Pacheco', tools: ['EDT', 'CPM', 'Curva S', 'VPN'], fig: '48 semanas', d: 'EDT de 38 paquetes, cronograma nivelado con ruta crítica, curva S, presupuesto de 66 partidas, flujos de Pomar y Kuajo, sensibilidad y matrices de riesgos, adquisiciones, comunicaciones y RACI.', status: 'Hecho' },
  { n: 'M03', t: 'Celda robotizada', owner: 'Jose Luis Pulido', tools: ['ISO 10218', 'PL d', 'RobotStudio'], fig: '1.200 cajas/h', d: 'Configuración por receta, herramientas, patrones P1–P3 y señales con el PLC definidos. La celda en RobotStudio es de la entrega final (07/12/2026).', status: 'En curso' },
  { n: 'M04', t: 'Digital Factory', owner: 'Ian Rodriguez', tools: ['Gemelo digital', 'Logix Emulate'], fig: '3 recetas', d: 'Arquitectura del comisionamiento virtual definida (gemelo ↔ Logix Emulate ↔ Ignition). El gemelo es de la entrega final.', status: 'Pendiente' },
  { n: 'M05', t: 'PLC y SCADA', owner: 'Jose Luis Pulido · Ian Rodriguez', tools: ['ISA-5.1', 'ISA-101', 'Ignition'], fig: '86 tags', d: 'P&ID preliminar, lista única de 86 tags, lazos de control y modelo procedimental ISA-88 hechos. La programación del PLC y las pantallas son de la entrega final.', status: 'En curso' },
];

/* ------------------------------------------------------------------ */
/* Economía (secciones 13 y 14). `npm run check` compara con el Excel. */
/* ------------------------------------------------------------------ */
export const economics = {
  precio: 8_526e6, // Fase 1 sin IVA
  precioUSD: 2.60e6,
  inversion: 9_605e6, // Pomar, año 0
  opex: 588e6, // año 1
  beneficios: 8_481e6, // anuales en régimen
  vpn: 15_014e6,
  tir: 0.490,
  recSimple: 2.23,
  recDescontada: 2.71,
  bc: 2.63,
  equilibrio: 0.39,
  utilidadKuajo: 935e6,
  margenKuajo: 0.110,
  credito: 1_316e6, // mes 8
  cobertura: 1.23,
  suministros: 5_771e6,
  ingenieria: 1_524e6,
  horas: 10_160,
  semanas: 48,
  tio: 0.137,
};
export const economicsRows = [
  { k: 'Precio del contrato (Fase 1, sin IVA)', v: '$8.526 M', n: '≈ US$2,60 M · validez de 90 días · cláusula de TRM sobre los ítems en US$' },
  { k: 'Inversión de Pomar en el año 0', v: '$9.605 M', n: 'Precio + parada de 12 días + costo interno' },
  { k: 'OPEX del año 1', v: '$588 M', n: 'Soporte, mantenimiento, repuestos, energía y administrador SCADA/MES' },
  { k: 'VPN a la TIO de 13,7 %', v: '$15.014 M', n: 'Horizonte de 7 años sin valor residual' },
  { k: 'TIR', v: '49,0 %', n: '≈ 3,6 veces la TIO' },
  { k: 'Recuperación', v: '2,23 años', n: '2,71 años descontada' },
  { k: 'Relación beneficio/costo', v: '2,63', n: 'VP de los años 1 a 7 / inversión neta de impuestos' },
  { k: 'Punto de equilibrio', v: '39 %', n: 'de los beneficios estimados mantiene el VPN ≥ 0' },
  { k: 'Utilidad neta de Kuajo', v: '$935 M', n: '11,0 % del contrato' },
  { k: 'Crédito rotativo máximo de Kuajo', v: '$1.316 M', n: 'Mes 8, por el cobro a 30 días; cupo de $1.500 M' },
  { k: 'Cobertura de la contingencia', v: '1,23', n: 'Contingencia de $444 M sobre $362 M de riesgo retenido' },
];

/* ------------------------------------------------------------------ */
/* Cronograma: fases e hitos (Tabla 13.4 y hoja Cronograma)            */
/* ------------------------------------------------------------------ */
export const schedule = {
  semanas: 48, inicio: '11/01/2027', fin: '12/12/2027', parada: '30/08/2027 – 12/09/2027',
  ruta: 'Arranque → levantamiento → VSM y arquitectura → aprobación conceptual → diseño de la celda → robots (20 semanas) → FAT de la celda → aprobación FAT → montaje en la parada → SAT → lotes de prueba e integración con SAP → estabilización → documentación → cierre.',
};
export const phases: Record<string, string> = {
  '1': 'Gestión del proyecto', '2': 'Ingeniería conceptual', '3': 'Ingeniería básica y de detalle', '4': 'Adquisiciones',
  '5': 'Comisionamiento virtual', '6': 'Montaje e instalación', '7': 'Pruebas y puesta en marcha', '8': 'Capacitación y cierre',
};
export const milestones = [
  { h: 'Anticipo a la firma', sem: 0, fecha: '11/01/2027', pago: '30 % · $2.558 M' },
  { h: 'Aprobación de la ingeniería conceptual', sem: 7, fecha: '28/02/2027', pago: '15 % · $1.279 M' },
  { h: 'Ingeniería de detalle y órdenes de compra', sem: 11, fecha: '28/03/2027', pago: '15 % · $1.279 M' },
  { h: 'Llegada de robots y equipos', sem: 31, fecha: '15/08/2027', pago: '20 % · $1.705 M' },
  { h: 'Aprobación de las pruebas FAT', sem: 33, fecha: '29/08/2027', pago: '10 % · $853 M' },
  { h: 'Acta de entrega y cierre', sem: 48, fecha: '12/12/2027', pago: '10 % · $853 M' },
];
export const teamHours = { R1: 1749, R2: 1486, R3: 1799, R4: 1691, R5: 1772, R6: 1663, pico: 254, maxPersona: 46.5 };
export const budget = [
  { k: 'Suministros (costo)', v: 5_771e6, n: '66 partidas; 73 % son estimaciones de integrador a confirmar con 3 cotizaciones' },
  { k: 'Margen sobre suministros (10 %)', v: 577e6, n: 'Precio de suministros: $6.349 M' },
  { k: 'Ingeniería de Kuajo', v: 1_524e6, n: '10.160 h × $150.000/h' },
  { k: 'Contingencia (7 %)', v: 551e6, n: 'Sobre suministros e ingeniería' },
  { k: 'Póliza de cumplimiento y calidad', v: 102e6, n: '1,2 % del contrato' },
];

/* ------------------------------------------------------------------ */
/* Oferta comercial KA-OF-2026-001 (sección 14.2)                      */
/* ------------------------------------------------------------------ */
export const offer = {
  code: 'KA-OF-2026-001',
  objeto: 'Diseño, suministro, comisionamiento virtual, montaje y puesta en marcha de la solución TDI de la línea de yogures de Cajicá y de la plataforma de planta (SCADA, MES e integración con SAP) sobre la que se conectarán quesos y UHT.',
  incluye: [
    'Ingeniería conceptual, básica y de detalle: diagnóstico, VSM, arquitectura ISA-95/88, P&ID, FDS y planos eléctricos.',
    '52 instrumentos de campo nuevos (con NIR, registrador del PCC 1, 8 lectores de código y RFID de formato), 24 válvulas mix-proof, 13 válvulas de control, válvula de desvío, 12 variadores e inspección en 2 llenadoras.',
    'PLC ControlLogix con fases ISA-88 para Y1, Y2 y Y3, y PLC de seguridad para la celda.',
    'Celda robotizada: 2 robots delta, 1 paletizador con 2 estaciones, envolvedora y etiquetado GS1-128.',
    'SCADA Ignition con HMI ISA-101 e historian; MES Sepasoft e interfaz con SAP.',
    'Infraestructura OT/IT: servidores redundantes, red industrial y DMZ con firewall (ISA/IEC 62443).',
    'Gemelo digital y FAT virtual con Logix Emulate antes de la parada.',
    'Montaje en una parada máxima de 2 semanas, SAT, lotes de prueba y 6 semanas de estabilización; capacitación y manuales.',
  ],
  excluye: [
    'IVA del 19 %, descontable para Pomar en bienes de capital.',
    'Licencias de SAP y Power BI (Pomar usa sus licencias corporativas) y desarrollos dentro de SAP distintos de la interfaz.',
    'Equipos de proceso: Pomar ya los tiene y la propuesta no los reemplaza; obras civiles mayores y ampliación de servicios.',
    'Automatización de las líneas UHT (Fase 2) y de quesos (Fase 3), cotizadas aparte.',
  ],
  garantia: 'Un año desde el acta de entrega (hasta diciembre de 2028), con respaldo de los fabricantes.',
  soporte: 'Contrato opcional de $15 M al mes (≈ 100 h) con respuesta de 4 horas en fallas críticas.',
  validez: '90 días calendario; cubre la firma prevista del 11/01/2027.',
  trm: 'Si la TRM varía más de 5 % frente a la base ($3.273,49), los suministros cotizados en US$ se ajustan en la misma proporción.',
};
export const futurePhases = [
  { k: 'Fase 1: plataforma de planta', precio: '$1.526 M', sem: 'Incluida', n: 'SCADA, MES, red, servidores e interfaz con SAP: se paga una vez' },
  { k: 'Fase 1: automatización de yogures', precio: '$7.000 M', sem: '48', n: 'Calculada en detalle' },
  { k: 'Fase 2: línea UHT', precio: '$3.150 M', sem: '26', n: 'Factor 0,45 sobre la automatización de la línea 1' },
  { k: 'Fase 3: línea de quesos', precio: '$3.850 M', sem: '32', n: 'Factor 0,55: robot sanitario de moldes' },
  { k: 'Planta completa', precio: '$15.526 M', sem: '106', n: '≈ 2 años con el mismo equipo de 6 personas' },
];

/* ------------------------------------------------------------------ */
/* Líneas 2 y 3 (sección 8 y anexo C)                                  */
/* ------------------------------------------------------------------ */
export const linesFinance = [
  { k: 'Producción hoy → con la propuesta (kg/día)', l1: '43.700 → 52.400', l2: '7.470 → 7.470', l3: '82.207 → 91.250' },
  { k: 'Equipo crítico', l1: 'Llenadora de vasos U-232', l2: 'Empacadora Q-332', l3: 'Llenadoras asépticas L-431/L-432' },
  { k: 'OEE del equipo crítico', l1: '55,4 → 78,0 %', l2: '58 → 75 %', l3: '68 → 80 %' },
  { k: 'Restricción con la propuesta', l1: 'Fermentadores (89 %)', l2: 'Tinas y prensado', l3: 'Tren UHT (≈ 9,3 h/día)' },
  { k: 'Beneficios anuales', l1: '$8.481 M', l2: '$1.489 M', l3: '$3.332 M' },
  { k: 'Precio de Kuajo', l1: '$8.526 M', l2: '$3.850 M', l3: '$3.150 M' },
  { k: 'VPN a la TIO', l1: '$15.014 M', l2: '$172 M', l3: '$6.408 M' },
  { k: 'TIR', l1: '49,0 %', l2: '15,0 %', l3: '57,3 %' },
  { k: 'Lectura', l1: 'Conviene (calculada en detalle)', l2: 'Conviene por poco', l3: 'Conviene' },
];
export const lines23 = { l2: { precio: 3_850e6, vpn: 172e6, tir: 0.150 }, l3: { precio: 3_150e6, vpn: 6_408e6, tir: 0.573 }, vpnCombinado: 20_781e6 };
export const plant = [
  { k: 'Precio total de Kuajo (3 fases)', v: '$15.526 M' },
  { k: 'Inversión total de Pomar', v: '$17.155 M' },
  { k: 'Beneficios anuales en régimen', v: '$13.303 M' },
  { k: 'VPN combinado (fases escalonadas)', v: '$20.781 M' },
  { k: 'Producción de la planta', v: '133.377 → 151.120 kg/día (+13 %)' },
  { k: 'Leche requerida', v: '229.086 → 254.515 L/día (holgura de 2 %)' },
];

/* ------------------------------------------------------------------ */
/* Conclusiones (sección 16)                                           */
/* ------------------------------------------------------------------ */
export const conclusions = [
  'La línea 1 puede producir 20 % más sin comprar equipos de proceso: el OEE de la llenadora pasa de 55 % a 78 % y la línea va de 43.700 a 52.400 kg/día. La restricción pasa a la fermentación.',
  'La simulación confirma el aumento (+24 % vendible, a menos de 1 % del cálculo), pero los fermentadores trabajan casi saturados: el plan solo se cumple con pausas escalonadas y la secuencia del MES.',
  'Un solo procedimiento ISA-88 parametrizado produce las 3 recetas, el MES integrado con SAP baja la trazabilidad de 6 h a menos de 30 min y la plataforma queda lista para las líneas 2 y 3.',
  'Para Pomar, VPN de $15.014 M, TIR de 49,0 % y recuperación en 2,2 años; el VPN sigue positivo si los beneficios caen al 39 % o si la TIO sube a 20 %.',
  'Para Kuajo, utilidad neta de $935 M (11,0 %) con un crédito rotativo de hasta $1.316 M; la contingencia cubre 1,23 veces los riesgos retenidos.',
];
export const nextSteps = 'Terminar el modelo en Tecnomatix, validar los datos en la visita industrial, reemplazar las estimaciones por cotizaciones, evaluar el segundo pulmón y preparar la Fase 2 (UHT), la de mejor retorno de las dos líneas restantes.';

/* ------------------------------------------------------------------ */
/* Equipo y trabajo en equipo (secciones 2 y 15)                       */
/* ------------------------------------------------------------------ */
/**
 * Foto: guarda `src/assets/equipo/<slug>.jpg` (o .png/.webp); se convierte sola a AVIF/WebP.
 * LinkedIn es opcional: deja '' si el integrante no quiere publicarlo.
 */
export const team = [
  { r: 'R1', slug: 'duvan', name: 'Duvan Felipe Pacheco Rodriguez', role: 'Gerente de proyecto', scope: 'PM4R, EDT, cronograma, curva S, riesgos y bitácora', email: 'dupachecor@unal.edu.co', linkedin: '' },
  { r: 'R2', slug: 'paula', name: 'Paula Valentina Alvarez Chaparro', role: 'Arquitecta TDI (OT/IT)', scope: 'ISA-95, ISA-88, MES y ERP', email: 'palvarezch@unal.edu.co', linkedin: '' },
  { r: 'R3', slug: 'david', name: 'David Felipe Garcia Lopez', role: 'Ingeniero de procesos', scope: 'Caracterización, 9 recetas, balance de masa y diagramas', email: 'dagarcialo@unal.edu.co', linkedin: '' },
  { r: 'R4', slug: 'juan', name: 'Juan Angel Vargas Rodriguez', role: 'Ingeniero de producción', scope: 'VSM, KPIs base, simulación y Tecnomatix', email: 'juvargasro@unal.edu.co', linkedin: '' },
  { r: 'R5', slug: 'jose-luis', name: 'Jose Luis Pulido Fonseca', role: 'Ingeniero de control y robótica', scope: 'P&ID, instrumentación, PLC y RobotStudio', email: 'jpulidof@unal.edu.co', linkedin: '' },
  { r: 'R6', slug: 'ian', name: 'Ian Saonni Rodriguez Pulido', role: 'Ingeniero de supervisión y comunicaciones', scope: 'SCADA Ignition, gemelo digital, GitHub, web y video', email: 'irodriguezpu@unal.edu.co', linkedin: '' },
];
export const teamRules = [
  { k: 'Respaldo', v: 'Cada integrante responde por un módulo y tiene una pareja que revisa su trabajo: R1–R2, R3–R4 y R5–R6.' },
  { k: 'Reuniones', v: 'Dos por semana de 30 min, con acta: fecha, asistentes, decisiones y compromisos. Consenso; si no lo hay, desempata R1.' },
  { k: 'Evidencias', v: 'Tareas en GitHub Projects y commits propios por carpeta de módulo (01_proceso, 02_isa88, 03_isa95, 04_produccion, 05_pm4r y web).' },
];
export const logbook = [
  { f: '28/09/2026', r: 'Reunión 1: arranque', d: 'Empresa y eslogan; roles R1 a R6; las 9 referencias; línea a detalle: yogur; cliente: Lácteos Pomar; reglas de trabajo.' },
  { f: '10/10/2026', r: 'Revisión interna de la entrega intermedia', d: 'Informe, Excel y figuras frente al PDF del curso: 61 hallazgos (2 críticos, 7 altos) y plan de corrección con responsable.' },
  { f: '11/10/2026', r: 'Corrección de los hallazgos', d: 'Presupuesto con 66 partidas, cobro a 30 días y crédito, cronograma nivelado, simulación, figuras corregidas y versión B del informe.' },
];
/** Tabla 15.2 — el informe los presenta como propuesta por confirmar. */
export const commitments = [
  { c: 'Repositorio por módulos y archivo con los 3 enlaces', r: 'R6 (R1 sube el archivo)', f: '12/10/2026' },
  { c: 'Página web con las cifras del informe y el proceso de aprendizaje', r: 'R6, con textos de cada integrante', f: '12/10/2026' },
  { c: 'Video de 30 a 45 min con los 6 integrantes', r: 'R6 edita; todos graban', f: '12/10/2026' },
  { c: 'Modelo en Tecnomatix con los 3 escenarios', r: 'R4 (apoyo de R3)', f: '19/10/2026' },
  { c: 'Segundo pulmón y programación de fermentadores en el modelo', r: 'R3 y R4', f: '26/10/2026' },
  { c: 'Cotizaciones de válvulas, inspección, celda y robots', r: 'R5 y R1', f: '26/10/2026' },
  { c: 'Celda en RobotStudio, gemelo digital, PLC y SCADA', r: 'R5 y R6, con R2', f: '07/12/2026' },
];

/* ------------------------------------------------------------------ */
/* Descargas y fuentes                                                 */
/* ------------------------------------------------------------------ */
export const downloads = [
  { k: 'Informe de avance (PDF)', f: 'descargas/Informe_Kuajo_APM_2026-2_Linea1_Yogures.pdf', n: '112 páginas · versión B' },
  { k: 'Anexo A · Planeación PM4R (Excel)', f: 'descargas/Planeacion_PM4R_Kuajo_Pomar.xlsx', n: '23 hojas con fórmulas vivas' },
  { k: 'Anexo B · Figuras en A3 (PDF)', f: 'descargas/Anexo_B_Figuras_A3.pdf', n: '12 figuras técnicas vectoriales' },
  { k: 'Anexo C · Líneas 2 y 3 (Word)', f: 'descargas/Anexo_C_Lineas_2_y_3.docx', n: 'Quesos y UHT: recetas, parámetros y KPIs' },
  { k: 'Anexo D · Simulador (Python)', f: 'descargas/sim.py', n: 'Eventos discretos, sin librerías externas' },
];

export const sources = [
  'Universidad Nacional de Colombia. Programa de la asignatura APM 2026-2 y «3. APM Proyecto Integrador 2026-2».',
  'Portafolio (2023). Lácteos Pomar estrena nueva planta de producción.',
  'La República (2024). Quién es quién en venta y producción en la industria láctea.',
  'Vanguardia (2019). Freskaleche, la de mayor penetración.',
  'Alpina. Acopio promedio de 1.060.000 L diarios en 2019.',
  'Rother, M. y Shook, J. (2003). Learning to See. Lean Enterprise Institute.',
  'ISA. ANSI/ISA-88.01, ANSI/ISA-95, ISA-5.1, ISA-101 e ISA/IEC 62443.',
  'OIML. Recomendación OIML R 87: cantidad de producto en preempacados.',
  'Noticias Caracol. TRM $3.273,49 (3–5 oct. 2026).',
  'Holland & Knight. Salario mínimo y auxilio de transporte 2026 (Decretos 1469 y 1470 de 2025).',
  'CalcuColombia. Porcentajes de prestaciones y aportes 2026.',
  'Indeed Colombia (17 sept. 2026). Salario de ingeniero de automatización.',
  'Indeed Colombia (11 sept. 2026). Salario de gerente de proyectos.',
  'Indeed Colombia (26 ago. 2026). Salario de ingeniero mecatrónico.',
  'Inductive Automation. Full Ignition Price List.',
  'Sepasoft. MES Pricing.',
  'Instrumart. Caudalímetros Coriolis Endress+Hauser.',
  'Instrumart. Caudalímetros electromagnéticos Endress+Hauser.',
  'Instrumart. Termómetro iTHERM TM411.',
  'Instrumart. Radar Micropilot FMR43.',
  'Instrumart. Sensores de pH Endress+Hauser.',
  'Instrumart. Transmisor Liquiline CM42.',
  'EVS Robot. Industrial Robot Price 2026.',
  'Standard Bots. Robotic palletizing cost 2026.',
  'Anexee. SCADA pricing 2026.',
  'Damodaran (ene. 2026). Costo de capital por industria (Food Processing).',
  'Damodaran (ene. 2026). Prima de riesgo país Colombia y tasa de renta.',
  'Damodaran. Historical Implied ERP.',
  'Banco de la República (sept. 2026). Tasa de política e inflación.',
  'Agronegocios (mayo 2026). Precio de la leche al productor en Cundinamarca.',
  'Alpina. Precio de yogur de 1 kg (referencia de techo).',
  'Euro Supermercados. Precio de yogur griego de 1 kg.',
  'Las2orillas. Ingresos de Lácteos Pomar 2022.',
  'BID. Guía de la Metodología PM4R.',
  'DIAN. Decreto 324 de 2024 y arancel 0 % para bienes de capital (Decreto 272 de 2018).',
  'Banco Mundial vía IndexMundi. Tiempo de importación en Colombia.',
  'iContainers (oct. 2026). Tránsito marítimo y fletes hacia Cartagena.',
  'Mundo Marítimo (2019). Flete terrestre Cartagena–Bogotá por contenedor.',
  'trade.gov. Colombia Country Commercial Guide: regulaciones aduaneras.',
  'BBVA Seguros Colombia (2026). Póliza todo riesgo montaje.',
  'Agronegocios (oct. 2026). Precio mayorista de queso campesino en Bogotá (SIPSA-DANE).',
  'Agronegocios (oct. 2026). Precio mayorista de queso doble crema en Bogotá (SIPSA-DANE).',
  'El Tiempo (junio de 2022). Precios de leche en bolsa y en caja de 1 L.',
  'Farmatodo. Alpin de Alpina, bebida achocolatada de 200 mL.',
];
