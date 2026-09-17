(function () {
  const form = document.getElementById("readiness-form");
  if (!form) return;

  const status = document.getElementById("readiness-status");
  const submit = document.getElementById("request-pilot");
  const fields = {
    name: form.elements.namedItem("name"),
    email: form.elements.namedItem("email"),
    company: form.elements.namedItem("company"),
    role: form.elements.namedItem("role"),
    hook: form.elements.namedItem("hook"),
    queue: form.elements.namedItem("queue"),
    escalation: form.elements.namedItem("escalation"),
    holdout: form.elements.namedItem("holdout"),
    volume: form.elements.namedItem("volume"),
    vpc: form.elements.namedItem("vpc"),
  };

  const emailOk = /[^\s@]+@[^\s@]+\.[^\s@]+/;

  function valueOf(el) {
    if (!el) return "";
    if (el instanceof RadioNodeList) {
      return String(el.value || "").trim();
    }
    return String(el.value || "").trim();
  }

  function missingItems() {
    const missing = [];
    if (!valueOf(fields.name)) missing.push("Your name");
    if (!emailOk.test(valueOf(fields.email))) missing.push("A reachable work email");
    if (!valueOf(fields.company)) missing.push("Company name");
    if (valueOf(fields.hook) !== "yes") {
      missing.push("A pre-tool hook that can call Latch before side effects");
    }
    if (valueOf(fields.queue).length < 2) {
      missing.push("One named production queue");
    }
    if (!emailOk.test(valueOf(fields.escalation))) {
      missing.push("A named escalation owner (include email)");
    }
    if (valueOf(fields.holdout).length < 8) {
      missing.push("A sample / holdout plan");
    }
    if (valueOf(fields.volume).length < 8) {
      missing.push("Volume and the actions to gate");
    }
    if (valueOf(fields.vpc).length < 8) {
      missing.push("VPC and redaction path");
    }
    return missing;
  }

  function render() {
    const missing = missingItems();
    const ready = missing.length === 0;
    status.className = "status " + (ready ? "ready" : "blocked");
    if (ready) {
      status.innerHTML =
        "<h3>Ready for a 90-day pilot</h3>" +
        "<p>Checklist is complete. Request pilot opens mail to dan.rajkovic@icloud.com with subject “Latch pilot” and these answers in the body.</p>";
      submit.disabled = false;
      submit.textContent = "Request pilot";
    } else {
      const items = missing.map(function (item) {
        return "<li>" + item + "</li>";
      }).join("");
      status.innerHTML =
        "<h3>Not ready</h3>" +
        "<p>Latch does not take a pilot request until this checklist is complete. Missing:</p>" +
        "<ul>" + items + "</ul>";
      submit.disabled = true;
      submit.textContent = "Checklist incomplete";
    }
  }

  function bodyText() {
    return [
      "Latch pilot request",
      "",
      "Name: " + valueOf(fields.name),
      "Email: " + valueOf(fields.email),
      "Company: " + valueOf(fields.company),
      "Role: " + valueOf(fields.role),
      "",
      "Pre-tool hook available: " + valueOf(fields.hook),
      "Production queue: " + valueOf(fields.queue),
      "Escalation owner: " + valueOf(fields.escalation),
      "Sample / holdout: " + valueOf(fields.holdout),
      "Volume and gated actions: " + valueOf(fields.volume),
      "VPC / redaction path: " + valueOf(fields.vpc),
    ].join("\n");
  }

  form.addEventListener("input", render);
  form.addEventListener("change", render);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const missing = missingItems();
    if (missing.length) {
      render();
      status.focus();
      return;
    }
    const mailto =
      "mailto:dan.rajkovic@icloud.com?subject=" +
      encodeURIComponent("Latch pilot") +
      "&body=" +
      encodeURIComponent(bodyText());
    window.location.href = mailto;
  });

  status.setAttribute("tabindex", "-1");
  render();
})();
