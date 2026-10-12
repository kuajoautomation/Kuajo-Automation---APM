// Sincroniza src/data/excel.json con el libro Planeacion_PM4R_Kuajo_Pomar.xlsx (valores calculados).
// Uso: npm run sync   (o: node scripts/sync-excel.mjs ruta/al/libro.xlsx)
// El JSON se versiona: la compilación no necesita leer el Excel.
import XLSX from 'xlsx';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
// Fuente: el Excel de la carpeta 05_pm4r/ del repositorio.
const xlsxPath = process.argv[2] ?? path.resolve(here, '../../05_pm4r/Planeacion_PM4R_Kuajo_Pomar.xlsx');
const out = path.resolve(here, '../src/data/excel.json');

const wb = XLSX.readFile(xlsxPath);
const rows = (sheet) => XLSX.utils.sheet_to_json(wb.Sheets[sheet], { header: 1, raw: true, defval: null, blankrows: true });
const num = (v) => (typeof v === 'number' ? v : v == null || v === '' ? null : Number(v));
const str = (v) => (v == null ? '' : String(v).replace(/\s+/g, ' ').trim());
const date = (serial) => (!Number.isFinite(serial) ? "" : new Date(Date.UTC(1899, 11, 30) + serial * 86400000).toISOString().slice(0, 10));
/** Busca la fila cuya primera celda empieza por `label` y devuelve la fila. */
const find = (r, label, col = 0) => {
  const row = r.find((x) => str(x[col]).startsWith(label));
  if (!row) throw new Error(`No encontré «${label}»`);
  return row;
};
const M = (v) => Math.round(v / 1e6); // millones de COP

// ---------- Portada (indicadores clave) ----------
const portada = rows('Portada');
const kv = (label) => num(find(portada, label)[1]);
const resumen = {
  precio: kv('Precio de la oferta'),
  precioUSD: kv('Precio en US$'),
  semanas: kv('Duración (semanas)'),
  vpn: kv('VPN para Pomar'),
  tir: kv('TIR para Pomar'),
  tio: kv('TIO de Pomar'),
  recSimple: kv('Recuperación simple'),
  recDescontada: kv('Recuperación descontada'),
  equilibrio: kv('Factor de beneficios de equilibrio'),
  utilidadKuajo: kv('Utilidad neta de Kuajo'),
  margenKuajo: kv('Margen neto de Kuajo'),
  vpnKuajo: kv('VPN para Kuajo'),
  creditoMax: kv('Crédito rotativo máximo'),
  cobertura: kv('Cobertura de la contingencia'),
};

// ---------- Flujo de Pomar ----------
const fp = rows('Flujo_Pomar');
const serie = (label) => find(fp, label).slice(1, 9).map(num);
const flujoPomar = {
  anios: [0, 1, 2, 3, 4, 5, 6, 7],
  beneficios: serie('Total beneficios'),
  opex: serie('OPEX'),
  ebitda: serie('EBITDA'),
  fcl: serie('Flujo de caja libre'),
  acumulado: serie('Flujo acumulado'),
  descontadoAcum: serie('Flujo descontado acumulado'),
  bc: num(find(fp, 'Relación beneficio/costo (VP')[1]),
  bcTotal: num(find(fp, 'Relación beneficio/costo sobre')[1]),
  inversionTotal: num(find(fp, 'Inversión total año 0')[1]),
};

// ---------- Precio ----------
const pk = rows('Precio_Kuajo');
const precio = {
  suministrosCosto: num(find(pk, 'Subtotal suministros')[1]),
  suministrosPrecio: num(find(pk, 'Subtotal suministros')[2]),
  ingenieriaCosto: num(find(pk, 'Servicios de ingeniería')[1]),
  ingenieriaPrecio: num(find(pk, 'Servicios de ingeniería')[2]),
  gastosGenerales: num(find(pk, 'Gastos generales')[1]),
  contingenciaCosto: num(find(pk, 'Contingencia')[1]),
  contingenciaPrecio: num(find(pk, 'Contingencia')[2]),
  poliza: num(find(pk, 'Póliza de cumplimiento')[2]),
  precio: num(find(pk, 'PRECIO DE LA OFERTA')[2]),
  costo: num(find(pk, 'PRECIO DE LA OFERTA')[1]),
  iva: num(find(pk, 'IVA 19 %')[2]),
  conIva: num(find(pk, 'Precio total con IVA')[2]),
};

// ---------- Beneficios y OPEX ----------
const bo = rows('Beneficios_OPEX');
const opexAnual = num(find(bo, 'Total OPEX anual')[1]);
const beneficiosAnuales = num(find(bo, 'Total beneficios anuales')[1]);

// ---------- Kuajo: PyG y flujo mensual ----------
const kj = rows('Kuajo_PyG_Flujo');
const ks = (label) => find(kj, label).slice(1, 15).map(num);
const kuajo = {
  meses: [...Array(14).keys()],
  cobros: ks('Cobros de hitos'),
  pagos: ks('Pagos a proveedores'),
  neto: ks('Flujo neto'),
  saldo: ks('Saldo acumulado'),
  pyg: ['Ingresos', 'Costo de suministros', 'Utilidad bruta', 'Nómina del equipo', 'Gastos generales', 'Póliza', 'Contingencia consumida', 'ICA y GMF', 'Gastos financieros', 'Utilidad antes de impuestos', 'Impuesto de renta', 'Utilidad neta']
    // Solo las filas del estado de resultados: el flujo mensual repite varias etiquetas más arriba
    .map((l) => { const r = find(kj.slice(kj.findIndex((x) => str(x[0]) === 'Estado de resultados del proyecto')), l); return { concepto: str(r[0]), valor: num(r[1]) }; }),
};

// ---------- Sensibilidad ----------
const se = rows('Sensibilidad');
const sensibilidad = se.slice(4, 13).map((r) => ({ escenario: str(r[0]), fb: num(r[1]), fi: num(r[2]), fo: num(r[3]), vpn: num(r[12]), tir: num(r[13]), conclusion: str(r[14]) }));
const sensTio = [16, 18, 20].map((t) => ({ tio: t / 100, vpn: num(find(se, `VPN con TIO de ${t}`)[12]) }));

// ---------- Curva S ----------
const cs = rows('Curva_S');
const curvaS = {
  mensual: find(cs, 'Valor planificado del mes', 1).slice(2, 14).map(num),
  acumulado: find(cs, 'Valor planificado acumulado', 1).slice(2, 14).map(num),
  pct: find(cs, '% acumulado', 1).slice(2, 14).map(num),
};

// ---------- Cronograma (Gantt nivelado) e histograma ----------
const cr = rows('Cronograma');
const head = cr[4];
const w1 = head.indexOf(1);
const inicio = date(num(cr[2][2]));
const actividades = cr.slice(5).filter((r) => /^\d\.\d$/.test(str(r[0]))).map((r) => {
  const marks = [];
  for (let w = 0; w < 48; w++) { const v = num(r[w1 + w]); if (v) marks.push({ w: w + 1, v }); }
  const crit = str(r[10]) === 'Sí';
  return {
    cod: str(r[0]), act: str(r[1]), resp: str(r[2]), dur: num(r[3]), pred: str(r[4]),
    holgura: num(r[9]), critica: crit, hito: num(r[3]) === 0, horas: num(r[11]), valor: num(r[13]),
    ini: marks.length ? marks[0].w : null, fin: marks.length ? marks[marks.length - 1].w : null,
    desde: date(num(r[14])), hasta: date(num(r[15])),
  };
});
const hRow = cr.findIndex((r) => str(r[0]) === 'Integrante');
const hw1 = cr[hRow].indexOf(1);
const histograma = cr.slice(hRow + 1, hRow + 9).filter((r) => str(r[0])).map((r) => ({
  quien: str(r[0]), total: num(r[1]), max: num(r[2]), pct: num(r[3]),
  semanas: Array.from({ length: 48 }, (_, i) => Math.round((num(r[hw1 + i]) ?? 0) * 10) / 10),
}));
const horasExtra = num(find(cr, 'Horas por encima')[1]);

// ---------- EDT ----------
const edt = rows('EDT').slice(3).filter((r) => str(r[0]) !== '' && num(r[1])).map((r) => ({
  cod: str(r[0]), nivel: num(r[1]), elemento: str(r[2]), criterio: str(r[3]), resp: str(r[4]), horas: num(r[5]), valor: num(r[6]), pct: num(r[7]),
}));

// ---------- Riesgos ----------
const ri = rows('Riesgos');
const riesgos = ri.slice(3).filter((r) => /^R\d+$/.test(str(r[0]))).map((r) => ({
  id: str(r[0]), riesgo: str(r[1]), afecta: str(r[4]), p: num(r[5]), i: num(r[6]), nivel: num(r[7]), zona: str(r[8]),
  esperado: num(r[11]), estrategia: str(r[12]), respuesta: str(r[13]), resp: str(r[14]),
}));
const riesgoRetenido = num(find(ri, 'Valor esperado retenido', 1)[11]);
const contingencia = num(find(ri, 'Contingencia incluida', 1)[11]);

// ---------- Adquisiciones, comunicaciones y RACI ----------
const ad = rows('Adquisiciones');
const adquisiciones = ad.slice(3, 17).filter((r) => str(r[0]) && typeof r[1] === 'number').map((r) => ({
  grupo: str(r[0]), valor: num(r[1]), contrato: str(r[2]), seleccion: str(r[3]), proveedores: str(r[4]), plazo: num(r[6]),
  pedido: date(num(r[8])), requerido: date(num(r[10])), resp: str(r[11]),
}));
const comunicaciones = rows('Comunicaciones').slice(2).filter((r) => str(r[0]) && str(r[0]) !== 'Interesado').map((r) => ({
  interesado: str(r[0]), info: str(r[2]), frecuencia: str(r[3]), medio: str(r[4]), formato: str(r[5]), emite: str(r[6]), respuesta: str(r[7]),
}));
const rc = rows('RACI');
const raci = {
  roles: ['Pat', 'GP', 'TI', 'Cal', 'Mto', 'R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'Prov'],
  filas: rc.slice(3).filter((r) => str(r[1]).length === 1 || str(r[1]) === '—').map((r) => ({ entregable: str(r[0]), v: r.slice(1, 13).map(str) })),
};

// ---------- Instrumentos ----------
const ins = rows('Instrumentos');
const instrumentos = ins.slice(3).filter((r) => str(r[0]) && str(r[0]) !== 'Tag' && str(r[1]) && !str(r[0]).startsWith('Instrumentos') && !str(r[0]).startsWith('Funciones')).map((r) => ({
  tag: str(r[0]), tipo: str(r[1]), desc: str(r[2]), unidad: str(r[3]), variable: str(r[4]), senal: str(r[5]), estado: str(r[6]),
}));
const sensoresTotal = num(find(ins, 'Instrumentos de campo')[2]);
const funcionesTotal = num(find(ins, 'Funciones de control')[2]);

// ---------- Simulación ----------
const si = rows('Simulacion');
const sr = (label) => find(si, label).slice(1, 5).map(num);
const simulacion = {
  escenarios: ['Actual', 'Actual con demanda objetivo', 'Propuesta con pausas escalonadas', 'Propuesta con pausas fijas'],
  vendible: sr('Producción vendible total'),
  desv: sr('± desviación'),
  oee: sr('OEE de la llenadora de vasos'),
  ocupLlenadora: sr('Ocupación de la llenadora de vasos'),
  ocupFermentadores: sr('Ocupación de los fermentadores'),
  mlt: sr('Tiempo de paso (MLT)'),
  atrasados: sr('Lotes atrasados'),
  cumplimiento: sr('Cumplimiento de la demanda'),
  aumento: sr('Aumento de producción'),
};

// ---------- Líneas 2 y 3 ----------
const l23 = rows('Lineas_2_3');
const lr = (label) => find(l23, label).slice(1, 4).map((v) => (typeof v === 'number' ? v : str(v)));
const lineas = {
  produccionHoy: lr('Producción hoy'), produccionProp: lr('Producción con la propuesta (kg/día)'),
  oeeHoy: lr('OEE del equipo crítico hoy'), oeeMeta: lr('OEE meta'),
  beneficios: lr('Total beneficios anuales'), precio: lr('Precio de Kuajo'), inversion: lr('Inversión total de Pomar'),
  opex: lr('OPEX anual'), vpn: lr('VPN a la TIO'), tir: lr('TIR'), recuperacion: lr('Recuperación simple'),
  planta: {
    precio: num(find(l23, 'Precio total de Kuajo')[1]), inversion: num(find(l23, 'Inversión total de Pomar')[1]),
    beneficios: num(find(l23, 'Beneficios anuales en régimen')[1]), vpn: num(find(l23, 'VPN combinado')[1]),
    semanas: num(find(l23, 'Duración del programa completo')[1]), semF2: num(find(l23, 'Duración de la Fase 2')[1]), semF3: num(find(l23, 'Duración de la Fase 3')[1]),
    prodHoy: num(find(l23, 'Producción total de la planta hoy')[1]), prodProp: num(find(l23, 'Producción total con el proyecto completo')[1]),
    utilidadNeta: num(find(l23, 'Utilidad neta de Kuajo')[1]),
  },
};

// ---------- Oferta: pagos ----------
const of = rows('Oferta');
const iPagos = of.findIndex((r) => str(r[0]) === 'Hito');
const pagos = of.slice(iPagos + 1, iPagos + 7).map((r) => ({ hito: str(r[0]), mes: num(r[1]), pct: num(r[2]), valor: num(r[3]), cobro: num(r[4]) }));

const data = {
  fuente: path.basename(xlsxPath), inicio,
  resumen, precio, opexAnual, beneficiosAnuales, flujoPomar, kuajo, sensibilidad, sensTio, curvaS,
  actividades, histograma, horasExtra, edt, riesgos, riesgoRetenido, contingencia,
  adquisiciones, comunicaciones, raci, instrumentos, sensoresTotal, funcionesTotal, simulacion, lineas, pagos,
};
writeFileSync(out, JSON.stringify(data, null, 1));
console.log(`OK ${path.relative(process.cwd(), out)}: ${actividades.length} actividades, ${instrumentos.length} tags (${sensoresTotal} sensores), ${riesgos.length} riesgos, ${edt.length} filas de EDT. Precio ${M(precio.precio)} M.`);
