# Human Survivability Risk — World Map Dashboard

**Interactive global risk observatory tracking human survivability from 2025 to 2100.**

[![Deploy to GitHub Pages](https://github.com/Hunterhghs/Human-Survivability-Risk-WMD/actions/workflows/pages.yml/badge.svg)](https://github.com/Hunterhghs/Human-Survivability-Risk-WMD/actions/workflows/pages.yml)

## Overview

A professional-grade, fixed-layout web application that visualizes multi-dimensional human survivability risks across the globe:

- **Climate Risk** — Temperature anomalies under IPCC SSP scenarios (SSP2-4.5, SSP3-7.0, SSP5-8.5)
- **Air Pollution** — PM2.5 concentrations and projections
- **Water Stress** — Baseline water risk scores per country
- **Poverty** — Poverty headcount ratio at national poverty lines
- **Wealth Inequality** — Gini coefficient tracking
- **Demographic Shifts** — Population projections accounting for Africa's rising share
- **Composite Risk Index** — Weighted multi-factor survivability score

## Features

- 🌍 **Interactive World Map** — Leaflet-powered choropleth with 7 toggleable risk layers
- ⏱ **Timeline 2025–2100** — Play/pause simulation with adjustable speed
- 📊 **Live KPIs** — Global ΔT, at-risk population, composite index, climate-displaced
- 📈 **Trend Charts** — Multi-axis Chart.js visualizations tracking risk trajectories
- 🏳 **Country Profiles** — Click any country for detailed indicator breakdown
- 🌐 **SSP Scenarios** — Switch between SSP2-4.5, SSP3-7.0, and SSP5-8.5
- 🎨 **Professional Dark Theme** — Fixed-position webapp layout with design tokens

## Data Sources

Real 2025 baseline data consolidated from:
- World Bank Development Indicators (poverty, Gini, GDP)
- IPCC AR6 Working Group I (temperature projections)
- UN World Population Prospects 2024 (demographics)
- WHO Global Air Quality Database (PM2.5)
- WRI Aqueduct Water Risk Atlas (water stress)

## Tech Stack

- **Leaflet.js** — Interactive map with CARTO dark tiles
- **Chart.js** — Multi-axis trend and regional charts
- **Vanilla JS** — Simulation engine with no framework dependencies
- **CSS Custom Properties** — Design token system for theming
- **GitHub Pages** — Zero-config deployment

## Deployment

Push to `main` — GitHub Actions deploys to GitHub Pages automatically.

```bash
git push origin main
```

## Local Development

Open `index.html` in any browser — no build step required.

```bash
python3 -m http.server 8080
# Visit http://localhost:8080
```

## License

MIT — H Heuristics, 2025
