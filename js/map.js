/* ============================================================
   map.js — Leaflet Interactive World Map
   Human Survivability Risk Dashboard
   ============================================================ */

const MAP = (function() {
  'use strict';

  let map = null;
  let geoJsonLayer = null;
  let currentLayer = 'composite';
  let countryFeatures = {};
  let hoveredCountry = null;

  // Layer color functions
  const layerColorFns = {
    composite: (d) => DATA.getRiskColor(d ? d.compositeRisk : 0),
    temperature: (d) => DATA.getTempColor(d ? d.temp : 0),
    pollution: (d) => {
      const pm = d ? d.pm25 : 0;
      if (pm >= 60) return '#67000d';
      if (pm >= 45) return '#a50f15';
      if (pm >= 30) return '#ef3b2d';
      if (pm >= 20) return '#fc4e2a';
      if (pm >= 12) return '#fd8d3c';
      if (pm >= 6) return '#feb24c';
      return '#ffffcc';
    },
    water: (d) => {
      const w = d ? d.water : 0;
      if (w >= 4.5) return '#67000d';
      if (w >= 3.5) return '#ef3b2d';
      if (w >= 2.5) return '#fc4e2a';
      if (w >= 1.5) return '#fd8d3c';
      if (w >= 0.8) return '#feb24c';
      return '#deebf7';
    },
    poverty: (d) => {
      const p = d ? d.poverty : 0;
      if (p >= 60) return '#67000d';
      if (p >= 40) return '#ef3b2d';
      if (p >= 25) return '#fc4e2a';
      if (p >= 12) return '#fd8d3c';
      if (p >= 5) return '#feb24c';
      return '#ffffcc';
    },
    inequality: (d) => {
      const g = d ? d.gini : 0;
      if (g >= 55) return '#67000d';
      if (g >= 48) return '#ef3b2d';
      if (g >= 40) return '#fc4e2a';
      if (g >= 33) return '#fd8d3c';
      if (g >= 27) return '#feb24c';
      return '#ffffcc';
    },
    population: (d) => {
      if (!d) return '#ffffcc';
      const growthRate = ((d.population / d.pop2025) - 1) * 100;
      if (growthRate >= 100) return '#004529';
      if (growthRate >= 50) return '#238b45';
      if (growthRate >= 20) return '#74c476';
      if (growthRate >= 0) return '#bae4b3';
      if (growthRate >= -10) return '#feb24c';
      if (growthRate >= -25) return '#fc4e2a';
      return '#67000d';
    }
  };

  // Legend gradients
  const legendGradients = {
    composite: 'linear-gradient(to right, #22c55e, #84cc16, #eab308, #f97316, #dc2626, #7f1d1d)',
    temperature: 'linear-gradient(to right, #ffffcc, #fed976, #feb24c, #fd8d3c, #fc4e2a, #ef3b2d, #a50f15, #67000d)',
    pollution: 'linear-gradient(to right, #ffffcc, #feb24c, #fd8d3c, #fc4e2a, #ef3b2d, #a50f15, #67000d)',
    water: 'linear-gradient(to right, #deebf7, #feb24c, #fd8d3c, #fc4e2a, #ef3b2d, #67000d)',
    poverty: 'linear-gradient(to right, #ffffcc, #feb24c, #fd8d3c, #fc4e2a, #ef3b2d, #67000d)',
    inequality: 'linear-gradient(to right, #ffffcc, #feb24c, #fd8d3c, #fc4e2a, #ef3b2d, #67000d)',
    population: 'linear-gradient(to right, #67000d, #fc4e2a, #feb24c, #bae4b3, #74c476, #238b45, #004529)'
  };

  function initMap() {
    map = L.map('world-map', {
      center: [20, 0],
      zoom: 2.5,
      minZoom: 2,
      maxZoom: 8,
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: true,
      worldCopyJump: false
    });

    // Dark tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Load GeoJSON and render
    loadGeoJSON();

    // Set up legend
    updateLegend(currentLayer);
  }

  async function loadGeoJSON() {
    try {
      // Use a comprehensive world countries GeoJSON
      const response = await fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/countries.geojson');
      if (!response.ok) throw new Error('Failed to fetch GeoJSON');
      const geoData = await response.json();
      renderMap(geoData);
    } catch (err) {
      console.warn('Primary GeoJSON failed, trying fallback...', err);
      try {
        const fb = await fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json');
        const geoData = await fb.json();
        renderMap(geoData);
      } catch (err2) {
        console.error('Fallback GeoJSON also failed:', err2);
        // Use embedded minimal GeoJSON if both fail
        renderMap(getMinimalGeoJSON());
      }
    }
  }

  function renderMap(geoData) {
    if (geoJsonLayer) {
      map.removeLayer(geoJsonLayer);
    }

    const projections = DATA.getAllProjections(DATA.currentYear);

    geoJsonLayer = L.geoJSON(geoData, {
      style: function(feature) {
        const iso = getISO(feature);
        const proj = projections[iso];
        const colorFn = layerColorFns[currentLayer];
        return {
          fillColor: colorFn ? colorFn(proj) : '#1c2330',
          weight: 1,
          opacity: 0.4,
          color: '#334155',
          fillOpacity: 0.85,
          dashArray: ''
        };
      },
      onEachFeature: function(feature, layer) {
        const iso = getISO(feature);
        countryFeatures[iso] = { feature, layer };

        layer.on({
          mouseover: function(e) {
            const proj = projections[iso];
            const target = e.target;
            target.setStyle({
              weight: 2,
              opacity: 1,
              color: '#94a3b8',
              fillOpacity: 0.95
            });
            target.bringToFront();

            if (proj) {
              document.getElementById('hover-country').textContent =
                `${proj.name} · Risk: ${proj.compositeRisk}/100 (${DATA.getRiskTier(proj.compositeRisk)})`;
            } else {
              const name = feature.properties.name || feature.properties.ADMIN || iso || 'Unknown';
              document.getElementById('hover-country').textContent = name;
            }
          },
          mouseout: function(e) {
            geoJsonLayer.resetStyle(e.target);
            document.getElementById('hover-country').textContent = 'Hover over a country';
          },
          click: function() {
            if (iso && projections[iso]) {
              APP.selectCountry(iso, projections[iso]);
            }
          }
        });

        // Tooltip
        const name = feature.properties.name || feature.properties.ADMIN || iso;
        layer.bindTooltip(name, {
          className: 'country-tooltip',
          sticky: false,
          direction: 'top',
          offset: [0, -5]
        });
      }
    }).addTo(map);

    // Fit bounds
    try {
      map.fitBounds(geoJsonLayer.getBounds(), { padding: [30, 30] });
    } catch(e) { /* ignore */ }
  }

  function getISO(feature) {
    const p = feature.properties;
    // Try multiple common GeoJSON property names
    return p.ISO_A3 || p.iso_a3 || p.ISO3 || p.iso_3166_1_alpha_3 || p.ADM0_A3 || '';
  }

  function updateMapLayer(layerName) {
    currentLayer = layerName;
    if (!geoJsonLayer) return;

    const projections = DATA.getAllProjections(DATA.currentYear);
    const colorFn = layerColorFns[layerName];

    geoJsonLayer.eachLayer(function(layer) {
      const iso = getISO(layer.feature);
      const proj = projections[iso];
      layer.setStyle({
        fillColor: colorFn ? colorFn(proj) : '#1c2330',
        fillOpacity: 0.85
      });
    });

    updateLegend(layerName);
  }

  function updateMapForYear(year) {
    if (!geoJsonLayer) return;

    const projections = DATA.getAllProjections(year);
    const colorFn = layerColorFns[currentLayer];

    geoJsonLayer.eachLayer(function(layer) {
      const iso = getISO(layer.feature);
      const proj = projections[iso];
      layer.setStyle({
        fillColor: colorFn ? colorFn(proj) : '#1c2330',
        fillOpacity: 0.85
      });
    });
  }

  function updateLegend(layerName) {
    const gradient = document.getElementById('legend-gradient');
    if (gradient) {
      gradient.style.background = legendGradients[layerName] || legendGradients.composite;
    }
  }

  function highlightCountry(iso) {
    if (!geoJsonLayer) return;

    // Reset all
    geoJsonLayer.eachLayer(function(layer) {
      const layerIso = getISO(layer.feature);
      if (layerIso !== iso) {
        layer.setStyle({
          weight: 1,
          opacity: 0.4,
          color: '#334155'
        });
      }
    });

    // Highlight selected
    if (countryFeatures[iso]) {
      countryFeatures[iso].layer.setStyle({
        weight: 3,
        opacity: 1,
        color: '#4d9eff',
        fillOpacity: 0.95
      });
      countryFeatures[iso].layer.bringToFront();
    }
  }

  function clearHighlight() {
    if (!geoJsonLayer) return;
    geoJsonLayer.eachLayer(function(layer) {
      layer.setStyle({
        weight: 1,
        opacity: 0.4,
        color: '#334155'
      });
    });
  }

  function getMinimalGeoJSON() {
    // Minimal fallback world GeoJSON (simplified)
    return {
      type: "FeatureCollection",
      features: [
        // A few large countries as minimal fallback
        { type:"Feature", properties:{ISO_A3:"USA",name:"United States"}, geometry:{type:"Polygon",coordinates:[[[-125,48],[-125,25],[-66,25],[-66,48],[-125,48]]]} },
        { type:"Feature", properties:{ISO_A3:"CAN",name:"Canada"}, geometry:{type:"Polygon",coordinates:[[[-141,60],[-141,42],[-52,42],[-52,60],[-141,60]]]} },
        { type:"Feature", properties:{ISO_A3:"BRA",name:"Brazil"}, geometry:{type:"Polygon",coordinates:[[[-73,5],[-73,-34],[-35,-34],[-35,5],[-73,5]]]} },
        { type:"Feature", properties:{ISO_A3:"RUS",name:"Russia"}, geometry:{type:"Polygon",coordinates:[[[27,42],[27,82],[180,82],[180,42],[27,42]]]} },
        { type:"Feature", properties:{ISO_A3:"CHN",name:"China"}, geometry:{type:"Polygon",coordinates:[[[73,18],[73,54],[135,54],[135,18],[73,18]]]} },
        { type:"Feature", properties:{ISO_A3:"IND",name:"India"}, geometry:{type:"Polygon",coordinates:[[[68,8],[68,36],[97,36],[97,8],[68,8]]]} },
        { type:"Feature", properties:{ISO_A3:"AUS",name:"Australia"}, geometry:{type:"Polygon",coordinates:[[[113,-10],[113,-44],[155,-44],[155,-10],[113,-10]]]} },
        { type:"Feature", properties:{ISO_A3:"ZAF",name:"South Africa"}, geometry:{type:"Polygon",coordinates:[[[16,-22],[16,-35],[33,-35],[33,-22],[16,-22]]]} },
        { type:"Feature", properties:{ISO_A3:"NGA",name:"Nigeria"}, geometry:{type:"Polygon",coordinates:[[[2,4],[2,14],[15,14],[15,4],[2,4]]]} },
        { type:"Feature", properties:{ISO_A3:"COD",name:"DR Congo"}, geometry:{type:"Polygon",coordinates:[[[12,-14],[12,6],[32,6],[32,-14],[12,-14]]]} },
      ]
    };
  }

  return {
    initMap,
    updateMapLayer,
    updateMapForYear,
    highlightCountry,
    clearHighlight,
    updateLegend,
    get currentLayer() { return currentLayer; },
    get geoJsonLayer() { return geoJsonLayer; }
  };
})();
