const spotlight = document.querySelector("[data-spotlight]");
const signalPlate = document.querySelector("[data-signal-plate]");

if (spotlight) {
  const setSpotlight = (event) => {
    const rect = spotlight.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const radius = Math.sqrt((rect.width * rect.height * 0.1) / Math.PI);
    const constrainedRadius = Math.max(130, Math.min(radius, 330));

    spotlight.classList.add("is-lit");
    spotlight.style.setProperty("--spot-x", `${x}px`);
    spotlight.style.setProperty("--spot-y", `${y}px`);
    spotlight.style.setProperty("--spot-radius", `${constrainedRadius}px`);
  };

  spotlight.addEventListener("pointerenter", (event) => {
    setSpotlight(event);
  });

  spotlight.addEventListener("pointermove", setSpotlight);

  spotlight.addEventListener("pointerleave", () => {
    spotlight.classList.remove("is-lit");
    spotlight.style.setProperty("--spot-radius", "0px");
  });
}

if (signalPlate) {
  const status = signalPlate.querySelector("[data-signal-status]");
  const output = signalPlate.querySelector("[data-signal-output]");
  const encryptedStatus = "KN://CROWNLESS_SIGNAL [ENCRYPTED]";
  const unlockedStatus = "PUBLIC SIGNAL UNLOCKED";
  const encryptedText = "54 48 45 20 52 45 56 4F 4C 55 54 49 4F 4E 20 48 41 53 20 4E 4F 20 54 48 52 4F 4E 45";
  const finalText = "THE REVOLUTION HAS NO THRONE";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let unlocked = false;

  const fitSignalTagline = () => {
    if (!signalPlate.classList.contains("is-unlocked")) {
      signalPlate.style.setProperty("--signal-tagline-scale", "1");
      return;
    }

    signalPlate.style.setProperty("--signal-tagline-scale", "1");

    const fit = (attempt = 0) => {
      const availableWidth = output.clientWidth;
      const renderedWidth = output.scrollWidth;

      if (availableWidth > 0 && renderedWidth > availableWidth) {
        const currentScale = Number(getComputedStyle(signalPlate).getPropertyValue("--signal-tagline-scale")) || 1;
        const scale = Math.max(0.22, currentScale * (availableWidth / renderedWidth) * 0.97);
        signalPlate.style.setProperty("--signal-tagline-scale", scale.toFixed(3));
      }

      if (attempt < 6 && output.scrollWidth > output.clientWidth) {
        window.requestAnimationFrame(() => fit(attempt + 1));
      }
    };

    window.requestAnimationFrame(() => fit());
  };

  const setEncryptedState = () => {
    signalPlate.classList.add("is-armed");
    signalPlate.classList.remove("is-unlocked", "is-revealing");
    signalPlate.style.setProperty("--signal-tagline-scale", "1");
    status.textContent = encryptedStatus;
    output.textContent = encryptedText;
  };

  const setFinalState = () => {
    status.textContent = unlockedStatus;
    output.innerHTML = 'THE REVOLUTION HAS NO <span class="signal-plate__throne">THRONE</span>';
    signalPlate.classList.remove("is-armed", "is-revealing");
    signalPlate.classList.add("is-unlocked");
    fitSignalTagline();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fitSignalTagline);
    }
  };

  const revealSignal = () => {
    if (unlocked) {
      return;
    }

    unlocked = true;

    if (prefersReducedMotion) {
      setFinalState();
      return;
    }

    signalPlate.classList.add("is-revealing");
    status.textContent = unlockedStatus;

    const totalFrames = finalText.length;
    const interval = 56;
    let frame = 0;

    const decrypt = window.setInterval(() => {
      frame += 1;
      const revealed = finalText.slice(0, frame);
      const remaining = encryptedText.slice(frame * 3);
      output.textContent = `${revealed}${remaining ? " " + remaining : ""}`;

      if (frame >= totalFrames) {
        window.clearInterval(decrypt);
        setFinalState();
      }
    }, interval);
  };

  setEncryptedState();

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.68) {
            revealSignal();
            observer.unobserve(signalPlate);
          }
        });
      },
      {
        root: null,
        threshold: [0.68, 0.82, 1],
      }
    );

    observer.observe(signalPlate);
  } else {
    setFinalState();
  }

  window.addEventListener("resize", fitSignalTagline);
}
