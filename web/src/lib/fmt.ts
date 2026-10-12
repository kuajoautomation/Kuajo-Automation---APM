// Formato numérico en español de Colombia (punto de miles, coma decimal).
// useGrouping 'always': en español Intl no agrupa los números de 4 cifras ("8526" en vez de "8.526").
const nf = (d: number) =>
  new Intl.NumberFormat('es-CO', { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: 'always' } as Intl.NumberFormatOptions);

/** 1234.5 → "1.234,5" con `d` decimales. */
export const num = (v: number | null, d = 0) => nf(d).format(v ?? 0);
/** 0.4896 → "49,0 %". */
export const pct = (v: number | null, d = 1) => `${nf(d).format((v ?? 0) * 100)} %`;
/** COP → "$8.526 M" (millones). */
export const mCOP = (v: number | null, d = 0) => `$${nf(d).format((v ?? 0) / 1e6)} M`;
/** COP → "8.526" (millones, sin símbolo). */
export const m = (v: number | null, d = 0) => nf(d).format((v ?? 0) / 1e6);
/** "2027-01-11" → "11/01/2027". */
export const fecha = (iso: string) => (iso ? iso.split('-').reverse().join('/') : '');

/**
 * Cifra redondeada para mostrar como estimación preliminar: «≈ $15.000 M», «≈ 49 %», «≈ 2,2».
 * - `tipo`: 'cop' (pesos → millones con «$… M»), 'pct' (fracción → «… %») o 'num'.
 * - `cifras`: cifras significativas (por defecto 2); `paso` redondea a un múltiplo fijo y manda sobre `cifras`.
 * - `dec`: decimales que se muestran (por defecto 0); `signo`: false quita el «≈».
 * Solo cambia el texto: los valores exactos siguen en site.ts y en el Excel (npm run check).
 */
export const aprox = (
  valor: number | null,
  { tipo = 'num', cifras = 2, paso, dec = 0, signo = true }: { tipo?: 'cop' | 'pct' | 'num'; cifras?: number; paso?: number; dec?: number; signo?: boolean } = {},
) => {
  const x = (valor ?? 0) / (tipo === 'cop' ? 1e6 : 1) * (tipo === 'pct' ? 100 : 1);
  let r: number;
  if (paso) r = Math.round(x / paso) * paso;
  else if (x === 0) r = 0;
  else {
    const p = 10 ** (Math.floor(Math.log10(Math.abs(x))) + 1 - cifras);
    r = Math.round(x / p) * p;
  }
  const t = nf(dec).format(r);
  const pre = signo ? '≈ ' : '';
  if (tipo === 'cop') return `${pre}$${t} M`;
  if (tipo === 'pct') return `${pre}${t} %`;
  return `${pre}${t}`;
};
