document.documentElement.classList.add("js-enabled");

const spotlight = document.querySelector("[data-spotlight]");
const signalPlate = document.querySelector("[data-signal-plate]");
const extractionSection = document.querySelector("[data-extraction-section]");
const privacySpace = document.querySelector("[data-privacy-space]");

if (spotlight) {
  const setSpotlight = (event) => {
    const rect = spotlight.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const radius = Math.sqrt((rect.width * rect.height * 0.1) / Math.PI);
    const constrainedRadius = Math.max(187, Math.min(radius * 1.298, 473));

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
  let decryptTimer = null;

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
    if (decryptTimer) {
      window.clearInterval(decryptTimer);
      decryptTimer = null;
    }

    unlocked = false;
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

    decryptTimer = window.setInterval(() => {
      frame += 1;
      const revealed = finalText.slice(0, frame);
      const remaining = encryptedText.slice(frame * 3);
      output.textContent = `${revealed}${remaining ? " " + remaining : ""}`;

      if (frame >= totalFrames) {
        window.clearInterval(decryptTimer);
        decryptTimer = null;
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
          } else if (!entry.isIntersecting) {
            setEncryptedState();
          }
        });
      },
      {
        root: null,
        threshold: [0, 0.68, 0.82, 1],
      }
    );

    observer.observe(signalPlate);
  } else {
    setFinalState();
  }

  window.addEventListener("resize", fitSignalTagline);
}

if (extractionSection) {
  const experience = extractionSection.querySelector("[data-extraction-experience]");

  if (experience) {
    const actionSelector = experience.querySelector("[data-action-selector]");
    const actionButtons = experience.querySelectorAll("[data-scenario]");
    const journey = experience.querySelector("[data-journey]");
    const stageTitle = experience.querySelector("[data-stage-title]");
    const stageIndex = experience.querySelector("[data-stage-index]");
    const stageSupport = experience.querySelector("[data-stage-support]");
    const stageDescription = experience.querySelector("[data-stage-description]");
    const stageChoices = experience.querySelector("[data-stage-choices]");
    const returnRecord = experience.querySelector("[data-return-record]");
    const backButton = experience.querySelector("[data-journey-back]");
    const nextButton = experience.querySelector("[data-journey-next]");
    const returnButton = experience.querySelector("[data-return-actions]");
    const traceAgainButton = experience.querySelector("[data-trace-again]");
    const chooseAnotherButton = experience.querySelector("[data-choose-another]");
    const progressItems = experience.querySelectorAll("[data-progress-stage]");
    const routeVisual = experience.querySelector("[data-route-visual]");
    const routeNodes = experience.querySelector("[data-route-nodes]");
    const pullback = experience.querySelector("[data-pullback]");
    const pullbackTitle = experience.querySelector("#extraction-pullback-title");
    const pullbackMap = experience.querySelector("[data-pullback-map]");
    const journeySummary = experience.querySelector("[data-journey-summary]");
    const liveRegion = experience.querySelector("[data-journey-live]");
    const reducedJourneyMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scenarioBlueprints = [
      {
        id: "search",
        action: "Search for information",
        teaser: "An answer begins a longer journey.",
        actTitle: "You search for information",
        actDescription: "This is all you did. The action begins with you.",
        inferences: [
          ["concern", "Concern", "The search may suggest that something currently matters to you."],
          ["interest", "Interest", "The search could indicate a subject you want to understand."],
          ["vulnerability", "Vulnerability", "The search may contribute to an inference about a difficult moment."],
          ["urgency", "Urgency", "The timing and repetition could be interpreted as urgency."],
          ["purchase-intent", "Purchase intent", "The search may suggest that a decision is approaching."],
          ["future-need", "Future need", "The search could contribute to a prediction about what you may need next."],
        ],
        destinations: [
          ["service-platform", "The platform providing the service"],
          ["analytics-provider", "An analytics provider"],
          ["advertising-network", "An advertising network"],
        ],
        yields: [
          ["search-advertising", "Search advertising", "An answer", "A stronger model of your interests and possible future needs"],
          ["audience-profiling", "Audience profiling", "Relevant information", "A more detailed commercial profile built from the search"],
          ["predictive-targeting", "Predictive targeting", "A faster route to a result", "A prediction about what may influence your next decision"],
        ],
      },
      {
        id: "product",
        action: "Pause over a product",
        teaser: "Hesitation is still a signal.",
        actTitle: "You pause over a product",
        actDescription: "You looked for a moment longer. The action begins with you.",
        inferences: [
          ["desire", "Desire", "The pause may suggest that the product holds your interest."],
          ["price-sensitivity", "Price sensitivity", "The pause could be interpreted as concern about cost."],
          ["purchase-readiness", "Purchase readiness", "The pause may contribute to a prediction that you are close to buying."],
          ["brand-preference", "Brand preference", "The product viewed could indicate a developing preference."],
          ["financial-capacity", "Financial capacity", "The context may contribute to an estimate of what you can afford."],
          ["conversion", "Likelihood of conversion", "The pause may help estimate whether another prompt could lead to purchase."],
        ],
        destinations: [
          ["retailer", "A retailer"],
          ["recommendation-system", "A recommendation system"],
          ["data-broker", "A data broker"],
        ],
        yields: [
          ["retargeting", "Retargeting", "A reminder or recommendation", "A persistent commercial signal connected to the product"],
          ["conversion-prediction", "Conversion prediction", "Greater shopping convenience", "A refined estimate of what may persuade you to buy"],
          ["pricing-optimization", "Pricing optimization", "A more relevant offer", "Additional leverage in deciding which offer to present"],
        ],
      },
      {
        id: "location",
        action: "Carry your phone through the world",
        teaser: "Movement becomes a pattern.",
        actTitle: "You carry your phone through the world",
        actDescription: "You moved through an ordinary day. The action begins with you.",
        inferences: [
          ["home", "Home", "Repeated presence may suggest where home is."],
          ["workplace", "Workplace", "A recurring weekday location could indicate where you work."],
          ["routine", "Routine", "Repeated movement may contribute to a model of your routine."],
          ["frequent-places", "Frequently visited locations", "Return visits could identify places that matter to you."],
          ["associations", "Associations", "Shared location patterns may suggest connections with others."],
          ["purchasing-patterns", "Purchasing patterns", "Visits to commercial areas may contribute to predictions about spending."],
        ],
        destinations: [
          ["location-service", "A location service"],
          ["location-analytics", "An analytics provider"],
          ["commercial-partner", "A commercial partner"],
        ],
        yields: [
          ["location-intelligence", "Location intelligence", "Navigation and local services", "A continuing model of the places you return to"],
          ["audience-segmentation", "Audience segmentation", "Suggestions connected to where you are", "A commercial category shaped by movement and place"],
          ["behavioural-forecasting", "Behavioural forecasting", "Timely local information", "A prediction about where you may go and what you may do next"],
        ],
      },
      {
        id: "attention",
        action: "Scroll, watch and react",
        teaser: "Attention leaves a shape behind.",
        actTitle: "You give something your attention",
        actDescription: "You watched, paused or reacted. The action begins with you.",
        inferences: [
          ["attention", "Attention", "Time spent may suggest what can hold your focus."],
          ["mood", "Mood", "Patterns of viewing could contribute to an inference about mood."],
          ["curiosity", "Curiosity", "A pause or return may indicate a subject you want to explore."],
          ["susceptibility", "Susceptibility", "A response may help estimate which messages affect you."],
          ["cultural-interest", "Political or cultural interest", "Repeated engagement could indicate an area of interest."],
          ["engagement", "Engagement likelihood", "Past attention may be used to predict what will keep you present."],
        ],
        destinations: [
          ["content-platform", "The platform providing the content"],
          ["recommendation-engine", "A recommendation engine"],
          ["measurement-system", "A measurement system"],
        ],
        yields: [
          ["advertising-revenue", "Advertising revenue", "Selected content", "A stronger model of what can hold your attention"],
          ["longer-engagement", "Longer engagement", "A continuous stream of material", "Greater leverage over how long you remain"],
          ["recommendation-refinement", "Recommendation refinement", "More relevant recommendations", "A more precise prediction of what you will choose next"],
        ],
      },
      {
        id: "connection",
        action: "Communicate with others",
        teaser: "Connection can become a map.",
        actTitle: "You communicate with another person",
        actDescription: "You made a human connection. The action begins with you.",
        inferences: [
          ["relationships", "Relationships", "Frequency and duration may suggest who matters to you."],
          ["influence", "Influence", "Patterns of response could indicate who affects your choices."],
          ["trust", "Trust", "Repeated private contact may contribute to an inference about trust."],
          ["contact-frequency", "Frequency of contact", "Communication patterns can show how often a connection is active."],
          ["social-structure", "Social structure", "Connections among people may reveal the shape of a group."],
          ["network-importance", "Network importance", "Position within a network could suggest whose actions travel further."],
        ],
        destinations: [
          ["communication-platform", "A communication platform"],
          ["network-analytics", "An analytics system"],
          ["affiliated-service", "An affiliated service"],
        ],
        yields: [
          ["network-analysis", "Network analysis", "Communication and connection", "A more complete map of relationships and influence"],
          ["product-development", "Product development", "Features shaped around communication", "Patterns that inform how a service is designed and positioned"],
          ["customer-retention", "Customer retention", "A dependable way to stay connected", "A model of which relationships keep people returning"],
        ],
      },
    ];

    const extractionScenarios = scenarioBlueprints.map((scenario) => ({
      ...scenario,
      inferences: scenario.inferences.map(([id, label, description]) => ({
        id,
        label,
        description,
        destinations: scenario.destinations.map(([destinationId, destinationLabel]) => ({
          id: destinationId,
          label: destinationLabel,
          description: "One plausible destination connected to this kind of signal.",
          yields: scenario.yields.map(([yieldId, yieldLabel, returnValue, retainedValue]) => ({
            id: yieldId,
            label: yieldLabel,
            returnValue,
            retainedValue,
          })),
        })),
      })),
    }));

    const stageContent = [
      { roman: "I", title: "THE ACT", support: "What you do" },
      { roman: "II", title: "THE INTERPRETATION", support: "What they infer" },
      { roman: "III", title: "THE PASSAGE", support: "Where your data could go" },
      { roman: "IV", title: "THE YIELD", support: "How they profit" },
      { roman: "V", title: "THE RETURN", support: "How you profit" },
    ];

    const journeyState = {
      scenarioId: null,
      stage: 1,
      inferenceId: null,
      destinationId: null,
      yieldId: null,
    };

    const getScenario = () => extractionScenarios.find((scenario) => scenario.id === journeyState.scenarioId);
    const getInference = () => getScenario()?.inferences.find((item) => item.id === journeyState.inferenceId);
    const getDestination = () => getInference()?.destinations.find((item) => item.id === journeyState.destinationId);
    const getYield = () => getDestination()?.yields.find((item) => item.id === journeyState.yieldId);

    const announceJourney = (message) => {
      liveRegion.textContent = "";
      window.setTimeout(() => {
        liveRegion.textContent = message;
      }, 30);
    };

    const focusStageHeading = () => {
      window.requestAnimationFrame(() => stageTitle.focus({ preventScroll: true }));
    };

    const renderRoute = () => {
      routeVisual.style.setProperty("--journey-progress", ((journeyState.stage - 1) / 4).toFixed(2));
      routeNodes.innerHTML = [40, 270, 500, 730, 960]
        .map((x, index) => {
          const stageNumber = index + 1;
          const stateClass = stageNumber < journeyState.stage
            ? "is-complete"
            : stageNumber === journeyState.stage
              ? "is-current"
              : "";
          const yieldClass = stageNumber === 4 && stageNumber <= journeyState.stage ? "is-yield" : "";
          return `<circle class="extraction-route__node ${stateClass} ${yieldClass}" cx="${x}" cy="60" r="8"></circle>`;
        })
        .join("");
    };

    const createChoice = (item, selectedId, type) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `extraction-choice${type === "yield" ? " extraction-choice--yield" : ""}`;
      button.dataset.choiceType = type;
      button.dataset.choiceId = item.id;
      button.setAttribute("aria-pressed", String(item.id === selectedId));
      button.innerHTML = `<strong>${item.label}</strong><span>${item.description || "A plausible route this signal could take."}</span>`;
      return button;
    };

    const renderReturn = () => {
      const selectedYield = getYield();
      returnRecord.hidden = false;
      returnRecord.innerHTML = `
        <div><small>You receive</small><strong>${selectedYield.returnValue}</strong></div>
        <div><small>The system may retain</small><strong>${selectedYield.retainedValue}</strong></div>
      `;
    };

    const renderJourney = ({ moveFocus = false } = {}) => {
      const scenario = getScenario();
      const currentStage = stageContent[journeyState.stage - 1];
      const inference = getInference();
      const destination = getDestination();

      stageIndex.textContent = `${currentStage.roman} / ${currentStage.title}`;
      stageSupport.textContent = currentStage.support;
      stageChoices.replaceChildren();
      returnRecord.hidden = true;
      returnRecord.replaceChildren();
      backButton.disabled = journeyState.stage === 1;

      if (journeyState.stage === 1) {
        stageTitle.textContent = scenario.actTitle;
        stageDescription.textContent = scenario.actDescription;
        nextButton.textContent = "Continue";
        nextButton.disabled = false;
      } else if (journeyState.stage === 2) {
        stageTitle.textContent = "One action. Several possible meanings.";
        stageDescription.textContent = "These are possible inferences, not proven conclusions. Choose one interpretation to follow.";
        scenario.inferences.forEach((item) => stageChoices.append(createChoice(item, journeyState.inferenceId, "inference")));
        nextButton.textContent = "Follow this inference";
        nextButton.disabled = !journeyState.inferenceId;
      } else if (journeyState.stage === 3) {
        stageTitle.textContent = "The route is rarely visible from the action.";
        stageDescription.textContent = `${inference.label} could contribute to more than one data route. Choose one plausible destination.`;
        inference.destinations.forEach((item) => stageChoices.append(createChoice(item, journeyState.destinationId, "destination")));
        nextButton.textContent = "Follow this route";
        nextButton.disabled = !journeyState.destinationId;
      } else if (journeyState.stage === 4) {
        stageTitle.textContent = "Precision becomes commercial advantage.";
        stageDescription.textContent = "The system can profit by knowing more, predicting better and acting sooner. Choose one possible yield.";
        destination.yields.forEach((item) => {
          const choiceItem = { ...item, description: `A possible commercial use after passage through ${destination.label.toLowerCase()}.` };
          stageChoices.append(createChoice(choiceItem, journeyState.yieldId, "yield"));
        });
        nextButton.textContent = "See what returns";
        nextButton.disabled = !journeyState.yieldId;
      } else {
        stageTitle.textContent = "The service may pass. The asset may remain.";
        stageDescription.textContent = "You may receive real utility. The commercial model built from the action may continue producing value elsewhere.";
        renderReturn();
        nextButton.textContent = "View the larger system";
        nextButton.disabled = false;
      }

      progressItems.forEach((item) => {
        const itemStage = Number(item.dataset.progressStage);
        item.classList.toggle("is-complete", itemStage < journeyState.stage);
        if (itemStage === journeyState.stage) {
          item.setAttribute("aria-current", "step");
        } else {
          item.removeAttribute("aria-current");
        }
      });

      renderRoute();
      announceJourney(`${currentStage.title}. ${currentStage.support}.`);

      if (moveFocus) {
        focusStageHeading();
      }
    };

    const selectScenario = (scenarioId) => {
      journeyState.scenarioId = scenarioId;
      journeyState.stage = 1;
      journeyState.inferenceId = null;
      journeyState.destinationId = null;
      journeyState.yieldId = null;
      experience.classList.add("is-journey-open");
      journey.hidden = false;
      journey.classList.remove("is-pullback");
      pullback.hidden = true;
      renderJourney({ moveFocus: true });
      journey.scrollIntoView({ behavior: reducedJourneyMotion ? "auto" : "smooth", block: "start" });
    };

    const resetJourney = () => {
      journeyState.scenarioId = null;
      journeyState.stage = 1;
      journeyState.inferenceId = null;
      journeyState.destinationId = null;
      journeyState.yieldId = null;
      experience.classList.remove("is-journey-open");
      journey.classList.remove("is-pullback");
      journey.hidden = true;
      pullback.hidden = true;
      actionSelector.scrollIntoView({ behavior: reducedJourneyMotion ? "auto" : "smooth", block: "center" });
      window.requestAnimationFrame(() => actionButtons[0].focus({ preventScroll: true }));
      announceJourney("Returned to the five ordinary actions.");
    };

    const goToStage = (stage) => {
      journeyState.stage = Math.min(Math.max(stage, 1), 5);
      renderJourney({ moveFocus: true });
    };

    const escapeText = (value) => value.replace(/[&<>"]/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
    })[character]);

    const renderPullbackMap = () => {
      const scenario = getScenario();
      const inference = getInference();
      const destination = getDestination();
      const selectedYield = getYield();
      const selectedInferenceIndex = scenario.inferences.findIndex((item) => item.id === inference.id);
      const selectedDestinationIndex = inference.destinations.findIndex((item) => item.id === destination.id);
      const selectedYieldIndex = destination.yields.findIndex((item) => item.id === selectedYield.id);
      const isMobile = window.innerWidth <= 760;

      if (isMobile) {
        const inferenceXs = [70, 160, 250, 350, 440, 530];
        const destinationXs = [130, 300, 470];
        const yieldXs = [130, 300, 470];
        const ghostPaths = [
          ...inferenceXs.map((x) => `<path class="extraction-map__ghost" d="M300 70 Q300 150 ${x} 235"></path>`),
          ...inferenceXs.flatMap((fromX) => destinationXs.map((toX) => `<path class="extraction-map__ghost" d="M${fromX} 235 Q300 350 ${toX} 465"></path>`)),
          ...destinationXs.flatMap((fromX) => yieldXs.map((toX) => `<path class="extraction-map__ghost" d="M${fromX} 465 Q300 585 ${toX} 705"></path>`)),
          ...yieldXs.map((x) => `<path class="extraction-map__ghost" d="M${x} 705 Q300 830 300 950"></path>`),
        ].join("");
        const selectedPath = `M300 70 Q300 150 ${inferenceXs[selectedInferenceIndex]} 235 Q300 350 ${destinationXs[selectedDestinationIndex]} 465 Q300 585 ${yieldXs[selectedYieldIndex]} 705 Q300 830 300 950`;

        pullbackMap.innerHTML = `<svg viewBox="0 0 600 1020" role="img" aria-label="A composed network showing the selected journey among alternative possible routes">
          <defs><linearGradient id="selected-route-gradient-mobile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F5F0E8"></stop><stop offset="0.55" stop-color="#2A6B5E"></stop><stop offset="0.8" stop-color="#C9A84C"></stop><stop offset="1" stop-color="#A8A8A0"></stop></linearGradient></defs>
          ${ghostPaths}
          <path class="extraction-map__selected" style="stroke:url(#selected-route-gradient-mobile)" d="${selectedPath}"></path>
          <circle class="extraction-map__node extraction-map__node--selected" cx="300" cy="70" r="10"></circle>
          ${inferenceXs.map((x, index) => `<circle class="extraction-map__node ${index === selectedInferenceIndex ? "extraction-map__node--selected" : ""}" cx="${x}" cy="235" r="8"></circle>`).join("")}
          ${destinationXs.map((x, index) => `<circle class="extraction-map__node ${index === selectedDestinationIndex ? "extraction-map__node--selected" : ""}" cx="${x}" cy="465" r="9"></circle>`).join("")}
          ${yieldXs.map((x, index) => `<circle class="extraction-map__node ${index === selectedYieldIndex ? "extraction-map__node--yield" : ""}" cx="${x}" cy="705" r="9"></circle>`).join("")}
          <circle class="extraction-map__node extraction-map__node--selected" cx="300" cy="950" r="10"></circle>
          <text class="is-selected-label" x="300" y="34" text-anchor="middle">${escapeText(scenario.action)}</text>
          <text class="is-selected-label" x="300" y="285" text-anchor="middle">May suggest: ${escapeText(inference.label)}</text>
          <text class="is-selected-label" x="300" y="520" text-anchor="middle">Could reach: ${escapeText(destination.label)}</text>
          <text class="is-selected-label" x="300" y="760" text-anchor="middle">May yield: ${escapeText(selectedYield.label)}</text>
          <text class="is-selected-label" x="300" y="1000" text-anchor="middle">What returns / what remains</text>
        </svg>`;
      } else {
        const inferenceYs = [70, 165, 260, 360, 455, 550];
        const destinationYs = [150, 310, 470];
        const yieldYs = [150, 310, 470];
        const ghostPaths = [
          ...inferenceYs.map((y) => `<path class="extraction-map__ghost" d="M80 310 C180 310 210 ${y} 300 ${y}"></path>`),
          ...inferenceYs.flatMap((fromY) => destinationYs.map((toY) => `<path class="extraction-map__ghost" d="M300 ${fromY} C440 ${fromY} 470 ${toY} 590 ${toY}"></path>`)),
          ...destinationYs.flatMap((fromY) => yieldYs.map((toY) => `<path class="extraction-map__ghost" d="M590 ${fromY} C720 ${fromY} 740 ${toY} 860 ${toY}"></path>`)),
          ...yieldYs.map((y) => `<path class="extraction-map__ghost" d="M860 ${y} C980 ${y} 1010 310 1120 310"></path>`),
        ].join("");
        const selectedPath = `M80 310 C180 310 210 ${inferenceYs[selectedInferenceIndex]} 300 ${inferenceYs[selectedInferenceIndex]} C440 ${inferenceYs[selectedInferenceIndex]} 470 ${destinationYs[selectedDestinationIndex]} 590 ${destinationYs[selectedDestinationIndex]} C720 ${destinationYs[selectedDestinationIndex]} 740 ${yieldYs[selectedYieldIndex]} 860 ${yieldYs[selectedYieldIndex]} C980 ${yieldYs[selectedYieldIndex]} 1010 310 1120 310`;

        pullbackMap.innerHTML = `<svg viewBox="0 0 1200 620" role="img" aria-label="A composed network showing the selected journey among alternative possible routes">
          <defs><linearGradient id="selected-route-gradient" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F5F0E8"></stop><stop offset="0.55" stop-color="#2A6B5E"></stop><stop offset="0.8" stop-color="#C9A84C"></stop><stop offset="1" stop-color="#A8A8A0"></stop></linearGradient></defs>
          ${ghostPaths}
          <path class="extraction-map__selected" d="${selectedPath}"></path>
          <circle class="extraction-map__node extraction-map__node--selected" cx="80" cy="310" r="11"></circle>
          ${inferenceYs.map((y, index) => `<circle class="extraction-map__node ${index === selectedInferenceIndex ? "extraction-map__node--selected" : ""}" cx="300" cy="${y}" r="8"></circle>`).join("")}
          ${destinationYs.map((y, index) => `<circle class="extraction-map__node ${index === selectedDestinationIndex ? "extraction-map__node--selected" : ""}" cx="590" cy="${y}" r="9"></circle>`).join("")}
          ${yieldYs.map((y, index) => `<circle class="extraction-map__node ${index === selectedYieldIndex ? "extraction-map__node--yield" : ""}" cx="860" cy="${y}" r="9"></circle>`).join("")}
          <circle class="extraction-map__node extraction-map__node--selected" cx="1120" cy="310" r="11"></circle>
          <text class="is-selected-label" x="80" y="350" text-anchor="middle">THE ACT</text>
          ${scenario.inferences.map((item, index) => `<text class="${index === selectedInferenceIndex ? "is-selected-label" : ""}" x="320" y="${inferenceYs[index] + 5}">${escapeText(item.label)}</text>`).join("")}
          ${inference.destinations.map((item, index) => `<text class="${index === selectedDestinationIndex ? "is-selected-label" : ""}" x="610" y="${destinationYs[index] + 5}">${escapeText(item.label)}</text>`).join("")}
          ${destination.yields.map((item, index) => `<text class="${index === selectedYieldIndex ? "is-selected-label" : ""}" x="880" y="${yieldYs[index] + 5}">${escapeText(item.label)}</text>`).join("")}
          <text class="is-selected-label" x="1120" y="350" text-anchor="middle">THE RETURN</text>
        </svg>`;
      }
    };

    const renderPullback = () => {
      const scenario = getScenario();
      const inference = getInference();
      const destination = getDestination();
      const selectedYield = getYield();
      journey.classList.add("is-pullback");
      pullback.hidden = false;
      renderPullbackMap();
      journeySummary.innerHTML = `
        <div><small>I / THE ACT</small><strong>${scenario.action}</strong></div>
        <div><small>II / THE INTERPRETATION</small><strong>May suggest ${inference.label}</strong></div>
        <div><small>III / THE PASSAGE</small><strong>Could reach ${destination.label}</strong></div>
        <div><small>IV / THE YIELD</small><strong>May create ${selectedYield.label}</strong></div>
        <div><small>V / THE RETURN</small><strong>${selectedYield.returnValue}; the system may retain ${selectedYield.retainedValue.toLowerCase()}</strong></div>
      `;
      announceJourney("You followed one possible journey. The system does not require there to be only one.");
      window.requestAnimationFrame(() => pullbackTitle.focus({ preventScroll: false }));
    };

    const selectChoice = (type, id) => {
      if (type === "inference") {
        journeyState.inferenceId = id;
        journeyState.destinationId = null;
        journeyState.yieldId = null;
      } else if (type === "destination") {
        journeyState.destinationId = id;
        journeyState.yieldId = null;
      } else if (type === "yield") {
        journeyState.yieldId = id;
      }
      renderJourney();
      experience.querySelector(`[data-choice-type="${type}"][data-choice-id="${id}"]`)?.focus();
    };

    actionButtons.forEach((button) => {
      button.addEventListener("click", () => selectScenario(button.dataset.scenario));
    });

    stageChoices.addEventListener("click", (event) => {
      const choice = event.target.closest("[data-choice-type]");
      if (choice) {
        selectChoice(choice.dataset.choiceType, choice.dataset.choiceId);
      }
    });

    nextButton.addEventListener("click", () => {
      if (journeyState.stage < 5) {
        goToStage(journeyState.stage + 1);
      } else {
        renderPullback();
      }
    });

    backButton.addEventListener("click", () => {
      if (journeyState.stage > 1) {
        goToStage(journeyState.stage - 1);
      }
    });

    returnButton.addEventListener("click", resetJourney);
    chooseAnotherButton.addEventListener("click", resetJourney);
    traceAgainButton.addEventListener("click", () => {
      journey.classList.remove("is-pullback");
      pullback.hidden = true;
      journeyState.stage = 2;
      journeyState.inferenceId = null;
      journeyState.destinationId = null;
      journeyState.yieldId = null;
      renderJourney({ moveFocus: true });
    });

    window.addEventListener("resize", () => {
      if (!pullback.hidden) {
        renderPullbackMap();
      }
    });
  }
}

if (extractionSection) {
  const revealItems = extractionSection.querySelectorAll(".extraction-reveal");
  const prefersReducedExtractionMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  revealItems.forEach((item, index) => {
    item.style.setProperty("--reveal-index", index);
  });

  const showExtractionSection = () => {
    extractionSection.classList.add("is-visible");
  };

  if (prefersReducedExtractionMotion) {
    showExtractionSection();
  } else if ("IntersectionObserver" in window) {
    const extractionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            showExtractionSection();
            extractionObserver.unobserve(extractionSection);
          }
        });
      },
      {
        root: null,
        threshold: 0,
      }
    );

    extractionObserver.observe(extractionSection);
  } else {
    showExtractionSection();
  }
}

if (privacySpace) {
  const scrollStage = privacySpace.querySelector("[data-privacy-scroll-stage]");
  const pressurePhrases = privacySpace.querySelectorAll("[data-pressure-side]");
  const revealItems = privacySpace.querySelectorAll(".privacy-reveal");
  const prefersReducedPrivacyMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stageActive = false;
  let privacyFrame = null;

  const clamp = (value, minimum = 0, maximum = 1) => {
    return Math.min(Math.max(value, minimum), maximum);
  };

  const updatePrivacySpace = () => {
    privacyFrame = null;

    if (!stageActive || !scrollStage || prefersReducedPrivacyMotion) {
      return;
    }

    const rect = scrollStage.getBoundingClientRect();
    const travel = Math.max(rect.height - window.innerHeight, 1);
    const progress = clamp(-rect.top / travel);
    const crowd = clamp(progress / 0.24);
    const opening = clamp((progress - 0.27) / 0.39);
    const inwardScale = window.innerWidth <= 760 ? 0.025 : 0.09;
    const inwardDistance = window.innerWidth * inwardScale * crowd;
    const outwardDistance = window.innerWidth * 0.28 * opening;
    const shift = inwardDistance - outwardDistance;
    const pressureOpacity = 0.72 - opening * 0.64;

    privacySpace.style.setProperty("--privacy-progress", progress.toFixed(3));
    privacySpace.style.setProperty("--privacy-pressure-opacity", pressureOpacity.toFixed(3));
    privacySpace.style.setProperty("--privacy-axis-strength", (0.18 + opening * 0.68).toFixed(3));

    pressurePhrases.forEach((phrase, index) => {
      const direction = phrase.dataset.pressureSide === "left" ? 1 : -1;
      const stagger = 1 - (index % 5) * 0.035;
      const translated = shift * direction * stagger;
      phrase.style.transform = `translateX(${translated.toFixed(1)}px)`;
      phrase.style.opacity = pressureOpacity.toFixed(3);
    });

    privacySpace.classList.toggle("is-paused", progress >= 0.14 && progress < 0.49);
    privacySpace.classList.toggle("is-open", progress >= 0.47);
  };

  const requestPrivacyUpdate = () => {
    if (privacyFrame === null) {
      privacyFrame = window.requestAnimationFrame(updatePrivacySpace);
    }
  };

  if (prefersReducedPrivacyMotion) {
    privacySpace.classList.add("is-open");
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    if ("IntersectionObserver" in window && scrollStage) {
      const stageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            stageActive = entry.isIntersecting;
            if (stageActive) {
              requestPrivacyUpdate();
            }
          });
        },
        {
          root: null,
          rootMargin: "20% 0px",
          threshold: 0,
        }
      );

      stageObserver.observe(scrollStage);
    } else {
      stageActive = true;
      privacySpace.classList.add("is-open");
    }

    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.18) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: "0px 0px -8%",
          threshold: [0.18, 0.4],
        }
      );

      revealItems.forEach((item) => revealObserver.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    window.addEventListener("scroll", requestPrivacyUpdate, { passive: true });
    window.addEventListener("resize", requestPrivacyUpdate);
  }
}
