// Kuajo · movimiento e interacción.
// Principio: el HTML ya está completo. Este script solo añade estados y animaciones;
// si falla o el usuario pide movimiento reducido, la página se ve entera y estática.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create('kuajo', '0.2,0.7,0.1,1');
gsap.defaults({ ease: 'kuajo', duration: 0.4 });

const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $$ = <T extends Element = HTMLElement>(sel: string, ctx: ParentNode = document) => Array.from(ctx.querySelectorAll<T>(sel));
const navH = () => (document.querySelector('[data-nav]') as HTMLElement | null)?.offsetHeight ?? 64;
const isRendered = (el: Element) => (el.closest('svg') ?? el).getBoundingClientRect().width > 0;

/* ------------------------------------------------------------------ */
/* 1. Desplazamiento suave (Lenis) sincronizado con ScrollTrigger      */
/* ------------------------------------------------------------------ */
let lenis: Lenis | null = null;
// En desarrollo, ?nolenis desactiva el desplazamiento suave para pruebas automáticas.
const noLenis = import.meta.env.DEV && location.search.includes('nolenis');
if (!reduce && !noLenis) {
  lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis?.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

const indice = document.getElementById('indice') as (HTMLElement & { hidePopover?: () => void }) | null;
indice?.setAttribute('data-lenis-prevent', '');
indice?.addEventListener('toggle', (e) => {
  const open = (e as ToggleEvent).newState === 'open';
  open ? lenis?.stop() : lenis?.start();
});

// Anclas internas: cierran el índice, desplazan con Lenis y mueven el foco a la sección.
document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href')!.slice(1);
  const target = id ? document.getElementById(id) : null;
  if (!target) return;
  e.preventDefault();
  if (indice?.matches(':popover-open')) indice.hidePopover?.();
  const done = () => {
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    history.pushState(null, '', `#${id}`);
  };
  if (lenis) lenis.scrollTo(id === 'inicio' ? 0 : target, { offset: -navH() - 16, duration: 1.1, onComplete: done });
  else { target.scrollIntoView({ block: 'start' }); done(); }
});

/* ------------------------------------------------------------------ */
/* 2. Navegación: compacta al bajar, sección activa, progreso          */
/* ------------------------------------------------------------------ */
const nav = document.querySelector<HTMLElement>('[data-nav]');
ScrollTrigger.create({
  start: 64,
  end: 'max',
  onToggle: (self) => nav?.classList.toggle('is-compact', self.isActive),
});

// Sección activa: marca a la vez el enlace del menú corto y el del índice (todas las secciones)
const spyLinks = $$<HTMLAnchorElement>('[data-spy]');
[...new Set(spyLinks.map((l) => l.dataset.spy!))].forEach((id) => {
  const sec = document.getElementById(id);
  if (!sec) return;
  const mine = spyLinks.filter((l) => l.dataset.spy === id);
  ScrollTrigger.create({
    trigger: sec,
    start: 'top 45%',
    end: 'bottom 45%',
    onToggle: (self) => {
      if (self.isActive) spyLinks.forEach((l) => (mine.includes(l) ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current')));
      else mine.forEach((l) => l.removeAttribute('aria-current'));
    },
  });
});

if (!CSS.supports('animation-timeline: scroll()')) {
  const bar = document.querySelector<HTMLElement>('[data-progress]');
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => bar?.style.setProperty('--p', s.progress.toFixed(4)) });
}

/* ------------------------------------------------------------------ */
/* 3. Tema claro/oscuro con View Transitions                           */
/* ------------------------------------------------------------------ */
document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
  const next = getComputedStyle(root).colorScheme.includes('dark') ? 'light' : 'dark';
  const apply = () => {
    root.dataset.theme = next;
    try { localStorage.setItem('kuajo-theme', next); } catch { /* almacenamiento bloqueado */ }
  };
  const vt = (document as Document & { startViewTransition?: (cb: () => void) => unknown }).startViewTransition;
  if (vt && !reduce) vt.call(document, apply);
  else apply();
});

/* ------------------------------------------------------------------ */
/* Preparación diferida por sección                                    */
/* ------------------------------------------------------------------ */
// Rendimiento: las secciones usan content-visibility: auto, así que el navegador no las maqueta
// hasta que se acercan. Para no forzar esa maquetación al cargar, todo lo que mide elementos
// (trazos, barras, títulos, contadores, niveles ISA-95) se prepara cuando su sección está a
// 600 px de entrar en pantalla. Al cargar solo se miden las cajas de las secciones.
const lazy = (el: Element, setup: () => void) =>
  ScrollTrigger.create({ trigger: el.closest('main > section') ?? el, start: 'top bottom+=600', end: 'max', once: true, onEnter: setup });

// Cuando una sección se maqueta cambia la altura de la página: se recalculan los disparadores.
let refreshTimer = 0;
new ResizeObserver(() => {
  clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
}).observe(document.querySelector('main') ?? document.body);

/* ------------------------------------------------------------------ */
/* 4. ISA-95: el diagrama queda fijo y se activa nivel por nivel       */
/* ------------------------------------------------------------------ */
const arch = document.querySelector<SVGElement>('[data-arch]');
if (arch) lazy(arch, () => {
  $$('.step[data-level]').forEach((step) => {
    ScrollTrigger.create({
      trigger: step,
      start: 'top 62%',
      end: 'bottom 62%',
      onToggle: (self) => {
        step.classList.toggle('is-active', self.isActive);
        if (self.isActive) arch.dataset.active = step.dataset.level!;
      },
    });
  });
});

/* ------------------------------------------------------------------ */
/* 5. Animaciones (solo con movimiento permitido)                      */
/* ------------------------------------------------------------------ */
if (!reduce) {

  // 5a. Títulos revelados por líneas reales (no por elemento)
  $$('[data-lines]').forEach((el) => lazy(el, () => {
    const original = el.innerHTML;
    const inners = splitLines(el);
    el.style.visibility = 'visible';
    if (!inners.length) return;
    gsap.from(inners, {
      yPercent: 110,
      stagger: 0.07,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onComplete: () => { el.innerHTML = original; }, // restaura el texto para que reacomode al cambiar el ancho
    });
  }));

  // 5b. Diagrama del hero: se dibuja al cargar
  const heroSvg = $$<SVGSVGElement>('[data-plant] svg').find(isRendered);
  if (heroSvg) {
    const tl = gsap.timeline({ delay: 0.35 });
    const boxes = $$<SVGGeometryElement>('.node__box', heroSvg);
    const lines = $$<SVGGeometryElement>('.link__line:not(.link__line--down)', heroSvg);
    const dashed = $$<SVGGeometryElement>('.link__line--down', heroSvg);
    const ticks = $$<SVGGeometryElement>('.thread__tick, .thread__line', heroSvg);
    const labels = $$<SVGElement>('text', heroSvg);
    [...boxes, ...lines, ...ticks].forEach(prepDraw);
    gsap.set(labels, { opacity: 0 });
    gsap.set(dashed, { opacity: 0 });
    tl.to(boxes, { strokeDashoffset: 0, duration: 0.4, stagger: 0.08 })
      .to(labels, { opacity: 1, duration: 0.3, stagger: 0.01 }, '-=0.25')
      .to(lines, { strokeDashoffset: 0, duration: 0.3, stagger: 0.08 }, '-=0.2')
      .to(dashed, { opacity: 1, duration: 0.25 }, '<')
      .to(ticks, { strokeDashoffset: 0, duration: 0.4, stagger: 0.04 }, '-=0.1');
  }

  // 5c. Resto de diagramas: se trazan a medida que se recorren (scrub)
  const groups = new Map<Element, SVGGeometryElement[]>();
  $$<SVGGeometryElement>('[data-draw]')
    .filter((el) => !el.closest('[data-plant]'))
    .forEach((el) => {
      const key = el.closest('figure') ?? el.closest('svg')!;
      groups.set(key, [...(groups.get(key) ?? []), el]);
    });
  groups.forEach((all, trigger) => lazy(trigger, () => {
    const els = all.filter(isRendered); // descarta la versión oculta (móvil o escritorio) del diagrama
    if (!els.length) return;
    els.forEach(prepDraw);
    gsap.timeline({ scrollTrigger: { trigger, start: 'top 82%', end: 'top 30%', scrub: 0.6 } })
      .to(els, { strokeDashoffset: 0, ease: 'none', stagger: 0.12, duration: 1 });
  }));

  // 5d. Contadores: del valor de hoy (o de 0) al valor final, con sus decimales
  $$('[data-count-from]').forEach((el) => lazy(el, () => {
    const from = Number(el.dataset.countFrom), to = Number(el.dataset.countTo);
    const d = Number(el.dataset.countDecimals ?? 0);
    const o = { v: from };
    el.textContent = fmtNum(from, d);
    gsap.to(o, {
      v: to, duration: 1.2,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate: () => { el.textContent = fmtNum(o.v, d); },
    });
  }));

  // 5e. Barras: crecen desde su origen al entrar el grupo [data-bars] en pantalla
  $$('[data-bars]').forEach((group) => lazy(group, () => {
    const bars = $$<HTMLElement | SVGElement>('[data-bar]', group).filter((b) => b.closest('[data-bars]') === group && isRendered(b));
    if (!bars.length) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: group, start: 'top 85%', once: true } });
    const h = bars.filter((b) => b.dataset.bar !== 'y');
    const v = bars.filter((b) => b.dataset.bar === 'y');
    if (h.length) tl.from(h, { scaleX: 0, transformOrigin: '0% 50%', stagger: { amount: 0.4 } }, 0);
    if (v.length) tl.from(v, {
      scaleY: 0, stagger: { amount: 0.5 },
      transformOrigin: (_i: number, t: Element) => (t.classList.contains('is-down') ? '50% 0%' : '50% 100%'),
    }, 0);
  }));
}

/* ------------------------------------------------------------------ */
/* 6. Interacción (funciona también con movimiento reducido)           */
/* ------------------------------------------------------------------ */

// 6a. Pestañas: sin JS se ven todos los paneles; con JS, uno a la vez (patrón ARIA tabs)
$$('[data-tabs]').forEach((box) => {
  const tabs = $$<HTMLButtonElement>('[role="tab"]', box);
  const show = (tab: HTMLButtonElement, focus = false) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls')!);
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
    ScrollTrigger.refresh();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(t));
    t.addEventListener('keydown', (e) => {
      const k = (e as KeyboardEvent).key;
      if (k !== 'ArrowRight' && k !== 'ArrowLeft') return;
      e.preventDefault();
      show(tabs[(i + (k === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length], true);
    });
  });
  const first = tabs.find((t) => t.getAttribute('aria-selected') === 'true') ?? tabs[0];
  if (first) show(first);
});

// 6b. Rutas por receta: resalta una receta y vuelve a trazar su línea
$$('[data-routes]').forEach((fig) => {
  const btns = $$<HTMLButtonElement>('[data-route]', fig);
  btns.forEach((b) => b.addEventListener('click', () => {
    const r = b.dataset.route!;
    btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    if (r === 'all') delete fig.dataset.show; else fig.dataset.show = r;
    if (reduce || r === 'all') return;
    $$<SVGGeometryElement>(`[data-lane="${r}"] .lane__line`, fig).filter(isRendered).forEach((p) => {
      const len = Math.ceil(p.getTotalLength()) + 2;
      gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.9, ease: 'kuajo' });
    });
  }));
});

// 6c. Filtro de tablas: por columnas (data-*) y por texto libre
$$('[data-filter]').forEach((box) => {
  const rows = $$<HTMLTableRowElement>('tbody tr', box);
  const selects = $$<HTMLSelectElement>('[data-filter-key]', box);
  const text = box.querySelector<HTMLInputElement>('[data-filter-text]');
  const out = box.querySelector<HTMLOutputElement>('[data-filter-count]');
  const apply = () => {
    const q = (text?.value ?? '').trim().toLowerCase();
    let n = 0;
    rows.forEach((tr) => {
      const ok = selects.every((s) => !s.value || tr.dataset[s.dataset.filterKey!] === s.value)
        && (!q || tr.textContent!.toLowerCase().includes(q));
      tr.hidden = !ok;
      if (ok) n++;
    });
    if (out) out.textContent = `${n} de ${rows.length}`;
  };
  selects.forEach((s) => s.addEventListener('change', apply));
  text?.addEventListener('input', apply);
});

// 6d. Visor de figuras: <dialog> con zoom (rueda, botones, teclado) y arrastre
(() => {
  const dlg = document.getElementById('visor') as HTMLDialogElement | null;
  if (!dlg || typeof dlg.showModal !== 'function') return; // sin <dialog>: el enlace abre la imagen
  const stage = dlg.querySelector<HTMLElement>('[data-visor-stage]')!;
  const img = dlg.querySelector<HTMLImageElement>('[data-visor-img]')!;
  const title = dlg.querySelector<HTMLElement>('[data-visor-title]')!;
  let s = 1, x = 0, y = 0, fit = 1;
  let opener: HTMLElement | null = null;
  const paint = () => { img.style.transform = `translate(${x}px, ${y}px) scale(${s})`; };
  const doFit = () => {
    const r = stage.getBoundingClientRect();
    const w = img.naturalWidth || Number(img.dataset.w) || 2400, h = img.naturalHeight || Number(img.dataset.h) || 1600;
    fit = Math.min(r.width / w, r.height / h);
    s = fit; x = (r.width - w * s) / 2; y = (r.height - h * s) / 2; paint();
  };
  const zoomAt = (k: number, cx: number, cy: number) => {
    const ns = Math.min(Math.max(s * k, fit * 0.8), 4);
    x = cx - ((cx - x) * ns) / s; y = cy - ((cy - y) * ns) / s; s = ns; paint();
  };
  const center = () => { const r = stage.getBoundingClientRect(); return [r.width / 2, r.height / 2] as const; };

  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[data-viewer]');
    if (!a) return;
    e.preventDefault();
    opener = a;
    title.textContent = a.dataset.viewerTitle ?? '';
    img.alt = a.querySelector('img')?.alt ?? '';
    img.dataset.w = a.dataset.w ?? ''; img.dataset.h = a.dataset.h ?? '';
    img.onload = doFit;
    img.src = a.href;
    dlg.showModal();
    lenis?.stop();
    if (img.complete && img.naturalWidth) doFit();
  });
  dlg.addEventListener('close', () => { lenis?.start(); opener?.focus(); });
  dlg.querySelectorAll<HTMLButtonElement>('[data-visor-zoom]').forEach((b) => b.addEventListener('click', () => {
    const z = b.dataset.visorZoom;
    if (z === 'fit') doFit(); else { const [cx, cy] = center(); zoomAt(z === 'in' ? 1.4 : 1 / 1.4, cx, cy); }
  }));
  dlg.addEventListener('keydown', (e) => {
    const [cx, cy] = center();
    if (e.key === '+' || e.key === '=') zoomAt(1.4, cx, cy);
    else if (e.key === '-') zoomAt(1 / 1.4, cx, cy);
    else if (e.key === '0') doFit();
  });
  stage.addEventListener('wheel', (e) => {
    e.preventDefault();
    const r = stage.getBoundingClientRect();
    zoomAt(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX - r.left, e.clientY - r.top);
  }, { passive: false });
  let drag: { px: number; py: number; x: number; y: number } | null = null;
  stage.addEventListener('pointerdown', (e) => { drag = { px: e.clientX, py: e.clientY, x, y }; stage.setPointerCapture(e.pointerId); stage.classList.add('is-dragging'); });
  stage.addEventListener('pointermove', (e) => { if (!drag) return; x = drag.x + e.clientX - drag.px; y = drag.y + e.clientY - drag.py; paint(); });
  const end = () => { drag = null; stage.classList.remove('is-dragging'); };
  stage.addEventListener('pointerup', end);
  stage.addEventListener('pointercancel', end);
  addEventListener('resize', () => { if (dlg.open) doFit(); });
})();

document.fonts?.ready.then(() => ScrollTrigger.refresh());

/* ------------------------------------------------------------------ */
/* Utilidades                                                          */
/* ------------------------------------------------------------------ */
/** Número en formato es-CO con miles siempre agrupados ("8.526"). */
function fmtNum(v: number, d: number) {
  return new Intl.NumberFormat('es-CO', { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: 'always' } as Intl.NumberFormatOptions).format(v);
}

function prepDraw(el: SVGGeometryElement) {
  const len = Math.ceil(el.getTotalLength()) + 2;
  el.style.strokeDasharray = `${len}`;
  el.style.strokeDashoffset = `${len}`;
}

/** Envuelve cada línea visual del elemento en .line > .line__in y devuelve los .line__in. */
function splitLines(el: HTMLElement): HTMLElement[] {
  const tokens: Node[] = [];
  Array.from(el.childNodes).forEach((n) => {
    if (n.nodeType === Node.TEXT_NODE) {
      // Solo espacios normales: el espacio no separable (cifra + unidad) mantiene la palabra unida
      (n.textContent ?? '').split(/([ \t\n]+)/).forEach((part) => {
        if (!part) return;
        if (/^[ \t\n]+$/.test(part)) tokens.push(document.createTextNode(part));
        else { const w = document.createElement('span'); w.className = 'w'; w.textContent = part; tokens.push(w); }
      });
    } else tokens.push(n.cloneNode(true));
  });
  el.textContent = '';
  tokens.forEach((t) => el.appendChild(t));

  const lines: Node[][] = [];
  let top: number | null = null;
  tokens.forEach((t) => {
    if (t.nodeType === Node.ELEMENT_NODE) {
      const y = (t as HTMLElement).offsetTop;
      if (top === null || Math.abs(y - top) > 4) { lines.push([]); top = y; }
    } else if (!lines.length) lines.push([]);
    lines[lines.length - 1].push(t);
  });

  el.textContent = '';
  return lines.map((nodes) => {
    const line = document.createElement('span');
    const inner = document.createElement('span');
    line.className = 'line';
    inner.className = 'line__in';
    nodes.forEach((n) => inner.appendChild(n));
    line.appendChild(inner);
    el.appendChild(line);
    return inner;
  });
}
