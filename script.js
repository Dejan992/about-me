(function () {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  const hamburger = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (hamburger && nav) {
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
  }

  const typingTexts = [
    "Senior MLOps Engineer",
    "Cloud Architect",
    "AI Infrastructure Expert",
    "DevSecOps Advocate",
    "Platform Engineer",
  ];
  const typingElement = document.querySelector(".typing-text");
  const prefersReducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  if (typingElement) {
    if (prefersReducedMotion) {
      typingElement.textContent = typingTexts[0];
    } else {
      let textIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      function typeText() {
        const currentText = typingTexts[textIndex];
        if (isDeleting) {
          typingElement.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
        } else {
          typingElement.textContent = currentText.substring(0, charIndex + 1);
          charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;
        if (!isDeleting && charIndex === currentText.length) {
          typeSpeed = 2000;
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % typingTexts.length;
          typeSpeed = 500;
        }
        setTimeout(typeText, typeSpeed);
      }

      setTimeout(typeText, 1000);
    }
  }

  const homeHamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (homeHamburger && navLinks) {
    homeHamburger.addEventListener("click", function () {
      homeHamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function (event) {
        homeHamburger.classList.remove("active");
        navLinks.classList.remove("active");
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          const target = document.querySelector(href);
          if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });
  }

  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 100) {
        navbar.style.background = "rgba(var(--bg-rgb), 0.95)";
        navbar.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.3)";
      } else {
        navbar.style.background = "rgba(var(--bg-rgb), 0.8)";
        navbar.style.boxShadow = "none";
      }
    });
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = contactForm.querySelector("#name")?.value?.trim() || "";
      const email = contactForm.querySelector("#email")?.value?.trim() || "";
      const subject = contactForm.querySelector("#subject")?.value?.trim() || "";
      const message = contactForm.querySelector("#message")?.value?.trim() || "";
      const body = encodeURIComponent(
        (name ? "From: " + name + " <" + email + ">\n\n" : "") + message
      );
      window.location.href =
        "mailto:dan.rajkovic@icloud.com?subject=" +
        encodeURIComponent(subject || "Hello") +
        "&body=" +
        body;
    });
  }

  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");
  if (sections.length && navItems.length) {
    window.addEventListener("scroll", function () {
      let current = "";
      sections.forEach(function (section) {
        if (window.pageYOffset >= section.offsetTop - 200) {
          current = section.getAttribute("id");
        }
      });
      navItems.forEach(function (item) {
        item.classList.remove("active");
        if (item.getAttribute("href") === "#" + current) {
          item.classList.add("active");
        }
      });
    });
  }
})();
