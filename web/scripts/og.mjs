// Genera public/og-image.png (1200×630) con Chrome sin interfaz, usando las fuentes autoalojadas.
// Uso: CHROME="ruta/a/chrome" npm run og   (si no se define, prueba las rutas habituales)
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, '../public/og-image.png');
const candidates = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) throw new Error('No encontré Chrome. Define la variable CHROME con su ruta.');

execFileSync(chrome, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
  '--virtual-time-budget=3000', '--window-size=1200,630', `--screenshot=${out}`,
  pathToFileURL(path.join(here, 'og.html')).href,
], { stdio: 'inherit' });
console.log(`OK: ${out}`);
