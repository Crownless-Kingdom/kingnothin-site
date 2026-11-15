/* Shared story logic: scroll progress, approved text beats, debug overlay.
   Vanilla JS only (GSAP/ScrollTrigger/Lenis are NOT approved dependencies). */
(function () {
  'use strict';
  var STAGES = 8;            // visual stages across the scroll track
  var params = new URLSearchParams(location.search);
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Stage map (0-based stage index -> what is visible). Intro beats replace each other;
  // the closing declaration is cumulative (each line stays as the next appears).
  //  0 WELCOME TO | 1 KINGNOTHIN | 2 and the -> Crownless Kingdom
  //  3 Never before | 4 + In human history | 5 + Have we allowed | 6 + A system | 7 + So much influence (hold)
  var INTRO = [
    { sel: '[data-beat="welcome"]', from: 0.0, to: 1.0 },
    { sel: '[data-beat="name"]', from: 1.0, to: 2.0 },
    { sel: '[data-beat="andthe"]', from: 2.0, to: 3.0 },
    { sel: '[data-beat="crownless"]', from: 2.4, to: 3.0 }
  ];
  var LINES = [3.0, 4.0, 5.0, 6.0, 7.0]; // stage at which each declaration line appears

  var track = document.querySelector('.track');
  var root = document.documentElement;
  if (params.get('len')) root.style.setProperty('--track', parseInt(params.get('len'), 10) + 'vh');
  if (params.get('w')) root.style.setProperty('--kn-wght', parseInt(params.get('w'), 10));
  if (params.get('wdth')) root.style.setProperty('--kn-wdth', parseInt(params.get('wdth'), 10));
  if (params.get('gold') === '1') document.body.classList.add('gold-final');

  var intro = INTRO.map(function (b) { return { el: document.querySelector(b.sel), from: b.from, to: b.to }; });
  var lines = Array.prototype.slice.call(document.querySelectorAll('.declaration .line'));

  function progress() {
    if (reduced.matches) return 1;
    var r = track.getBoundingClientRect();
    var span = track.offsetHeight - window.innerHeight;
    if (span <= 0) return 1;
    return Math.min(1, Math.max(0, -r.top / span));
  }

  function applyText(p) {
    var s = p * STAGES;
    if (p >= 1) s = STAGES; // hold
    intro.forEach(function (b) { b.el.classList.toggle('is-on', s >= b.from && s < b.to); });
    lines.forEach(function (el, i) { el.classList.toggle('is-on', s >= LINES[i] || reduced.matches); });
    return Math.min(STAGES, Math.floor(s) + 1);
  }

  // ---------- controls ----------
  var debugEl = document.querySelector('.debug');
  if (params.get('debug') === '0') debugEl.hidden = true;
  var dbgBtn = document.querySelector('[data-act="debug"]');
  var goldBtn = document.querySelector('[data-act="gold"]');
  function sync() {
    dbgBtn.setAttribute('aria-pressed', String(!debugEl.hidden));
    goldBtn.setAttribute('aria-pressed', String(document.body.classList.contains('gold-final')));
  }
  dbgBtn.addEventListener('click', function () { debugEl.hidden = !debugEl.hidden; sync(); });
  goldBtn.addEventListener('click', function () { document.body.classList.toggle('gold-final'); sync(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'd' || e.key === 'D') { debugEl.hidden = !debugEl.hidden; sync(); }
    if (e.key === 'g' || e.key === 'G') { document.body.classList.toggle('gold-final'); sync(); }
  });
  sync();

  // ---------- loop + metrics ----------
  var M = window.__proto = {
    method: '', fps: 0, longFrames: 0, lateFrames: 0, reversals: 0, progress: 0, stage: 1,
    extra: {}
  };
  function bytesLoaded(match) {
    var total = 0;
    performance.getEntriesByType('resource').forEach(function (e) {
      if (!match || match.test(e.name)) total += Math.max(e.transferSize || 0, e.encodedBodySize || 0);
    });
    return total;
  }
  function fmtBytes(n) {
    if (n >= 1048576) return (n / 1048576).toFixed(2) + ' MB';
    if (n >= 1024) return (n / 1024).toFixed(1) + ' KB';
    return n + ' B';
  }

  function start(method, tick, describe) {
    M.method = method;
    var last = performance.now(), frames = 0, fpsT = last, lastP = -1, dir = 0, uiT = 0;
    function loop(now) {
      var dt = now - last; last = now; frames++;
      if (dt > 25 && document.visibilityState === 'visible') M.longFrames++; // >1.5x a 60Hz frame
      if (now - fpsT >= 1000) { M.fps = Math.round(frames * 1000 / (now - fpsT)); frames = 0; fpsT = now; }
      var p = progress();
      if (lastP >= 0 && p !== lastP) {
        var d = p > lastP ? 1 : -1;
        if (dir && d !== dir) M.reversals++;
        dir = d;
      }
      lastP = p; M.progress = p;
      M.stage = applyText(p);
      tick(p, now);
      if (!debugEl.hidden && now - uiT > 120) {
        uiT = now;
        debugEl.innerHTML =
          '<b>' + method + '</b>   stage ' + M.stage + '/' + STAGES + '   p ' + p.toFixed(3) + '\n' +
          'draw-loop fps   ' + M.fps + '\n' +
          'long rAF (>25ms) ' + M.longFrames + '   late frames ' + M.lateFrames + '\n' +
          'reverse scrolls ' + M.reversals + '\n' +
          describe(fmtBytes) + '\n' +
          'network: sequence ' + fmtBytes(bytesLoaded(/scroll-scrub-compare\/assets\//)) +
          '  fonts ' + fmtBytes(bytesLoaded(/\/fonts\//)) +
          (reduced.matches ? '\nprefers-reduced-motion: ON (final state)' : '');
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  window.KNStory = { start: start, params: params, reduced: reduced, bytesLoaded: bytesLoaded, metrics: M };
})();
