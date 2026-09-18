/* =========================================================
   RIDE HUB — SCRIPT.JS
   Handles: loading screen, hamburger menu, book-a-bike
   button interaction, and contact form feedback.
   (Login modal itself needs no JS — it's pure CSS :target.)
   ========================================================= */

// ---------- 1. Loading screen ----------
// Wait for everything to load, then let the progress bar
// finish its animation before fading the screen out.
window.addEventListener("load", function () {
  var loadingScreen = document.getElementById("loadingScreen");

  setTimeout(function () {
    loadingScreen.classList.add("hide");
  }, 1900); // slightly longer than the 1.8s progress-bar animation
});

// ---------- 2. Responsive hamburger menu ----------
var menuBtn = document.getElementById("menuBtn");
var navMenu = document.getElementById("navMenu");

menuBtn.onclick = function () {
  navMenu.classList.toggle("open");
  menuBtn.classList.toggle("active");
};

// Close the mobile menu automatically after a link is tapped
var navLinks = navMenu.querySelectorAll("a");
navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navMenu.classList.remove("open");
    menuBtn.classList.remove("active");
  });
});

// ---------- 3. "Book a Bike" button interaction ----------
var bookBtn = document.getElementById("bookBtn");
var bookingMsg = document.getElementById("bookingMsg");

bookBtn.onclick = function () {
  bookingMsg.textContent = "🚲 Nearest bike reserved at MG Road Hub — head over within 15 minutes!";

  // Clear the message after a few seconds so it doesn't linger forever
  setTimeout(function () {
    bookingMsg.textContent = "";
  }, 5000);
};

// ---------- 4. Contact form feedback ----------
var contactForm = document.getElementById("contactForm");
var formMsg = document.getElementById("formMsg");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading (no backend yet)

  formMsg.textContent = "Thanks! Your message has been sent — we'll get back to you soon.";
  contactForm.reset();

  setTimeout(function () {
    formMsg.textContent = "";
  }, 5000);
});

// ---------- 5. Login form feedback (demo only, no backend) ----------
var loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  alert("This is a demo login — connect a backend to make it work for real.");
});
