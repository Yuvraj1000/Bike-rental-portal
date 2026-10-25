/* =========================================================
   RIDE HUB — SHARED JAVASCRIPT for the normal HTML pages
   (About, How It Works, Contact, Login, Sign Up)

   The homepage (index.html) is built with React, so it does
   these same jobs inside its own React code instead.

   This file handles:
   1. mobile navigation (hamburger menu)
   2. light / dark mode switch (remembered in localStorage)
   3. contact form feedback
   ========================================================= */

/* ---------- Mobile navigation ---------- */
var menuBtn = document.getElementById("menuBtn");
var navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("open");
  });
}

/* ---------- Light / dark mode ---------- */
var themeToggle = document.getElementById("themeToggle");
var themeText = document.getElementById("themeText");
var themeIcon = document.getElementById("themeIcon");

function applyTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);

  if (themeText) {
    themeText.textContent = isDark ? "Light Mode" : "Dark Mode";
  }

  if (themeIcon) {
    themeIcon.textContent = isDark ? "☀" : "☾";
  }
}

// When the page opens, use the theme saved last time
applyTheme(localStorage.getItem("rideHubTheme") === "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    var isDark = !document.body.classList.contains("dark-mode");
    applyTheme(isDark);
    localStorage.setItem("rideHubTheme", isDark ? "dark" : "light");
  });
}

/* ---------- Contact form feedback ---------- */
var contactForm = document.getElementById("contactForm");
var formMsg = document.getElementById("formMsg");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    formMsg.textContent = "Message submitted in demo mode. A backend can be connected later.";
    contactForm.reset();

    setTimeout(function () {
      formMsg.textContent = "";
    }, 4000);
  });
}
