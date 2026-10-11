"""Simulación de eventos discretos (paso de 1 min) de la línea 1 de yogures de Pomar.
Misma estructura que el modelo de Tecnomatix: preparación+tren térmico, 4 fermentadores,
separador, enfriador, pulmón U-226, maduración U-227, llenadora de vasos U-232 y de botellas U-233,
con fallas exponenciales (MTBF/MTTR) y ventanas de turno."""
import random, json, sys, statistics as st

SC = {
 'actual':    dict(mix={'Y1': 26400/11364, 'Y2': 5900/3054, 'Y3': 11400/9800}, extra=75, chg=90, mtbf=4.356, mttr=25, rend=0.835, scrap=0.03,
                  b_mtbf=6.0, b_mttr=30, b_rend=0.835, stock=48, pack=0.5, s1=(240, 420, 600), s2=(960, 1140), s3=(840, 720)),
 'actual_demanda': dict(mix={'Y1': 30000/11364, 'Y2': 10000/3054, 'Y3': 12400/9800}, extra=75, chg=90, mtbf=4.356, mttr=25, rend=0.835, scrap=0.03,
                  b_mtbf=6.0, b_mttr=30, b_rend=0.835, stock=48, pack=0.5, s1=(240, 390, 540), s2=(960, 1080, 1200, 1320), s3=(840, 720)),
 'propuesta_escalonadas': dict(mix={'Y1': 30000/11364, 'Y2': 10000/3054, 'Y3': 12400/9800}, extra=0, chg=35, mtbf=8.056, mttr=20, rend=0.913, scrap=0.01,
                  b_mtbf=10.0, b_mttr=20, b_rend=0.913, stock=24, pack=0.3, s1=(240, 390, 540), s2=(960, 1080, 1200, 1320), s3=(840, 720), win='escalonadas'),
 'propuesta': dict(mix={'Y1': 30000/11364, 'Y2': 10000/3054, 'Y3': 12400/9800}, extra=0, chg=35, mtbf=8.056, mttr=20, rend=0.913, scrap=0.01,
                  b_mtbf=10.0, b_mttr=20, b_rend=0.913, stock=24, pack=0.3, s1=(240, 390, 540), s2=(960, 1080, 1200, 1320), s3=(840, 720)),
}
PREP = {'Y1': 129, 'Y2': 102, 'Y3': 90}            # U-211 + descarga por el tren térmico (min)
INC = {'Y1': 270, 'Y2': 360, 'Y3': 1200}           # incubación (min)
DIS = {'Y1': 60, 'Y2': 120, 'Y3': 60}              # vaciado (Y2 al ritmo del separador)
CIP = {'Y1': 60, 'Y2': 60, 'Y3': 75}
KGP = {'Y1': 10000, 'Y2': 3054, 'Y3': 9800}        # kg que pasan al pulmón o a maduración
UNITS = {'Y1': 74200, 'Y2': 5990, 'Y3': 9500}
NOM = {'Y1': 480, 'Y2': 120, 'Y3': 100}            # unidades/min nominales
UKG = {'Y1': 0.150, 'Y2': 0.500, 'Y3': 1.03}

WIN = {'base': ((360, 780), (840, 1260)), 'escalonadas': ((360, 1320),)}
def window(t, mode='base'):
    d = (t // 1440) % 7; m = t % 1440
    return d < 6 and any(a <= m < b for a, b in WIN[mode])

def run(name, seed, weeks=13, warm=1):
    p = SC[name]; rnd = random.Random(seed)
    T = weeks * 7 * 1440; T0 = warm * 7 * 1440
    acc = {k: 0.0 for k in p['mix']}; queue = []
    prep = None                 # [lot, remaining, ferm]
    ferm = [None] * 4           # dict(lot, phase, rem)
    pulmon = []                 # list of [lot, kg_rem, units_rem]
    mad = None                  # [lot, phase, rem, units_rem]
    filler = dict(fmt=None, state='idle', rem=0, fail=False)
    bfill = dict(fail=False, rem=0)
    bq = []
    lots = []; nid = 0
    stats = dict(good={'Y1': 0, 'Y2': 0, 'Y3': 0}, avail=0, busy=0, fbusy=0, days=0, bavail=0, bbusy=0)
    for t in range(T):
        meas = t >= T0
        d = (t // 1440) % 7; m = t % 1440
        if m == 0:
            if d < 6:
                for k in ('Y1', 'Y3'): acc[k] += p['mix'][k]
                if meas: stats['days'] += 1
            if d != 5: acc['Y2'] += p['mix']['Y2']      # Y2 se prepara la tarde anterior a un día de producción
        for k, slots, ok in (('Y1', p['s1'], d < 6), ('Y3', p['s3'], d < 6), ('Y2', p['s2'], d != 5)):
            if ok and m in slots and acc[k] >= 1:
                acc[k] -= 1; nid += 1
                lot = dict(id=nid, r=k, rel=t, start=None, end=None); lots.append(lot); queue.append(lot)
        # preparation: start next lot when a suitable fermenter is free
        if prep is None and queue:
            lot = queue.pop(0); lot['start'] = t
            prep = [lot, PREP[lot['r']], None]
        if prep is not None:
            if prep[2] is None and prep[1] <= 60:
                lot = prep[0]
                order = [3, 2, 1, 0] if lot['r'] == 'Y3' else [0, 1, 2, 3]
                if lot['r'] != 'Y3' and ferm[3] is None and all(ferm[i] is not None for i in (0, 1, 2)):
                    order = [3]
                for i in order:
                    if ferm[i] is None:
                        ferm[i] = dict(lot=lot, phase='wait_fill', rem=0); prep[2] = i; break
            if prep[2] is not None or prep[1] > 60:
                prep[1] -= 1
            if prep[1] <= 0:
                f = ferm[prep[2]]; f['phase'] = 'inc'; f['rem'] = INC[prep[0]['r']] + p['extra'] + 10
                prep = None
        # fermenters
        for i in range(4):
            f = ferm[i]
            if f is None: continue
            r = f['lot']['r']
            if meas: stats['fbusy'] += 1
            if f['phase'] == 'inc':
                f['rem'] -= 1
                if f['rem'] <= 0: f['phase'] = 'ready'
            if f['phase'] == 'ready':
                if r in ('Y1', 'Y2'):
                    space = 10000 - sum(x[1] for x in pulmon)
                    busy_down = any(g is not None and g['phase'] == 'dis' and g['lot']['r'] in ('Y1', 'Y2') for g in ferm)
                    if space >= KGP[r] * p.get('ovl', 0.6) and not busy_down:
                        f['phase'] = 'dis'; f['rem'] = DIS[r]
                else:
                    if mad is None:
                        f['phase'] = 'dis'; f['rem'] = DIS[r]
                        mad = [f['lot'], 'fill', DIS[r], UNITS['Y3']]
                    else:
                        f['phase'] = 'mat_in'; f['rem'] = 720
            elif f['phase'] == 'mat_in':
                f['rem'] -= 1
                if f['rem'] <= 0:
                    f['phase'] = 'bott'; f['units'] = UNITS['Y3']; bq.append(('F', i))
            elif f['phase'] == 'dis':
                f['rem'] -= 1
                if f['rem'] <= 0:
                    if r in ('Y1', 'Y2'):
                        pulmon.append([f['lot'], KGP[r], UNITS[r]])
                    f['phase'] = 'cip'; f['rem'] = CIP[r] + (30 if p['extra'] else 0)
            elif f['phase'] == 'cip':
                f['rem'] -= 1
                if f['rem'] <= 0: ferm[i] = None
        # maturation U-227
        if mad is not None:
            if mad[1] == 'fill':
                mad[2] -= 1
                if mad[2] <= 0: mad[1] = 'mat'; mad[2] = 720
            elif mad[1] == 'mat':
                mad[2] -= 1
                if mad[2] <= 0: mad[1] = 'ready'; bq.append(('M', None))
            elif mad[1] == 'cip':
                mad[2] -= 1
                if mad[2] <= 0: mad = None
        # cup filler U-232
        w = window(t, p.get('win', 'base'))
        if w and meas: stats['avail'] += 1
        if w:
            fl = filler
            if fl['fail']:
                fl['rem'] -= 1
                if meas: stats['busy'] += 1
                if fl['rem'] <= 0: fl['fail'] = False
            elif fl['state'] == 'chg':
                fl['rem'] -= 1
                if meas: stats['busy'] += 1
                if fl['rem'] <= 0: fl['state'] = 'idle'
            elif pulmon:
                lot, kg, u = pulmon[0]; r = lot['r']
                if fl['fmt'] is not None and fl['fmt'] != r:
                    fl['state'] = 'chg'; fl['rem'] = p['chg']; fl['fmt'] = r
                else:
                    fl['fmt'] = r
                    n = NOM[r] * p['rend']; n = min(n, u)
                    pulmon[0][2] -= n; pulmon[0][1] -= n * KGP[r] / UNITS[r]
                    if meas:
                        stats['busy'] += 1; stats['good'][r] += n * (1 - p['scrap'])
                    if pulmon[0][2] <= 1e-6:
                        lot['end'] = t; pulmon.pop(0)
                    if rnd.random() < 1 / (p['mtbf'] * 60):
                        fl['fail'] = True; fl['rem'] = max(1, int(rnd.expovariate(1 / p['mttr'])))
        # bottle filler U-233
        if w and meas: stats['bavail'] += 1
        if w and bq:
            src, fi = bq[0]
            if bfill['fail']:
                bfill['rem'] -= 1
                if meas: stats['bbusy'] += 1
                if bfill['rem'] <= 0: bfill['fail'] = False
            else:
                if src == 'M':
                    n = min(NOM['Y3'] * p['b_rend'], mad[3]); mad[3] -= n; left = mad[3]
                else:
                    g = ferm[fi]; n = min(NOM['Y3'] * p['b_rend'], g['units']); g['units'] -= n; left = g['units']
                if meas: stats['bbusy'] += 1; stats['good']['Y3'] += n * (1 - p['scrap'])
                if left <= 1e-6:
                    bq.pop(0)
                    if src == 'M':
                        mad[0]['end'] = t; mad[1] = 'cip'; mad[2] = 45
                    else:
                        ferm[fi]['lot']['end'] = t; ferm[fi]['phase'] = 'cip'; ferm[fi]['rem'] = CIP['Y3']
                if rnd.random() < 1 / (p['b_mtbf'] * 60):
                    bfill['fail'] = True; bfill['rem'] = max(1, int(rnd.expovariate(1 / p['b_mttr'])))
    D = stats['days']
    kg = {r: stats['good'][r] * UKG[r] / D for r in stats['good']}
    good_time = (stats['good']['Y1'] / NOM['Y1'] + stats['good']['Y2'] / NOM['Y2'])
    y1 = [(l['end'] - l['start']) / 60 for l in lots if l['r'] == 'Y1' and l['end'] and l['start'] and l['start'] >= T0]
    return dict(kg=kg, total=sum(kg.values()), oee=good_time / stats['avail'], occ=stats['busy'] / stats['avail'],
                ferm=stats['fbusy'] / (4 * 1440 * D * 7 / 6), mlt=12 + st.mean(y1) + p['pack'] + 24 + p['stock'], backlog=len(queue),
                bocc=stats['bbusy'] / stats['bavail'])

if __name__ == '__main__':
    out = {}
    for name in SC:
        res = [run(name, s) for s in range(int(sys.argv[1]) if len(sys.argv) > 1 else 10)]
        agg = {k: (st.mean([r[k] for r in res]), st.pstdev([r[k] for r in res])) for k in ('total', 'oee', 'occ', 'ferm', 'mlt', 'backlog', 'bocc')}
        agg['kg'] = {r: st.mean([x['kg'][r] for x in res]) for r in ('Y1', 'Y2', 'Y3')}
        out[name] = agg
        print(name, {k: (round(v[0], 3), round(v[1], 3)) if isinstance(v, tuple) else {a: round(b) for a, b in v.items()} for k, v in agg.items()})
    json.dump(out, open('sim_results.json', 'w'), indent=1)
