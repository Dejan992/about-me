(function () {
  const hamburger = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  if (!hamburger || !nav) {
    return;
  }

  function setMenu(open) {
    hamburger.classList.toggle("is-open", open);
    nav.classList.toggle("is-open", open);
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("nav-open", open);
  }

  hamburger.addEventListener("click", function () {
    setMenu(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setMenu(false);
    }
  });
})();
