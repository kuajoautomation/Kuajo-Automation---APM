// Copia a la página los archivos del proyecto que viven en las carpetas de módulos del
// repositorio (informes/, 01_proceso/ … 05_pm4r/). Esas carpetas son la única fuente:
// si se actualiza un archivo allí, la siguiente compilación (local o en GitHub) lo publica.
// Busca cada archivo por su nombre en todo el repositorio, así que no importa en qué
// carpeta de módulo esté. Se ejecuta solo antes de `npm run dev` y `npm run build`.
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const web = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repo = path.resolve(web, '..');
const destinos = {
  descargas: path.join(web, 'public/descargas'),
  vectoriales: path.join(web, 'public/descargas/figuras'),
  figuras: path.join(web, 'src/assets/figuras'),
};
Object.values(destinos).forEach((d) => mkdirSync(d, { recursive: true }));

// Índice de todos los archivos del repositorio (sin la página, git, dependencias ni la carpeta de marca,
// que repite nombres a propósito: svg/ y svg_editable/ tienen los mismos logos)
const omitir = new Set(['web', '.git', '.github', 'node_modules', 'capturas', '.claude', 'Marca_Kuajo']);
const indice = new Map();
const recorrer = (dir) => {
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    if (omitir.has(f.name) || f.name.startsWith('~$')) continue;
    const p = path.join(dir, f.name);
    if (f.isDirectory()) recorrer(p);
    else if (indice.has(f.name)) throw new Error(`Archivo duplicado en el repositorio: ${f.name}\n  ${indice.get(f.name)}\n  ${p}`);
    else indice.set(f.name, p);
  }
};
recorrer(repo);

const descargas = [
  'Informe_Kuajo_APM_2026-2_Linea1_Yogures.pdf',
  'Planeacion_PM4R_Kuajo_Pomar.xlsx',
  'Resumen_Estimaciones_Kuajo.xlsx',
  'Anexo_B_Figuras_A3.pdf',
  'Anexo_C_Lineas_2_y_3.docx',
  'sim.py',
];
const figuras = /^(Fig_\d+\.\d+[ab]?_.+|VSM_(Actual|Futuro)_Yogures_Kuajo)\.(png|svg|pdf)$/;

let copiados = 0, iguales = 0;
const copiar = (nombre, carpeta) => {
  const origen = indice.get(nombre);
  const destino = path.join(carpeta, nombre);
  const so = statSync(origen);
  if (existsSync(destino)) {
    const sd = statSync(destino);
    if (sd.mtimeMs >= so.mtimeMs && sd.size === so.size) { iguales++; return; }
  }
  copyFileSync(origen, destino);
  copiados++;
};

const faltan = descargas.filter((f) => !indice.has(f));
if (faltan.length) throw new Error(`No encontré en el repositorio: ${faltan.join(', ')}`);
descargas.forEach((f) => copiar(f, destinos.descargas));
for (const nombre of indice.keys()) {
  const m = nombre.match(figuras);
  if (m) copiar(nombre, m[3] === 'png' ? destinos.figuras : destinos.vectoriales);
}
console.log(`Archivos del proyecto: ${copiados} copiados, ${iguales} sin cambios.`);
