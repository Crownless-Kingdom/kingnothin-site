# Scroll-scrub comparison (HOLD prototype)

Isolated prototype for proposal `KN-HOMEPAGE-CINEMATIC-INTRO-2026-11-14` in
`SITE_CHANGE_CLEARANCE.md`. Nothing on the live site links to this folder or
loads anything from it. It only reads the brand fonts from `../../assets/fonts`
and never changes them.

**Visual:** the filament footage is a **[PLACEHOLDER] test sequence, not a
design**. It is 144 procedurally rendered frames of a slow forward camera move
through silver filaments on obsidian (`assets/gen_frames.py`).
**Copy:** the on-screen script is Steve's approved copy (2026-11-14).

## Run it

Run from the repo root:

```bash
python3 prototypes/scroll-scrub-compare/serve.py        # port 8000, supports HTTP Range
# open http://localhost:8000/prototypes/scroll-scrub-compare/
```

`python3 -m http.server` also serves the pages. It ignores `Range` requests,
though, and browsers need those for reliable `<video>` seeking, so the video
results from it are not representative. Use `serve.py`, which is stdlib only.

**Real phone on the same Wi-Fi:** run `python3 prototypes/scroll-scrub-compare/serve.py 8000`,
find the computer's LAN IP, then open `http://<LAN-IP>:8000/prototypes/scroll-scrub-compare/`
on the phone.

## Pages and switches

- `canvas.html` (Method A): image sequence on `<canvas>`, using 144 WebP frames.
  Frames load keyframes first (every 16th, then 8th, 4th, 2nd, then the rest)
  with 6 parallel fetches and decode off-thread with `createImageBitmap`. On
  each `requestAnimationFrame` the page draws the nearest *loaded* frame.
  `?set=640` or `?set=1280` forces a frame set. Without it, viewports 700px
  wide or less get the 640 set.
- `video.html` (Method B): video seeking. The default is an all-intra H.264
  MP4. Seeks are throttled: a new seek never starts while one is in flight,
  and the latest target is applied when the current seek lands. The page uses
  `requestVideoFrameCallback` to read the frame actually on screen.
  `?src=intra` (default on desktop), `?src=g5` (GOP 5, smaller),
  `?src=m640` (default on phones 700px wide or less), `?src=webm` (VP9, GOP 5).
  `?blob=1` downloads the whole file first, then seeks a local blob.
- Both pages:
  - `?gold=1` or the **Gold final line** button (key `G`) turns
    "So much influence" Supernova Gold. The default is all ivory.
  - **Debug** button (key `D`) or `?debug=0` toggles the overlay.
  - `?len=800` sets the scroll-track length in vh. The default is 800, about
    one viewport per stage.
  - `?w=180&wdth=62` tunes the Science Gothic weight and width axes.

## Script and stages (8 visual stages)

| Stage | On screen |
|---|---|
| 1 | WELCOME TO |
| 2 | KINGNOTHIN |
| 3 | and the → Crownless Kingdom (second line fades in partway through) |
| 4 | Never before |
| 5 | + In human history |
| 6 | + Have we allowed |
| 7 | + A system |
| 8 | + So much influence (held) |

Stages 1–3 replace each other. Stages 4–8 build up: each line stays as the
next appears. All text is dead-centre, in Science Gothic light, condensed,
ivory `#F5F0E8` on obsidian `#0A0A0B`. Transitions are simple opacity fades
using `cubic-bezier(0.22, 0.61, 0.36, 1)`, with no bounce, scramble or
materialize effects. The stage map is the `INTRO` and `LINES` arrays at the top
of `story.js`.

`prefers-reduced-motion: reduce` turns off scrubbing and fades. The page shows
the final frame with the full declaration readable, and the canvas page loads
only that one frame. The full script is also in the page as screen-reader text.

## What to test (desktop, then a real phone)

1. **Responsiveness.** Scroll slowly, then flick fast. Does the image track
   your finger or wheel, or trail behind it?
2. **Reverse scroll.** Scroll back up. Video decoders are tuned for forward
   playback, so this is where video seeking usually suffers.
3. **Loading.** Use a cold load, ideally on cellular or with DevTools throttling
   ("Fast 4G"). How long until the sequence is fully scrubbable? Does the
   canvas show gaps (nearest-frame substitutions) early on?
4. **Consistency.** Compare frame-to-frame smoothness and any judder or stalls.
5. **Memory and heat.** On the phone, scrub for a minute. Watch for tab reloads
   (iOS kills tabs that use too much memory), heat or battery drain.
6. **Image quality.** Compare thin-line sharpness and banding between WebP
   frames and H.264.

## Debug overlay metrics

- **method / stage / p**: which method is running, the current stage (1–8),
  and scroll progress (0–1).
- **draw-loop fps**: `requestAnimationFrame` rate.
- **long rAF (>25ms)**: animation-loop frames that took longer than 1.5× a
  60 Hz frame (dropped frames).
- **late frames**: rAF ticks where the frame on screen wasn't the target. For
  canvas, that means the target frame wasn't loaded yet and a nearby one was
  drawn. For video, it means the shown frame was more than 1 frame from the
  target.
- **reverse scrolls**: number of direction changes.
- Canvas only:
  - frame target/drawn and frames loaded vs total
  - time to first and to all frames
  - **decoded mem ≈ frames × w × h × 4**
- Video only:
  - target/shown frame and `currentTime`
  - seeks issued and coalesced
  - seek latency, average and max (seek start to frame presented)
  - buffered %, `readyState`, and time to metadata and to `canplaythrough`
- **network**: bytes from Resource Timing, split into sequence assets and fonts.
  Media range requests may be under-reported by some browsers.

`window.__proto` exposes the same numbers for scripted testing.

## Assets (bytes)

| Asset | Bytes |
|---|---|
| `assets/frames-1280/` 144 × WebP q72, 1280×720 | 6,879,062 |
| `assets/frames-640/` 144 × WebP q70, 640×360 | 1,768,938 |
| `assets/filaments-1280-intra.mp4` H.264, all-intra (`-g 1`), CRF 23, faststart, no audio | 6,256,777 |
| `assets/filaments-1280-g5.mp4` H.264, GOP 5, no B-frames, CRF 23, faststart | 4,372,103 |
| `assets/filaments-640-intra.mp4` H.264 all-intra, 640×360 | 1,531,038 |
| `assets/filaments-1280-g5.webm` VP9, GOP 5, CRF 48 | 5,759,094 |
| Brand fonts loaded (Science Gothic 2.73 MB + Prototype + Exo) | ≈2,862,000 |

Decoded memory for canvas, all frames held as bitmaps: 1280 set ≈ 530.8 MB,
640 set ≈ 132.7 MB. This is the main risk of the canvas method on phones.

Regenerate the placeholder (from the repo root; needs numpy and Pillow; writes
PNG and WebP frames to OUT):

```bash
python3 prototypes/scroll-scrub-compare/assets/gen_frames.py OUT assets/fonts/prototype/Prototype.ttf
cd OUT
ffmpeg -framerate 24 -i png-tmp/f%03d.png -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p \
  -g 1 -keyint_min 1 -sc_threshold 0 -an -movflags +faststart filaments-1280-intra.mp4
ffmpeg -framerate 24 -i png-tmp/f%03d.png -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p \
  -g 5 -keyint_min 5 -sc_threshold 0 -bf 0 -an -movflags +faststart filaments-1280-g5.mp4
ffmpeg -framerate 24 -i png-tmp/f%03d.png -vf scale=640:360 -c:v libx264 -preset slow -crf 24 \
  -pix_fmt yuv420p -g 1 -an -movflags +faststart filaments-640-intra.mp4
ffmpeg -framerate 24 -i png-tmp/f%03d.png -c:v libvpx-vp9 -b:v 0 -crf 48 -g 5 -row-mt 1 -an filaments-1280-g5.webm
```

No third-party scripts, CDNs, GSAP, ScrollTrigger or Lenis are used.
