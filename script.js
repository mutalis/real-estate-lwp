/* Bien rentado — Vanilla JS
   1) Dark/Light mode con localStorage + prefers-color-scheme
   2) Menú hamburguesa móvil
   3) Navbar dinámico al hacer scroll
   4) Smooth scroll a anclas
   5) Animación reveal con IntersectionObserver
*/
(function () {
  "use strict";

  var root = document.documentElement;
  var STORAGE_KEY = "botv-theme";

  /* ---------- 1) Tema ---------- */
  var themeToggle = document.getElementById("theme-toggle");
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function getStored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"
      );
    }
  }

  applyTheme(getStored() || (media.matches ? "dark" : "light"));

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {}
    });
  }

  // Respeta el sistema mientras el usuario no haya elegido manualmente
  media.addEventListener("change", function (e) {
    if (!getStored()) applyTheme(e.matches ? "dark" : "light");
  });

  /* ---------- 2) Menú hamburguesa ---------- */
  var menuToggle = document.getElementById("menu-toggle");
  var navLinks = document.getElementById("nav-links");

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
    if (menuToggle) {
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
    }
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      document.body.classList.toggle("menu-open", isOpen);
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- 3) Navbar al hacer scroll ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 50);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- 4) Smooth scroll ---------- */
  var navHeight = 72;
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      var top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: top < 0 ? 0 : top, behavior: "smooth" });
    });
  });

  /* ---------- 5) Reveal ---------- */
  var revealables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealables.forEach(function (el, i) {
      el.style.transitionDelay = (i % 5) * 70 + "ms";
      observer.observe(el);
    });
  } else {
    revealables.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ---------- Año del footer ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();