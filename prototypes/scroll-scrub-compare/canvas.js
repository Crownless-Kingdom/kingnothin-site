/* Method A: canvas image-sequence scrubbing.
   Progressive preload (coarse keyframes first, then fill), decode off-thread with
   createImageBitmap, draw nearest loaded frame on requestAnimationFrame. */
(function () {
  'use strict';
  var S = window.KNStory, M = S.metrics, P = S.params;
  var TOTAL = 144;
  var set = P.get('set') || (Math.min(window.innerWidth, window.innerHeight * 16 / 9) <= 700 ? '640' : '1280');
  var FW = set === '640' ? 640 : 1280, FH = set === '640' ? 360 : 720;
  var base = 'assets/frames-' + set + '/f';
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d', { alpha: false });
  var frames = new Array(TOTAL), loaded = 0, t0 = performance.now(), tAll = 0, tFirst = 0;

  // Load order: every 16th, 8th, 4th, 2nd, then the rest (keyframes first).
  var order = [], seen = {};
  [16, 8, 4, 2, 1].forEach(function (step) {
    for (var i = 0; i < TOTAL; i += step) if (!seen[i]) { seen[i] = 1; order.push(i); }
  });
  if (!seen[TOTAL - 1]) order.splice(1, 0, TOTAL - 1);
  else { order.splice(order.indexOf(TOTAL - 1), 1); order.splice(1, 0, TOTAL - 1); }

  // Reduced motion: only the final frame is ever shown, so load only that.
  if (S.reduced.matches) order = [TOTAL - 1];
  var CONC = 6, next = 0;
  function pad(i) { return ('00' + i).slice(-3); }
  function decode(blob) {
    if (window.createImageBitmap) return createImageBitmap(blob);
    return new Promise(function (res, rej) {
      var img = new Image(); img.onload = function () { res(img); }; img.onerror = rej;
      img.src = URL.createObjectURL(blob);
    });
  }
  function pump() {
    if (next >= order.length) return;
    var i = order[next++];
    fetch(base + pad(i) + '.webp').then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.blob();
    }).then(decode).then(function (bmp) {
      frames[i] = bmp; loaded++;
      if (loaded === 1) tFirst = performance.now() - t0;
      if (loaded === order.length) tAll = performance.now() - t0;
      dirty = true;
    }).catch(function (e) { console.warn('frame', i, e); })
      .then(pump);
  }
  for (var c = 0; c < CONC; c++) pump();

  var dpr = Math.min(window.devicePixelRatio || 1, 2), cw = 0, ch = 0, dirty = true, drawn = -1, target = 0;
  function resize() {
    var w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
    if (w !== cw || h !== ch) { canvas.width = cw = w; canvas.height = ch = h; dirty = true; }
  }
  window.addEventListener('resize', resize);
  resize();

  function nearest(t) {
    if (frames[t]) return t;
    for (var d = 1; d < TOTAL; d++) {
      if (t - d >= 0 && frames[t - d]) return t - d;
      if (t + d < TOTAL && frames[t + d]) return t + d;
    }
    return -1;
  }
  function draw(i) {
    var img = frames[i];
    var s = Math.max(cw / FW, ch / FH), w = FW * s, h = FH * s;
    ctx.fillStyle = '#0A0A0B'; ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }

  S.start('CANVAS · image sequence (' + set + ')', function (p) {
    resize();
    target = Math.min(TOTAL - 1, Math.round(p * (TOTAL - 1)));
    var n = nearest(target);
    if (n < 0) return;
    if (n !== target) M.lateFrames++;
    if (n !== drawn || dirty) { draw(n); drawn = n; dirty = false; }
    M.extra = { target: target, drawn: drawn, loaded: loaded, total: TOTAL, tFirst: tFirst, tAll: tAll,
      decodedBytes: loaded * FW * FH * 4, set: set };
  }, function (fmt) {
    return 'frame target ' + target + '  drawn ' + drawn + '\n' +
      'frames loaded   ' + loaded + '/' + TOTAL + '\n' +
      'first frame ' + (tFirst ? Math.round(tFirst) + 'ms' : '…') + '  all ' + (tAll ? Math.round(tAll) + 'ms' : '…') + '\n' +
      'decoded mem ≈   ' + fmt(loaded * FW * FH * 4) + ' (frames×w×h×4)';
  });
})();
