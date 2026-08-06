(() => {
  "use strict";

  const experience = document.querySelector("[data-privacy-experience]");
  if (!experience) return;

  const journey = experience.querySelector("[data-privacy-journey]");
  const phrases = [...experience.querySelectorAll("[data-privacy-phrase]")];
  const currentCount = experience.querySelector("[data-privacy-current-count]");
  const livePhrase = experience.querySelector("[data-privacy-live-phrase]");
  const calmEnding = experience.querySelector("[data-privacy-calm]");
  const primaryAudio = experience.querySelector("[data-privacy-end-audio]");
  const armButton = experience.querySelector("[data-privacy-audio-arm]");
  const muteButton = experience.querySelector("[data-privacy-audio-mute]");
  const playButton = experience.querySelector("[data-privacy-audio-play]");
  const motionButton = experience.querySelector("[data-privacy-motion-toggle]");
  const audioStatus = experience.querySelector("[data-privacy-audio-status]");
  const stageOnePhrase = phrases[0];
  const stageOneWords = [
    ...stageOnePhrase.querySelectorAll("[data-privacy-word]")
  ];

  const requiredElements = [
    journey,
    currentCount,
    livePhrase,
    calmEnding,
    primaryAudio,
    armButton,
    muteButton,
    playButton,
    motionButton,
    audioStatus
  ];

  if (
    phrases.length !== 9
    || stageOneWords.length !== 4
    || requiredElements.some((element) => !element)
  ) {
    return;
  }

  const systemReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const offsets = [
    [0, 0, 1],
    [0, 0, 1],
    [-0.4, 0.3, 1],
    [0.8, -0.5, 1.008],
    [-1.4, 0.7, 1.012],
    [2.1, -1.1, 1.016],
    [-1.2, 1.1, 1.012],
    [1.5, -1.4, 1.015],
    [0, 0, 1]
  ];

  const audioLayers = [
    {
      audio: primaryAudio,
      key: "texture",
      label: "extraction cue",
      passes: 2,
      startProgress: .58,
      resetProgress: .52,
      firstFadeInSeconds: 1.1,
      loopFadeSeconds: .65,
      finalFadeSeconds: 2.1,
      maxVolume: .7,
      pass: 0,
      triggered: false,
      blockedUntilReset: false,
      completed: false,
      frame: 0
    }
  ];

  let activeIndex = -1;
  let sceneTicking = false;
  let visibilityTicking = false;
  let audioArmed = false;
  let consentGranted = false;
  let manualPaused = false;
  let manualReduce = false;
  let lastProgress = 0;
  let experienceWasInView = false;
  let activeWordStep = -1;

  function clamp(value, min = 0, max = 1) {
    return Math.min(max, Math.max(min, value));
  }

  function setAudioStatus(message) {
    audioStatus.textContent = message;
  }

  function effectiveReducedMotion() {
    return manualReduce || systemReduce.matches;
  }

  function setStageOneWordStep(step) {
    const safeStep = Math.round(clamp(step, 0, stageOneWords.length));
    if (safeStep === activeWordStep) return;
    activeWordStep = safeStep;
    stageOnePhrase.dataset.wordStep = String(safeStep);

    stageOneWords.forEach((word, wordIndex) => {
      word.classList.toggle("is-revealed", wordIndex < safeStep);
    });
  }

  function setActivePhrase(index) {
    if (index === activeIndex || effectiveReducedMotion()) return;
    activeIndex = index;

    phrases.forEach((phrase, phraseIndex) => {
      phrase.classList.toggle("is-active", phraseIndex === index);
      phrase.setAttribute("aria-hidden", String(phraseIndex !== index));
    });

    currentCount.textContent = String(index + 1).padStart(2, "0");
    const phraseLabel =
      phrases[index].dataset.privacyLabel || phrases[index].textContent.trim();
    livePhrase.textContent =
      `${phraseLabel}. Stage ${index + 1} of ${phrases.length}.`;
  }

  function triggeredLayers() {
    return audioLayers.filter((layer) => layer.triggered);
  }

  function playingLayers() {
    return audioLayers.filter((layer) => layer.triggered && !layer.audio.paused);
  }

  function mixIsMuted() {
    return audioLayers.every((layer) => layer.audio.muted);
  }

  function updateAudioButtons() {
    const activeLayers = triggeredLayers();
    const mixPlaying = playingLayers().length > 0;

    armButton.setAttribute("aria-pressed", String(audioArmed));
    armButton.textContent = audioArmed ? "Disable end audio" : "Enable end audio";
    muteButton.disabled = !audioArmed;
    muteButton.setAttribute("aria-pressed", String(mixIsMuted()));
    muteButton.textContent = mixIsMuted() ? "Unmute" : "Mute";
    playButton.disabled = !audioArmed || activeLayers.length === 0;
    playButton.setAttribute("aria-pressed", String(mixPlaying));
    playButton.textContent = mixPlaying ? "Pause" : "Play";
    experience.classList.toggle("is-audio-armed", audioArmed);
    experience.classList.toggle(
      "is-audio-playing",
      audioArmed && mixPlaying
    );
  }

  function setPlayingStatus() {
    const parts = playingLayers().map((layer) => {
      return `${layer.label} ${layer.pass + 1}/${layer.passes}`;
    });
    const muted = mixIsMuted() ? " muted" : "";

    if (parts.length > 0) {
      setAudioStatus(`End mix playing${muted} - ${parts.join(" + ")}`);
      return;
    }

    const activeLayers = triggeredLayers();
    if (activeLayers.length > 0 && activeLayers.every((layer) => layer.completed)) {
      setAudioStatus("End audio complete - two extraction passes");
    }
  }

  function stopEnvelope(layer) {
    if (!layer.frame) return;
    window.cancelAnimationFrame(layer.frame);
    layer.frame = 0;
  }

  function runEnvelope(layer) {
    stopEnvelope(layer);

    function updateVolume() {
      if (layer.audio.paused) {
        layer.frame = 0;
        return;
      }

      const duration = Number.isFinite(layer.audio.duration)
        ? layer.audio.duration
        : 0;
      const fadeInSeconds = layer.pass === 0
        ? layer.firstFadeInSeconds
        : layer.loopFadeSeconds;
      const fadeOutSeconds = layer.pass === layer.passes - 1
        ? layer.finalFadeSeconds
        : layer.loopFadeSeconds;
      const fadeIn = clamp(layer.audio.currentTime / fadeInSeconds);
      const fadeOut = duration > 0
        ? clamp((duration - layer.audio.currentTime) / fadeOutSeconds)
        : 1;
      const envelope = Math.min(fadeIn, fadeOut);

      layer.audio.volume = layer.maxVolume * envelope;
      layer.audio.dataset.envelope = envelope.toFixed(3);
      layer.audio.dataset.mixLevel = layer.audio.volume.toFixed(3);
      layer.audio.dataset.pass = String(layer.pass + 1);
      layer.frame = window.requestAnimationFrame(updateVolume);
    }

    updateVolume();
  }

  function prepareLayer(layer, clearTrigger = false) {
    stopEnvelope(layer);
    layer.audio.pause();
    layer.audio.currentTime = 0;
    layer.audio.volume = 0;
    layer.pass = 0;
    layer.completed = false;
    layer.audio.dataset.envelope = "0.000";
    layer.audio.dataset.mixLevel = "0.000";
    layer.audio.dataset.pass = "1";

    if (clearTrigger) {
      layer.triggered = false;
    }
  }

  function prepareAllLayers(clearTriggers = false) {
    audioLayers.forEach((layer) => prepareLayer(layer, clearTriggers));
  }

  async function playLayer(layer) {
    if (
      !audioArmed
      || !consentGranted
      || document.visibilityState !== "visible"
      || !layer.triggered
      || layer.completed
    ) {
      return;
    }

    try {
      await layer.audio.play();
      runEnvelope(layer);
      setPlayingStatus();
    } catch {
      setAudioStatus("End mix ready - press Play");
    }
    updateAudioButtons();
  }

  function triggerLayer(layer, shouldPlay = true) {
    if (!audioArmed || !consentGranted || layer.triggered) return;
    layer.triggered = true;
    prepareLayer(layer);

    if (shouldPlay && !manualPaused && !effectiveReducedMotion()) {
      playLayer(layer);
    }
    updateAudioButtons();
  }

  function resetLayer(layer) {
    if (!layer.triggered) return;
    prepareLayer(layer, true);
    updateAudioButtons();
  }

  function stopAndDisarmMix(message) {
    if (!audioArmed && !consentGranted && playingLayers().length === 0) return;
    audioArmed = false;
    consentGranted = false;
    manualPaused = false;
    prepareAllLayers(true);
    setAudioStatus(message);
    updateAudioButtons();
  }

  function updateScene() {
    sceneTicking = false;

    const rect = journey.getBoundingClientRect();
    const travel = Math.max(1, rect.height - window.innerHeight);
    const progress = clamp(-rect.top / travel);
    lastProgress = progress;

    if (effectiveReducedMotion()) {
      experience.style.setProperty("--privacy-progress", progress.toFixed(4));
      setStageOneWordStep(stageOneWords.length);

      if (
        audioArmed
        && consentGranted
        && calmEnding.getBoundingClientRect().top < window.innerHeight * .82
      ) {
        audioLayers.forEach((layer) => triggerLayer(layer, false));
        setAudioStatus("End mix ready - press Play");
        updateAudioButtons();
      }
      return;
    }

    const phraseWindow = .82;
    const phraseProgress = clamp(progress / phraseWindow);
    const phrasePosition = phraseProgress * phrases.length;
    const index = Math.min(
      phrases.length - 1,
      Math.floor(phrasePosition)
    );
    const stageOneProgress = clamp(phrasePosition);
    const stageOneWordStep = index === 0
      ? Math.min(
          stageOneWords.length,
          Math.floor(stageOneProgress * stageOneWords.length) + 1
        )
      : stageOneWords.length;
    const pressure = clamp((index - 1) / 7);
    const release = clamp((progress - .86) / .11);
    const [x, y, scale] = offsets[index];

    experience.style.setProperty("--privacy-progress", progress.toFixed(4));
    experience.style.setProperty("--privacy-pressure", pressure.toFixed(4));
    experience.style.setProperty("--privacy-release", release.toFixed(4));
    experience.style.setProperty(
      "--privacy-trace",
      clamp(progress / .84).toFixed(4)
    );
    experience.style.setProperty("--privacy-phrase-x", `${x}vw`);
    experience.style.setProperty("--privacy-phrase-y", `${y}vh`);
    experience.style.setProperty("--privacy-phrase-scale", scale);
    experience.dataset.stage = String(index + 1);
    setStageOneWordStep(stageOneWordStep);
    setActivePhrase(index);

    audioLayers.forEach((layer) => {
      if (progress < layer.resetProgress) {
        layer.blockedUntilReset = false;
        if (layer.triggered) {
          resetLayer(layer);
        }
      } else if (
        audioArmed
        && consentGranted
        && !layer.blockedUntilReset
        && progress >= layer.startProgress
        && !layer.triggered
      ) {
        triggerLayer(layer);
      }
    });

    if (audioArmed && triggeredLayers().length === 0) {
      setAudioStatus(
        audioLayers.some((layer) => layer.blockedUntilReset)
          ? "Audio armed - scroll back before the escalation to begin"
          : "End audio armed"
      );
    }
  }

  function requestSceneUpdate() {
    if (sceneTicking) return;
    sceneTicking = true;
    window.requestAnimationFrame(updateScene);
  }

  function updateExperienceVisibility() {
    visibilityTicking = false;
    const rect = experience.getBoundingClientRect();
    const inView =
      rect.bottom > window.innerHeight * .55
      && rect.top < window.innerHeight;

    experience.classList.toggle("is-in-view", inView);
    if (!inView && experienceWasInView) {
      stopAndDisarmMix("End audio stopped - enable it again when ready");
    }
    experienceWasInView = inView;
  }

  function requestVisibilityUpdate() {
    if (visibilityTicking) return;
    visibilityTicking = true;
    window.requestAnimationFrame(updateExperienceVisibility);
  }

  function applyMotionPreference() {
    const reduced = effectiveReducedMotion();
    experience.classList.toggle("is-reduced-motion", reduced);
    motionButton.setAttribute("aria-pressed", String(reduced));
    motionButton.disabled = systemReduce.matches;
    motionButton.textContent = systemReduce.matches
      ? "Reduced by system"
      : reduced
        ? "Use full motion"
        : "Reduce motion";

    phrases.forEach((phrase) => {
      if (reduced) {
        phrase.removeAttribute("aria-hidden");
      }
    });

    if (reduced && playingLayers().length > 0) {
      audioLayers.forEach((layer) => layer.audio.pause());
      manualPaused = true;
      setAudioStatus(
        audioArmed
          ? "End mix armed; manual play at ending"
          : "End audio is off"
      );
    }

    if (reduced) {
      activeIndex = -1;
    }

    updateAudioButtons();
    requestSceneUpdate();
  }

  armButton.addEventListener("click", () => {
    audioArmed = !audioArmed;
    consentGranted = audioArmed;
    manualPaused = false;

    if (!audioArmed) {
      prepareAllLayers(true);
      setAudioStatus("End audio is off");
    } else if (effectiveReducedMotion()) {
      audioLayers.forEach((layer) => {
        layer.blockedUntilReset = false;
      });
      setAudioStatus("End mix armed; manual play at ending");
    } else {
      let lateOptIn = false;

      audioLayers.forEach((layer) => {
        prepareLayer(layer, true);
        layer.blockedUntilReset = lastProgress >= layer.startProgress;
        lateOptIn = lateOptIn || layer.blockedUntilReset;
      });

      setAudioStatus(
        lateOptIn
          ? "Audio armed - scroll back before the escalation to begin"
          : "Audio armed - extraction cue enters at Recommended for you"
      );
    }

    updateAudioButtons();
  });

  muteButton.addEventListener("click", () => {
    const shouldMute = !mixIsMuted();
    audioLayers.forEach((layer) => {
      layer.audio.muted = shouldMute;
    });

    if (playingLayers().length > 0) {
      setPlayingStatus();
    } else {
      setAudioStatus(shouldMute ? "End mix armed and muted" : "End mix armed");
    }
    updateAudioButtons();
  });

  playButton.addEventListener("click", async () => {
    const activeLayers = triggeredLayers();
    const mixPlaying = playingLayers().length > 0;

    if (mixPlaying) {
      manualPaused = true;
      activeLayers.forEach((layer) => layer.audio.pause());
      setAudioStatus("End mix paused");
    } else {
      manualPaused = false;

      activeLayers.forEach((layer) => {
        if (layer.completed || layer.audio.ended) {
          prepareLayer(layer);
        }
      });

      await Promise.all(
        activeLayers
          .filter((layer) => !layer.completed)
          .map((layer) => playLayer(layer))
      );
    }
    updateAudioButtons();
  });

  motionButton.addEventListener("click", () => {
    if (systemReduce.matches) return;
    manualReduce = !manualReduce;
    applyMotionPreference();
  });

  audioLayers.forEach((layer) => {
    layer.audio.addEventListener("play", () => {
      if (
        !audioArmed
        || !consentGranted
        || document.visibilityState !== "visible"
        || !layer.triggered
      ) {
        layer.audio.pause();
        layer.audio.currentTime = 0;
        layer.audio.volume = 0;
        return;
      }
      runEnvelope(layer);
      updateAudioButtons();
    });

    layer.audio.addEventListener("pause", () => {
      stopEnvelope(layer);
      updateAudioButtons();
    });

    layer.audio.addEventListener("ended", async () => {
      stopEnvelope(layer);

      if (
        audioArmed
        && consentGranted
        && layer.triggered
        && layer.pass + 1 < layer.passes
      ) {
        layer.pass += 1;
        layer.audio.currentTime = 0;
        layer.audio.volume = 0;
        layer.audio.dataset.envelope = "0.000";
        layer.audio.dataset.mixLevel = "0.000";
        layer.audio.dataset.pass = String(layer.pass + 1);
        await playLayer(layer);
        return;
      }

      layer.completed = true;
      layer.audio.volume = 0;
      layer.audio.dataset.envelope = "0.000";
      layer.audio.dataset.mixLevel = "0.000";
      setPlayingStatus();
      updateAudioButtons();
    });

    layer.audio.addEventListener("error", () => {
      setAudioStatus(`${layer.label} could not be loaded`);
      updateAudioButtons();
    });
  });

  function handleScroll() {
    requestSceneUpdate();
    requestVisibilityUpdate();
  }

  function stopAndDisarmHiddenMix() {
    stopAndDisarmMix("End audio stopped - enable it again when ready");
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleScroll);
  window.addEventListener("pagehide", stopAndDisarmHiddenMix);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      stopAndDisarmHiddenMix();
    }
  });
  systemReduce.addEventListener("change", applyMotionPreference);

  prepareAllLayers(true);
  updateAudioButtons();
  applyMotionPreference();
  updateExperienceVisibility();
  experience.classList.add("is-enhanced");
  updateScene();
})();
