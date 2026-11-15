"""PLACEHOLDER test sequence for the KINGNOTHIN scroll-scrub comparison. NOT A DESIGN.
Slow forward camera move through drifting silver filaments on obsidian, converging
toward a distant point. Rendered procedurally (numpy + Pillow)."""
import os, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

N = 144; W, H = 1280, 720; SS = 2
OUT = sys.argv[1]
for d in ("frames-1280", "frames-640", "png-tmp"):
    os.makedirs(f"{OUT}/{d}", exist_ok=True)
font = ImageFont.truetype(sys.argv[2], 15)
BG = np.array([10, 10, 11], float)
COL = {'silver': np.array([168, 168, 160.]), 'ivory': np.array([245, 240, 232.]), 'gold': np.array([201, 168, 76.])}
rng = np.random.default_rng(11)
NF = 170
CAM_END = 34.0          # camera travels 0 -> 34 units forward
FOCAL = 0.9 * W * SS
fil = []
for i in range(NF):
    z0 = rng.uniform(1.5, 60)
    ang = rng.uniform(0, 2 * np.pi)
    rad = rng.uniform(0.35, 3.2)
    fil.append(dict(z0=z0, ang=ang, rad=rad, tilt=rng.uniform(-0.35, 0.35),
                    a=rng.uniform(0.05, 0.35), fr=rng.uniform(0.25, 0.9), ph=rng.uniform(0, 6.28),
                    sp=rng.uniform(0.3, 1.0) * rng.choice([-1, 1]), w=rng.uniform(0.7, 1.5),
                    b=rng.uniform(0.35, 1.0),
                    col='gold' if i % 57 == 13 else ('ivory' if rng.random() < 0.14 else 'silver')))
s = np.linspace(-9, 9, 260)   # parameter along each filament (world units)

def smooth(t): return t * t * (3 - 2 * t)
yy, xx = np.mgrid[0:H, 0:W]
r2 = ((xx / W - 0.5) * 1.8) ** 2 + ((yy / H - 0.5) * 3.2) ** 2
vig = (1 - 0.55 * np.clip(r2 / 2.2, 0, 1))[..., None]
core = np.exp(-r2 / 0.035)[..., None]

for k in range(N):
    t = k / (N - 1)
    camz = CAM_END * smooth(t) * 0.85 + CAM_END * 0.15 * t   # gentle ease-in/out, no overshoot
    conv = smooth(min(1, t * 1.1))                            # filaments draw inward over time
    img = Image.new('RGB', (W * SS, H * SS), (10, 10, 11))
    glow = Image.new('RGB', (W * SS, H * SS), (0, 0, 0))
    d, g = ImageDraw.Draw(img), ImageDraw.Draw(glow)
    order = sorted(fil, key=lambda f: -(f['z0'] - camz))
    for f in order:
        rad = f['rad'] * (1 - 0.55 * conv)
        cx, cy = rad * np.cos(f['ang']), rad * np.sin(f['ang']) * 0.6
        drift = t * 2.0 * f['sp']
        X = cx + s * np.cos(f['tilt'])
        Y = cy + s * np.sin(f['tilt']) + f['a'] * np.sin(s * f['fr'] + f['ph'] + drift)
        Z = f['z0'] + 0.6 * np.sin(s * 0.3 + f['ph'] - drift) - camz
        ok = Z > 0.35
        if ok.sum() < 3: continue
        px = W * SS / 2 + FOCAL * X / np.where(ok, Z, 1)
        py = H * SS / 2 + FOCAL * Y / np.where(ok, Z, 1)
        zm = np.median(Z[ok])
        fog = np.clip(1 - zm / 45, 0, 1) ** 1.3        # fade in from distance
        near = np.clip((zm - 0.35) / 1.6, 0, 1)        # fade as it passes the lens
        bright = f['b'] * fog * near
        if bright < 0.02: continue
        col = tuple(int(v) for v in BG + (COL[f['col']] - BG) * bright)
        wpx = max(1, int(round(f['w'] * SS * min(4, 1.8 / zm + 0.6) * (1.3 if f['col'] == 'gold' else 1))))
        # split into contiguous visible runs
        idx = np.where(ok)[0]
        runs = np.split(idx, np.where(np.diff(idx) != 1)[0] + 1)
        for r in runs:
            if len(r) < 2: continue
            pts = list(zip(px[r].tolist(), py[r].tolist()))
            d.line(pts, fill=col, width=wpx, joint='curve')
            g.line(pts, fill=col, width=wpx * 4, joint='curve')
    glow = glow.filter(ImageFilter.GaussianBlur(9 * SS))
    a = np.asarray(img, np.float32) + np.asarray(glow, np.float32) * 0.5
    im = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).resize((W, H), Image.LANCZOS)
    a = np.asarray(im, np.float32) + core * (conv ** 2) * 30 * (COL['ivory'] / 255)
    im = Image.fromarray(np.clip(a * vig, 0, 255).astype(np.uint8))
    ImageDraw.Draw(im).text((24, H - 34), f"PLACEHOLDER TEST SEQUENCE - NOT A DESIGN   FRAME {k:03d}/{N-1:03d}",
                            font=font, fill=(110, 110, 104))
    n = f"f{k:03d}"
    im.save(f"{OUT}/png-tmp/{n}.png")
    im.save(f"{OUT}/frames-1280/{n}.webp", quality=72, method=6)
    im.resize((640, 360), Image.LANCZOS).save(f"{OUT}/frames-640/{n}.webp", quality=70, method=6)
    print(k, end=' ', flush=True)
print()
