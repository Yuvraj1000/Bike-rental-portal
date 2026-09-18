/* =========================================================
   RIDE HUB — BASIC JAVASCRIPT
   Kept intentionally small for the first evaluation.

   JavaScript currently handles only:
   1. loading screen
   2. mobile navigation
   3. separate page-style navigation inside ONE HTML file
   4. basic booking price calculation
   5. simple form feedback
   6. light / dark mode switch

   No backend, database, API or real payment processing yet.
   ========================================================= */

window.addEventListener("load", function () {
  var loadingScreen = document.getElementById("loadingScreen");

  if (loadingScreen) {
    setTimeout(function () {
      loadingScreen.style.opacity = "0";
      loadingScreen.style.visibility = "hidden";
    }, 1800);
  }
});

/* ---------- Single HTML file: separate page routes ---------- */
var routeTitles = {
  home: "Ride Hub — Bike Rental Portal",
  about: "About — Ride Hub",
  how: "How It Works — Ride Hub",
  contact: "Contact — Ride Hub"
};

function getRoute() {
  var params = new URLSearchParams(window.location.search);
  var route = params.get("page");
  return routeTitles[route] ? route : "home";
}

function showRoute(route, updateHistory) {
  if (!routeTitles[route]) {
    route = "home";
  }

  document.querySelectorAll(".route-page").forEach(function (page) {
    page.classList.toggle("active-page", page.getAttribute("data-route") === route);
  });

  document.body.setAttribute("data-page", route);
  document.title = routeTitles[route];

  document.querySelectorAll(".nav-links a[data-page]").forEach(function (link) {
    link.classList.toggle("active", link.getAttribute("data-page") === route);
  });

  if (updateHistory) {
    history.pushState({}, "", "?page=" + route);
  }

  var navMenu = document.getElementById("navMenu");
  if (navMenu) {
    navMenu.classList.remove("open");
  }

  window.scrollTo(0, 0);
}

showRoute(getRoute(), false);

window.addEventListener("popstate", function () {
  showRoute(getRoute(), false);
});

document.querySelectorAll('a[href^="?page="]').forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    var params = new URLSearchParams(link.getAttribute("href").replace(/^\?/, ""));
    showRoute(params.get("page"), true);
  });
});

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

  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }
}

var savedTheme = localStorage.getItem("rideHubTheme");
applyTheme(savedTheme === "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    var isDark = !document.body.classList.contains("dark-mode");
    applyTheme(isDark);
    localStorage.setItem("rideHubTheme", isDark ? "dark" : "light");
  });
}

/* ---------- Basic booking price calculator ---------- */
var bookingForm = document.getElementById("bookingForm");
var estimatedTotal = document.getElementById("estimatedTotal");
var priceNote = document.getElementById("priceNote");

var bikeRates = {
  "City Bike": 40,
  "Mountain Bike": 60,
  "Electric Bike": 90
};

function updatePrice() {
  var selectedBike = document.querySelector('input[name="bikeType"]:checked');
  var durationElement = document.getElementById("rideDuration");

  if (!selectedBike || !durationElement || !estimatedTotal || !priceNote) {
    return;
  }

  var duration = durationElement.value;
  var rate = bikeRates[selectedBike.value];
  var total = rate * Number(duration);

  estimatedTotal.textContent = "₹" + total;
  priceNote.textContent = duration + (duration == 1 ? " hour · " : " hours · ") + selectedBike.value;
}

document.querySelectorAll('input[name="bikeType"]').forEach(function (bike) {
  bike.addEventListener("change", updatePrice);
});

var durationElement = document.getElementById("rideDuration");
if (durationElement) {
  durationElement.addEventListener("change", updatePrice);
}

/* ---------- Basic booking form feedback ---------- */
var bookingFormMsg = document.getElementById("bookingFormMsg");

if (bookingForm) {
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (bookingFormMsg) {
      bookingFormMsg.textContent = "Booking details received. This is a front-end prototype — no payment was charged.";
      setTimeout(function () { bookingFormMsg.textContent = ""; }, 5000);
    }
  });
}

/* ---------- Basic contact form feedback ---------- */
var contactForm = document.getElementById("contactForm");
var formMsg = document.getElementById("formMsg");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (formMsg) {
      formMsg.textContent = "Message submitted in demo mode. A backend can be connected later.";
      contactForm.reset();
      setTimeout(function () { formMsg.textContent = ""; }, 4000);
    }
  });
}

/* ---------- Basic login feedback ---------- */
var loginForm = document.getElementById("loginForm");
var loginMsg = document.getElementById("loginMsg");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (loginMsg) {
      loginMsg.textContent = "Demo login only — real authentication can be added later.";
      setTimeout(function () { loginMsg.textContent = ""; }, 4000);
    }
  });
}
