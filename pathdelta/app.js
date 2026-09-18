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

  const graph = document.getElementById("repo-graph");
  function playGraph() {
    if (!graph) return;
    graph.classList.remove("is-live");
    void graph.getBoundingClientRect();
    graph.classList.add("is-live");
    if (reduce) graph.classList.add("is-live");
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
  }

  const replayGraph = document.getElementById("replay-graph");
  if (replayGraph) replayGraph.addEventListener("click", playGraph);

  const skills = [
    { name: "TypeScript", hire: 91, need: 74 },
    { name: "HTTP APIs", hire: 80, need: 78 },
    { name: "Payments", hire: 26, need: 90 },
    { name: "Idempotency", hire: 18, need: 93 },
    { name: "Incidents", hire: 41, need: 68 },
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
      '<title id="radar-title">Radar of hire scores versus repo needs</title>' +
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

  const bars = document.getElementById("bars");
  if (bars) {
    bars.innerHTML = skills
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

  const skillsSection = document.getElementById("skills");
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
  }

  const replaySkills = document.getElementById("replay-skills");
  if (replaySkills) replaySkills.addEventListener("click", playSkills);

  const tasks = [
    { id: "arch", label: "Read docs/ARCHITECTURE.md" },
    { id: "path", label: "Trace charge.ts → posting.ts" },
    { id: "pr", label: "Ship PR #842 add idempotency key" },
    { id: "shadow", label: "Shadow one charge incident" },
  ];

  const storageKey = "pathdelta-demo-plan";
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
    document.querySelectorAll('#plan-list input[type="checkbox"]')
  );
  const state = loadState();
  checkboxes.forEach(function (box) {
    box.checked = Boolean(state[box.getAttribute("data-task")]);
  });

  const shareList = document.getElementById("share-list");
  const shareStat = document.getElementById("share-stat");
  const planProgress = document.getElementById("plan-progress");
  const planFill = document.getElementById("plan-fill");

  function renderShare() {
    const done = checkboxes.filter(function (box) {
      return box.checked;
    }).length;
    if (planProgress) planProgress.textContent = done + " / 4";
    if (planFill) planFill.style.width = (done / 4) * 100 + "%";
    if (shareStat) {
      shareStat.textContent =
        done === 4 ? "Week 1 complete" : done + " of 4 done";
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

  document.querySelectorAll(".plan-title a").forEach(function (link) {
    link.addEventListener("click", function () {
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      document
        .querySelectorAll(".graph .is-target")
        .forEach(function (node) {
          node.classList.remove("is-target");
        });
      target.classList.add("is-target");
      graph && graph.classList.add("is-live");
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
