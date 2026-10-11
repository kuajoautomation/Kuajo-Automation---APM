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
