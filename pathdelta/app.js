(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.getElementById("site-nav");
  if (menuBtn && nav) {
    function setOpen(open) {
      document.body.classList.toggle("nav-open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    menuBtn.addEventListener("click", function () {
      setOpen(!document.body.classList.contains("nav-open"));
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });
  }

  const graph = document.getElementById("team-graph");
  function playGraph() {
    if (!graph) return;
    graph.classList.remove("is-live");
    void graph.getBoundingClientRect();
    graph.classList.add("is-live");
  }

  if (graph) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            playGraph();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(graph);
    if (reduce) graph.classList.add("is-live");
  }

  const replayTeam = document.getElementById("replay-team");
  if (replayTeam) replayTeam.addEventListener("click", playGraph);

  const compress = document.getElementById("compress");
  function playCompress() {
    document.querySelectorAll(".compress").forEach(function (el) {
      el.classList.remove("is-live");
      void el.getBoundingClientRect();
      el.classList.add("is-live");
    });
  }
  playCompress();
  if (compress) {
    const compressObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            playCompress();
            compressObs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    compressObs.observe(compress);
  }

  // Placeholder scores from resume + quiz vs the Payments backend role.
  const skills = [
    { name: "TypeScript", hire: 91, need: 72 },
    { name: "HTTP APIs", hire: 80, need: 76 },
    { name: "Payments", hire: 24, need: 92 },
    { name: "Idempotency", hire: 18, need: 90 },
    { name: "Ownership", hire: 16, need: 78 },
    { name: "Incidents", hire: 41, need: 70 }
  ];

  function polar(score, index, cx, cy, maxR) {
    const angle = -Math.PI / 2 + index * ((Math.PI * 2) / skills.length);
    const r = (score / 100) * maxR;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  }

  function points(key, cx, cy, maxR) {
    return skills
      .map(function (skill, index) {
        const p = polar(skill[key], index, cx, cy, maxR);
        return p[0].toFixed(1) + "," + p[1].toFixed(1);
      })
      .join(" ");
  }

  const radar = document.getElementById("radar");
  if (radar) {
    const cx = 140;
    const cy = 142;
    const maxR = 88;
    let rings = "";
    for (let i = 1; i <= 4; i++) {
      rings +=
        '<circle class="radar-grid" cx="' +
        cx +
        '" cy="' +
        cy +
        '" r="' +
        (maxR * i) / 4 +
        '"/>';
    }
    let axes = "";
    let labels = "";
    skills.forEach(function (skill, index) {
      const end = polar(100, index, cx, cy, maxR);
      axes +=
        '<line class="radar-axis" x1="' +
        cx +
        '" y1="' +
        cy +
        '" x2="' +
        end[0].toFixed(1) +
        '" y2="' +
        end[1].toFixed(1) +
        '"/>';
      const lab = polar(118, index, cx, cy, maxR);
      labels +=
        '<text class="radar-label" text-anchor="middle" x="' +
        lab[0].toFixed(1) +
        '" y="' +
        (lab[1] + 4).toFixed(1) +
        '">' +
        skill.name +
        "</text>";
    });
    radar.innerHTML =
      '<title id="radar-title">Radar of hire signals versus role needs</title>' +
      rings +
      axes +
      '<polygon class="radar-need" points="' +
      points("need", cx, cy, maxR) +
      '"/>' +
      '<polygon class="radar-hire" points="' +
      points("hire", cx, cy, maxR) +
      '"/>' +
      labels;
  }

  function renderBars(el, list) {
    if (!el) return;
    el.innerHTML = list
      .map(function (skill) {
        const gap = skill.hire < skill.need;
        return (
          '<div class="bar-row">' +
          '<div class="bar-name">' +
          skill.name +
          "</div>" +
          '<div class="bar-track" aria-hidden="true">' +
          '<span class="bar-need" style="--v:' +
          skill.need +
          '%"></span>' +
          '<span class="bar-hire' +
          (gap ? " is-gap" : "") +
          '" style="--v:' +
          skill.hire +
          '%"></span>' +
          "</div>" +
          '<div class="bar-score">' +
          skill.hire +
          " vs " +
          skill.need +
          (gap ? " · gap" : "") +
          "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  const bars = document.getElementById("bars");
  renderBars(bars, skills);

  function playSkills() {
    if (radar) {
      radar.classList.remove("is-live");
      void radar.getBoundingClientRect();
      radar.classList.add("is-live");
    }
    if (bars) {
      bars.classList.remove("is-live");
      void bars.getBoundingClientRect();
      bars.classList.add("is-live");
    }
  }

  const skillsSection = document.getElementById("delta");
  if (skillsSection) {
    const skillsObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            playSkills();
            skillsObs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    skillsObs.observe(skillsSection);
    if (reduce) playSkills();
  }

  const replaySkills = document.getElementById("replay-skills");
  if (replaySkills) replaySkills.addEventListener("click", playSkills);

  const tasks = [
    { id: "d1-arch", label: "Day 1 · Read docs/ARCHITECTURE.md" },
    { id: "d1-owners", label: "Day 1 · CODEOWNERS: Alex, Priya, Sam" },
    { id: "d1-epic", label: "Day 1 · Skim PAY-1200 Charge reliability" },
    { id: "d1-slack", label: "Day 1 · Join #payments-eng (Slack next)" },
    { id: "d2-trace", label: "Day 2 · Trace charge.ts → posting.ts" },
    { id: "d2-ticket", label: "Day 2 · Read PAY-1184 retry storms" },
    { id: "d2-incident", label: "Day 2 · #charge-incidents notes" },
    { id: "d2-quiz", label: "Day 2 · Idempotency key vs request id" },
    { id: "d3-pair", label: "Day 3 · PAY-1242 / PR #842 (one ticket)" },
    { id: "d3-review", label: "Day 3 · posting.ts with Priya · PAY-1108" },
    { id: "d3-post", label: "Day 3 · Post in #payments-eng" },
    { id: "d3-11", label: "Day 3 · Alex 1:1 on remaining ledger gap" }
  ];

  const storageKey = "pathdelta-demo-academy";
  function loadState() {
    try {
      return JSON.parse(sessionStorage.getItem(storageKey) || "{}");
    } catch (err) {
      return {};
    }
  }

  function saveState(state) {
    sessionStorage.setItem(storageKey, JSON.stringify(state));
  }

  const checkboxes = Array.prototype.slice.call(
    document.querySelectorAll('.day-list input[type="checkbox"]')
  );
  const state = loadState();
  checkboxes.forEach(function (box) {
    box.checked = Boolean(state[box.getAttribute("data-task")]);
  });

  const shareList = document.getElementById("share-list");
  const shareStat = document.getElementById("share-stat");
  const total = tasks.length;

  function renderShare() {
    const done = checkboxes.filter(function (box) {
      return box.checked;
    }).length;
    if (shareStat) {
      shareStat.textContent =
        done === total ? "Academy complete" : done + " of " + total + " done";
    }
    if (shareList) {
      shareList.innerHTML = tasks
        .map(function (task, index) {
          const checked = checkboxes[index] && checkboxes[index].checked;
          return (
            "<li><span>" +
            task.label +
            '</span><span class="state' +
            (checked ? " done" : "") +
            '">' +
            (checked ? "Done" : "Open") +
            "</span></li>"
          );
        })
        .join("");
    }
  }

  checkboxes.forEach(function (box) {
    box.addEventListener("change", function () {
      const next = {};
      checkboxes.forEach(function (item) {
        next[item.getAttribute("data-task")] = item.checked;
      });
      saveState(next);
      renderShare();
    });
  });
  renderShare();

  document.querySelectorAll(".item-title a, .hero-days a").forEach(function (link) {
    link.addEventListener("click", function () {
      const href = link.getAttribute("href");
      if (!href || href.charAt(0) !== "#") return;
      const target = document.getElementById(href.slice(1));
      if (!target) return;
      document.querySelectorAll(".is-target").forEach(function (node) {
        node.classList.remove("is-target");
      });
      target.classList.add("is-target");
      if (graph && graph.contains(target)) graph.classList.add("is-live");
    });
  });

  const copyBtn = document.getElementById("copy-link");
  const copyStatus = document.getElementById("copy-status");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      const url = window.location.origin + window.location.pathname + "#share";
      const done = function () {
        if (copyStatus) {
          copyStatus.textContent =
            "Copied demo link for Alex Chen → Jordan Lee. This is the page URL, not a live tenant.";
        }
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done).catch(done);
      } else {
        done();
      }
    });
  }
})();
