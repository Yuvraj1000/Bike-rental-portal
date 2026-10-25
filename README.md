# 🚲 Ride Hub — Bike Rental Portal

**Ride Hub** is a responsive bike rental portal where riders can create an account, log in, choose a bike and reserve it from a nearby station.
Built as an academic project for **Front End Engineering-II (25CSE0203)** by **Team Triple Joint — G12-PID-23** at Chitkara University.

## What's new in Evaluation 2 (JavaScript)

- **Sign Up** (`signup.html`) — validates name, email, password length and confirm-password, blocks duplicate emails, saves the user in `localStorage`.
- **Login / Logout** (`login.html`) — checks email + password against `localStorage`, remembers who is logged in, shows "Hi, Name" + Logout in the navbar on every page.
- **Homepage built with React** (`index.html`) — components, props, state, `useEffect` and `map()`; no build step needed.
- **Booking form in React** — live price calculation, only logged-in users can confirm, bookings are saved per user in `localStorage` and can be cancelled.
- Dark / light mode remembered in `localStorage`.

## Project structure

| File | What it does |
|------|--------------|
| `index.html` | Homepage — all React components live here (navbar, hero, fleet, booking form, steps, footer) |
| `signup.html`, `login.html` | Account pages (plain HTML + `auth.js`) |
| `about.html`, `how-it-works.html`, `contact.html` | Information pages (plain HTML) |
| `auth.js` | Sign up, login, logout and "who is logged in" logic using `localStorage` |
| `script.js` | Hamburger menu, dark mode and contact form for the plain HTML pages |
| `style.css` | All styling (flexbox, grid, transitions, media queries, `::before`, dark mode) |

## How to run

1. Open the folder in VS Code and start it with **Live Server** (or just open `index.html` in a browser).
2. An **internet connection is needed** for the homepage, because React, ReactDOM and Babel are loaded from a CDN (unpkg).

## How login works (localStorage)

| Key | Value |
|-----|-------|
| `rideHubUsers` | array of `{ name, email, password }` for every registered user |
| `rideHubCurrentUser` | email of the logged-in user (removed on logout) |
| `rideHubBookings` | array of all bookings (each has the user's email) |
| `rideHubTheme` | `"dark"` or `"light"` |

> This is a front-end demo. Passwords are stored as plain text in the browser, which a real website must never do — real sites hash passwords on a server.
