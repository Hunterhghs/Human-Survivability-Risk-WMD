/* ============================================================
   app.js — Main Application Controller
   Human Survivability Risk Dashboard
   ============================================================ */

const APP = (function() {
  'use strict';

  let selectedCountry = null;
  let countryProjection = null;

  // ============================================================
  // INITIALIZATION
  // ============================================================
  function init() {
    MAP.initMap();
    CHARTS.initCharts();
    bindEvents();
    updateKPIs();
    updateCountryDetail(null);

    // Wait a moment for GeoJSON to load, then update
    setTimeout(() => {
      MAP.updateMapForYear(DATA.currentYear);
    }, 1500);
  }

  // ============================================================
  // EVENT BINDINGS
  // ============================================================
  function bindEvents() {
    // Layer toggles
    document.querySelectorAll('.layer-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.layer-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const layer = this.dataset.layer;
        MAP.updateMapLayer(layer);
        updateCountryDetail(countryProjection);
      });
    });

    // Scenario buttons
    document.querySelectorAll('.btn-scenario').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.btn-scenario').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const scenario = this.dataset.scenario;
        DATA.currentScenario = scenario;
        MAP.updateMapForYear(DATA.currentYear);
        CHARTS.updateAllCharts();
        updateKPIs();
        if (selectedCountry) {
          countryProjection = DATA.projectCountry(selectedCountry, DATA.currentYear);
          updateCountryDetail(countryProjection);
          MAP.highlightCountry(selectedCountry);
        }
      });
    });

    // Timeline slider
    const slider = document.getElementById('timeline-slider');
    const yearDisplay = document.getElementById('year-display');

    slider.addEventListener('input', function() {
      const year = parseInt(this.value);
      DATA.currentYear = year;
      yearDisplay.textContent = year;
      MAP.updateMapForYear(year);
      updateKPIs();
      if (selectedCountry) {
        countryProjection = DATA.projectCountry(selectedCountry, year);
        updateCountryDetail(countryProjection);
      }
    });

    // Play/Pause
    document.getElementById('btn-play').addEventListener('click', togglePlay);

    // Speed controls
    document.getElementById('btn-speed-up').addEventListener('click', () => {
      const speeds = [0.25, 0.5, 1, 2, 3, 5, 10];
      const currentIdx = speeds.indexOf(DATA.simulationSpeed);
      const nextIdx = Math.min(speeds.length - 1, currentIdx + 1);
      DATA.simulationSpeed = speeds[nextIdx >= 0 ? nextIdx : 2];
      updateSpeedLabel();
    });

    document.getElementById('btn-speed-down').addEventListener('click', () => {
      const speeds = [0.25, 0.5, 1, 2, 3, 5, 10];
      const currentIdx = speeds.indexOf(DATA.simulationSpeed);
      const prevIdx = Math.max(0, currentIdx - 1);
      DATA.simulationSpeed = speeds[prevIdx >= 0 ? prevIdx : 0];
      updateSpeedLabel();
    });

    // Reset
    document.getElementById('btn-reset').addEventListener('click', () => {
      stopSimulation();
      DATA.currentYear = 2025;
      slider.value = 2025;
      yearDisplay.textContent = '2025';
      MAP.updateMapForYear(2025);
      CHARTS.updateAllCharts();
      updateKPIs();
      if (selectedCountry) {
        countryProjection = DATA.projectCountry(selectedCountry, 2025);
        updateCountryDetail(countryProjection);
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    });
  }

  // ============================================================
  // SIMULATION CONTROL
  // ============================================================
  function togglePlay() {
    if (DATA.isPlaying) {
      stopSimulation();
    } else {
      startSimulation();
    }
  }

  function startSimulation() {
    DATA.isPlaying = true;
    const btn = document.getElementById('btn-play');
    btn.textContent = '⏸';
    btn.classList.add('playing');

    const interval = Math.max(50, 1000 / DATA.simulationSpeed);
    DATA.simulationInterval = setInterval(() => {
      let year = DATA.currentYear + 1;
      if (year > 2100) {
        year = 2100;
        stopSimulation();
      }
      DATA.currentYear = year;
      document.getElementById('timeline-slider').value = year;
      document.getElementById('year-display').textContent = year;
      MAP.updateMapForYear(year);
      updateKPIs();

      if (year % 5 === 0) {
        CHARTS.updateAllCharts();
      }

      if (selectedCountry) {
        countryProjection = DATA.projectCountry(selectedCountry, year);
        updateCountryDetail(countryProjection);
      }
    }, interval);
  }

  function stopSimulation() {
    DATA.isPlaying = false;
    const btn = document.getElementById('btn-play');
    btn.textContent = '▶';
    btn.classList.remove('playing');
    if (DATA.simulationInterval) {
      clearInterval(DATA.simulationInterval);
      DATA.simulationInterval = null;
    }
  }

  function updateSpeedLabel() {
    const label = document.getElementById('speed-label');
    const s = DATA.simulationSpeed;
    if (s >= 1) {
      label.textContent = s + ' yr/s';
    } else {
      label.textContent = '1/' + Math.round(1/s) + ' yr/s';
    }
  }

  // ============================================================
  // KPI UPDATES
  // ============================================================
  function updateKPIs() {
    const aggs = DATA.getGlobalAggregates(DATA.currentYear);
    const year = DATA.currentYear;

    document.getElementById('kpi-temp').textContent = '+' + aggs.globalTemp.toFixed(1) + '°C';
    document.getElementById('kpi-temp-change').textContent = 'vs pre-industrial';

    const atRiskB = (aggs.atRiskPopulation / 1000).toFixed(1);
    document.getElementById('kpi-risk-pop').textContent = atRiskB + 'B';
    const atRiskPct = Math.round((aggs.atRiskPopulation / aggs.totalPopulation) * 100);
    document.getElementById('kpi-risk-change').textContent = atRiskPct + '% of global';

    document.getElementById('kpi-composite').textContent = aggs.avgCompositeRisk;
    const tier = DATA.getRiskTier(aggs.avgCompositeRisk);
    document.getElementById('kpi-composite-change').textContent = '/100 · ' + tier;

    const displaced = aggs.displacedPopulation;
    let displacedStr;
    if (displaced >= 1000) {
      displacedStr = (displaced / 1000).toFixed(1) + 'B';
    } else {
      displacedStr = displaced + 'M';
    }
    document.getElementById('kpi-displaced').textContent = displacedStr;

    if (year >= 2050) {
      document.getElementById('kpi-displaced-change').textContent = 'projected by ' + year;
    } else {
      document.getElementById('kpi-displaced-change').textContent = 'projected by ' + year;
    }
  }

  // ============================================================
  // COUNTRY DETAIL
  // ============================================================
  function selectCountry(iso, proj) {
    selectedCountry = iso;
    countryProjection = proj;
    MAP.highlightCountry(iso);
    updateCountryDetail(proj);
  }

  function updateCountryDetail(proj) {
    if (!proj) {
      document.getElementById('detail-country-name').textContent = 'Click a country';
      document.getElementById('det-pop').textContent = '—';
      document.getElementById('det-temp').textContent = '—';
      document.getElementById('det-pm25').textContent = '—';
      document.getElementById('det-water').textContent = '—';
      document.getElementById('det-poverty').textContent = '—';
      document.getElementById('det-gini').textContent = '—';
      document.getElementById('det-risk').textContent = '—';
      document.getElementById('det-growth').textContent = '—';
      MAP.clearHighlight();
      return;
    }

    document.getElementById('detail-country-name').textContent = proj.name + ' (' + proj.year + ')';

    // Population
    if (proj.population >= 1000) {
      document.getElementById('det-pop').textContent = (proj.population / 1000).toFixed(1) + 'B';
    } else {
      document.getElementById('det-pop').textContent = proj.population.toFixed(1) + 'M';
    }

    document.getElementById('det-temp').textContent = '+' + proj.temp.toFixed(1) + '°C';
    document.getElementById('det-pm25').textContent = proj.pm25.toFixed(1) + ' µg/m³';
    document.getElementById('det-water').textContent = proj.water.toFixed(1) + '/5';
    document.getElementById('det-poverty').textContent = proj.poverty.toFixed(1) + '%';
    document.getElementById('det-gini').textContent = proj.gini.toFixed(1);
    document.getElementById('det-risk').textContent = proj.compositeRisk + ' · ' + DATA.getRiskTier(proj.compositeRisk);

    // Population growth rate
    const basePop = DATA.getPopulationAtYear(DATA.countryData[proj.iso], 2025);
    const growthRate = ((proj.population / basePop) - 1) * 100;
    const sign = growthRate >= 0 ? '+' : '';
    document.getElementById('det-growth').textContent = sign + growthRate.toFixed(1) + '%';

    // Color the risk value
    const riskEl = document.getElementById('det-risk');
    riskEl.style.color = DATA.getRiskColor(proj.compositeRisk);

    // Color the temp value
    document.getElementById('det-temp').style.color =
      proj.temp >= 3 ? '#ef3b2d' : proj.temp >= 2 ? '#f97316' : proj.temp >= 1.5 ? '#eab308' : '#94a3b8';
  }

  // ============================================================
  // PUBLIC API
  // ============================================================
  return {
    init,
    selectCountry,
    updateKPIs,
    updateCountryDetail,
    startSimulation,
    stopSimulation,
    togglePlay
  };
})();

// Boot on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  APP.init();
});
