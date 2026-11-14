// Wanderlust Travel Planner - Main Application Script

// API Service for external data
class ApiService {
  constructor() {
    this.nagerBase = 'https://date.nager.at/api/v3';
    this.restCountriesBase = 'https://restcountries.com/v3.1';
    this.openMeteoBase = 'https://api.open-meteo.com/v1';
    this.geocodingBase = 'https://geocoding-api.open-meteo.com/v1';
    this.sunTimesBase = 'https://api.sunrisesunset.io/json';
    this.currencyBase = 'https://open.er-api.com/v6/latest';
    // Secure backend proxy endpoint (no client-side API key exposure)
    this.eventsApiEndpoint = '/api/events';
  }

  // Fetch available countries from Nager.Date API
  async getCountries() {
    try {
      const res = await fetch(`${this.nagerBase}/AvailableCountries`);
      if (!res.ok) throw new Error('Failed to load countries');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.sort((a, b) => a.name.localeCompare(b.name));
      }
      return this.getFallbackCountries();
    } catch (err) {
      console.warn('Using fallback countries list:', err.message);
      return this.getFallbackCountries();
    }
  }

  // Fallback countries list if API is unreachable
  getFallbackCountries() {
    return [
      { countryCode: 'AL', name: 'Albania' },
      { countryCode: 'AD', name: 'Andorra' },
      { countryCode: 'AR', name: 'Argentina' },
      { countryCode: 'AM', name: 'Armenia' },
      { countryCode: 'AU', name: 'Australia' },
      { countryCode: 'AT', name: 'Austria' },
      { countryCode: 'AZ', name: 'Azerbaijan' },
      { countryCode: 'BS', name: 'Bahamas' },
      { countryCode: 'BB', name: 'Barbados' },
      { countryCode: 'BY', name: 'Belarus' },
      { countryCode: 'BE', name: 'Belgium' },
      { countryCode: 'BZ', name: 'Belize' },
      { countryCode: 'BJ', name: 'Benin' },
      { countryCode: 'BO', name: 'Bolivia' },
      { countryCode: 'BA', name: 'Bosnia and Herzegovina' },
      { countryCode: 'BW', name: 'Botswana' },
      { countryCode: 'BR', name: 'Brazil' },
      { countryCode: 'BG', name: 'Bulgaria' },
      { countryCode: 'CA', name: 'Canada' },
      { countryCode: 'CL', name: 'Chile' },
      { countryCode: 'CN', name: 'China' },
      { countryCode: 'CO', name: 'Colombia' },
      { countryCode: 'CR', name: 'Costa Rica' },
      { countryCode: 'HR', name: 'Croatia' },
      { countryCode: 'CU', name: 'Cuba' },
      { countryCode: 'CY', name: 'Cyprus' },
      { countryCode: 'CZ', name: 'Czechia' },
      { countryCode: 'DK', name: 'Denmark' },
      { countryCode: 'DO', name: 'Dominican Republic' },
      { countryCode: 'EC', name: 'Ecuador' },
      { countryCode: 'EG', name: 'Egypt' },
      { countryCode: 'SV', name: 'El Salvador' },
      { countryCode: 'EE', name: 'Estonia' },
      { countryCode: 'FI', name: 'Finland' },
      { countryCode: 'FR', name: 'France' },
      { countryCode: 'GE', name: 'Georgia' },
      { countryCode: 'DE', name: 'Germany' },
      { countryCode: 'GR', name: 'Greece' },
      { countryCode: 'GT', name: 'Guatemala' },
      { countryCode: 'HN', name: 'Honduras' },
      { countryCode: 'HK', name: 'Hong Kong' },
      { countryCode: 'HU', name: 'Hungary' },
      { countryCode: 'IS', name: 'Iceland' },
      { countryCode: 'IN', name: 'India' },
      { countryCode: 'ID', name: 'Indonesia' },
      { countryCode: 'IE', name: 'Ireland' },
      { countryCode: 'IT', name: 'Italy' },
      { countryCode: 'JM', name: 'Jamaica' },
      { countryCode: 'JP', name: 'Japan' },
      { countryCode: 'JO', name: 'Jordan' },
      { countryCode: 'KZ', name: 'Kazakhstan' },
      { countryCode: 'KE', name: 'Kenya' },
      { countryCode: 'KR', name: 'South Korea' },
      { countryCode: 'LV', name: 'Latvia' },
      { countryCode: 'LB', name: 'Lebanon' },
      { countryCode: 'LI', name: 'Liechtenstein' },
      { countryCode: 'LT', name: 'Lithuania' },
      { countryCode: 'LU', name: 'Luxembourg' },
      { countryCode: 'MG', name: 'Madagascar' },
      { countryCode: 'MY', name: 'Malaysia' },
      { countryCode: 'MT', name: 'Malta' },
      { countryCode: 'MX', name: 'Mexico' },
      { countryCode: 'MD', name: 'Moldova' },
      { countryCode: 'MC', name: 'Monaco' },
      { countryCode: 'MA', name: 'Morocco' },
      { countryCode: 'NL', name: 'Netherlands' },
      { countryCode: 'NZ', name: 'New Zealand' },
      { countryCode: 'NI', name: 'Nicaragua' },
      { countryCode: 'NG', name: 'Nigeria' },
      { countryCode: 'MK', name: 'North Macedonia' },
      { countryCode: 'NO', name: 'Norway' },
      { countryCode: 'PA', name: 'Panama' },
      { countryCode: 'PY', name: 'Paraguay' },
      { countryCode: 'PE', name: 'Peru' },
      { countryCode: 'PH', name: 'Philippines' },
      { countryCode: 'PL', name: 'Poland' },
      { countryCode: 'PT', name: 'Portugal' },
      { countryCode: 'RO', name: 'Romania' },
      { countryCode: 'RU', name: 'Russia' },
      { countryCode: 'SM', name: 'San Marino' },
      { countryCode: 'SA', name: 'Saudi Arabia' },
      { countryCode: 'RS', name: 'Serbia' },
      { countryCode: 'SG', name: 'Singapore' },
      { countryCode: 'SK', name: 'Slovakia' },
      { countryCode: 'SI', name: 'Slovenia' },
      { countryCode: 'ZA', name: 'South Africa' },
      { countryCode: 'ES', name: 'Spain' },
      { countryCode: 'SE', name: 'Sweden' },
      { countryCode: 'CH', name: 'Switzerland' },
      { countryCode: 'TH', name: 'Thailand' },
      { countryCode: 'TN', name: 'Tunisia' },
      { countryCode: 'TR', name: 'Turkey' },
      { countryCode: 'UA', name: 'Ukraine' },
      { countryCode: 'AE', name: 'United Arab Emirates' },
      { countryCode: 'GB', name: 'United Kingdom' },
      { countryCode: 'US', name: 'United States' },
      { countryCode: 'UY', name: 'Uruguay' },
      { countryCode: 'VA', name: 'Vatican City' },
      { countryCode: 'VE', name: 'Venezuela' },
      { countryCode: 'VN', name: 'Vietnam' }
    ].sort((a, b) => a.name.localeCompare(b.name));
  }

  // Fetch country profile from REST Countries API
  async getCountryDetails(countryCode) {
    try {
      const res = await fetch(`${this.restCountriesBase}/alpha/${countryCode}`);
      if (!res.ok) throw new Error('Failed to load country details');
      const data = await res.json();
      return Array.isArray(data) ? data[0] : data;
    } catch (err) {
      console.error('Error fetching country details:', err);
      return null;
    }
  }

  // Fetch official public holidays
  async getHolidays(year, countryCode) {
    try {
      const res = await fetch(`${this.nagerBase}/PublicHolidays/${year}/${countryCode}`);
      if (!res.ok) throw new Error('Failed to load holidays');
      return await res.json();
    } catch (err) {
      console.error('Error fetching holidays:', err);
      return [];
    }
  }

  // Fetch long weekends
  async getLongWeekends(year, countryCode) {
    try {
      const res = await fetch(`${this.nagerBase}/LongWeekend/${year}/${countryCode}`);
      if (!res.ok) throw new Error('Failed to load long weekends');
      return await res.json();
    } catch (err) {
      console.error('Error fetching long weekends:', err);
      return [];
    }
  }

  // Search cities within a specific country using Open-Meteo Geocoding
  async searchCities(query, countryCode) {
    try {
      let url = `${this.geocodingBase}/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`;
      if (countryCode) {
        url += `&countryCode=${countryCode}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error('City search failed');
      const data = await res.json();
      return data.results || [];
    } catch (err) {
      console.error('Error searching cities:', err);
      return [];
    }
  }

  // Get coordinates for a specific city within a country
  async getCityCoordinates(cityName, countryCode) {
    try {
      let url = `${this.geocodingBase}/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
      if (countryCode) {
        url += `&countryCode=${countryCode}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error('Geocoding failed');
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const item = data.results[0];
        return {
          lat: item.latitude,
          lon: item.longitude,
          name: item.name,
          timezone: item.timezone
        };
      }
      return null;
    } catch (err) {
      console.error('Error getting city coordinates:', err);
      return null;
    }
  }

  // Fetch live weather data from Open-Meteo
  async getWeather(lat, lon) {
    try {
      const url = `${this.openMeteoBase}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,uv_index&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather fetch failed');
      return await res.json();
    } catch (err) {
      console.error('Error fetching weather:', err);
      return null;
    }
  }

  // Fetch sun times from SunriseSunset.io
  async getSunTimes(lat, lon) {
    try {
      const res = await fetch(`${this.sunTimesBase}?lat=${lat}&lng=${lon}`);
      if (!res.ok) throw new Error('Sun times fetch failed');
      const data = await res.json();
      return data.results || null;
    } catch (err) {
      console.error('Error fetching sun times:', err);
      return null;
    }
  }

  // Fetch exchange rates from ExchangeRate-API
  async getExchangeRates(base = 'USD') {
    try {
      const res = await fetch(`${this.currencyBase}/${base}`);
      if (!res.ok) throw new Error('Exchange rates fetch failed');
      return await res.json();
    } catch (err) {
      console.error('Error fetching exchange rates:', err);
      return null;
    }
  }

  // Fetch ticketed events through secure server proxy
  async getEvents(cityName, countryCode) {
    try {
      let url = `${this.eventsApiEndpoint}?city=${encodeURIComponent(cityName)}`;
      if (countryCode) {
        url += `&countryCode=${encodeURIComponent(countryCode)}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error('Events fetch failed');
      const data = await res.json();
      if (data._embedded && data._embedded.events) {
        return data._embedded.events;
      }
      return [];
    } catch (err) {
      console.error('Error fetching events:', err);
      return [];
    }
  }
}

// LocalStorage Manager for My Plans
class PlansManager {
  constructor() {
    this.storageKey = 'wanderlust_saved_plans';
  }

  // Retrieve plans list safely
  getPlans() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error('Error reading saved plans from LocalStorage:', err);
      return [];
    }
  }

  // Save new plan avoiding duplicates
  savePlan(plan) {
    try {
      const plans = this.getPlans();
      const alreadySaved = plans.some(item => item.id === plan.id);
      if (alreadySaved) {
        return { success: false, message: 'This item is already in My Plans!' };
      }
      plans.push(plan);
      localStorage.setItem(this.storageKey, JSON.stringify(plans));
      return { success: true, message: 'Saved to My Plans!' };
    } catch (err) {
      console.error('Error saving plan:', err);
      return { success: false, message: 'Could not save to LocalStorage.' };
    }
  }

  // Delete plan by ID
  deletePlan(id) {
    try {
      const plans = this.getPlans();
      const filtered = plans.filter(item => item.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(filtered));
      return true;
    } catch (err) {
      console.error('Error deleting plan:', err);
      return false;
    }
  }

  // Clear all plans
  clearAll() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (err) {
      console.error('Error clearing plans:', err);
      return false;
    }
  }

  // Check if item is already saved
  isSaved(id) {
    const plans = this.getPlans();
    return plans.some(item => item.id === id);
  }

  // Return counts for each plan category
  getCounts() {
    const plans = this.getPlans();
    return {
      all: plans.length,
      holiday: plans.filter(p => p.type === 'holiday').length,
      event: plans.filter(p => p.type === 'event').length,
      longweekend: plans.filter(p => p.type === 'longweekend').length
    };
  }
}

// Currency Converter service
class CurrencyConverter {
  constructor(apiService) {
    this.apiService = apiService;
    this.rates = {};
    this.base = 'USD';
    this.lastUpdated = '';
    this.error = null;
  }

  // Fetch live exchange rates
  async loadRates(base = 'USD') {
    this.base = base;
    this.error = null;
    const data = await this.apiService.getExchangeRates(base);
    if (data && data.rates && Object.keys(data.rates).length > 0) {
      this.rates = data.rates;
      this.lastUpdated = data.time_last_update_utc
        ? new Date(data.time_last_update_utc).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'Today';
      return true;
    }
    this.error = 'Unable to load live exchange rates.';
    return false;
  }

  // Check if value is a finite number greater than zero
  isValidAmount(val) {
    if (val === null || val === undefined) return false;
    const num = Number(typeof val === 'string' ? val.trim() : val);
    return Number.isFinite(num) && num > 0;
  }

  // Convert amount between two currencies
  convert(amount, from, to) {
    if (!this.isValidAmount(amount)) return null;
    if (!this.rates || Object.keys(this.rates).length === 0) return null;
    if (!this.rates[from] || !this.rates[to]) return null;

    const num = Number(amount);
    const fromRate = this.rates[from];
    const toRate = this.rates[to];
    return (num / fromRate) * toRate;
  }

  // Get exchange rate between two currencies
  getRate(from, to) {
    if (!this.rates || !this.rates[from] || !this.rates[to]) return null;
    return this.rates[to] / this.rates[from];
  }
}

// Router using HTML5 History API
class Router {
  constructor() {
    this.routes = {
      '/': 'dashboard',
      '/holidays': 'holidays',
      '/events': 'events',
      '/weather': 'weather',
      '/long-weekends': 'long-weekends',
      '/currency': 'currency',
      '/sun-times': 'sun-times',
      '/plans': 'my-plans'
    };
    this.viewToPath = {
      'dashboard': '/',
      'holidays': '/holidays',
      'events': '/events',
      'weather': '/weather',
      'long-weekends': '/long-weekends',
      'currency': '/currency',
      'sun-times': '/sun-times',
      'my-plans': '/plans'
    };
    this.currentView = 'dashboard';
    this.onViewChange = null;
  }

  // Initialize router and listeners
  init(callback) {
    this.onViewChange = callback;

    document.querySelectorAll('[data-view]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const view = link.getAttribute('data-view');
        this.navigateTo(view);
      });
    });

    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.view) {
        this.showView(e.state.view, false);
      } else {
        this.handleInitialRoute();
      }
    });

    window.addEventListener('hashchange', () => {
      this.handleInitialRoute();
    });

    this.handleInitialRoute();
  }

  // Handle initial route on page load
  handleInitialRoute() {
    let path = window.location.pathname;
    if (window.location.hash) {
      path = window.location.hash.replace('#', '');
    }
    const target = this.routes[path] || 'dashboard';
    this.showView(target, false);
  }

  // Navigate to view and push state
  navigateTo(viewName) {
    const path = this.viewToPath[viewName] || '/';
    try {
      history.pushState({ view: viewName }, '', path);
    } catch (err) {
      window.location.hash = path;
    }
    this.showView(viewName, true);
  }

  // Display specific view
  showView(viewName, isNav = true) {
    this.currentView = viewName;

    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(`${viewName}-view`);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-item').forEach(item => {
      if (item.getAttribute('data-view') === viewName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    this.updateHeaderTitles(viewName);

    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');

    if (this.onViewChange) {
      this.onViewChange(viewName);
    }
  }

  // Update header title and subtitle
  updateHeaderTitles(viewName) {
    const titleEl = document.getElementById('page-title');
    const subtitleEl = document.getElementById('page-subtitle');
    if (!titleEl || !subtitleEl) return;

    const titles = {
      'dashboard': { title: 'Dashboard', sub: 'Welcome back! Ready to plan your next adventure?' },
      'holidays': { title: 'Public Holidays', sub: 'Explore official public holidays around the world' },
      'events': { title: 'Events', sub: 'Discover concerts, sports, theatre and more in your city' },
      'weather': { title: 'Weather Forecast', sub: 'Check live forecast and weather conditions' },
      'long-weekends': { title: 'Long Weekend Finder', sub: 'Find holidays near weekends - perfect for mini-trips' },
      'currency': { title: 'Currency Converter', sub: 'Convert between currencies with live exchange rates' },
      'sun-times': { title: 'Sun Times', sub: 'Sunrise, sunset, and daylight distribution' },
      'my-plans': { title: 'My Plans', sub: 'Your saved holidays and events' }
    };

    const info = titles[viewName] || titles['dashboard'];
    titleEl.textContent = info.title;
    subtitleEl.textContent = info.sub;
  }
}

// Main Application Controller
class App {
  constructor() {
    this.api = new ApiService();
    this.plans = new PlansManager();
    this.currency = new CurrencyConverter(this.api);
    this.router = new Router();

    // Default state: Egypt / Cairo / 2026
    this.countryCode = 'EG';
    this.countryName = 'Egypt';
    this.cityName = 'Cairo';
    this.cityCoords = { lat: 30.0444, lon: 31.2357 };
    this.year = 2026;
    this.countryData = null;
    this.countriesList = [];
    this.activePlanFilter = 'all';
    this.citySearchDebounce = null;
  }

  // Sanitize text before rendering into HTML
  escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Validate external URL protocol using URL constructor
  isValidUrl(url) {
    if (!url || typeof url !== 'string') return false;
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch (e) {
      return false;
    }
  }

  // Format destination time string (e.g., '2026-11-14T06:30') into '06:30 AM'
  formatIsoTime(isoStr) {
    if (!isoStr || typeof isoStr !== 'string') return '--';
    const match = isoStr.match(/T?(\d{1,2}):(\d{2})/);
    if (!match) return '--';
    let hour = parseInt(match[1], 10);
    const minute = match[2];
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    const hourStr = hour < 10 ? `0${hour}` : `${hour}`;
    return `${hourStr}:${minute} ${ampm}`;
  }

  // Format destination date from ISO string without client local timezone shifts
  formatDestinationDate(isoStr) {
    if (!isoStr || typeof isoStr !== 'string') {
      return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    }
    const datePart = isoStr.split('T')[0];
    const parts = datePart.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(Date.UTC(year, month, day, 12, 0, 0));
      return d.toLocaleDateString('en-US', {
        timeZone: 'UTC',
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    }
    return datePart;
  }

  // Initialize application
  async init() {
    this.setupEventListeners();
    this.setupCountrySelect();
    this.setupCitySelect();
    this.startHeaderClock();
    this.updatePlanBadges();

    this.router.init((viewName) => {
      this.handleViewChange(viewName);
    });

    this.showLoading('Loading Wanderlust...');
    await this.loadCountries();
    await this.loadSelectedCountryData(true);
    await this.currency.loadRates('USD');
    this.hideLoading();

    this.updateAllSelectionBadges();
    this.handleViewChange(this.router.currentView);
  }

  // Setup UI event listeners
  setupEventListeners() {
    const yearSelect = document.getElementById('global-year');
    const exploreBtn = document.getElementById('global-search-btn');
    const clearBtn = document.getElementById('clear-selection-btn');
    const destinationBox = document.getElementById('selected-destination');

    // Year selection change
    if (yearSelect) {
      yearSelect.addEventListener('change', (e) => {
        this.year = parseInt(e.target.value, 10);
        this.updateAllSelectionBadges();
        this.handleViewChange(this.router.currentView);
      });
    }

    // Explore button click
    if (exploreBtn) {
      exploreBtn.addEventListener('click', async () => {
        if (yearSelect && yearSelect.value) {
          this.year = parseInt(yearSelect.value, 10);
        }

        if (this.countryCode && destinationBox) {
          destinationBox.classList.remove('hidden');
          destinationBox.style.display = '';
        }
        this.showLoading('Updating destination...');
        // Pass false so the selected city is preserved
        await this.loadSelectedCountryData(false);

        // Ensure city coordinates are synced
        if (this.cityName && (!this.cityCoords || !this.cityCoords.lat)) {
          this.cityCoords = await this.api.getCityCoordinates(this.cityName, this.countryCode);
        }

        this.updateDestinationBar();
        this.updateAllSelectionBadges();
        this.hideLoading();
        this.handleViewChange(this.router.currentView);
        this.showToast(`Exploring ${this.cityName}, ${this.countryName}!`, 'info');
      });
    }

    // Clear selection button (x)
    if (clearBtn) {
      clearBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.clearDestination();
      });
    }

    // Delegated click listener for clear button
    document.addEventListener('click', (e) => {
      if (e.target.closest('#clear-selection-btn')) {
        e.preventDefault();
        e.stopPropagation();
        this.clearDestination();
      }
    });

    // Mobile sidebar toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (mobileBtn && sidebar && overlay) {
      mobileBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
      });
      overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
      });
    }

    // Plan category filter buttons
    document.querySelectorAll('.plan-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.plan-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activePlanFilter = btn.getAttribute('data-filter') || 'all';
        this.renderPlansView();
      });
    });

    // Remove single plan with SweetAlert2 confirmation then auto-closing success popup
    document.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('.btn-plan-remove');
      if (removeBtn) {
        const id = removeBtn.getAttribute('data-id');
        if (!id) return;

        if (window.Swal) {
          window.Swal.fire({
            title: 'Remove Plan?',
            text: 'Are you sure you want to remove this plan?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#475569',
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'Cancel'
          }).then((result) => {
            if (result.isConfirmed) {
              window.Swal.fire({
                title: 'Removed!',
                text: 'The plan has been removed.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
              }).then(() => {
                this.plans.deletePlan(id);
                this.updatePlanBadges();
                this.renderPlansView();
              });
            }
          });
        } else {
          if (confirm('Are you sure you want to remove this plan?')) {
            this.plans.deletePlan(id);
            this.updatePlanBadges();
            this.renderPlansView();
            this.showToast('The plan has been removed.', 'success');
          }
        }
      }
    });

    // Clear all plans button
    const clearPlansBtn = document.getElementById('clear-all-plans-btn');
    if (clearPlansBtn) {
      clearPlansBtn.addEventListener('click', () => {
        if (this.plans.getPlans().length === 0) {
          this.showToast('You do not have any saved plans to clear.', 'info');
          return;
        }

        if (window.Swal) {
          window.Swal.fire({
            title: 'Clear All Plans?',
            text: 'Are you sure you want to remove all saved plans? This cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#475569',
            confirmButtonText: 'Yes, clear all',
            cancelButtonText: 'Cancel'
          }).then((result) => {
            if (result.isConfirmed) {
              window.Swal.fire({
                title: 'Cleared!',
                text: 'All plans have been removed.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
              }).then(() => {
                this.plans.clearAll();
                this.updatePlanBadges();
                this.renderPlansView();
              });
            }
          });
        } else {
          if (confirm('Are you sure you want to clear all saved plans?')) {
            this.plans.clearAll();
            this.updatePlanBadges();
            this.renderPlansView();
            this.showToast('All plans cleared successfully!', 'success');
          }
        }
      });
    }

    // Start exploring button in empty state
    document.addEventListener('click', (e) => {
      if (e.target.closest('#start-exploring-btn')) {
        this.router.navigateTo('holidays');
      }
    });

    // Currency converter controls
    const convertBtn = document.getElementById('convert-btn');
    const swapBtn = document.getElementById('swap-currencies-btn');
    const amountInput = document.getElementById('currency-amount');
    const fromSelect = document.getElementById('currency-from');
    const toSelect = document.getElementById('currency-to');

    if (convertBtn) {
      convertBtn.addEventListener('click', () => this.handleCurrencyConvert());
    }
    if (amountInput) {
      amountInput.addEventListener('input', () => this.handleCurrencyConvert());
    }
    if (fromSelect) {
      fromSelect.addEventListener('change', async () => {
        await this.currency.loadRates(fromSelect.value);
        this.handleCurrencyConvert();
        this.renderPopularCurrencies();
      });
    }
    if (toSelect) {
      toSelect.addEventListener('change', () => this.handleCurrencyConvert());
    }
    if (swapBtn && fromSelect && toSelect) {
      swapBtn.addEventListener('click', async () => {
        const temp = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = temp;
        await this.currency.loadRates(fromSelect.value);
        this.handleCurrencyConvert();
        this.renderPopularCurrencies();
      });
    }

    // Click neighbor border tag
    document.addEventListener('click', (e) => {
      const borderTag = e.target.closest('.border-tag');
      if (borderTag) {
        const code = borderTag.getAttribute('data-border');
        if (code) {
          this.selectCountryByCode(code);
        }
      }
    });
  }

  // Setup Custom Country Select dropdown
  setupCountrySelect() {
    const trigger = document.getElementById('country-select-trigger');
    const dropdown = document.getElementById('country-select-dropdown');
    const searchInput = document.getElementById('country-search-input');
    const wrapper = document.getElementById('country-select-wrapper');

    if (trigger && dropdown) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const cityDropdown = document.getElementById('city-select-dropdown');
        const cityTrigger = document.getElementById('city-select-trigger');
        if (cityDropdown) cityDropdown.classList.remove('open');
        if (cityTrigger) cityTrigger.classList.remove('open');

        const isOpen = dropdown.classList.contains('open');
        if (isOpen) {
          dropdown.classList.remove('open');
          trigger.classList.remove('open');
        } else {
          dropdown.classList.add('open');
          trigger.classList.add('open');
          if (searchInput) {
            searchInput.value = '';
            this.filterCountryOptions('');
            setTimeout(() => searchInput.focus(), 50);
          }
        }
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filterCountryOptions(e.target.value);
      });
      searchInput.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    // Close dropdown on outside click or Escape
    document.addEventListener('click', (e) => {
      if (wrapper && !wrapper.contains(e.target)) {
        if (dropdown) dropdown.classList.remove('open');
        if (trigger) trigger.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (dropdown) dropdown.classList.remove('open');
        if (trigger) trigger.classList.remove('open');
      }
    });
  }

  // Filter country dropdown options
  filterCountryOptions(query) {
    const optionsContainer = document.getElementById('country-select-options');
    if (!optionsContainer) return;

    const q = query.toLowerCase().trim();
    const options = optionsContainer.querySelectorAll('.custom-select-option:not(.no-results)');
    let matchCount = 0;

    options.forEach(opt => {
      const name = (opt.getAttribute('data-name') || '').toLowerCase();
      const code = (opt.getAttribute('data-code') || '').toLowerCase();
      if (name.includes(q) || code.includes(q)) {
        opt.style.display = 'flex';
        matchCount++;
      } else {
        opt.style.display = 'none';
      }
    });

    let noRes = optionsContainer.querySelector('.no-results');
    if (matchCount === 0) {
      if (!noRes) {
        noRes = document.createElement('div');
        noRes.className = 'custom-select-option no-results';
        noRes.textContent = 'No countries found';
        optionsContainer.appendChild(noRes);
      }
      noRes.style.display = 'flex';
    } else if (noRes) {
      noRes.style.display = 'none';
    }
  }

  // Load countries into dropdown
  async loadCountries() {
    const countries = await this.api.getCountries();
    this.countriesList = countries;

    const optionsContainer = document.getElementById('country-select-options');
    const select = document.getElementById('global-country');

    if (select) {
      select.innerHTML = '<option value="">Select Country</option>';
    }

    if (optionsContainer) {
      optionsContainer.innerHTML = '';
    }

    countries.forEach(c => {
      if (select) {
        const opt = document.createElement('option');
        opt.value = c.countryCode;
        opt.textContent = `${c.name} (${c.countryCode})`;
        if (c.countryCode === this.countryCode) {
          opt.selected = true;
        }
        select.appendChild(opt);
      }

      if (optionsContainer) {
        const item = document.createElement('div');
        item.className = `custom-select-option ${c.countryCode === this.countryCode ? 'selected' : ''}`;
        item.setAttribute('data-code', c.countryCode);
        item.setAttribute('data-name', c.name);
        item.innerHTML = `
          <span class="flag"><img src="https://flagcdn.com/w40/${c.countryCode.toLowerCase()}.png" class="flag-img" alt="${this.escapeHtml(c.name)}"></span>
          <span class="country-name">${this.escapeHtml(c.name)}</span>
          <span class="country-code">${this.escapeHtml(c.countryCode)}</span>
        `;
        item.addEventListener('click', () => {
          this.selectCountry(c.countryCode, c.name);
        });
        optionsContainer.appendChild(item);
      }
    });

    const flagSpan = document.getElementById('custom-selected-flag');
    const textSpan = document.getElementById('custom-selected-text');
    if (flagSpan && this.countryCode) {
      flagSpan.innerHTML = `<img src="https://flagcdn.com/w40/${this.countryCode.toLowerCase()}.png" alt="${this.escapeHtml(this.countryName)}" class="flag-img">`;
    }
    if (textSpan && this.countryName) {
      textSpan.textContent = this.countryName;
      textSpan.classList.remove('placeholder');
    }

    const statCountries = document.getElementById('stat-countries');
    if (statCountries) {
      statCountries.textContent = countries.length > 0 ? `${countries.length}+` : '90+';
    }
  }

  // Setup Custom City Select dropdown with live Open-Meteo search
  setupCitySelect() {
    const trigger = document.getElementById('city-select-trigger');
    const dropdown = document.getElementById('city-select-dropdown');
    const searchInput = document.getElementById('city-search-input');
    const wrapper = document.getElementById('city-select-wrapper');

    if (trigger && dropdown) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const countryDropdown = document.getElementById('country-select-dropdown');
        const countryTrigger = document.getElementById('country-select-trigger');
        if (countryDropdown) countryDropdown.classList.remove('open');
        if (countryTrigger) countryTrigger.classList.remove('open');

        const isOpen = dropdown.classList.contains('open');
        if (isOpen) {
          dropdown.classList.remove('open');
          trigger.classList.remove('open');
        } else {
          dropdown.classList.add('open');
          trigger.classList.add('open');
          if (searchInput) {
            searchInput.value = '';
            if (this.countryName) {
              searchInput.placeholder = `Search cities in ${this.countryName}...`;
            }
            setTimeout(() => searchInput.focus(), 50);
          }
        }
      });
    }

    // Live search input with debouncing using Open-Meteo Geocoding
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        clearTimeout(this.citySearchDebounce);
        this.citySearchDebounce = setTimeout(() => {
          this.searchAndRenderCities(query);
        }, 250);
      });

      searchInput.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    // Close dropdown on outside click or Escape
    document.addEventListener('click', (e) => {
      if (wrapper && !wrapper.contains(e.target)) {
        if (dropdown) dropdown.classList.remove('open');
        if (trigger) trigger.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (dropdown) dropdown.classList.remove('open');
        if (trigger) trigger.classList.remove('open');
      }
    });
  }

  // Search cities using Open-Meteo Geocoding API and render options
  async searchAndRenderCities(query) {
    const container = document.getElementById('city-select-options');
    if (!container) return;

    if (!this.countryCode) {
      container.innerHTML = '<div class="custom-select-option no-results">Please select a country first</div>';
      return;
    }

    if (!query || query.length < 2) {
      await this.loadInitialCitiesForCountry();
      return;
    }

    container.innerHTML = `
      <div class="custom-select-option no-results">
        <i class="fa-solid fa-spinner fa-spin"></i> Searching in ${this.escapeHtml(this.countryName)}...
      </div>`;

    const results = await this.api.searchCities(query, this.countryCode);
    if (!results || results.length === 0) {
      container.innerHTML = `<div class="custom-select-option no-results">No cities found for "${this.escapeHtml(query)}" in ${this.escapeHtml(this.countryName)}</div>`;
      return;
    }

    container.innerHTML = '';
    results.forEach(city => {
      const item = document.createElement('div');
      item.className = `custom-select-option ${city.name === this.cityName ? 'selected' : ''}`;
      item.innerHTML = `
        <span class="flag"><i class="fa-solid fa-location-dot" style="font-size: 14px; color: var(--primary-500);"></i></span>
        <span class="country-name">${this.escapeHtml(city.name)}</span>
        <span class="country-code">${this.escapeHtml(city.admin1 || city.country_code || '')}</span>
      `;
      item.addEventListener('click', () => {
        this.selectCity(city.name, {
          lat: city.latitude,
          lon: city.longitude,
          name: city.name,
          timezone: city.timezone
        });
      });
      container.appendChild(item);
    });
  }

  // Load initial cities for the selected country (Capital + geocoding matches)
  async loadInitialCitiesForCountry() {
    const container = document.getElementById('city-select-options');
    const select = document.getElementById('global-city');
    if (!container) return;

    container.innerHTML = '';
    const initialList = [];

    // Add capital city first
    if (this.countryData && this.countryData.capital && this.countryData.capital.length > 0) {
      initialList.push({
        name: this.countryData.capital[0],
        admin1: 'Capital City'
      });
    }

    // Try searching common cities in this country via Open-Meteo
    const searchTarget = initialList[0]?.name || this.countryName;
    const geoResults = await this.api.searchCities(searchTarget, this.countryCode);
    if (Array.isArray(geoResults)) {
      geoResults.forEach(r => {
        if (!initialList.some(item => item.name.toLowerCase() === r.name.toLowerCase())) {
          initialList.push({
            name: r.name,
            admin1: r.admin1 || r.country_code,
            lat: r.latitude,
            lon: r.longitude,
            timezone: r.timezone
          });
        }
      });
    }

    // Render into dropdown options
    initialList.forEach(city => {
      const item = document.createElement('div');
      item.className = `custom-select-option ${city.name === this.cityName ? 'selected' : ''}`;
      item.innerHTML = `
        <span class="flag"><i class="fa-solid fa-location-dot" style="font-size: 14px; color: var(--primary-500);"></i></span>
        <span class="country-name">${this.escapeHtml(city.name)}</span>
        <span class="country-code">${this.escapeHtml(city.admin1 || '')}</span>
      `;
      item.addEventListener('click', () => {
        const coords = (city.lat && city.lon) ? { lat: city.lat, lon: city.lon, timezone: city.timezone } : null;
        this.selectCity(city.name, coords);
      });
      container.appendChild(item);
    });

    if (select) {
      select.innerHTML = '';
      initialList.forEach(city => {
        const opt = document.createElement('option');
        opt.value = city.name;
        opt.textContent = city.name;
        if (city.name === this.cityName) opt.selected = true;
        select.appendChild(opt);
      });
    }
  }

  // Handle city selection
  async selectCity(cityName, coords = null) {
    this.cityName = cityName;
    this.cityCoords = coords;

    const cityText = document.getElementById('city-selected-text');
    const cityTrigger = document.getElementById('city-select-trigger');
    const cityDropdown = document.getElementById('city-select-dropdown');
    const globalCitySelect = document.getElementById('global-city');

    if (cityText) cityText.textContent = cityName;
    if (cityTrigger) cityTrigger.classList.remove('open');
    if (cityDropdown) cityDropdown.classList.remove('open');

    if (globalCitySelect) {
      let match = Array.from(globalCitySelect.options).find(o => o.value === cityName);
      if (!match) {
        const newOpt = document.createElement('option');
        newOpt.value = cityName;
        newOpt.textContent = cityName;
        globalCitySelect.appendChild(newOpt);
        match = newOpt;
      }
      globalCitySelect.value = cityName;
    }

    document.querySelectorAll('#city-select-options .custom-select-option').forEach(opt => {
      const name = opt.querySelector('.country-name')?.textContent;
      if (name === cityName) {
        opt.classList.add('selected');
      } else {
        opt.classList.remove('selected');
      }
    });

    // Ensure coordinates are synchronized
    if (!this.cityCoords && this.countryCode) {
      this.cityCoords = await this.api.getCityCoordinates(cityName, this.countryCode);
    }

    this.updateDestinationBar();
    this.updateAllSelectionBadges();
    this.handleViewChange(this.router.currentView);
    this.showToast(`Selected city: ${cityName}`, 'info');
  }

  // Handle country selection
  async selectCountry(code, name) {
    this.countryCode = code;
    this.countryName = name;
    this.cityName = ''; // Reset selected city when country changes
    this.cityCoords = null;

    const flagSpan = document.getElementById('custom-selected-flag');
    const textSpan = document.getElementById('custom-selected-text');
    const trigger = document.getElementById('country-select-trigger');
    const dropdown = document.getElementById('country-select-dropdown');
    const select = document.getElementById('global-country');
    const destinationBox = document.getElementById('selected-destination');

    if (flagSpan) {
      flagSpan.innerHTML = `<img src="https://flagcdn.com/w40/${code.toLowerCase()}.png" alt="${this.escapeHtml(name)}" class="flag-img">`;
    }
    if (textSpan) {
      textSpan.textContent = name;
      textSpan.classList.remove('placeholder');
    }
    if (trigger) trigger.classList.remove('open');
    if (dropdown) dropdown.classList.remove('open');
    if (select) select.value = code;

    document.querySelectorAll('#country-select-options .custom-select-option').forEach(opt => {
      if (opt.getAttribute('data-code') === code) {
        opt.classList.add('selected');
      } else {
        opt.classList.remove('selected');
      }
    });

    if (destinationBox) {
      destinationBox.classList.remove('hidden');
      destinationBox.style.display = '';
    }

    // Set capital as default city only when new country is selected (forceDefaultCity = true)
    await this.loadSelectedCountryData(true);
    await this.loadInitialCitiesForCountry();
    this.updateAllSelectionBadges();
    this.handleViewChange(this.router.currentView);
  }

  // Load country details from REST Countries API
  async loadSelectedCountryData(forceDefaultCity = false) {
    if (!this.countryCode) return;

    const data = await this.api.getCountryDetails(this.countryCode);
    if (data) {
      this.countryData = data;
      if (data.name && data.name.common) {
        this.countryName = data.name.common;
      }
      // Set capital as default city only if no city is currently selected or forceDefaultCity is true
      if ((!this.cityName || forceDefaultCity) && data.capital && data.capital.length > 0) {
        this.cityName = data.capital[0];
        this.cityCoords = null;
        const cityText = document.getElementById('city-selected-text');
        if (cityText) cityText.textContent = this.cityName;
      }
    }

    // Resolve city coordinates and timezone if not already set
    if (this.cityName && (!this.cityCoords || !this.cityCoords.lat)) {
      this.cityCoords = await this.api.getCityCoordinates(this.cityName, this.countryCode);
    }

    this.updateDestinationBar();
    this.renderDashboardCountryInfo();
  }

  // Select country by ISO code
  async selectCountryByCode(code) {
    const found = this.countriesList.find(c => c.countryCode === code);
    const name = found ? found.name : code;
    this.showLoading(`Loading ${name}...`);
    await this.selectCountry(code, name);
    this.hideLoading();
    this.showToast(`Selected ${this.countryName}`, 'info');
  }

  // Clear destination selection (Dashboard x button)
  clearDestination() {
    const destinationBox = document.getElementById('selected-destination');
    if (destinationBox) {
      destinationBox.classList.add('hidden');
      destinationBox.style.display = 'none';
    }

    const flagSpan = document.getElementById('custom-selected-flag');
    const textSpan = document.getElementById('custom-selected-text');
    if (flagSpan) flagSpan.innerHTML = '';
    if (textSpan) {
      textSpan.textContent = 'Select Country';
      textSpan.classList.add('placeholder');
    }

    const cityText = document.getElementById('city-selected-text');
    if (cityText) cityText.textContent = 'Select City';

    const countrySelect = document.getElementById('global-country');
    const citySelect = document.getElementById('global-city');
    if (countrySelect) countrySelect.value = '';
    if (citySelect) citySelect.innerHTML = '<option value="">Select City</option>';

    document.querySelectorAll('.custom-select-option').forEach(opt => opt.classList.remove('selected'));

    this.countryCode = null;
    this.countryName = '';
    this.cityName = '';
    this.cityCoords = null;
    this.countryData = null;

    const infoBox = document.getElementById('dashboard-country-info');
    if (infoBox) {
      infoBox.innerHTML = `
        <div class="country-info-placeholder">
          <div class="placeholder-icon"><i class="fa-solid fa-flag"></i></div>
          <p>Select a country above to view detailed country facts, local time, and statistics.</p>
        </div>
      `;
    }

    const statEvents = document.getElementById('stat-events');
    if (statEvents) statEvents.textContent = '0';

    this.updateAllSelectionBadges();
    this.showToast('Destination selection cleared', 'info');
  }

  // Update destination bar display
  updateDestinationBar() {
    const flagImg = document.getElementById('selected-country-flag');
    const countryNameEl = document.getElementById('selected-country-name');
    const cityNameEl = document.getElementById('selected-city-name');
    const destinationBox = document.getElementById('selected-destination');

    if (!this.countryCode) {
      if (destinationBox) {
        destinationBox.classList.add('hidden');
        destinationBox.style.display = 'none';
      }
      return;
    }

    if (destinationBox) {
      destinationBox.classList.remove('hidden');
      destinationBox.style.display = '';
    }
    if (flagImg) {
      const rawFlag = this.countryData?.flags?.png;
      flagImg.src = (rawFlag && this.isValidUrl(rawFlag))
        ? rawFlag
        : `https://flagcdn.com/w80/${this.countryCode.toLowerCase()}.png`;
      flagImg.alt = this.escapeHtml(this.countryName);
    }
    if (countryNameEl) {
      countryNameEl.textContent = this.countryName;
    }
    if (cityNameEl) {
      cityNameEl.textContent = this.cityName ? `• ${this.cityName}` : '';
    }
  }

  // Update top selection badges across all views
  updateAllSelectionBadges() {
    const flagUrl = this.countryCode ? `https://flagcdn.com/w40/${this.countryCode.toLowerCase()}.png` : '';

    const countryYearHtml = this.countryCode ? `
      <div class="current-selection-badge">
        <img src="${this.escapeHtml(flagUrl)}" alt="${this.escapeHtml(this.countryName)}" class="selection-flag">
        <span>${this.escapeHtml(this.countryName)}</span>
        <span class="selection-year">${this.year}</span>
      </div>` : `
      <div class="no-selection-message">
        <i class="fa-solid fa-circle-info"></i>
        <span>Select destination in Dashboard</span>
      </div>`;

    const countryCityHtml = this.countryCode ? `
      <div class="current-selection-badge">
        <img src="${this.escapeHtml(flagUrl)}" alt="${this.escapeHtml(this.countryName)}" class="selection-flag">
        <span>${this.escapeHtml(this.countryName)}</span>
        <span class="selection-city">${this.escapeHtml(this.cityName || '')}</span>
      </div>` : `
      <div class="no-selection-message">
        <i class="fa-solid fa-circle-info"></i>
        <span>Select destination in Dashboard</span>
      </div>`;

    const holidaysBadge = document.getElementById('holidays-selection');
    if (holidaysBadge) holidaysBadge.innerHTML = countryYearHtml;

    const lwBadge = document.querySelector('#long-weekends-view .view-header-selection');
    if (lwBadge) lwBadge.innerHTML = countryYearHtml;

    const eventsBadge = document.querySelector('#events-view .view-header-selection');
    if (eventsBadge) eventsBadge.innerHTML = countryCityHtml;

    const weatherBadge = document.querySelector('#weather-view .view-header-selection');
    if (weatherBadge) weatherBadge.innerHTML = countryCityHtml;

    const sunBadge = document.querySelector('#sun-times-view .view-header-selection');
    if (sunBadge) sunBadge.innerHTML = countryCityHtml;
  }

  // Render country information section on Dashboard
  renderDashboardCountryInfo() {
    const container = document.getElementById('dashboard-country-info');
    if (!container) return;

    if (!this.countryCode || !this.countryData) {
      container.innerHTML = `
        <div class="country-info-placeholder">
          <div class="placeholder-icon"><i class="fa-solid fa-flag"></i></div>
          <p>Select a country above to view detailed country facts, local time, and statistics.</p>
        </div>`;
      return;
    }

    const c = this.countryData;
    const flagUrl = (c.flags?.png && this.isValidUrl(c.flags.png))
      ? c.flags.png
      : `https://flagcdn.com/w160/${this.countryCode.toLowerCase()}.png`;
    const commonName = c.name?.common || this.countryName;
    const officialName = c.name?.official || commonName;
    const region = `${c.region || ''}${c.subregion ? ' • ' + c.subregion : ''}`;
    const capital = c.capital ? c.capital.join(', ') : 'N/A';
    const population = c.population ? c.population.toLocaleString() : 'N/A';
    const area = c.area ? `${c.area.toLocaleString()} km²` : 'N/A';
    const continent = c.continents ? c.continents[0] : (c.region || 'N/A');
    const callingCode = c.idd && c.idd.root ? `${c.idd.root}${c.idd.suffixes ? c.idd.suffixes[0] || '' : ''}` : 'N/A';
    const drivingSide = c.car && c.car.side ? c.car.side.charAt(0).toUpperCase() + c.car.side.slice(1) : 'Right';
    const weekStarts = c.startOfWeek ? c.startOfWeek.charAt(0).toUpperCase() + c.startOfWeek.slice(1) : 'Sunday';

    let currenciesHtml = '<span class="extra-tag">N/A</span>';
    if (c.currencies) {
      currenciesHtml = Object.entries(c.currencies)
        .map(([code, cur]) => `<span class="extra-tag">${this.escapeHtml(cur.name || code)} (${this.escapeHtml(code)} ${this.escapeHtml(cur.symbol || '')})</span>`)
        .join('');
    }

    let languagesHtml = '<span class="extra-tag">N/A</span>';
    if (c.languages) {
      languagesHtml = Object.values(c.languages)
        .map(lang => `<span class="extra-tag">${this.escapeHtml(lang)}</span>`)
        .join('');
    }

    let bordersHtml = '<span class="extra-tag">None (Island/Isolated)</span>';
    if (c.borders && c.borders.length > 0) {
      bordersHtml = c.borders
        .map(b => `<span class="extra-tag border-tag" data-border="${this.escapeHtml(b)}">${this.escapeHtml(b)}</span>`)
        .join('');
    }

    const rawMap = c.maps?.googleMaps || `https://www.google.com/maps/place/${encodeURIComponent(commonName)}`;
    const mapLink = this.isValidUrl(rawMap) ? rawMap : `https://www.google.com/maps/place/${encodeURIComponent(commonName)}`;

    container.innerHTML = `
      <div class="dashboard-country-header">
        <img src="${this.escapeHtml(flagUrl)}" alt="${this.escapeHtml(commonName)}" class="dashboard-country-flag">
        <div class="dashboard-country-title">
          <h3>${this.escapeHtml(commonName)}</h3>
          <p class="official-name">${this.escapeHtml(officialName)}</p>
          <span class="region"><i class="fa-solid fa-location-dot"></i> ${this.escapeHtml(region)}</span>
        </div>
        <div class="dashboard-country-time">
          <div class="time-label"><i class="fa-regular fa-clock"></i> Local Time</div>
          <div class="time-value" id="country-local-time">--:--</div>
        </div>
      </div>
      
      <div class="dashboard-country-details-grid">
        <div class="dashboard-country-detail">
          <i class="fa-solid fa-landmark"></i>
          <span class="label">Capital</span>
          <span class="value">${this.escapeHtml(capital)}</span>
        </div>
        <div class="dashboard-country-detail">
          <i class="fa-solid fa-users"></i>
          <span class="label">Population</span>
          <span class="value">${this.escapeHtml(population)}</span>
        </div>
        <div class="dashboard-country-detail">
          <i class="fa-solid fa-chart-area"></i>
          <span class="label">Area</span>
          <span class="value">${this.escapeHtml(area)}</span>
        </div>
        <div class="dashboard-country-detail">
          <i class="fa-solid fa-earth-americas"></i>
          <span class="label">Continent</span>
          <span class="value">${this.escapeHtml(continent)}</span>
        </div>
        <div class="dashboard-country-detail">
          <i class="fa-solid fa-phone"></i>
          <span class="label">Calling Code</span>
          <span class="value">${this.escapeHtml(callingCode)}</span>
        </div>
        <div class="dashboard-country-detail">
          <i class="fa-solid fa-car"></i>
          <span class="label">Driving Side</span>
          <span class="value">${this.escapeHtml(drivingSide)}</span>
        </div>
        <div class="dashboard-country-detail">
          <i class="fa-solid fa-calendar-week"></i>
          <span class="label">Week Starts</span>
          <span class="value">${this.escapeHtml(weekStarts)}</span>
        </div>
      </div>
      
      <div class="dashboard-country-extras">
        <div class="dashboard-country-extra">
          <h4><i class="fa-solid fa-coins"></i> Currency</h4>
          <div class="extra-tags">${currenciesHtml}</div>
        </div>
        <div class="dashboard-country-extra">
          <h4><i class="fa-solid fa-language"></i> Languages</h4>
          <div class="extra-tags">${languagesHtml}</div>
        </div>
        <div class="dashboard-country-extra">
          <h4><i class="fa-solid fa-map-location-dot"></i> Neighbors</h4>
          <div class="extra-tags">${bordersHtml}</div>
        </div>
      </div>
      
      <div class="dashboard-country-actions">
        <a href="${this.escapeHtml(mapLink)}" target="_blank" rel="noopener noreferrer" class="btn-map-link">
          <i class="fa-solid fa-map"></i> View on Google Maps
        </a>
      </div>
    `;

    this.updateCountryLocalTime();
  }

  // Update local time based on the selected city's IANA timezone
  updateCountryLocalTime() {
    const timeEl = document.getElementById('country-local-time');
    if (!timeEl) return;

    try {
      // Prefer the selected city's actual IANA timezone for accurate DST and local time
      const ianaTz = this.cityCoords && this.cityCoords.timezone;
      if (ianaTz) {
        timeEl.textContent = new Date().toLocaleTimeString('en-US', {
          timeZone: ianaTz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
      } else {
        timeEl.textContent = '--:--';
      }
    } catch (err) {
      timeEl.textContent = '--:--';
    }
  }

  // Handle route switching
  async handleViewChange(viewName) {
    this.updateAllSelectionBadges();

    switch (viewName) {
      case 'dashboard':
        this.renderDashboardCountryInfo();
        this.updateCountryHolidaysStat();
        break;
      case 'holidays':
        await this.renderHolidaysView();
        break;
      case 'events':
        await this.renderEventsView();
        break;
      case 'weather':
        await this.renderWeatherView();
        break;
      case 'long-weekends':
        await this.renderLongWeekendsView();
        break;
      case 'currency':
        this.renderCurrencyView();
        break;
      case 'sun-times':
        await this.renderSunTimesView();
        break;
      case 'my-plans':
        this.renderPlansView();
        break;
      default:
        break;
    }
  }

  // Update holidays count on dashboard stat card
  async updateCountryHolidaysStat() {
    const statEl = document.getElementById('stat-holidays');
    if (!statEl) return;
    if (!this.countryCode) {
      statEl.textContent = '0';
      return;
    }
    const holidays = await this.api.getHolidays(this.year, this.countryCode);
    statEl.textContent = holidays.length || '0';
  }

  // Render Holidays Explorer view
  async renderHolidaysView() {
    const container = document.getElementById('holidays-content');
    if (!container) return;

    if (!this.countryCode) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; padding: 48px;">
          <div class="empty-icon"><i class="fa-solid fa-globe"></i></div>
          <h3>No Destination Selected</h3>
          <p>Please select a country on the Dashboard to explore public holidays.</p>
        </div>`;
      return;
    }

    container.innerHTML = `
      <div class="country-info-loading" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-spinner fa-spin"></i>
        <span>Loading holidays for ${this.escapeHtml(this.countryName)} (${this.year})...</span>
      </div>`;

    const holidays = await this.api.getHolidays(this.year, this.countryCode);
    const statHolidays = document.getElementById('stat-holidays');
    if (statHolidays) statHolidays.textContent = holidays.length;

    if (!holidays || holidays.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; padding: 48px;">
          <div class="empty-icon"><i class="fa-solid fa-calendar-xmark"></i></div>
          <h3>No Holidays Found</h3>
          <p>No official public holidays available for ${this.escapeHtml(this.countryName)} in ${this.year}.</p>
        </div>`;
      return;
    }

    container.innerHTML = '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    holidays.forEach(h => {
      const dateObj = new Date(h.date);
      const dayNum = dateObj.getUTCDate();
      const monthStr = months[dateObj.getUTCMonth()];
      const dayName = days[dateObj.getUTCDay()];
      const planId = `holiday-${h.date}-${encodeURIComponent(h.name)}`;
      const isSaved = this.plans.isSaved(planId);

      const card = document.createElement('div');
      card.className = 'holiday-card';
      card.innerHTML = `
        <div class="holiday-card-header">
          <div class="holiday-date-box">
            <span class="day">${dayNum}</span>
            <span class="month">${monthStr}</span>
          </div>
          <button class="holiday-action-btn ${isSaved ? 'saved' : ''}" data-id="${this.escapeHtml(planId)}" title="${isSaved ? 'Saved in My Plans' : 'Save to My Plans'}">
            <i class="${isSaved ? 'fa-solid text-danger' : 'fa-regular'} fa-heart"></i>
          </button>
        </div>
        <h3>${this.escapeHtml(h.name)}</h3>
        <p class="holiday-name">${this.escapeHtml(h.localName || h.name)}</p>
        <div class="holiday-card-footer">
          <span class="holiday-day-badge"><i class="fa-regular fa-calendar"></i> ${dayName}</span>
          <span class="holiday-type-badge">${h.types && h.types.length > 0 ? this.escapeHtml(h.types.join(', ')) : 'Public'}</span>
        </div>
      `;

      const saveBtn = card.querySelector('.holiday-action-btn');
      saveBtn.addEventListener('click', () => {
        if (this.plans.isSaved(planId)) {
          this.showToast('This holiday is already saved in My Plans!', 'info');
          return;
        }
        const result = this.plans.savePlan({
          id: planId,
          type: 'holiday',
          title: h.name,
          date: `${dayNum} ${monthStr} ${this.year} (${dayName})`,
          subtitle: h.localName || h.name,
          details: `${this.countryName} • Public Holiday`
        });

        if (result.success) {
          saveBtn.classList.add('saved');
          saveBtn.innerHTML = '<i class="fa-solid text-danger fa-heart"></i>';
          this.updatePlanBadges();
          this.showToast(`Saved "${h.name}" to My Plans!`, 'success');
        }
      });

      container.appendChild(card);
    });
  }

  // Render Events Explorer view
  async renderEventsView() {
    const container = document.getElementById('events-content');
    if (!container) return;

    if (!this.cityName) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; padding: 48px;">
          <div class="empty-icon"><i class="fa-solid fa-city"></i></div>
          <h3>No Destination Selected</h3>
          <p>Please select a city on the Dashboard to explore local events.</p>
        </div>`;
      return;
    }

    container.innerHTML = `
      <div class="country-info-loading" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-spinner fa-spin"></i>
        <span>Discovering events in ${this.escapeHtml(this.cityName)}...</span>
      </div>`;

    const events = await this.api.getEvents(this.cityName, this.countryCode);
    const statEvents = document.getElementById('stat-events');

    if (!events || events.length === 0) {
      if (statEvents) statEvents.textContent = '0';
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; padding: 48px;">
          <div class="empty-icon"><i class="fa-solid fa-ticket"></i></div>
          <h3>No Events Found in ${this.escapeHtml(this.cityName)}</h3>
          <p>No upcoming ticketed events found for ${this.escapeHtml(this.cityName)}. Try choosing a major hub like London, Paris, New York, or Berlin!</p>
        </div>`;
      return;
    }

    if (statEvents) {
      statEvents.textContent = `${events.length}+`;
    }

    container.innerHTML = '';
    events.forEach(ev => {
      const planId = `event-${ev.id}`;
      const isSaved = this.plans.isSaved(planId);
      const title = ev.name || 'Untitled Event';
      const imageUrl = (ev.images && ev.images.length > 0 && this.isValidUrl(ev.images[0].url))
        ? ev.images[0].url
        : 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=200&fit=crop';
      const category = ev.classifications && ev.classifications[0]?.segment?.name ? ev.classifications[0].segment.name : 'Event';
      const dateStr = ev.dates?.start?.localDate || 'Upcoming Date';
      const timeStr = ev.dates?.start?.localTime ? ` at ${ev.dates.start.localTime.substring(0, 5)}` : '';
      const venue = ev._embedded?.venues && ev._embedded.venues[0]?.name
        ? `${ev._embedded.venues[0].name}, ${this.cityName}`
        : this.cityName;
      const rawTicketUrl = ev.url || '';
      const hasTicketUrl = this.isValidUrl(rawTicketUrl);

      const card = document.createElement('div');
      card.className = 'event-card';
      card.innerHTML = `
        <div class="event-card-image">
          <img src="${this.escapeHtml(imageUrl)}" alt="${this.escapeHtml(title)}">
          <span class="event-card-category">${this.escapeHtml(category)}</span>
          <button class="event-card-save ${isSaved ? 'saved' : ''}" data-id="${this.escapeHtml(planId)}">
            <i class="${isSaved ? 'fa-solid text-danger' : 'fa-regular'} fa-heart"></i>
          </button>
        </div>
        <div class="event-card-body">
          <h3>${this.escapeHtml(title)}</h3>
          <div class="event-card-info">
            <div><i class="fa-regular fa-calendar"></i>${this.escapeHtml(dateStr)}${this.escapeHtml(timeStr)}</div>
            <div><i class="fa-solid fa-location-dot"></i>${this.escapeHtml(venue)}</div>
          </div>
          <div class="event-card-footer">
            <button class="btn-event ${isSaved ? 'saved' : ''}" data-id="${this.escapeHtml(planId)}">
              <i class="${isSaved ? 'fa-solid text-danger' : 'fa-regular'} fa-heart"></i> ${isSaved ? 'Saved' : 'Save'}
            </button>
            ${hasTicketUrl ? `
              <a href="${this.escapeHtml(rawTicketUrl)}" target="_blank" rel="noopener noreferrer" class="btn-buy-ticket">
                <i class="fa-solid fa-ticket"></i> Buy Tickets
              </a>
            ` : ''}
          </div>
        </div>
      `;

      const saveAction = () => {
        if (this.plans.isSaved(planId)) {
          this.showToast('This event is already in My Plans!', 'info');
          return;
        }
        const result = this.plans.savePlan({
          id: planId,
          type: 'event',
          title: title,
          date: `${dateStr}${timeStr}`,
          subtitle: category,
          details: venue
        });
        if (result.success) {
          card.querySelectorAll(`[data-id="${planId}"]`).forEach(btn => {
            btn.classList.add('saved');
            if (btn.classList.contains('btn-event')) {
              btn.innerHTML = '<i class="fa-solid text-danger fa-heart"></i> Saved';
            } else {
              btn.innerHTML = '<i class="fa-solid text-danger fa-heart"></i>';
            }
          });
          this.updatePlanBadges();
          this.showToast(`Saved event "${title}" to My Plans!`, 'success');
        }
      };

      const topSaveBtn = card.querySelector('.event-card-save');
      const bottomSaveBtn = card.querySelector('.btn-event');
      topSaveBtn.addEventListener('click', saveAction);
      bottomSaveBtn.addEventListener('click', saveAction);

      container.appendChild(card);
    });
  }

  // Render Weather Forecast view
  async renderWeatherView() {
    const container = document.getElementById('weather-content');
    if (!container) return;

    if (!this.cityName) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 48px;">
          <div class="empty-icon"><i class="fa-solid fa-cloud-sun"></i></div>
          <h3>No Destination Selected</h3>
          <p>Please select a city on the Dashboard to view live weather forecasts.</p>
        </div>`;
      return;
    }

    container.innerHTML = `
      <div class="country-info-loading" style="padding: 48px;">
        <i class="fa-solid fa-spinner fa-spin"></i>
        <span>Loading live weather forecast for ${this.escapeHtml(this.cityName)}...</span>
      </div>`;

    // Fetch coordinates specifically for the selected city and country
    let coords = this.cityCoords;
    if (!coords || !coords.lat) {
      coords = await this.api.getCityCoordinates(this.cityName, this.countryCode);
      if (coords) {
        this.cityCoords = coords;
      }
    }

    if (!coords) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 48px;">
          <div class="empty-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
          <h3>Location Not Found</h3>
          <p>Could not find geographical coordinates for "${this.escapeHtml(this.cityName)}" in ${this.escapeHtml(this.countryName)}. Please select or search for another city.</p>
        </div>`;
      return;
    }

    const weather = await this.api.getWeather(coords.lat, coords.lon);
    if (!weather || !weather.current) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 48px;">
          <div class="empty-icon"><i class="fa-solid fa-cloud-bolt"></i></div>
          <h3>Weather Unavailable</h3>
          <p>Could not fetch live weather forecast for ${this.escapeHtml(this.cityName)}. Please check your internet connection and try again.</p>
        </div>`;
      return;
    }

    const cur = weather.current;
    const daily = weather.daily || {};
    const hourly = weather.hourly || {};

    const conditionInfo = this.getWeatherCondition(cur.weather_code);
    const tempNow = Math.round(cur.temperature_2m);
    const feelsLike = Math.round(cur.apparent_temperature);
    const highTemp = daily.temperature_2m_max ? Math.round(daily.temperature_2m_max[0]) : tempNow;
    const lowTemp = daily.temperature_2m_min ? Math.round(daily.temperature_2m_min[0]) : tempNow;
    const humidity = cur.relative_humidity_2m || 0;
    const windSpeed = Math.round(cur.wind_speed_10m || 0);
    const windDirText = this.getWindDirection(cur.wind_direction_10m);
    const uvIndex = Math.round(cur.uv_index || 0);
    const uvInfo = this.getUvLevel(uvIndex);
    const precipProb = daily.precipitation_probability_max ? daily.precipitation_probability_max[0] : 0;
    const precipAmount = cur.precipitation !== undefined ? cur.precipitation : 0;

    let sunriseTime = '--';
    let sunsetTime = '--';
    if (daily.sunrise && daily.sunrise[0]) {
      sunriseTime = this.formatIsoTime(daily.sunrise[0]);
    }
    if (daily.sunset && daily.sunset[0]) {
      sunsetTime = this.formatIsoTime(daily.sunset[0]);
    }

    const todayDateStr = this.formatDestinationDate(cur.time);

    // Accurate 24-hour forecast aligned with destination time
    let hourlyHtml = '';
    if (hourly.time && hourly.time.length > 0) {
      let startIndex = -1;
      if (cur.time) {
        const curHourPrefix = cur.time.slice(0, 13);
        startIndex = hourly.time.findIndex(t => t.startsWith(curHourPrefix));
      }
      if (startIndex === -1 && cur.time) {
        startIndex = hourly.time.findIndex(t => t >= cur.time);
      }
      if (startIndex === -1) {
        hourlyHtml = `
          <div class="empty-state" style="padding: 24px; width: 100%;">
            <p>Hourly forecast matching destination time is unavailable.</p>
          </div>`;
      } else {
        for (let i = 0; i < 24; i++) {
          const index = startIndex + i;
          if (index < hourly.time.length) {
            const hourTemp = Math.round(hourly.temperature_2m[index]);
            const hourCode = hourly.weather_code[index];
            const hourCond = this.getWeatherCondition(hourCode);
            const isNow = i === 0;

            const timeStr = hourly.time[index];
            const hourNum = parseInt(timeStr.slice(11, 13), 10);
            const hour12 = hourNum % 12 || 12;
            const ampm = hourNum >= 12 ? 'PM' : 'AM';
            const timeLabel = isNow ? 'Now' : `${hour12} ${ampm}`;

            hourlyHtml += `
              <div class="hourly-item ${isNow ? 'now' : ''}">
                <span class="hourly-time">${timeLabel}</span>
                <div class="hourly-icon"><i class="fa-solid ${hourCond.icon}"></i></div>
                <span class="hourly-temp">${hourTemp}°</span>
              </div>
            `;
          }
        }
      }
    } else {
      hourlyHtml = `
        <div class="empty-state" style="padding: 24px; width: 100%;">
          <p>Hourly forecast data is unavailable.</p>
        </div>`;
    }

    // 7-Day Forecast
    let dailyHtml = '';
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (daily.time && daily.time.length > 0) {
      for (let i = 0; i < Math.min(7, daily.time.length); i++) {
        const dDate = new Date(daily.time[i]);
        const isToday = i === 0;
        const dayLabel = isToday ? 'Today' : dayNames[dDate.getUTCDay()];
        const dateLabel = `${dDate.getUTCDate()} ${monthNames[dDate.getUTCMonth()]}`;
        const dayCode = daily.weather_code[i];
        const dayCond = this.getWeatherCondition(dayCode);
        const maxT = Math.round(daily.temperature_2m_max[i]);
        const minT = Math.round(daily.temperature_2m_min[i]);
        const prob = daily.precipitation_probability_max ? daily.precipitation_probability_max[i] : 0;

        dailyHtml += `
          <div class="forecast-day ${isToday ? 'today' : ''}">
            <div class="forecast-day-name">
              <span class="day-label">${dayLabel}</span>
              <span class="day-date">${dateLabel}</span>
            </div>
            <div class="forecast-icon"><i class="fa-solid ${dayCond.icon}"></i></div>
            <div class="forecast-temps">
              <span class="temp-max">${maxT}°</span>
              <span class="temp-min">${minT}°</span>
            </div>
            <div class="forecast-precip">
              ${prob > 0 ? `<i class="fa-solid fa-droplet"></i><span>${prob}%</span>` : ''}
            </div>
          </div>
        `;
      }
    }

    container.innerHTML = `
      <div class="weather-hero-card ${conditionInfo.heroClass}">
        <div class="weather-hero-bg"></div>
        <div class="weather-hero-content">
          <div class="weather-location">
            <i class="fa-solid fa-location-dot"></i>
            <span>${this.escapeHtml(this.cityName)}</span>
            <span class="weather-time">${todayDateStr}</span>
          </div>
          <div class="weather-hero-main">
            <div class="weather-hero-left">
              <div class="weather-hero-icon"><i class="fa-solid ${conditionInfo.icon}"></i></div>
              <div class="weather-hero-temp">
                <span class="temp-value">${tempNow}</span>
                <span class="temp-unit">°C</span>
              </div>
            </div>
            <div class="weather-hero-right">
              <div class="weather-condition">${conditionInfo.text}</div>
              <div class="weather-feels">Feels like ${feelsLike}°C</div>
              <div class="weather-high-low">
                <span class="high"><i class="fa-solid fa-arrow-up"></i> ${highTemp}°</span>
                <span class="low"><i class="fa-solid fa-arrow-down"></i> ${lowTemp}°</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="weather-details-grid">
        <div class="weather-detail-card">
          <div class="detail-icon humidity"><i class="fa-solid fa-droplet"></i></div>
          <div class="detail-info">
            <span class="detail-label">Humidity</span>
            <span class="detail-value">${humidity}%</span>
          </div>
          <div class="detail-bar">
            <div class="detail-bar-fill" style="width: ${humidity}%;"></div>
          </div>
        </div>

        <div class="weather-detail-card">
          <div class="detail-icon wind"><i class="fa-solid fa-wind"></i></div>
          <div class="detail-info">
            <span class="detail-label">Wind</span>
            <span class="detail-value">${windSpeed} km/h</span>
            <span class="detail-extra">${windDirText}</span>
          </div>
        </div>

        <div class="weather-detail-card">
          <div class="detail-icon uv"><i class="fa-solid fa-sun"></i></div>
          <div class="detail-info">
            <span class="detail-label">UV Index</span>
            <span class="detail-value">${uvIndex}</span>
            <div><span class="uv-level ${uvInfo.className}">${uvInfo.text}</span></div>
          </div>
        </div>

        <div class="weather-detail-card">
          <div class="detail-icon precip"><i class="fa-solid fa-cloud-rain"></i></div>
          <div class="detail-info">
            <span class="detail-label">Precipitation</span>
            <span class="detail-value">${precipProb}%</span>
            <span class="detail-extra">${precipAmount}mm expected</span>
          </div>
        </div>

        <div class="weather-detail-card sunrise-sunset">
          <div class="sun-times-visual">
            <div class="sun-time sunrise">
              <i class="fa-solid fa-sun" style="color: #f59e0b;"></i>
              <span class="sun-label">Sunrise</span>
              <span class="sun-value">${sunriseTime}</span>
            </div>
            <div class="sun-arc">
              <div class="sun-arc-path"></div>
              <div class="sun-position" style="--sun-progress: 50%;"></div>
            </div>
            <div class="sun-time sunset">
              <i class="fa-solid fa-sun" style="color: #f97316;"></i>
              <span class="sun-label">Sunset</span>
              <span class="sun-value">${sunsetTime}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="weather-section">
        <h3 class="weather-section-title"><i class="fa-solid fa-clock"></i> Hourly Forecast</h3>
        <div class="hourly-scroll">${hourlyHtml}</div>
      </div>
      
      <div class="weather-section">
        <h3 class="weather-section-title"><i class="fa-solid fa-calendar-week"></i> 7-Day Forecast</h3>
        <div class="forecast-list">${dailyHtml}</div>
      </div>
    `;
  }

  // Compass wind direction
  getWindDirection(degrees) {
    if (degrees === undefined || degrees === null) return 'N';
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const idx = Math.round(degrees / 22.5) % 16;
    return directions[idx];
  }

  // UV index level formatting
  getUvLevel(uv) {
    if (uv <= 2) return { text: 'Low', className: 'low' };
    if (uv <= 5) return { text: 'Moderate', className: 'moderate' };
    if (uv <= 7) return { text: 'High', className: 'high' };
    if (uv <= 10) return { text: 'Very High', className: 'very-high' };
    return { text: 'Extreme', className: 'extreme' };
  }

  // Weather WMO code mapping
  getWeatherCondition(code) {
    if (code === 0) return { text: 'Clear sky', icon: 'fa-sun', heroClass: 'weather-sunny' };
    if (code === 1) return { text: 'Mainly clear', icon: 'fa-sun', heroClass: 'weather-sunny' };
    if (code === 2) return { text: 'Partly cloudy', icon: 'fa-cloud-sun', heroClass: 'weather-cloudy' };
    if (code === 3) return { text: 'Overcast', icon: 'fa-cloud', heroClass: 'weather-cloudy' };
    if (code === 45 || code === 48) return { text: 'Foggy', icon: 'fa-smog', heroClass: 'weather-foggy' };
    if (code >= 51 && code <= 55) return { text: 'Drizzle', icon: 'fa-cloud-rain', heroClass: 'weather-rainy' };
    if (code >= 61 && code <= 65) return { text: 'Rain', icon: 'fa-cloud-showers-heavy', heroClass: 'weather-rainy' };
    if (code >= 71 && code <= 77) return { text: 'Snow', icon: 'fa-snowflake', heroClass: 'weather-snowy' };
    if (code >= 80 && code <= 82) return { text: 'Rain showers', icon: 'fa-cloud-rain', heroClass: 'weather-rainy' };
    if (code >= 85 && code <= 86) return { text: 'Snow showers', icon: 'fa-snowflake', heroClass: 'weather-snowy' };
    if (code >= 95 && code <= 99) return { text: 'Thunderstorm', icon: 'fa-bolt', heroClass: 'weather-stormy' };
    return { text: 'Partly cloudy', icon: 'fa-cloud-sun', heroClass: 'weather-default' };
  }

  // Render Long Weekends view
  async renderLongWeekendsView() {
    const container = document.getElementById('lw-content');
    if (!container) return;

    if (!this.countryCode) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; padding: 48px;">
          <div class="empty-icon"><i class="fa-solid fa-umbrella-beach"></i></div>
          <h3>No Destination Selected</h3>
          <p>Please select a country on the Dashboard to find long weekends.</p>
        </div>`;
      return;
    }

    container.innerHTML = `
      <div class="country-info-loading" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-spinner fa-spin"></i>
        <span>Finding long weekends for ${this.escapeHtml(this.countryName)} (${this.year})...</span>
      </div>`;

    const longWeekends = await this.api.getLongWeekends(this.year, this.countryCode);
    if (!longWeekends || longWeekends.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; padding: 48px;">
          <div class="empty-icon"><i class="fa-solid fa-umbrella-beach"></i></div>
          <h3>No Long Weekends Found</h3>
          <p>No suitable long weekends detected for ${this.escapeHtml(this.countryName)} in ${this.year}.</p>
        </div>`;
      return;
    }

    container.innerHTML = '';
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    longWeekends.forEach((lw, index) => {
      const planId = `lw-${lw.startDate}-${lw.endDate}`;
      const isSaved = this.plans.isSaved(planId);

      const startDateObj = new Date(lw.startDate);
      const endDateObj = new Date(lw.endDate);
      const dateRangeStr = `${monthNames[startDateObj.getUTCMonth()]} ${startDateObj.getUTCDate()} - ${monthNames[endDateObj.getUTCMonth()]} ${endDateObj.getUTCDate()}, ${this.year}`;

      let daysVisualHtml = '';
      const curDate = new Date(startDateObj);
      while (curDate <= endDateObj) {
        const dayIdx = curDate.getUTCDay();
        const dName = dayNames[dayIdx];
        const dNum = curDate.getUTCDate();
        const isWeekend = dayIdx === 5 || dayIdx === 6 || dayIdx === 0;

        daysVisualHtml += `
          <div class="lw-day ${isWeekend ? 'weekend' : ''}">
            <span class="name">${dName}</span>
            <span class="num">${dNum}</span>
          </div>`;
        curDate.setUTCDate(curDate.getUTCDate() + 1);
      }

      const card = document.createElement('div');
      card.className = 'lw-card';
      card.innerHTML = `
        <div class="lw-card-header">
          <span class="lw-badge"><i class="fa-solid fa-calendar-days"></i> ${lw.dayCount} Days</span>
          <button class="holiday-action-btn ${isSaved ? 'saved' : ''}" data-id="${this.escapeHtml(planId)}">
            <i class="${isSaved ? 'fa-solid text-danger' : 'fa-regular'} fa-heart"></i>
          </button>
        </div>
        <h3>Long Weekend #${index + 1}</h3>
        <div class="lw-dates"><i class="fa-regular fa-calendar"></i> ${dateRangeStr}</div>
        <div class="lw-info-box ${lw.needBridgeDay ? 'warning' : 'success'}">
          <i class="fa-solid ${lw.needBridgeDay ? 'fa-info-circle' : 'fa-check-circle'}"></i>
          ${lw.needBridgeDay ? 'Requires taking a bridge day off' : 'No extra days off needed!'}
        </div>
        <div class="lw-days-visual">${daysVisualHtml}</div>
      `;

      const saveBtn = card.querySelector('.holiday-action-btn');
      saveBtn.addEventListener('click', () => {
        if (this.plans.isSaved(planId)) {
          this.showToast('This long weekend is already saved in My Plans!', 'info');
          return;
        }
        const result = this.plans.savePlan({
          id: planId,
          type: 'longweekend',
          title: `Long Weekend #${index + 1} (${lw.dayCount} Days)`,
          date: dateRangeStr,
          subtitle: lw.needBridgeDay ? 'Bridge day needed' : 'No extra days off needed',
          details: `${this.countryName} • Long Weekend`
        });
        if (result.success) {
          saveBtn.classList.add('saved');
          saveBtn.innerHTML = '<i class="fa-solid text-danger fa-heart"></i>';
          this.updatePlanBadges();
          this.showToast(`Saved Long Weekend #${index + 1} to My Plans!`, 'success');
        }
      });

      container.appendChild(card);
    });
  }

  // Render Sunrise and Sunset Times view
  async renderSunTimesView() {
    const container = document.getElementById('sun-times-content');
    if (!container) return;

    if (!this.cityName) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 48px;">
          <div class="empty-icon"><i class="fa-solid fa-sun"></i></div>
          <h3>No Destination Selected</h3>
          <p>Please select a city on the Dashboard to view sunrise and sunset times.</p>
        </div>`;
      return;
    }

    container.innerHTML = `
      <div class="country-info-loading" style="padding: 48px;">
        <i class="fa-solid fa-spinner fa-spin"></i>
        <span>Calculating sun times for ${this.escapeHtml(this.cityName)}...</span>
      </div>`;

    let coords = this.cityCoords;
    if (!coords || !coords.lat) {
      coords = await this.api.getCityCoordinates(this.cityName, this.countryCode);
      if (coords) {
        this.cityCoords = coords;
      }
    }

    if (!coords) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 48px;">
          <div class="empty-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
          <h3>Location Not Found</h3>
          <p>Could not calculate sun times for "${this.escapeHtml(this.cityName)}" in ${this.escapeHtml(this.countryName)}.</p>
        </div>`;
      return;
    }

    const sun = await this.api.getSunTimes(coords.lat, coords.lon);
    if (!sun) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 48px;">
          <div class="empty-icon"><i class="fa-solid fa-sun"></i></div>
          <h3>Sun Times Unavailable</h3>
          <p>Could not calculate sun times for ${this.escapeHtml(this.cityName)}. Please try again.</p>
        </div>`;
      return;
    }

    const dawn = (sun && (sun.dawn || sun.first_light)) ? this.escapeHtml(sun.dawn || sun.first_light) : '--';
    const sunrise = (sun && sun.sunrise) ? this.escapeHtml(sun.sunrise) : '--';
    const solarNoon = (sun && sun.solar_noon) ? this.escapeHtml(sun.solar_noon) : '--';
    const sunset = (sun && sun.sunset) ? this.escapeHtml(sun.sunset) : '--';
    const dusk = (sun && (sun.dusk || sun.last_light)) ? this.escapeHtml(sun.dusk || sun.last_light) : '--';
    const dayLength = (sun && sun.day_length) ? this.escapeHtml(sun.day_length) : '--';

    let daylightPercent = '--';
    let darknessHours = '--';
    let barPercent = 0;
    if (sun && sun.day_length && sun.day_length.includes(':')) {
      const parts = sun.day_length.split(':');
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      if (!isNaN(hours) && !isNaN(minutes)) {
        const daylightHours = hours + (minutes / 60);
        const pct = (daylightHours / 24) * 100;
        daylightPercent = pct.toFixed(1);
        barPercent = Math.min(100, Math.max(0, pct));
        darknessHours = (24 - daylightHours).toFixed(1);
      }
    }

    const timezone = sun?.timezone || coords.timezone;
    const dateOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    };
    if (timezone) dateOptions.timeZone = timezone;

    const weekdayOptions = { weekday: 'long' };
    if (timezone) weekdayOptions.timeZone = timezone;

    const fullDate = new Date().toLocaleDateString('en-US', dateOptions);
    const weekday = new Date().toLocaleDateString('en-US', weekdayOptions);

    container.innerHTML = `
      <div class="sun-main-card">
        <div class="sun-main-header">
          <div class="sun-location">
            <h2><i class="fa-solid fa-location-dot"></i> ${this.escapeHtml(this.cityName)}</h2>
            <p>Sun times and daylight distribution</p>
          </div>
          <div class="sun-date-display">
            <div class="date">${fullDate}</div>
            <div class="day">${weekday}</div>
          </div>
        </div>
        
        <div class="sun-times-grid">
          <div class="sun-time-card dawn">
            <div class="icon"><i class="fa-solid fa-moon"></i></div>
            <div class="label">Dawn</div>
            <div class="time">${dawn}</div>
            <div class="sub-label">Civil Twilight</div>
          </div>
          <div class="sun-time-card sunrise">
            <div class="icon"><i class="fa-solid fa-sun"></i></div>
            <div class="label">Sunrise</div>
            <div class="time">${sunrise}</div>
            <div class="sub-label">Golden Hour Start</div>
          </div>
          <div class="sun-time-card noon">
            <div class="icon"><i class="fa-solid fa-sun"></i></div>
            <div class="label">Solar Noon</div>
            <div class="time">${solarNoon}</div>
            <div class="sub-label">Sun at Highest</div>
          </div>
          <div class="sun-time-card sunset">
            <div class="icon"><i class="fa-solid fa-sun"></i></div>
            <div class="label">Sunset</div>
            <div class="time">${sunset}</div>
            <div class="sub-label">Golden Hour End</div>
          </div>
          <div class="sun-time-card dusk">
            <div class="icon"><i class="fa-solid fa-moon"></i></div>
            <div class="label">Dusk</div>
            <div class="time">${dusk}</div>
            <div class="sub-label">Civil Twilight</div>
          </div>
          <div class="sun-time-card daylight">
            <div class="icon"><i class="fa-solid fa-hourglass-half"></i></div>
            <div class="label">Day Length</div>
            <div class="time">${dayLength}</div>
            <div class="sub-label">Total Daylight</div>
          </div>
        </div>
      </div>
      
      <div class="day-length-card">
        <h3><i class="fa-solid fa-chart-pie"></i> Daylight Distribution</h3>
        <div class="day-progress">
          <div class="day-progress-bar">
            <div class="day-progress-fill" style="width: ${barPercent}%"></div>
          </div>
        </div>
        <div class="day-length-stats">
          <div class="day-stat">
            <div class="value">${dayLength}</div>
            <div class="label">Daylight</div>
          </div>
          <div class="day-stat">
            <div class="value">${daylightPercent !== '--' ? daylightPercent + '%' : '--'}</div>
            <div class="label">of 24 Hours</div>
          </div>
          <div class="day-stat">
            <div class="value">${darknessHours !== '--' ? darknessHours + 'h' : '--'}</div>
            <div class="label">Darkness</div>
          </div>
        </div>
      </div>
    `;
  }

  // Render Currency Converter view
  renderCurrencyView() {
    this.handleCurrencyConvert();
    this.renderPopularCurrencies();
  }

  // Calculate currency conversion
  handleCurrencyConvert() {
    const amountInput = document.getElementById('currency-amount');
    const fromSelect = document.getElementById('currency-from');
    const toSelect = document.getElementById('currency-to');
    const resultBox = document.getElementById('currency-result');

    if (!amountInput || !fromSelect || !toSelect || !resultBox) return;

    const rawVal = amountInput.value.trim();
    const num = Number(rawVal);

    if (rawVal === '' || !Number.isFinite(num) || num <= 0) {
      resultBox.innerHTML = `
        <div class="empty-state" style="padding: 24px;">
          <p style="color: var(--danger-500);"><i class="fa-solid fa-circle-exclamation"></i> Please enter a valid number greater than zero.</p>
        </div>`;
      return;
    }

    const amount = num;
    const from = fromSelect.value;
    const to = toSelect.value;

    if (this.currency.error || !this.currency.rates || Object.keys(this.currency.rates).length === 0) {
      resultBox.innerHTML = `
        <div class="empty-state" style="padding: 24px;">
          <p style="color: var(--danger-500);"><i class="fa-solid fa-circle-exclamation"></i> Exchange rates unavailable. Please check your internet connection.</p>
        </div>`;
      return;
    }

    const converted = this.currency.convert(amount, from, to);
    const rate = this.currency.getRate(from, to);

    if (converted === null || rate === null) {
      resultBox.innerHTML = `
        <div class="empty-state" style="padding: 24px;">
          <p style="color: var(--danger-500);"><i class="fa-solid fa-circle-exclamation"></i> Exchange rate unavailable for ${this.escapeHtml(from)} to ${this.escapeHtml(to)}.</p>
        </div>`;
      return;
    }

    const formattedAmount = amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const formattedConverted = converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    resultBox.innerHTML = `
      <div class="conversion-display">
        <div class="conversion-from">
          <span class="amount">${formattedAmount}</span>
          <span class="currency-code">${this.escapeHtml(from)}</span>
        </div>
        <div class="conversion-equals"><i class="fa-solid fa-equals"></i></div>
        <div class="conversion-to">
          <span class="amount">${formattedConverted}</span>
          <span class="currency-code">${this.escapeHtml(to)}</span>
        </div>
      </div>
      <div class="exchange-rate-info">
        <p>1 ${this.escapeHtml(from)} = ${rate.toFixed(4)} ${this.escapeHtml(to)}</p>
        <small>Live Rates • Last updated: ${this.escapeHtml(this.currency.lastUpdated || 'Today')}</small>
      </div>
    `;
  }

  // Render quick popular currencies grid
  renderPopularCurrencies() {
    const container = document.getElementById('popular-currencies');
    const fromSelect = document.getElementById('currency-from');
    if (!container || !fromSelect) return;

    const base = fromSelect.value;
    const popularList = [
      { code: 'EUR', name: 'Euro', flag: 'eu' },
      { code: 'GBP', name: 'British Pound', flag: 'gb' },
      { code: 'EGP', name: 'Egyptian Pound', flag: 'eg' },
      { code: 'AED', name: 'UAE Dirham', flag: 'ae' },
      { code: 'SAR', name: 'Saudi Riyal', flag: 'sa' },
      { code: 'JPY', name: 'Japanese Yen', flag: 'jp' },
      { code: 'CAD', name: 'Canadian Dollar', flag: 'ca' },
      { code: 'INR', name: 'Indian Rupee', flag: 'in' }
    ];

    container.innerHTML = '';
    popularList.forEach(item => {
      const rate = this.currency.getRate(base, item.code);
      const card = document.createElement('div');
      card.className = 'popular-currency-card';
      const rateDisplay = (rate !== null) ? (rate >= 100 ? rate.toFixed(2) : rate.toFixed(4)) : 'N/A';
      card.innerHTML = `
        <img src="https://flagcdn.com/w40/${item.flag}.png" alt="${item.code}" class="flag">
        <div class="info">
          <div class="code">${item.code}</div>
          <div class="name">${item.name}</div>
        </div>
        <div class="rate">${rateDisplay}</div>
      `;
      container.appendChild(card);
    });
  }

  // Render My Saved Plans view
  renderPlansView() {
    const container = document.getElementById('plans-content');
    if (!container) return;

    const allPlans = this.plans.getPlans();
    let filtered = allPlans;
    if (this.activePlanFilter !== 'all') {
      filtered = allPlans.filter(p => p.type === this.activePlanFilter);
    }

    this.updatePlanBadges();

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon"><i class="fa-solid fa-heart-crack"></i></div>
          <h3>No Saved Plans Yet</h3>
          <p>Start exploring and save holidays, events, or long weekends you like!</p>
          <button class="btn-primary" id="start-exploring-btn">
            <i class="fa-solid fa-compass"></i> Start Exploring
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = '';
    filtered.forEach(plan => {
      const typeLabel = plan.type === 'longweekend' ? 'Long Weekend' : plan.type;
      const card = document.createElement('div');
      card.className = 'plan-card';
      card.setAttribute('data-id', plan.id);
      card.innerHTML = `
        <span class="plan-card-type ${this.escapeHtml(plan.type)}">${this.escapeHtml(typeLabel)}</span>
        <div class="plan-card-content">
          <h4>${this.escapeHtml(plan.title)}</h4>
          <div class="plan-card-details">
            <div><i class="fa-regular fa-calendar"></i> ${this.escapeHtml(plan.date)}</div>
            ${plan.subtitle ? `<div><i class="fa-solid fa-circle-info"></i> ${this.escapeHtml(plan.subtitle)}</div>` : ''}
            ${plan.details ? `<div><i class="fa-solid fa-location-dot"></i> ${this.escapeHtml(plan.details)}</div>` : ''}
          </div>
          <div class="plan-card-actions">
            <button class="btn-plan-remove" data-id="${this.escapeHtml(plan.id)}">
              <i class="fa-solid fa-trash"></i> Remove
            </button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Update plan count badges across UI
  updatePlanBadges() {
    const counts = this.plans.getCounts();

    const badge = document.getElementById('plans-count');
    if (badge) {
      badge.textContent = counts.all;
      if (counts.all > 0) {
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }

    const statSaved = document.getElementById('stat-saved');
    if (statSaved) {
      statSaved.textContent = counts.all;
    }

    const filterAll = document.getElementById('filter-all-count');
    const filterHoliday = document.getElementById('filter-holiday-count');
    const filterEvent = document.getElementById('filter-event-count');
    const filterLw = document.getElementById('filter-lw-count');

    if (filterAll) filterAll.textContent = counts.all;
    if (filterHoliday) filterHoliday.textContent = counts.holiday;
    if (filterEvent) filterEvent.textContent = counts.event;
    if (filterLw) filterLw.textContent = counts.longweekend;
  }

  // Start live clock in top bar
  startHeaderClock() {
    const clockEl = document.getElementById('current-datetime');
    const updateTime = () => {
      if (clockEl) {
        const now = new Date();
        clockEl.textContent = now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }) + ', ' + now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      }
      if (this.router.currentView === 'dashboard') {
        this.updateCountryLocalTime();
      }
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  // Display toast feedback message
  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = {
      success: 'fa-circle-check',
      error: 'fa-circle-exclamation',
      info: 'fa-circle-info'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="fa-solid ${icons[type] || 'fa-bell'}"></i>
      <span>${this.escapeHtml(message)}</span>
      <button class="toast-close"><i class="fa-solid fa-xmark"></i></button>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.remove();
    });

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 3500);
  }

  // Show loading spinner
  showLoading(text = 'Loading...') {
    const overlay = document.getElementById('loading-overlay');
    const textEl = document.getElementById('loading-text');
    if (textEl) textEl.textContent = text;
    if (overlay) overlay.classList.remove('hidden');
  }

  // Hide loading spinner
  hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.classList.add('hidden');
  }
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
  window.wanderlustApp = app;
});
