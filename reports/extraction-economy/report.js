(() => {
  "use strict";

  const root = document.documentElement;
  const progress = document.querySelector(".reading-progress span");
  const contentsButton = document.querySelector(".chapter-rail > button");
  const chapterLinks = document.getElementById("chapter-links");
  const layers = Array.from(document.querySelectorAll("details.layer"));

  const updateProgress = () => {
    const available = root.scrollHeight - window.innerHeight;
    const amount = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
    progress?.style.setProperty("--reading-progress", amount.toString());
  };

  contentsButton?.addEventListener("click", () => {
    const expanded = contentsButton.getAttribute("aria-expanded") === "true";
    contentsButton.setAttribute("aria-expanded", String(!expanded));
    chapterLinks?.classList.toggle("is-open", !expanded);
  });

  chapterLinks?.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      contentsButton?.setAttribute("aria-expanded", "false");
      chapterLinks.classList.remove("is-open");
    }
  });

  document.querySelectorAll("[data-layer-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const shouldOpen = button.getAttribute("data-layer-action") === "open";
      layers.forEach((layer) => {
        layer.open = shouldOpen;
      });
      if (shouldOpen) layers[0]?.querySelector("summary")?.focus();
    });
  });

  document.querySelectorAll(".mechanism-map a").forEach((link) => {
    link.addEventListener("click", () => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target instanceof HTMLDetailsElement) target.open = true;
    });
  });

  document.querySelectorAll("a.citation").forEach((link) => {
    link.addEventListener("click", () => {
      const sourceRecord = document.querySelector(".sources-section > details");
      if (sourceRecord instanceof HTMLDetailsElement) sourceRecord.open = true;
    });
  });

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();
})();
