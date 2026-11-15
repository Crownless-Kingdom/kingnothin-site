/* Method B: optimized video seeking.
   rAF computes target time; seeks are throttled (never issued while a seek is in
   flight; the latest target is applied when the current one lands). Uses
   requestVideoFrameCallback when available to know which frame is on screen. */
(function () {
  'use strict';
  var S = window.KNStory, M = S.metrics, P = S.params;
  var FPS = 24, TOTAL = 144;
  var SOURCES = {
    intra: 'assets/filaments-1280-intra.mp4',
    g5: 'assets/filaments-1280-g5.mp4',
    m640: 'assets/filaments-640-intra.mp4',
    webm: 'assets/filaments-1280-g5.webm'
  };
  var key = P.get('src') || (window.innerWidth <= 700 ? 'm640' : 'intra');
  if (!SOURCES[key]) key = 'intra';
  var blobMode = P.get('blob') === '1';
  var v = document.querySelector('video');
  v.muted = true; v.defaultMuted = true; v.playsInline = true; v.preload = 'auto';
  var hasRVFC = 'requestVideoFrameCallback' in HTMLVideoElement.prototype;
  var t0 = performance.now(), tMeta = 0, tReady = 0, blobBytes = 0;

  var seeking = false, pending = -1, current = -1, shownFrame = -1, seekStart = 0;
  var lat = [], seeksIssued = 0, seeksCoalesced = 0, maxLat = 0;

  function frameTime(f) { return (f + 0.5) / FPS; } // aim mid-frame to avoid boundary ambiguity
  function issue(f) {
    seeking = true; current = f; seekStart = performance.now(); seeksIssued++;
    v.currentTime = frameTime(f);
  }
  function landed(frame) {
    var l = performance.now() - seekStart;
    lat.push(l); if (lat.length > 60) lat.shift(); if (l > maxLat) maxLat = l;
    shownFrame = frame; seeking = false;
    if (pending >= 0 && pending !== current) { var f = pending; pending = -1; issue(f); }
    else pending = -1;
  }
  if (hasRVFC) {
    var onFrame = function (now, meta) {
      var f = Math.min(TOTAL - 1, Math.floor(meta.mediaTime * FPS + 1e-3));
      if (seeking) landed(f); else shownFrame = f;
      v.requestVideoFrameCallback(onFrame);
    };
    v.requestVideoFrameCallback(onFrame);
    // Safety: if the frame callback doesn't fire (identical frame), fall back to 'seeked'.
    v.addEventListener('seeked', function () {
      setTimeout(function () { if (seeking) landed(current); }, 50);
    });
  } else {
    v.addEventListener('seeked', function () { landed(current); });
  }
  v.addEventListener('loadedmetadata', function () { tMeta = performance.now() - t0; });
  v.addEventListener('canplaythrough', function () { if (!tReady) tReady = performance.now() - t0; });
  v.addEventListener('error', function () { console.error('video error', v.error && v.error.code); });

  function unlock() { // iOS Safari: paint the first frame without audio/autoplay
    var pr = v.play();
    if (pr && pr.then) pr.then(function () { v.pause(); }).catch(function () {});
  }
  if (blobMode) {
    fetch(SOURCES[key]).then(function (r) { return r.blob(); }).then(function (b) {
      blobBytes = b.size; v.src = URL.createObjectURL(b); unlock();
    });
  } else { v.src = SOURCES[key]; unlock(); }

  var target = 0;
  function bufferedPct() {
    if (!v.duration || !v.buffered.length) return 0;
    var t = 0; for (var i = 0; i < v.buffered.length; i++) t += v.buffered.end(i) - v.buffered.start(i);
    return Math.round(100 * t / v.duration);
  }
  S.start('VIDEO · seek (' + key + (blobMode ? ', blob' : ', streamed') + ')', function () {
    target = Math.min(TOTAL - 1, Math.round(M.progress * (TOTAL - 1)));
    if (v.readyState >= 1) {
      if (!seeking && target !== current) issue(target);
      else if (seeking && target !== current) { if (pending >= 0) seeksCoalesced++; pending = target; }
    }
    if (shownFrame >= 0 && Math.abs(shownFrame - target) > 1) M.lateFrames++;
    var avg = lat.length ? lat.reduce(function (a, b) { return a + b; }, 0) / lat.length : 0;
    M.extra = { target: target, shown: shownFrame, seeksIssued: seeksIssued, coalesced: seeksCoalesced,
      avgSeekMs: avg, maxSeekMs: maxLat, tMeta: tMeta, tReady: tReady, buffered: bufferedPct(),
      rvfc: hasRVFC, src: key, blobBytes: blobBytes, readyState: v.readyState };
  }, function (fmt) {
    var e = M.extra;
    return 'frame target ' + target + '  shown ' + shownFrame + '  t ' + (v.currentTime || 0).toFixed(3) + 's\n' +
      'seeks ' + seeksIssued + '  coalesced ' + seeksCoalesced + '  rVFC ' + (hasRVFC ? 'yes' : 'no') + '\n' +
      'seek latency avg ' + Math.round(e.avgSeekMs || 0) + 'ms  max ' + Math.round(maxLat) + 'ms\n' +
      'buffered ' + e.buffered + '%  readyState ' + v.readyState + '\n' +
      'metadata ' + (tMeta ? Math.round(tMeta) + 'ms' : '…') + '  canplaythrough ' + (tReady ? Math.round(tReady) + 'ms' : '…') + '\n' +
      'decoded mem     n/a (inside video decoder)' + (blobMode ? '\nblob bytes ' + fmt(blobBytes) : '');
  });
})();
