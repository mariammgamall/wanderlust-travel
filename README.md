# Wanderlust - Travel & Trip Planner

A modern, interactive travel planning Single Page Application (SPA) built with pure **Vanilla JavaScript**, **HTML5**, and **CSS3** using **Object-Oriented Programming (OOP)**.

Developed for **Route IT Training Center - Frontend Diploma (C49) Exam 2**.

[![GitHub Repository](https://img.shields.io/badge/GitHub-mariammgamall%2Fwanderlust--travel-181717?logo=github)](https://github.com/mariammgamall/wanderlust-travel)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20ES6+-F7DF1E?logo=javascript&logoColor=black)](#)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Compatible-black?logo=vercel)](#)

---

## ✨ Features

- **🌐 Destination Hub & Dashboard**: Searchable country selector, major cities, live country profile, neighbor countries, Google Maps link, and live local time.
- **📅 Public Holidays (`/holidays`)**: Official national holidays by year and country via Nager.Date API with save-to-plans functionality.
- **🎟️ City Events (`/events`)**: Ticketed concerts, sports, and theatre events via Ticketmaster Discovery API through a secure serverless proxy.
- **🌤️ Live Weather (`/weather`)**: Real-time conditions, 5-detail metrics (humidity, wind, UV index, precipitation, sunrise/sunset), 24-hour scrollable hourly forecast, and 7-day forecast via Open-Meteo.
- **🏖️ Long Weekends (`/long-weekends`)**: Vacation finder calculating bridge days and long weekend getaways.
- **☀️ Sun Times (`/sun-times`)**: Solar schedule, twilight phases (dawn, dusk, golden hour), and daylight distribution.
- **💱 Currency Converter (`/currency`)**: Real-time exchange rate conversions and popular currencies grid via ExchangeRate-API.
- **💖 My Saved Plans (`/plans`)**: Persistent LocalStorage trip planner with category filters, confirmation modal, and auto-dismiss alerts.

---

## 🧭 Navigation & SPA Routes

The application uses native **HTML5 History API** (`pushState` and `popstate`) for smooth view switching without full page reloads:

| Route | View | Description |
| :--- | :--- | :--- |
| `/` | Dashboard | Destination search and country statistics |
| `/holidays` | Holidays | Public holidays explorer |
| `/events` | Events | Live ticketed city events |
| `/weather` | Weather | Live weather, hourly strip & 7-day forecast |
| `/long-weekends` | Long Weekends | Bridge days & mini-vacation planner |
| `/currency` | Currency | Exchange rates & converter |
| `/sun-times` | Sun Times | Solar schedule & twilight phases |
| `/plans` | My Plans | Saved holidays, events & long weekends |

---

## 🏛️ OOP Architecture

The project is built using 5 clean, beginner-friendly JavaScript classes:

1. **`ApiService`**: Handles all asynchronous `fetch()` requests to external APIs and the local/serverless event proxy.
2. **`PlansManager`**: Manages saved trips in `localStorage` (add, remove, check, clear).
3. **`CurrencyConverter`**: Calculates currency exchanges using live rates.
4. **`Router`**: Manages client-side URL routing and active sidebar states.
5. **`App`**: Main controller handling DOM interactions, event listeners, and view rendering.

---

## 🌐 External APIs Used

| Service | Feature | Endpoint |
| :--- | :--- | :--- |
| **Nager.Date API** | Countries & Holidays | `https://date.nager.at/api/v3` |
| **REST Countries** | Country Details | `https://restcountries.com/v3.1` |
| **Open-Meteo API** | Weather & Forecast | `https://api.open-meteo.com/v1` |
| **SunriseSunset.io** | Solar Schedule | `https://api.sunrisesunset.io/json` |
| **ExchangeRate-API** | Live Currency Rates | `https://open.er-api.com/v6/latest` |
| **Ticketmaster API** | City Events | Via secure proxy `/api/events` |

---

## 🔒 API Key Security

To protect private credentials, the Ticketmaster API key is **never exposed in frontend code**:
- **On Vercel**: `api/events.js` runs as a native Vercel Serverless Function, reading `process.env.TICKETMASTER_API_KEY`.
- **Locally**: `server.js` forwards `/api/events` requests to `api/events.js`.
- If no key is set, the API returns a polite 503 error message without crashing.

---

## 🚀 Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mariammgamall/wanderlust-travel.git
   cd wanderlust-travel
   ```

2. **Start the local server**:
   ```bash
   node server.js
   ```
   *(Optional: set your Ticketmaster key in PowerShell with `$env:TICKETMASTER_API_KEY="your_key"; node server.js`)*

3. **Open in browser**:
   Navigate to `http://127.0.0.1:5500/`

---

## ☁️ Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/mariammgamall/wanderlust-travel.git
   git branch -M main
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New..." → "Project"**.
3. Import the `wanderlust-travel` repository.
4. In **Environment Variables**, add:
   - **Key**: `TICKETMASTER_API_KEY`
   - **Value**: `your_ticketmaster_api_key`
5. Click **Deploy**.

---

## 📂 Project Structure

```text
wanderlust-travel/
├── index.html              # Main HTML5 entry point and SPA container
├── server.js               # Lightweight local Node.js server
├── vercel.json             # Vercel SPA routing configuration
├── .gitignore              # Ignores environment variables and OS files
├── README.md               # Project documentation
├── api/
│   └── events.js           # Serverless proxy for Ticketmaster events
└── src/
    ├── css/                # Modular stylesheets
    │   ├── base.css
    │   ├── layout.css
    │   ├── components.css
    │   ├── dashboard.css
    │   ├── views.css
    │   ├── weather.css
    │   ├── widgets.css
    │   └── utilities.css
    └── js/
        └── main.js         # Vanilla JS OOP application script
```

---

## 🎓 Academic Information

- **Developer**: Mariam Gamal ([@mariammgamall](https://github.com/mariammgamall))
- **Repository**: [https://github.com/mariammgamall/wanderlust-travel](https://github.com/mariammgamall/wanderlust-travel)
- **Institution**: Route IT Training Center
- **Course**: Frontend Diploma (Cycle 49)
- **Exam**: Exam 2 - JavaScript & Web APIs
