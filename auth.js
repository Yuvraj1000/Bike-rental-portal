/* =========================================================
   RIDE HUB — SIGN UP / SIGN IN USING LOCAL STORAGE
   ---------------------------------------------------------
   localStorage is a small storage area inside the browser.
   It only stores TEXT (strings), so we convert our data with:
     JSON.stringify(data)  -> JavaScript data  ->  text
     JSON.parse(text)      -> text  ->  JavaScript data

   We keep two things in localStorage:
     1. "rideHubUsers"       -> an array of every registered user
     2. "rideHubCurrentUser" -> the email of the user who is logged in

   NOTE: This is a front-end demo. Real websites never store
   passwords like this; they send them to a server that hashes them.
   ========================================================= */

var USERS_KEY = "rideHubUsers";
var CURRENT_KEY = "rideHubCurrentUser";


/* ---------- Helper functions: read / write users ---------- */

// Get the array of all users (empty array if nobody has signed up yet)
function getUsers() {
  var saved = localStorage.getItem(USERS_KEY);

  if (saved === null) {
    return [];
  }

  return JSON.parse(saved);
}

// Save the array of users back into localStorage
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Find one user by email (returns the user object, or null)
function findUser(email) {
  var users = getUsers();

  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return users[i];
    }
  }

  return null;
}


/* ---------- Sign up ---------- */
// Returns an object like { ok: true/false, message: "..." }
function signUp(name, email, password, confirmPassword) {
  name = name.trim();
  email = email.trim().toLowerCase();

  // 1. Validation: check every field before saving
  if (name.length < 2) {
    return { ok: false, message: "Please enter your full name (at least 2 letters)." };
  }

  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  if (password.length < 6) {
    return { ok: false, message: "Password must be at least 6 characters long." };
  }

  if (password !== confirmPassword) {
    return { ok: false, message: "Passwords do not match." };
  }

  // 2. Make sure this email is not already registered
  if (findUser(email) !== null) {
    return { ok: false, message: "This email is already registered. Please login." };
  }

  // 3. Everything is fine, so save the new user
  var users = getUsers();
  users.push({ name: name, email: email, password: password });
  saveUsers(users);

  return { ok: true, message: "Account created successfully! Redirecting to login..." };
}


/* ---------- Log in ---------- */
function logIn(email, password) {
  email = email.trim().toLowerCase();

  var user = findUser(email);

  if (user === null) {
    return { ok: false, message: "No account found with this email. Please sign up first." };
  }

  if (user.password !== password) {
    return { ok: false, message: "Wrong password. Please try again." };
  }

  // Remember who is logged in
  localStorage.setItem(CURRENT_KEY, user.email);

  return { ok: true, message: "Login successful! Taking you to the homepage..." };
}


/* ---------- Log out ---------- */
function logOut() {
  localStorage.removeItem(CURRENT_KEY);
}


/* ---------- Who is logged in right now? ---------- */
// Returns the user object, or null if nobody is logged in
function getCurrentUser() {
  var email = localStorage.getItem(CURRENT_KEY);

  if (email === null) {
    return null;
  }

  return findUser(email);
}


/* =========================================================
   PAGE CODE: connects the functions above to the HTML forms
   ========================================================= */

// Show a message under a form. type is "error" or "success"
function showMessage(text, type) {
  var msg = document.getElementById("authMsg");

  if (msg) {
    msg.textContent = text;
    msg.className = "auth-msg " + type;
  }
}

/* ---------- Sign up form ---------- */
var signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading

    var name = document.getElementById("signupName").value;
    var email = document.getElementById("signupEmail").value;
    var password = document.getElementById("signupPassword").value;
    var confirmPassword = document.getElementById("signupConfirm").value;

    var result = signUp(name, email, password, confirmPassword);

    if (result.ok) {
      showMessage(result.message, "success");
      signupForm.reset();

      // wait 1.5 seconds, then open the login page
      setTimeout(function () {
        window.location.href = "login.html";
      }, 1500);
    } else {
      showMessage(result.message, "error");
    }
  });
}

/* ---------- Login form ---------- */
var loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    var result = logIn(email, password);

    if (result.ok) {
      showMessage(result.message, "success");

      setTimeout(function () {
        window.location.href = "index.html";
      }, 1000);
    } else {
      showMessage(result.message, "error");
    }
  });
}

/* ---------- "Show password" checkbox ---------- */
var showPassword = document.getElementById("showPassword");

if (showPassword) {
  showPassword.addEventListener("change", function () {
    // find every password box on this page
    var boxes = document.querySelectorAll(".password-box");

    for (var i = 0; i < boxes.length; i++) {
      boxes[i].type = showPassword.checked ? "text" : "password";
    }
  });
}


/* =========================================================
   NAVBAR for the normal HTML pages (About, How It Works,
   Contact, Login, Sign Up).
   If logged in  -> "Hi, Name" + Logout button
   If logged out -> Login + Sign Up links
   (The homepage does the same thing inside React.)
   ========================================================= */
function updateNavbar() {
  var area = document.getElementById("authArea");

  if (!area) {
    return; // this page has no auth area (the React homepage)
  }

  var user = getCurrentUser();

  if (user !== null) {
    area.innerHTML =
      '<span class="nav-user"></span>' +
      '<button class="btn btn-dark btn-small" id="logoutBtn" type="button">Logout</button>';

    // textContent is safer than innerHTML for names typed by users
    area.querySelector(".nav-user").textContent = "Hi, " + user.name.split(" ")[0];

    document.getElementById("logoutBtn").addEventListener("click", function () {
      logOut();
      window.location.href = "index.html";
    });
  } else {
    area.innerHTML =
      '<a class="btn btn-outline btn-small" href="login.html">Login</a>' +
      '<a class="btn btn-dark btn-small" href="signup.html">Sign Up</a>';
  }
}

updateNavbar();
