/* ============================================================
   charts.js — Chart.js Renderers
   Human Survivability Risk Dashboard
   ============================================================ */

const CHARTS = (function() {
  'use strict';

  let trendChart = null;
  let regionalChart = null;

  // Chart.js global defaults
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.font.size = 11;

  function initCharts() {
    initTrendChart();
    initRegionalChart();
  }

  function initTrendChart() {
    const ctx = document.getElementById('trend-chart');
    if (!ctx) return;

    if (trendChart) trendChart.destroy();

    const scenario = DATA.currentScenario;
    const ssp = DATA.sspTempProjections[scenario];
    const labels = [];
    const tempData = [];
    const riskData = [];
    const popData = [];

    for (let y = 2025; y <= 2100; y += 5) {
      labels.push(y);
      const temp = DATA.interpolateSSP(ssp, y);
      tempData.push(temp);
      const aggs = DATA.getGlobalAggregates(y);
      riskData.push(aggs.avgCompositeRisk);
      popData.push(aggs.atRiskPopulation / 1000); // billions
    }

    trendChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'ΔT (°C)',
            data: tempData,
            borderColor: '#ff6b35',
            backgroundColor: 'rgba(255,107,53,0.1)',
            borderWidth: 2.5,
            tension: 0.3,
            pointRadius: 3,
            pointBackgroundColor: '#ff6b35',
            yAxisID: 'y-temp',
            fill: false
          },
          {
            label: 'Composite Risk',
            data: riskData,
            borderColor: '#f5a623',
            backgroundColor: 'rgba(245,166,35,0.1)',
            borderWidth: 2.5,
            tension: 0.3,
            pointRadius: 3,
            pointBackgroundColor: '#f5a623',
            yAxisID: 'y-risk',
            fill: false
          },
          {
            label: 'At-Risk (B)',
            data: popData,
            borderColor: '#ff4757',
            backgroundColor: 'rgba(255,71,87,0.1)',
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 2,
            pointBackgroundColor: '#ff4757',
            yAxisID: 'y-pop',
            fill: false,
            borderDash: [5, 3]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 12,
              boxHeight: 2,
              padding: 16,
              usePointStyle: true,
              pointStyleWidth: 12,
              font: { size: 10 }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(17,23,32,0.95)',
            titleFont: { weight: 'bold' },
            bodyFont: { size: 11 },
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { maxTicksLimit: 8, font: { size: 10 } }
          },
          'y-temp': {
            type: 'linear',
            position: 'left',
            title: { display: true, text: '°C', font: { size: 10, weight: 'bold' }, color: '#ff6b35' },
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { font: { size: 10 }, callback: v => '+' + v.toFixed(1) + '°' },
            min: 0,
            max: 7
          },
          'y-risk': {
            type: 'linear',
            position: 'right',
            title: { display: true, text: 'Risk Index', font: { size: 10, weight: 'bold' }, color: '#f5a623' },
            grid: { drawOnChartArea: false },
            ticks: { font: { size: 10 }, callback: v => v + '/100' },
            min: 0,
            max: 100
          },
          'y-pop': {
            type: 'linear',
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: { font: { size: 10 }, callback: v => v.toFixed(1) + 'B' },
            display: false
          }
        }
      }
    });
  }

  function initRegionalChart() {
    const ctx = document.getElementById('regional-chart');
    if (!ctx) return;

    if (regionalChart) regionalChart.destroy();

    const projs = DATA.getAllProjections(DATA.currentYear);

    // Aggregate by region
    const regions = {};
    for (const iso of Object.keys(projs)) {
      const p = projs[iso];
      if (!p) continue;
      const r = p.region;
      if (!regions[r]) {
        regions[r] = { total: 0, count: 0, pop: 0, atRisk: 0 };
      }
      regions[r].total += p.compositeRisk;
      regions[r].count++;
      regions[r].pop += p.population;
      if (p.compositeRisk >= 50) regions[r].atRisk += p.population;
    }

    const regionNames = {
      north_america: 'N. America',
      europe: 'Europe',
      mena: 'MENA',
      sub_saharan_africa: 'Sub-Saharan Africa',
      south_asia: 'South Asia',
      east_asia: 'East Asia',
      central_asia: 'Central Asia',
      latin_america: 'Latin America',
      oceania: 'Oceania'
    };

    const labels = [];
    const avgRisk = [];
    const atRiskPct = [];
    const backgroundColors = [];

    const colorMap = {
      sub_saharan_africa: '#dc2626',
      mena: '#f97316',
      south_asia: '#eab308',
      central_asia: '#f59e0b',
      latin_america: '#84cc16',
      east_asia: '#22c55e',
      north_america: '#4d9eff',
      europe: '#a855f7',
      oceania: '#00d4aa'
    };

    for (const [region, data] of Object.entries(regions)) {
      labels.push(regionNames[region] || region);
      avgRisk.push(Math.round(data.total / data.count));
      atRiskPct.push(Math.round((data.atRisk / data.pop) * 100));
      backgroundColors.push(colorMap[region] || '#64748b');
    }

    regionalChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Avg Risk Score',
            data: avgRisk,
            backgroundColor: backgroundColors.map(c => c + 'cc'),
            borderColor: backgroundColors,
            borderWidth: 1,
            borderRadius: 4,
            borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(17,23,32,0.95)',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function(ctx) {
                return 'Risk Score: ' + ctx.raw + '/100';
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { font: { size: 10 }, callback: v => v + '/100' },
            max: 100
          },
          y: {
            grid: { display: false },
            ticks: { font: { size: 10, weight: '500' } }
          }
        }
      }
    });
  }

  function updateTrendChart() {
    initTrendChart();
  }

  function updateRegionalChart() {
    initRegionalChart();
  }

  function updateAllCharts() {
    updateTrendChart();
    updateRegionalChart();
  }

  return {
    initCharts,
    updateTrendChart,
    updateRegionalChart,
    updateAllCharts
  };
})();
