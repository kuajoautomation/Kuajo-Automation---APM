// Figuras del informe (PNG a 3840 px). Astro genera AVIF/WebP; el visor abre una versión de 2400 px.
// Las versiones vectoriales (SVG/PDF) están en public/descargas/figuras/.
import f51 from '../assets/figuras/Fig_5.1_Diagrama_bloques_planta.png';
import f52a from '../assets/figuras/Fig_5.2a_PFD_Linea1_Actual.png';
import f52b from '../assets/figuras/Fig_5.2b_PFD_Linea1_Propuesta.png';
import f55 from '../assets/figuras/Fig_5.5_Distribucion_de_planta.png';
import f71 from '../assets/figuras/Fig_7.1_Rutas_recetas.png';
import f101 from '../assets/figuras/Fig_10.1_Modelo_fisico_ISA-88.png';
import f102 from '../assets/figuras/Fig_10.2_Modelo_procedimental_ISA-88.png';
import f111 from '../assets/figuras/Fig_11.1_Arquitectura_ISA-95.png';
import f112 from '../assets/figuras/Fig_11.2_Red_OT-IT.png';
import f121 from '../assets/figuras/Fig_12.1_PID_Linea1.png';
import vsmA from '../assets/figuras/VSM_Actual_Yogures_Kuajo.png';
import vsmF from '../assets/figuras/VSM_Futuro_Yogures_Kuajo.png';

export const figuras = {
  f51: { src: f51, n: '5.1', file: 'Fig_5.1_Diagrama_bloques_planta', svg: true, title: 'Diagrama de bloques de la planta',
    alt: 'Diagrama de bloques de la planta de Cajicá: recepción y tratamiento (área 100), matriz de válvulas, líneas 1 a 3 (áreas 200 a 400), servicios (área 500) y almacenamiento y despacho (área 600), con la línea 1 resaltada.',
    caption: 'Áreas 100 a 600 con tags ISA-88, caudales del caso y tipo de operación de cada bloque. La línea 1 (yogures) se resalta en azul.' },
  f52a: { src: f52a, n: '5.2a', file: 'Fig_5.2a_PFD_Linea1_Actual', svg: true, title: 'PFD de la línea 1 hoy',
    alt: 'Diagrama de flujo de proceso de la línea de yogures en la situación actual, con instrumentos locales, válvulas manuales y los problemas P1 a P7 marcados en rojo.',
    caption: 'Los mismos equipos de proceso que con la propuesta, pero con instrumentos locales, válvulas manuales, pH por muestreo y fin de línea manual. En rojo, los problemas P1 a P7; 24 corrientes a 43.700 kg/día.' },
  f52b: { src: f52b, n: '5.2b', file: 'Fig_5.2b_PFD_Linea1_Propuesta', svg: true, title: 'PFD de la línea 1 con la propuesta',
    alt: 'Diagrama de flujo de proceso propuesto de la línea de yogures, con instrumentos y válvulas nuevas en naranja, mejoras K1 a K8, lazos de control con PCC 1 y PCC 2 y rutas por receta Y1 rojo, Y2 morado y Y3 verde azulado.',
    caption: 'En naranja, lo que agrega Kuajo: instrumentos, válvulas automáticas, inspección U-234 y celda U-242/U-241. Estrellas K1 a K8, banda de integración ISA-95 y 24 corrientes a 52.400 kg/día.' },
  f55: { src: f55, n: '5.3', file: 'Fig_5.5_Distribucion_de_planta', svg: true, title: 'Distribución de planta',
    alt: 'Distribución esquemática de la planta con áreas 100 a 600, zonas de higiene Z1 a Z4, flujos de leche, producto, insumos, personas y suero, esclusas y muelles, y la celda robotizada nueva de la línea 1.',
    caption: 'Áreas, zonas de higiene Z1 a Z4, esclusas E1 a E3, muelles D1 y D2 y la celda robotizada de la línea 1, con las celdas de las Fases 2 y 3 reservadas. Dimensiones por validar.' },
  f71: { src: f71, n: '7.1', file: 'Fig_7.1_Rutas_recetas', svg: true, title: 'Rutas de las 3 recetas',
    alt: 'Rutas de Y1, Y2 y Y3 por los equipos de la línea de yogures con los colores del PFD.',
    caption: 'Y1 y Y3 pasan directo del fermentador al enfriador; solo Y2 pasa por el separador. Después, Y1 y Y2 van al pulmón y a la llenadora de vasos; Y3 a maduración y a su llenadora.' },
  f101: { src: f101, n: '10.1', file: 'Fig_10.1_Modelo_fisico_ISA-88', svg: true, title: 'Modelo físico ISA-88',
    alt: 'Árbol del modelo físico ISA-88: empresa, sitio, 6 áreas, celdas y las 13 unidades del área 200 hasta sus módulos de equipo y de control.',
    caption: 'Empresa → sitio → áreas → celdas → unidades, con las 13 unidades del área 200 desplegadas hasta sus módulos. En naranja, lo nuevo con la propuesta.' },
  f102: { src: f102, n: '10.2', file: 'Fig_10.2_Modelo_procedimental_ISA-88', svg: true, title: 'Modelo procedimental ISA-88',
    alt: 'Procedimiento Elaborar yogur con 8 procedimientos de unidad, operaciones y fases, fases opcionales por receta, modelo de estados y condiciones de transición.',
    caption: 'Procedimiento «Elaborar yogur» → 8 procedimientos de unidad → operaciones → fases, con las fases opcionales de cada receta y el modelo de estados de fase.' },
  f111: { src: f111, n: '11.1', file: 'Fig_11.1_Arquitectura_ISA-95', svg: true, title: 'Arquitectura ISA-95',
    alt: 'Arquitectura ISA-95 de niveles 0 a 4 con la DMZ industrial, sistemas nuevos en naranja y las interfaces con sus protocolos.',
    caption: 'Niveles 0 a 4 con la DMZ (3.5), decisiones que bajan e información que sube por cada interfaz con su protocolo, frente a la situación actual de cada nivel.' },
  f112: { src: f112, n: '11.2', file: 'Fig_11.2_Red_OT-IT', svg: true, title: 'Red OT/IT con zonas y conductos',
    alt: 'Arquitectura de red según ISA/IEC 62443 con zonas corporativa, DMZ, supervisión, área 200 y celda 240, y conductos C1 a C5.',
    caption: 'Zonas y conductos C1 a C5 con el tráfico permitido, firewall corporativo existente y firewall industrial nuevo, núcleo redundante y anillo de fibra del área 200.' },
  f121: { src: f121, n: '12.1', file: 'Fig_12.1_PID_Linea1', svg: true, title: 'P&ID preliminar de la línea 1',
    alt: 'Diagrama de tuberías e instrumentación de la línea de yogures según ISA-5.1, con tags de la lista única de instrumentos y lo nuevo en naranja.',
    caption: 'Preparación, tren térmico con desvío FDV-212 (PCC 1), fermentadores con camisa en rango dividido y pH en línea, separador con NIR, enfriador, pulmón, maduración y dosificación de fruta.' },
  vsmA: { src: vsmA, n: '6.1', file: 'VSM_Actual_Yogures_Kuajo', svg: false, title: 'VSM actual',
    alt: 'Mapa de flujo de valor actual de la línea de yogures: flujo empujado, información en papel, problemas P1 a P7, llenadora de vasos como cuello de botella y MLT de 4,2 días.',
    caption: 'Flujo empujado, información en papel, la llenadora de vasos como cuello de botella y un MLT de 4,2 días con 11,4 % de valor agregado.' },
  vsmF: { src: vsmF, n: '6.2', file: 'VSM_Futuro_Yogures_Kuajo', svg: true, title: 'VSM futuro',
    alt: 'Mapa de flujo de valor futuro: programación del MES solo al marcapasos (fermentación), carriles FIFO aguas abajo, supermercado de producto liberado, mejoras K1 a K8 y MLT de 3 días.',
    caption: 'Heijunka en el MES hacia el marcapasos (fermentación), FIFO hasta la llenadora, supermercado de producto liberado, mejoras K1 a K8 y MLT de 3 días.' },
} as const;
export type FiguraKey = keyof typeof figuras;
