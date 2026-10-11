// Verifica las cifras del sitio contra el libro Excel y busca textos obsoletos en src/.
// Uso: npm run check   (sale con código 1 si algo difiere)
// Requiere Node 22.6+ (importa site.ts con eliminación de tipos).
import XLSX from 'xlsx';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const xlsxPath = process.argv[2] ?? path.resolve(root, '../05_pm4r/Planeacion_PM4R_Kuajo_Pomar.xlsx'); // Excel de la carpeta 05_pm4r/
const site = await import(pathToFileURL(path.join(root, 'src/data/site.ts')).href);
const json = JSON.parse(readFileSync(path.join(root, 'src/data/excel.json'), 'utf8'));
const wb = XLSX.readFile(xlsxPath);
const rows = (s) => XLSX.utils.sheet_to_json(wb.Sheets[s], { header: 1, raw: true, defval: null });
const str = (v) => (v == null ? '' : String(v).trim());
const cell = (sheet, label, col = 1, from = 0) => {
  const r = rows(sheet).slice(from).find((x) => str(x[0]).startsWith(label));
  if (!r) throw new Error(`${sheet}: no encontré «${label}»`);
  return r[col];
};

let fails = 0, oks = 0;
/** Compara `actual` con `esperado` redondeando ambos a la precisión con que se publica. */
const eq = (name, actual, esperado, { scale = 1, dec = 0 } = {}) => {
  const a = Math.round((actual / scale) * 10 ** dec) / 10 ** dec;
  const e = Math.round((esperado / scale) * 10 ** dec) / 10 ** dec;
  if (a === e) { oks++; return; }
  fails++;
  console.error(`✗ ${name}: sitio ${a} ≠ Excel ${e}`);
};

const E = site.economics;
const M = { scale: 1e6 };
eq('Precio de la oferta (M)', E.precio, cell('Portada', 'Precio de la oferta'), M);
eq('Precio en US$ (M, 2 dec.)', E.precioUSD, cell('Portada', 'Precio en US$'), { scale: 1e6, dec: 2 });
eq('Inversión de Pomar (M)', E.inversion, cell('Flujo_Pomar', 'Inversión total año 0'), M);
eq('OPEX año 1 (M)', E.opex, cell('Beneficios_OPEX', 'Total OPEX anual'), M);
eq('Beneficios anuales (M)', E.beneficios, cell('Beneficios_OPEX', 'Total beneficios anuales'), M);
eq('VPN (M)', E.vpn, cell('Portada', 'VPN para Pomar'), M);
eq('TIR (%)', E.tir * 100, cell('Portada', 'TIR para Pomar') * 100, { dec: 1 });
eq('TIO (%)', E.tio * 100, cell('Portada', 'TIO de Pomar') * 100, { dec: 1 });
eq('Recuperación simple (años)', E.recSimple, cell('Portada', 'Recuperación simple'), { dec: 2 });
eq('Recuperación descontada (años)', E.recDescontada, cell('Portada', 'Recuperación descontada'), { dec: 2 });
eq('B/C', E.bc, cell('Flujo_Pomar', 'Relación beneficio/costo (VP'), { dec: 2 });
eq('Punto de equilibrio (%)', E.equilibrio * 100, cell('Portada', 'Factor de beneficios de equilibrio') * 100);
eq('Utilidad neta de Kuajo (M)', E.utilidadKuajo, cell('Portada', 'Utilidad neta de Kuajo'), M);
eq('Margen neto de Kuajo (%)', E.margenKuajo * 100, cell('Portada', 'Margen neto de Kuajo') * 100, { dec: 1 });
eq('Crédito rotativo máximo (M)', E.credito, cell('Portada', 'Crédito rotativo máximo'), M);
eq('Cobertura de la contingencia', E.cobertura, cell('Portada', 'Cobertura de la contingencia'), { dec: 2 });
eq('Suministros, costo (M)', E.suministros, cell('Precio_Kuajo', 'Subtotal suministros'), M);
eq('Ingeniería, precio (M)', E.ingenieria, cell('Precio_Kuajo', 'Servicios de ingeniería', 2), M);
eq('Semanas', E.semanas, cell('Portada', 'Duración (semanas)'));
eq('Semanas (cronograma)', site.schedule.semanas, cell('Portada', 'Duración (semanas)'));

// Horas del cronograma
const cr = rows('Cronograma');
const hrs = (q) => cr.find((r) => str(r[0]) === q)?.[1];
eq('Horas de ingeniería', E.horas, cr.find((r) => str(r[1]) === 'Total del proyecto')[11]);
for (const r of ['R1 Duvan', 'R2 Paula', 'R3 David Felipe', 'R4 Juan', 'R5 Jose Luis', 'R6 Ian']) eq(`Horas ${r}`, site.teamHours[r.slice(0, 2)], hrs(r));
eq('Pico del equipo (h/sem)', site.teamHours.pico, cr.find((r) => str(r[0]) === 'Equipo')[2]);
eq('Máximo por persona (h/sem, 1 dec.)', site.teamHours.maxPersona, Math.max(...['R1 Duvan', 'R2 Paula', 'R3 David Felipe', 'R4 Juan', 'R5 Jose Luis', 'R6 Ian'].map((q) => cr.find((r) => str(r[0]) === q)[2])), { dec: 1 });

// Simulación
const sim = rows('Simulacion');
const sv = (label, i) => sim.find((r) => str(r[0]).startsWith(label))[i];
const col = { 'Actual': 1, 'Propuesta con pausas escalonadas': 3, 'Propuesta con pausas fijas': 4 };
for (const s of site.simScenarios) {
  eq(`Simulación · vendible · ${s.k}`, s.vendible, sv('Producción vendible total', col[s.k]));
  eq(`Simulación · OEE · ${s.k} (%)`, s.oee * 100, sv('OEE de la llenadora de vasos', col[s.k]) * 100, { dec: 1 });
}

// Líneas 2 y 3
const l23 = rows('Lineas_2_3');
const lv = (label, i) => l23.find((r) => str(r[0]).startsWith(label))[i];
eq('Línea 2 · precio (M)', site.lines23.l2.precio, lv('Precio de Kuajo', 2), M);
eq('Línea 2 · VPN (M)', site.lines23.l2.vpn, lv('VPN a la TIO', 2), M);
eq('Línea 2 · TIR (%)', site.lines23.l2.tir * 100, lv('TIR', 2) * 100, { dec: 1 });
eq('Línea 3 · precio (M)', site.lines23.l3.precio, lv('Precio de Kuajo', 3), M);
eq('Línea 3 · VPN (M)', site.lines23.l3.vpn, lv('VPN a la TIO', 3), M);
eq('Línea 3 · TIR (%)', site.lines23.l3.tir * 100, lv('TIR', 3) * 100, { dec: 1 });
eq('VPN combinado (M)', site.lines23.vpnCombinado, lv('VPN combinado', 1), M);

// KPI principal: OEE de la llenadora
const vsm = rows('VSM_Actual');
const oee = vsm.find((r) => str(r[0]).startsWith('OEE de la llenadora de vasos'));
eq('OEE hoy (%)', site.kpis[0].from, oee[1] * 100, { dec: 1 });
eq('OEE meta (%)', site.kpis[0].to, oee[2] * 100, { dec: 1 });

// excel.json sincronizado con el libro
eq('excel.json · precio', json.precio.precio, cell('Precio_Kuajo', 'PRECIO DE LA OFERTA', 2), M);
eq('excel.json · VPN', json.resumen.vpn, cell('Portada', 'VPN para Pomar'), M);
const kj = rows('Kuajo_PyG_Flujo');
const pyg0 = kj.findIndex((r) => str(r[0]) === 'Estado de resultados del proyecto');
for (const label of ['Nómina del equipo', 'Utilidad neta']) {
  const j = json.kuajo.pyg.find((r) => r.concepto.startsWith(label));
  eq(`excel.json · PyG · ${label}`, j.valor, cell('Kuajo_PyG_Flujo', label, 1, pyg0), M);
}
eq('excel.json · tags', json.instrumentos.length, 86);
eq('excel.json · actividades', json.actividades.length, 38);

// Textos obsoletos en src/
const allow = { '[PENDIENTE]': ['src/data/site.ts'] }; // solo repositorio, video y reflexiones
const banned = ['U-235', '86 de 96', '12 meses', '[PENDIENTE]', 'R-141', 'v2'];
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = path.join(d, f); statSync(p).isDirectory() ? walk(p) : /\.(astro|ts|css|mjs)$/.test(f) && files.push(p); });
walk(path.join(root, 'src'));
for (const f of files) {
  const rel = path.relative(root, f).replaceAll('\\', '/');
  const text = readFileSync(f, 'utf8');
  for (const b of banned) {
    if (!text.includes(b) || allow[b]?.includes(rel)) continue;
    if (b === 'v2' && !/\bv2\b/.test(text)) continue;
    fails++;
    console.error(`✗ Texto obsoleto «${b}» en ${rel}`);
  }
}
const pend = readFileSync(path.join(root, 'src/data/site.ts'), 'utf8').match(/\[PENDIENTE\]/g)?.length ?? 0;
if (pend !== 1) { fails++; console.error(`✗ site.ts debe definir [PENDIENTE] una sola vez (PENDING); hay ${pend}`); }

console.log(`${oks} cifras coinciden con el Excel; ${fails} diferencias o textos obsoletos.`);
process.exit(fails ? 1 : 0);
