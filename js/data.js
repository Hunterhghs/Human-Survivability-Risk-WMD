/* ============================================================
   data.js — Real Data Layer + Simulation Engine (2025–2100)
   Human Survivability Risk Dashboard
   ============================================================ */

const DATA = (function() {
  'use strict';

  // ============================================================
  // COUNTRY BASELINE DATA (2025 estimates from real sources)
  // Sources: World Bank, WHO, IPCC AR6, UN WPP 2024, WRI Aqueduct
  // ============================================================

  const countryData = {
    AFG: { name:"Afghanistan",         pop:42.2,  pop2050:74.0,  pop2100:110.0, gdp:370,   gini:29.0, poverty:49.0, pm25:48.2, water:4.8, temp:+1.4, region:"south_asia" },
    ALB: { name:"Albania",             pop:2.8,   pop2050:2.4,   pop2100:1.5,   gdp:6800,  gini:33.0, poverty:14.0, pm25:15.3, water:2.1, temp:+1.2, region:"europe" },
    DZA: { name:"Algeria",             pop:45.6,  pop2050:60.0,  pop2100:72.0,  gdp:4300,  gini:27.6, poverty:5.5,  pm25:32.1, water:4.4, temp:+1.6, region:"mena" },
    AGO: { name:"Angola",              pop:36.7,  pop2050:77.0,  pop2100:165.0, gdp:2300,  gini:51.3, poverty:32.0, pm25:24.5, water:2.3, temp:+1.3, region:"sub_saharan_africa" },
    ARG: { name:"Argentina",           pop:46.0,  pop2050:54.0,  pop2100:58.0,  gdp:13700, gini:42.3, poverty:27.0, pm25:13.2, water:3.1, temp:+1.1, region:"latin_america" },
    ARM: { name:"Armenia",             pop:2.8,   pop2050:2.4,   pop2100:1.6,   gdp:6600,  gini:29.0, poverty:26.0, pm25:34.1, water:3.8, temp:+1.3, region:"europe" },
    AUS: { name:"Australia",           pop:26.7,  pop2050:35.0,  pop2100:43.0,  gdp:65000, gini:34.3, poverty:0.5,  pm25:7.2,  water:3.0, temp:+1.4, region:"oceania" },
    AUT: { name:"Austria",             pop:9.1,   pop2050:9.4,   pop2100:8.8,   gdp:52000, gini:30.2, poverty:0.4,  pm25:12.1, water:1.4, temp:+1.5, region:"europe" },
    AZE: { name:"Azerbaijan",          pop:10.4,  pop2050:11.0,  pop2100:10.2,  gdp:5600,  gini:26.6, poverty:5.0,  pm25:18.8, water:3.6, temp:+1.3, region:"central_asia" },
    BGD: { name:"Bangladesh",          pop:173.0, pop2050:204.0, pop2100:180.0, gdp:2700,  gini:32.4, poverty:18.0, pm25:63.8, water:2.8, temp:+1.4, region:"south_asia" },
    BLR: { name:"Belarus",             pop:9.2,   pop2050:8.2,   pop2100:6.5,   gdp:7800,  gini:24.4, poverty:0.2,  pm25:16.1, water:1.5, temp:+1.6, region:"europe" },
    BEL: { name:"Belgium",             pop:11.7,  pop2050:12.2,  pop2100:12.0,  gdp:50000, gini:27.2, poverty:0.3,  pm25:12.4, water:2.6, temp:+1.5, region:"europe" },
    BEN: { name:"Benin",               pop:14.0,  pop2050:28.0,  pop2100:52.0,  gdp:1400,  gini:37.8, poverty:38.0, pm25:44.2, water:2.4, temp:+1.3, region:"sub_saharan_africa" },
    BOL: { name:"Bolivia",             pop:12.4,  pop2050:17.0,  pop2100:21.0,  gdp:3700,  gini:43.6, poverty:25.0, pm25:22.5, water:2.8, temp:+1.2, region:"latin_america" },
    BIH: { name:"Bosnia & Herz.",      pop:3.2,   pop2050:2.6,   pop2100:1.7,   gdp:7600,  gini:33.0, poverty:16.0, pm25:26.4, water:1.8, temp:+1.4, region:"europe" },
    BWA: { name:"Botswana",            pop:2.7,   pop2050:3.8,   pop2100:4.8,   gdp:7800,  gini:53.3, poverty:16.0, pm25:14.1, water:4.2, temp:+1.5, region:"sub_saharan_africa" },
    BRA: { name:"Brazil",              pop:216.0, pop2050:231.0, pop2100:200.0, gdp:8900,  gini:48.9, poverty:19.0, pm25:13.4, water:2.1, temp:+1.2, region:"latin_america" },
    BGR: { name:"Bulgaria",            pop:6.4,   pop2050:5.0,   pop2100:3.2,   gdp:14000, gini:40.3, poverty:22.0, pm25:19.1, water:2.5, temp:+1.4, region:"europe" },
    BFA: { name:"Burkina Faso",        pop:23.4,  pop2050:43.0,  pop2100:74.0,  gdp:880,   gini:35.3, poverty:41.0, pm25:51.8, water:3.2, temp:+1.5, region:"sub_saharan_africa" },
    BDI: { name:"Burundi",             pop:13.6,  pop2050:26.0,  pop2100:44.0,  gdp:240,   gini:39.0, poverty:65.0, pm25:38.4, water:3.5, temp:+1.2, region:"sub_saharan_africa" },
    KHM: { name:"Cambodia",            pop:17.1,  pop2050:22.0,  pop2100:24.0,  gdp:1900,  gini:37.9, poverty:14.0, pm25:25.6, water:1.8, temp:+1.3, region:"east_asia" },
    CMR: { name:"Cameroon",            pop:29.0,  pop2050:52.0,  pop2100:88.0,  gdp:1600,  gini:46.6, poverty:24.0, pm25:48.8, water:1.9, temp:+1.3, region:"sub_saharan_africa" },
    CAN: { name:"Canada",              pop:39.3,  pop2050:46.0,  pop2100:52.0,  gdp:53000, gini:32.5, poverty:0.3,  pm25:7.6,  water:1.0, temp:+2.0, region:"north_america" },
    TCD: { name:"Chad",                pop:18.8,  pop2050:37.0,  pop2100:65.0,  gdp:700,   gini:37.5, poverty:42.0, pm25:66.0, water:4.5, temp:+1.6, region:"sub_saharan_africa" },
    CHL: { name:"Chile",               pop:19.7,  pop2050:22.0,  pop2100:21.0,  gdp:16500, gini:44.4, poverty:8.0,  pm25:21.4, water:3.8, temp:+1.2, region:"latin_america" },
    CHN: { name:"China",               pop:1410.0,pop2050:1310.0,pop2100:770.0, gdp:12500, gini:37.1, poverty:0.6,  pm25:35.4, water:3.0, temp:+1.4, region:"east_asia" },
    COL: { name:"Colombia",            pop:52.2,  pop2050:57.0,  pop2100:49.0,  gdp:6900,  gini:51.3, poverty:27.0, pm25:15.7, water:2.0, temp:+1.2, region:"latin_america" },
    COD: { name:"DR Congo",            pop:104.0, pop2050:215.0, pop2100:430.0, gdp:610,   gini:42.1, poverty:63.0, pm25:41.2, water:1.7, temp:+1.2, region:"sub_saharan_africa" },
    COG: { name:"Congo",               pop:6.2,   pop2050:11.0,  pop2100:19.0,  gdp:2300,  gini:48.9, poverty:40.0, pm25:37.8, water:1.5, temp:+1.2, region:"sub_saharan_africa" },
    CRI: { name:"Costa Rica",          pop:5.2,   pop2050:5.8,   pop2100:5.2,   gdp:14000, gini:48.2, poverty:14.0, pm25:15.6, water:1.5, temp:+1.2, region:"latin_america" },
    CIV: { name:"Côte d'Ivoire",       pop:29.3,  pop2050:51.0,  pop2100:82.0,  gdp:2500,  gini:37.4, poverty:24.0, pm25:44.8, water:2.0, temp:+1.3, region:"sub_saharan_africa" },
    HRV: { name:"Croatia",             pop:3.8,   pop2050:3.2,   pop2100:2.3,   gdp:19000, gini:29.7, poverty:18.0, pm25:16.5, water:1.4, temp:+1.4, region:"europe" },
    CUB: { name:"Cuba",                pop:11.1,  pop2050:10.0,  pop2100:7.5,   gdp:9100,  gini:38.0, poverty:12.0, pm25:14.8, water:2.9, temp:+1.2, region:"latin_america" },
    CZE: { name:"Czechia",             pop:10.9,  pop2050:10.5,  pop2100:9.5,   gdp:29000, gini:25.3, poverty:0.1,  pm25:14.5, water:1.6, temp:+1.5, region:"europe" },
    DNK: { name:"Denmark",             pop:5.9,   pop2050:6.5,   pop2100:6.8,   gdp:67000, gini:28.2, poverty:0.3,  pm25:9.3,  water:1.1, temp:+1.6, region:"europe" },
    DOM: { name:"Dominican Rep.",      pop:11.4,  pop2050:13.0,  pop2100:12.0,  gdp:10200, gini:41.1, poverty:12.0, pm25:14.3, water:2.6, temp:+1.2, region:"latin_america" },
    ECU: { name:"Ecuador",             pop:18.2,  pop2050:23.0,  pop2100:25.0,  gdp:6500,  gini:45.5, poverty:22.0, pm25:15.8, water:2.3, temp:+1.2, region:"latin_america" },
    EGY: { name:"Egypt",               pop:113.0, pop2050:160.0, pop2100:205.0, gdp:4100,  gini:31.9, poverty:16.0, pm25:46.8, water:4.8, temp:+1.5, region:"mena" },
    SLV: { name:"El Salvador",         pop:6.4,   pop2050:6.6,   pop2100:5.4,   gdp:5100,  gini:38.0, poverty:26.0, pm25:24.2, water:3.2, temp:+1.2, region:"latin_america" },
    EST: { name:"Estonia",             pop:1.3,   pop2050:1.1,   pop2100:0.9,   gdp:29000, gini:30.8, poverty:0.4,  pm25:6.2,  water:0.8, temp:+1.8, region:"europe" },
    ETH: { name:"Ethiopia",            pop:128.0, pop2050:214.0, pop2100:323.0, gdp:1100,  gini:35.0, poverty:27.0, pm25:26.8, water:3.1, temp:+1.3, region:"sub_saharan_africa" },
    FIN: { name:"Finland",             pop:5.6,   pop2050:5.5,   pop2100:5.4,   gdp:54000, gini:27.3, poverty:0.2,  pm25:5.5,  water:0.6, temp:+2.0, region:"europe" },
    FRA: { name:"France",              pop:64.8,  pop2050:67.0,  pop2100:65.0,  gdp:44000, gini:32.4, poverty:0.4,  pm25:11.1, water:2.2, temp:+1.5, region:"europe" },
    GAB: { name:"Gabon",               pop:2.5,   pop2050:4.0,   pop2100:6.0,   gdp:8800,  gini:38.0, poverty:33.0, pm25:26.5, water:1.2, temp:+1.2, region:"sub_saharan_africa" },
    GMB: { name:"Gambia",              pop:2.8,   pop2050:5.2,   pop2100:8.5,   gdp:840,   gini:35.9, poverty:32.0, pm25:42.5, water:2.5, temp:+1.3, region:"sub_saharan_africa" },
    GEO: { name:"Georgia",             pop:3.7,   pop2050:3.2,   pop2100:2.3,   gdp:6600,  gini:35.9, poverty:16.0, pm25:17.8, water:2.4, temp:+1.3, region:"europe" },
    DEU: { name:"Germany",             pop:84.5,  pop2050:81.0,  pop2100:72.0,  gdp:52000, gini:31.7, poverty:0.3,  pm25:11.0, water:2.0, temp:+1.6, region:"europe" },
    GHA: { name:"Ghana",               pop:34.2,  pop2050:56.0,  pop2100:84.0,  gdp:2300,  gini:43.5, poverty:23.0, pm25:30.4, water:2.0, temp:+1.3, region:"sub_saharan_africa" },
    GRC: { name:"Greece",              pop:10.3,  pop2050:9.0,   pop2100:7.0,   gdp:22000, gini:33.6, poverty:19.0, pm25:14.1, water:3.2, temp:+1.5, region:"europe" },
    GTM: { name:"Guatemala",           pop:18.3,  pop2050:26.0,  pop2100:30.0,  gdp:5100,  gini:48.3, poverty:47.0, pm25:24.3, water:2.3, temp:+1.2, region:"latin_america" },
    GIN: { name:"Guinea",              pop:14.2,  pop2050:25.0,  pop2100:41.0,  gdp:1200,  gini:33.7, poverty:44.0, pm25:35.2, water:2.0, temp:+1.3, region:"sub_saharan_africa" },
    HTI: { name:"Haiti",               pop:11.8,  pop2050:15.0,  pop2100:17.0,  gdp:1700,  gini:41.1, poverty:58.0, pm25:19.8, water:3.4, temp:+1.3, region:"latin_america" },
    HND: { name:"Honduras",            pop:10.6,  pop2050:14.0,  pop2100:15.0,  gdp:3000,  gini:48.2, poverty:48.0, pm25:19.4, water:2.5, temp:+1.2, region:"latin_america" },
    HUN: { name:"Hungary",             pop:9.6,   pop2050:8.2,   pop2100:6.5,   gdp:21000, gini:29.7, poverty:12.0, pm25:14.8, water:1.7, temp:+1.5, region:"europe" },
    IND: { name:"India",               pop:1430.0,pop2050:1670.0,pop2100:1530.0,gdp:2500,  gini:34.2, poverty:11.0, pm25:51.9, water:3.3, temp:+1.4, region:"south_asia" },
    IDN: { name:"Indonesia",           pop:279.0, pop2050:321.0, pop2100:310.0, gdp:4800,  gini:38.2, poverty:9.5,  pm25:21.2, water:2.7, temp:+1.2, region:"east_asia" },
    IRN: { name:"Iran",                pop:89.4,  pop2050:103.0, pop2100:95.0,  gdp:4400,  gini:40.9, poverty:11.0, pm25:30.8, water:4.6, temp:+1.7, region:"mena" },
    IRQ: { name:"Iraq",                pop:46.0,  pop2050:72.0,  pop2100:100.0, gdp:5300,  gini:29.5, poverty:19.0, pm25:42.6, water:4.8, temp:+1.8, region:"mena" },
    IRL: { name:"Ireland",             pop:5.2,   pop2050:6.2,   pop2100:7.0,   gdp:100000,gini:31.1, poverty:0.3,  pm25:8.0,  water:1.0, temp:+1.4, region:"europe" },
    ISR: { name:"Israel",              pop:9.2,   pop2050:13.0,  pop2100:17.0,  gdp:53000, gini:38.6, poverty:2.0,  pm25:19.5, water:4.6, temp:+1.6, region:"mena" },
    ITA: { name:"Italy",               pop:58.9,  pop2050:54.0,  pop2100:42.0,  gdp:37000, gini:35.2, poverty:0.8,  pm25:15.8, water:3.0, temp:+1.5, region:"europe" },
    JAM: { name:"Jamaica",             pop:2.8,   pop2050:2.7,   pop2100:2.0,   gdp:6200,  gini:40.3, poverty:17.0, pm25:14.9, water:2.2, temp:+1.2, region:"latin_america" },
    JPN: { name:"Japan",               pop:124.0, pop2050:104.0, pop2100:73.0,  gdp:34000, gini:32.9, poverty:0.2,  pm25:11.7, water:1.8, temp:+1.4, region:"east_asia" },
    JOR: { name:"Jordan",              pop:11.3,  pop2050:16.0,  pop2100:19.0,  gdp:4400,  gini:33.7, poverty:14.0, pm25:28.3, water:4.8, temp:+1.6, region:"mena" },
    KAZ: { name:"Kazakhstan",          pop:19.8,  pop2050:24.0,  pop2100:27.0,  gdp:11000, gini:27.8, poverty:3.0,  pm25:19.5, water:3.0, temp:+1.8, region:"central_asia" },
    KEN: { name:"Kenya",               pop:55.3,  pop2050:91.0,  pop2100:138.0, gdp:2100,  gini:40.8, poverty:34.0, pm25:16.8, water:3.4, temp:+1.2, region:"sub_saharan_africa" },
    KWT: { name:"Kuwait",              pop:4.3,   pop2050:5.8,   pop2100:6.5,   gdp:34000, gini:35.0, poverty:0.0,  pm25:56.8, water:4.8, temp:+1.9, region:"mena" },
    KGZ: { name:"Kyrgyzstan",          pop:6.8,   pop2050:9.0,   pop2100:11.0,  gdp:1500,  gini:29.0, poverty:20.0, pm25:28.4, water:2.6, temp:+1.6, region:"central_asia" },
    LAO: { name:"Laos",                pop:7.6,   pop2050:10.0,  pop2100:11.0,  gdp:1900,  gini:38.8, poverty:18.0, pm25:29.6, water:1.5, temp:+1.2, region:"east_asia" },
    LVA: { name:"Latvia",              pop:1.8,   pop2050:1.4,   pop2100:1.0,   gdp:22000, gini:35.1, poverty:0.7,  pm25:12.1, water:0.9, temp:+1.7, region:"europe" },
    LBN: { name:"Lebanon",             pop:5.3,   pop2050:5.8,   pop2100:5.5,   gdp:3600,  gini:31.8, poverty:28.0, pm25:29.4, water:4.5, temp:+1.5, region:"mena" },
    LSO: { name:"Lesotho",             pop:2.3,   pop2050:3.0,   pop2100:3.5,   gdp:1100,  gini:44.9, poverty:50.0, pm25:18.5, water:3.0, temp:+1.4, region:"sub_saharan_africa" },
    LBR: { name:"Liberia",             pop:5.5,   pop2050:10.0,  pop2100:17.0,  gdp:750,   gini:35.3, poverty:51.0, pm25:30.2, water:1.5, temp:+1.3, region:"sub_saharan_africa" },
    LBY: { name:"Libya",               pop:6.9,   pop2050:9.0,   pop2100:9.5,   gdp:5700,  gini:32.0, poverty:8.0,  pm25:40.4, water:4.8, temp:+1.7, region:"mena" },
    LTU: { name:"Lithuania",           pop:2.7,   pop2050:2.2,   pop2100:1.6,   gdp:26000, gini:35.5, poverty:0.8,  pm25:11.8, water:1.0, temp:+1.7, region:"europe" },
    MDG: { name:"Madagascar",          pop:30.8,  pop2050:54.0,  pop2100:90.0,  gdp:530,   gini:42.6, poverty:75.0, pm25:20.6, water:3.4, temp:+1.2, region:"sub_saharan_africa" },
    MWI: { name:"Malawi",              pop:21.2,  pop2050:40.0,  pop2100:68.0,  gdp:640,   gini:41.6, poverty:51.0, pm25:21.8, water:3.0, temp:+1.3, region:"sub_saharan_africa" },
    MYS: { name:"Malaysia",            pop:34.7,  pop2050:42.0,  pop2100:40.0,  gdp:12300, gini:41.2, poverty:0.2,  pm25:19.1, water:2.0, temp:+1.2, region:"east_asia" },
    MLI: { name:"Mali",                pop:23.7,  pop2050:47.0,  pop2100:82.0,  gdp:880,   gini:33.0, poverty:42.0, pm25:44.0, water:3.8, temp:+1.6, region:"sub_saharan_africa" },
    MRT: { name:"Mauritania",          pop:4.9,   pop2050:9.0,   pop2100:14.0,  gdp:2100,  gini:32.4, poverty:31.0, pm25:44.8, water:4.6, temp:+1.7, region:"sub_saharan_africa" },
    MEX: { name:"Mexico",              pop:129.0, pop2050:148.0, pop2100:135.0, gdp:11000, gini:45.4, poverty:27.0, pm25:18.8, water:3.4, temp:+1.3, region:"latin_america" },
    MDA: { name:"Moldova",             pop:2.5,   pop2050:2.0,   pop2100:1.3,   gdp:6000,  gini:26.0, poverty:23.0, pm25:13.7, water:1.8, temp:+1.4, region:"europe" },
    MNG: { name:"Mongolia",            pop:3.5,   pop2050:4.8,   pop2100:6.0,   gdp:4800,  gini:32.9, poverty:21.0, pm25:38.8, water:3.2, temp:+2.0, region:"east_asia" },
    MAR: { name:"Morocco",             pop:38.0,  pop2050:45.0,  pop2100:43.0,  gdp:3900,  gini:39.5, poverty:5.0,  pm25:24.3, water:4.2, temp:+1.5, region:"mena" },
    MOZ: { name:"Mozambique",          pop:34.2,  pop2050:63.0,  pop2100:105.0, gdp:550,   gini:47.4, poverty:62.0, pm25:23.6, water:2.8, temp:+1.3, region:"sub_saharan_africa" },
    MMR: { name:"Myanmar",             pop:54.5,  pop2050:62.0,  pop2100:55.0,  gdp:1300,  gini:38.1, poverty:25.0, pm25:33.6, water:1.9, temp:+1.3, region:"east_asia" },
    NAM: { name:"Namibia",             pop:2.6,   pop2050:3.8,   pop2100:5.2,   gdp:5100,  gini:59.1, poverty:18.0, pm25:14.4, water:4.5, temp:+1.5, region:"sub_saharan_africa" },
    NPL: { name:"Nepal",               pop:31.0,  pop2050:38.0,  pop2100:33.0,  gdp:1400,  gini:32.8, poverty:15.0, pm25:40.2, water:2.0, temp:+1.4, region:"south_asia" },
    NLD: { name:"Netherlands",         pop:17.7,  pop2050:18.0,  pop2100:17.0,  gdp:58000, gini:28.1, poverty:0.3,  pm25:11.2, water:1.8, temp:+1.5, region:"europe" },
    NZL: { name:"New Zealand",         pop:5.2,   pop2050:6.2,   pop2100:7.0,   gdp:48000, gini:36.2, poverty:0.5,  pm25:5.8,  water:1.0, temp:+1.2, region:"oceania" },
    NIC: { name:"Nicaragua",           pop:7.1,   pop2050:9.0,   pop2100:9.5,   gdp:2500,  gini:46.2, poverty:24.0, pm25:17.8, water:2.2, temp:+1.2, region:"latin_america" },
    NER: { name:"Niger",               pop:27.8,  pop2050:66.0,  pop2100:140.0, gdp:620,   gini:34.3, poverty:41.0, pm25:62.4, water:4.2, temp:+1.7, region:"sub_saharan_africa" },
    NGA: { name:"Nigeria",             pop:224.0, pop2050:401.0, pop2100:730.0, gdp:2100,  gini:35.1, poverty:31.0, pm25:55.8, water:2.8, temp:+1.4, region:"sub_saharan_africa" },
    PRK: { name:"North Korea",         pop:26.2,  pop2050:27.0,  pop2100:24.0,  gdp:1700,  gini:30.0, poverty:60.0, pm25:36.2, water:2.6, temp:+1.3, region:"east_asia" },
    MKD: { name:"North Macedonia",     pop:2.1,   pop2050:1.8,   pop2100:1.3,   gdp:7700,  gini:33.0, poverty:22.0, pm25:25.8, water:2.7, temp:+1.4, region:"europe" },
    NOR: { name:"Norway",              pop:5.5,   pop2050:6.2,   pop2100:6.8,   gdp:90000, gini:27.6, poverty:0.2,  pm25:6.4,  water:0.7, temp:+2.0, region:"europe" },
    OMN: { name:"Oman",                pop:4.6,   pop2050:6.0,   pop2100:6.0,   gdp:20000, gini:30.0, poverty:1.0,  pm25:38.8, water:4.8, temp:+1.8, region:"mena" },
    PAK: { name:"Pakistan",            pop:241.0, pop2050:368.0, pop2100:490.0, gdp:1500,  gini:33.5, poverty:22.0, pm25:50.2, water:4.2, temp:+1.5, region:"south_asia" },
    PSE: { name:"Palestine",           pop:5.4,   pop2050:9.0,   pop2100:12.0,  gdp:3600,  gini:34.4, poverty:29.0, pm25:30.4, water:4.5, temp:+1.6, region:"mena" },
    PAN: { name:"Panama",              pop:4.5,   pop2050:6.0,   pop2100:6.5,   gdp:17000, gini:49.2, poverty:14.0, pm25:12.1, water:1.5, temp:+1.2, region:"latin_america" },
    PNG: { name:"Papua New Guinea",    pop:10.5,  pop2050:16.0,  pop2100:22.0,  gdp:2800,  gini:41.9, poverty:38.0, pm25:14.8, water:1.0, temp:+1.1, region:"oceania" },
    PRY: { name:"Paraguay",            pop:6.9,   pop2050:9.0,   pop2100:10.0,  gdp:6100,  gini:47.3, poverty:20.0, pm25:15.2, water:1.8, temp:+1.2, region:"latin_america" },
    PER: { name:"Peru",                pop:34.4,  pop2050:42.0,  pop2100:44.0,  gdp:7300,  gini:40.2, poverty:18.0, pm25:23.8, water:3.2, temp:+1.2, region:"latin_america" },
    PHL: { name:"Philippines",         pop:117.0, pop2050:150.0, pop2100:160.0, gdp:3900,  gini:42.3, poverty:15.0, pm25:22.8, water:2.4, temp:+1.2, region:"east_asia" },
    POL: { name:"Poland",              pop:38.3,  pop2050:33.0,  pop2100:24.0,  gdp:21000, gini:28.8, poverty:0.5,  pm25:18.4, water:1.8, temp:+1.5, region:"europe" },
    PRT: { name:"Portugal",            pop:10.2,  pop2050:9.0,   pop2100:7.0,   gdp:26000, gini:34.0, poverty:1.2,  pm25:7.8,  water:2.9, temp:+1.5, region:"europe" },
    QAT: { name:"Qatar",               pop:2.7,   pop2050:3.3,   pop2100:3.5,   gdp:68000, gini:35.0, poverty:0.0,  pm25:56.4, water:4.8, temp:+1.9, region:"mena" },
    ROU: { name:"Romania",             pop:19.0,  pop2050:16.0,  pop2100:11.0,  gdp:18000, gini:34.8, poverty:23.0, pm25:14.3, water:2.3, temp:+1.5, region:"europe" },
    RUS: { name:"Russia",              pop:144.0, pop2050:133.0, pop2100:112.0, gdp:13000, gini:36.0, poverty:0.4,  pm25:10.2, water:1.4, temp:+2.2, region:"europe" },
    RWA: { name:"Rwanda",              pop:14.3,  pop2050:24.0,  pop2100:34.0,  gdp:1000,  gini:43.7, poverty:38.0, pm25:32.2, water:2.5, temp:+1.2, region:"sub_saharan_africa" },
    SAU: { name:"Saudi Arabia",        pop:37.2,  pop2050:46.0,  pop2100:45.0,  gdp:28000, gini:45.9, poverty:1.0,  pm25:57.8, water:4.8, temp:+1.9, region:"mena" },
    SEN: { name:"Senegal",             pop:18.0,  pop2050:34.0,  pop2100:58.0,  gdp:1700,  gini:40.3, poverty:32.0, pm25:42.4, water:3.6, temp:+1.4, region:"sub_saharan_africa" },
    SRB: { name:"Serbia",              pop:6.6,   pop2050:5.4,   pop2100:3.8,   gdp:10000, gini:34.5, poverty:14.0, pm25:22.0, water:2.4, temp:+1.4, region:"europe" },
    SLE: { name:"Sierra Leone",        pop:8.8,   pop2050:15.0,  pop2100:23.0,  gdp:500,   gini:34.0, poverty:57.0, pm25:32.8, water:1.8, temp:+1.3, region:"sub_saharan_africa" },
    SGP: { name:"Singapore",           pop:6.0,   pop2050:6.2,   pop2100:5.5,   gdp:80000, gini:46.0, poverty:0.0,  pm25:14.6, water:1.2, temp:+1.3, region:"east_asia" },
    SVK: { name:"Slovakia",            pop:5.4,   pop2050:4.8,   pop2100:3.8,   gdp:24000, gini:24.1, poverty:0.2,  pm25:15.8, water:1.5, temp:+1.5, region:"europe" },
    SVN: { name:"Slovenia",            pop:2.1,   pop2050:1.9,   pop2100:1.6,   gdp:32000, gini:24.4, poverty:0.1,  pm25:14.4, water:1.3, temp:+1.5, region:"europe" },
    SOM: { name:"Somalia",             pop:18.4,  pop2050:36.0,  pop2100:63.0,  gdp:430,   gini:36.8, poverty:70.0, pm25:28.5, water:4.5, temp:+1.4, region:"sub_saharan_africa" },
    ZAF: { name:"South Africa",        pop:60.6,  pop2050:75.0,  pop2100:82.0,  gdp:6200,  gini:63.0, poverty:40.0, pm25:22.0, water:3.8, temp:+1.5, region:"sub_saharan_africa" },
    KOR: { name:"South Korea",         pop:51.7,  pop2050:46.0,  pop2100:29.0,  gdp:35000, gini:31.4, poverty:0.2,  pm25:19.4, water:1.9, temp:+1.4, region:"east_asia" },
    SSD: { name:"South Sudan",         pop:11.2,  pop2050:20.0,  pop2100:32.0,  gdp:390,   gini:44.1, poverty:76.0, pm25:32.5, water:3.6, temp:+1.4, region:"sub_saharan_africa" },
    ESP: { name:"Spain",               pop:47.5,  pop2050:46.0,  pop2100:37.0,  gdp:31000, gini:34.3, poverty:1.5,  pm25:10.0, water:3.4, temp:+1.6, region:"europe" },
    LKA: { name:"Sri Lanka",           pop:22.0,  pop2050:23.0,  pop2100:18.0,  gdp:3900,  gini:39.3, poverty:14.0, pm25:20.8, water:3.2, temp:+1.2, region:"south_asia" },
    SDN: { name:"Sudan",               pop:48.6,  pop2050:82.0,  pop2100:130.0, gdp:1100,  gini:35.4, poverty:46.0, pm25:44.6, water:4.6, temp:+1.6, region:"sub_saharan_africa" },
    SWE: { name:"Sweden",              pop:10.6,  pop2050:12.0,  pop2100:13.0,  gdp:56000, gini:28.9, poverty:0.3,  pm25:5.9,  water:0.8, temp:+2.0, region:"europe" },
    CHE: { name:"Switzerland",         pop:8.9,   pop2050:9.8,   pop2100:10.2,  gdp:94000, gini:33.1, poverty:0.1,  pm25:10.1, water:1.0, temp:+1.6, region:"europe" },
    SYR: { name:"Syria",               pop:23.0,  pop2050:38.0,  pop2100:48.0,  gdp:800,   gini:37.5, poverty:80.0, pm25:32.8, water:4.6, temp:+1.6, region:"mena" },
    TWN: { name:"Taiwan",              pop:23.9,  pop2050:21.0,  pop2100:15.0,  gdp:33000, gini:33.6, poverty:1.5,  pm25:16.2, water:1.8, temp:+1.3, region:"east_asia" },
    TJK: { name:"Tajikistan",          pop:10.3,  pop2050:15.0,  pop2100:19.0,  gdp:1100,  gini:34.0, poverty:26.0, pm25:38.8, water:3.2, temp:+1.5, region:"central_asia" },
    TZA: { name:"Tanzania",            pop:68.3,  pop2050:130.0, pop2100:245.0, gdp:1200,  gini:40.5, poverty:44.0, pm25:17.8, water:2.8, temp:+1.2, region:"sub_saharan_africa" },
    THA: { name:"Thailand",            pop:71.8,  pop2050:66.0,  pop2100:46.0,  gdp:7300,  gini:35.0, poverty:6.8,  pm25:24.2, water:2.4, temp:+1.3, region:"east_asia" },
    TGO: { name:"Togo",                pop:9.2,   pop2050:17.0,  pop2100:28.0,  gdp:1000,  gini:43.1, poverty:45.0, pm25:38.2, water:2.2, temp:+1.3, region:"sub_saharan_africa" },
    TTO: { name:"Trinidad & Tobago",   pop:1.5,   pop2050:1.4,   pop2100:1.1,   gdp:18000, gini:40.0, poverty:20.0, pm25:15.2, water:2.8, temp:+1.2, region:"latin_america" },
    TUN: { name:"Tunisia",             pop:12.5,  pop2050:15.0,  pop2100:15.0,  gdp:3900,  gini:32.8, poverty:15.0, pm25:25.4, water:4.2, temp:+1.5, region:"mena" },
    TUR: { name:"Turkey",              pop:85.8,  pop2050:96.0,  pop2100:85.0,  gdp:11000, gini:41.9, poverty:12.0, pm25:27.4, water:3.2, temp:+1.5, region:"mena" },
    TKM: { name:"Turkmenistan",        pop:6.5,   pop2050:8.0,   pop2100:8.5,   gdp:8800,  gini:40.8, poverty:10.0, pm25:30.8, water:4.6, temp:+1.8, region:"central_asia" },
    UGA: { name:"Uganda",              pop:48.9,  pop2050:92.0,  pop2100:165.0, gdp:1000,  gini:42.7, poverty:41.0, pm25:33.2, water:2.4, temp:+1.2, region:"sub_saharan_africa" },
    UKR: { name:"Ukraine",             pop:36.7,  pop2050:30.0,  pop2100:22.0,  gdp:4400,  gini:25.6, poverty:1.8,  pm25:17.2, water:2.2, temp:+1.5, region:"europe" },
    ARE: { name:"UAE",                 pop:9.5,   pop2050:11.0,  pop2100:11.0,  gdp:50000, gini:26.0, poverty:0.0,  pm25:44.4, water:4.8, temp:+1.9, region:"mena" },
    GBR: { name:"United Kingdom",      pop:67.8,  pop2050:72.0,  pop2100:74.0,  gdp:48000, gini:35.1, poverty:0.5,  pm25:10.2, water:1.8, temp:+1.3, region:"europe" },
    USA: { name:"United States",       pop:336.0, pop2050:375.0, pop2100:394.0, gdp:80000, gini:41.4, poverty:11.0, pm25:7.8,  water:2.5, temp:+1.5, region:"north_america" },
    URY: { name:"Uruguay",             pop:3.4,   pop2050:3.5,   pop2100:3.2,   gdp:19000, gini:40.2, poverty:6.0,  pm25:11.0, water:2.4, temp:+1.1, region:"latin_america" },
    UZB: { name:"Uzbekistan",          pop:35.8,  pop2050:44.0,  pop2100:47.0,  gdp:2300,  gini:35.3, poverty:12.0, pm25:28.8, water:4.2, region:"central_asia" },
    VEN: { name:"Venezuela",           pop:29.0,  pop2050:34.0,  pop2100:33.0,  gdp:3700,  gini:44.8, poverty:65.0, pm25:16.2, water:2.2, temp:+1.2, region:"latin_america" },
    VNM: { name:"Vietnam",             pop:100.0, pop2050:110.0, pop2100:95.0,  gdp:4300,  gini:35.7, poverty:4.8,  pm25:26.4, water:2.0, temp:+1.3, region:"east_asia" },
    YEM: { name:"Yemen",               pop:34.8,  pop2050:55.0,  pop2100:72.0,  gdp:650,   gini:36.7, poverty:72.0, pm25:44.2, water:4.8, temp:+1.7, region:"mena" },
    ZMB: { name:"Zambia",              pop:20.8,  pop2050:37.0,  pop2100:62.0,  gdp:1300,  gini:51.5, poverty:57.0, pm25:20.4, water:3.0, temp:+1.3, region:"sub_saharan_africa" },
    ZWE: { name:"Zimbabwe",            pop:16.8,  pop2050:27.0,  pop2100:38.0,  gdp:1700,  gini:50.3, poverty:39.0, pm25:20.2, water:3.3, temp:+1.4, region:"sub_saharan_africa" },
  };

  // ============================================================
  // SSP TEMPERATURE PROJECTIONS (IPCC AR6)
  // Global mean surface temp anomaly above pre-industrial by SSP
  // ============================================================
  const sspTempProjections = {
    ssp245: { // SSP2-4.5 — "Middle of the Road"
      2025:1.20,  2030:1.35,  2035:1.50,  2040:1.65,  2045:1.80,
      2050:1.95,  2055:2.08,  2060:2.20,  2065:2.32,  2070:2.44,
      2075:2.55,  2080:2.65,  2085:2.73,  2090:2.80,  2095:2.87, 2100:2.93
    },
    ssp370: { // SSP3-7.0 — "Regional Rivalry"
      2025:1.20,  2030:1.40,  2035:1.62,  2040:1.85,  2045:2.10,
      2050:2.35,  2055:2.58,  2060:2.80,  2065:3.02,  2070:3.25,
      2075:3.48,  2080:3.72,  2085:3.96,  2090:4.22,  2095:4.48, 2100:4.75
    },
    ssp585: { // SSP5-8.5 — "Fossil-fueled Development"
      2025:1.22,  2030:1.48,  2035:1.78,  2040:2.10,  2045:2.45,
      2050:2.82,  2055:3.20,  2060:3.58,  2065:3.97,  2070:4.35,
      2075:4.73,  2080:5.10,  2085:5.45,  2090:5.78,  2095:6.10, 2100:6.40
    }
  };

  // Regional temperature multipliers (relative to global mean)
  const regionalTempMultipliers = {
    "north_america": 1.25,
    "europe": 1.15,
    "mena": 1.40,
    "sub_saharan_africa": 1.05,
    "south_asia": 1.10,
    "east_asia": 1.05,
    "central_asia": 1.30,
    "latin_america": 0.95,
    "oceania": 1.10
  };

  // ============================================================
  // SIMULATION ENGINE
  // ============================================================

  let currentScenario = 'ssp245';
  let currentYear = 2025;
  let simulationSpeed = 1; // years per tick
  let isPlaying = false;
  let simulationInterval = null;

  /**
   * Project a country's data to a given year using the selected SSP scenario.
   * Returns interpolated/extrapolated values for all indicators.
   */
  function projectCountry(iso, year) {
    const base = countryData[iso];
    if (!base) return null;

    const ssp = sspTempProjections[currentScenario];
    const globalTemp = interpolateSSP(ssp, year);

    // Population: linear interpolation between 2025, 2050, and 2100 estimates
    let pop;
    if (year <= 2050) {
      const t = (year - 2025) / 25;
      pop = base.pop + (base.pop2050 - base.pop) * t;
    } else {
      const t = (year - 2050) / 50;
      pop = base.pop2050 + (base.pop2100 - base.pop2050) * t;
    }

    // Regional temperature = global temp * regional multiplier * country baseline factor
    const regionalMult = regionalTempMultipliers[base.region] || 1.0;
    const countryTempFactor = base.temp / 1.2; // normalize to 2025 baseline of ~1.2°C
    const temp = globalTemp * countryTempFactor * regionalMult;

    // GDP per capita — modest growth assumption with climate drag
    const baseYear = 2025;
    const yearsElapsed = year - baseYear;
    let gdpGrowthRate;
    if (currentScenario === 'ssp245') {
      gdpGrowthRate = 0.018; // 1.8% real annual
    } else if (currentScenario === 'ssp370') {
      gdpGrowthRate = 0.012;
    } else {
      gdpGrowthRate = 0.020; // SSP5: high growth but high damage later
    }
    // Climate damage function — reduces growth as temps rise
    const tempAboveBaseline = Math.max(0, globalTemp - 1.5);
    const climateDrag = tempAboveBaseline * 0.005 * (currentScenario === 'ssp585' ? 2.0 : 1.0);
    const effectiveGrowth = Math.max(-0.01, gdpGrowthRate - climateDrag);
    const gdp = base.gdp * Math.pow(1 + effectiveGrowth, yearsElapsed);

    // Poverty rate — improves with GDP growth, worsens with climate
    const povertyElasticity = -0.3;
    const gdpRatio = gdp / base.gdp;
    let poverty = base.poverty * Math.pow(gdpRatio, povertyElasticity);
    // Climate impact on poverty
    poverty += tempAboveBaseline * 2.5 * (currentScenario === 'ssp585' ? 1.8 : 1.0);
    poverty = Math.max(0, Math.min(100, poverty));

    // PM2.5 — moderate improvement in SSP2, stall in SSP3, improvement then climate feedback in SSP5
    let pm25Factor;
    if (currentScenario === 'ssp245') {
      pm25Factor = 1 - (yearsElapsed * 0.003);
    } else if (currentScenario === 'ssp370') {
      pm25Factor = 1 - (yearsElapsed * 0.001);
    } else {
      pm25Factor = 1 - (yearsElapsed * 0.002);
    }
    // Climate-wildfire feedback increases PM2.5 in later years for SSP5
    if (currentScenario === 'ssp585' && globalTemp > 3.0) {
      pm25Factor += (globalTemp - 3.0) * 0.08;
    }
    let pm25 = base.pm25 * Math.max(0.3, pm25Factor);

    // Water stress — worsens with temperature
    const waterTempSensitivity = 0.15;
    let water = base.water + tempAboveBaseline * waterTempSensitivity;
    water = Math.min(5.0, Math.max(0.5, water));

    // Gini (inequality) — slight improvement in SSP2, worsening in SSP3
    let gini = base.gini;
    if (currentScenario === 'ssp245') {
      gini = Math.max(20, gini - yearsElapsed * 0.02);
    } else if (currentScenario === 'ssp370') {
      gini = Math.min(70, gini + yearsElapsed * 0.04);
    } else {
      gini = Math.min(65, gini + yearsElapsed * 0.01);
    }

    // Compute composite risk score (0–100)
    const compositeRisk = computeCompositeRisk(temp, pm25, water, poverty, gini, pop, base.region);

    return {
      iso,
      name: base.name,
      year,
      population: pop,
      temp,
      pm25,
      water,
      poverty,
      gini,
      gdp,
      compositeRisk,
      region: base.region,
      pop2025: base.pop,
      pop2050: base.pop2050,
      pop2100: base.pop2100,
      globalTemp
    };
  }

  /**
   * Compute composite risk score from individual indicators
   */
  function computeCompositeRisk(temp, pm25, water, poverty, gini, pop, region) {
    // Normalize each factor to 0-100
    const tempScore = Math.min(100, (temp / 5.0) * 100);           // 5°C = 100
    const pm25Score = Math.min(100, (pm25 / 70) * 100);             // 70 µg/m³ = 100
    const waterScore = Math.min(100, (water / 5.0) * 100);          // 5.0 = extreme water stress
    const povertyScore = poverty;                                    // already 0-100
    const inequalityScore = Math.min(100, (gini / 65) * 100);       // Gini 65 = 100

    // Weights — climate-focused
    const weights = {
      temp: 0.30,
      pm25: 0.15,
      water: 0.20,
      poverty: 0.20,
      inequality: 0.15
    };

    const composite =
      weights.temp * tempScore +
      weights.pm25 * pm25Score +
      weights.water * waterScore +
      weights.poverty * povertyScore +
      weights.inequality * inequalityScore;

    return Math.round(Math.min(100, Math.max(0, composite)));
  }

  function interpolateSSP(ssp, year) {
    const years = Object.keys(ssp).map(Number).sort((a,b) => a-b);
    if (year <= years[0]) return ssp[years[0]];
    if (year >= years[years.length-1]) return ssp[years[years.length-1]];

    for (let i = 0; i < years.length - 1; i++) {
      if (year >= years[i] && year <= years[i+1]) {
        const t = (year - years[i]) / (years[i+1] - years[i]);
        return ssp[years[i]] + (ssp[years[i+1]] - ssp[years[i]]) * t;
      }
    }
    return ssp[years[years.length-1]];
  }

  /**
   * Get all country projections for the current year
   */
  function getAllProjections(year) {
    const projections = {};
    for (const iso of Object.keys(countryData)) {
      projections[iso] = projectCountry(iso, year || currentYear);
    }
    return projections;
  }

  /**
   * Get global aggregates
   */
  function getGlobalAggregates(year) {
    const projs = getAllProjections(year);
    let totalPop = 0, atRiskPop = 0, avgComposite = 0, displacedPop = 0;
    let count = 0;

    for (const iso of Object.keys(projs)) {
      const p = projs[iso];
      if (!p) continue;
      count++;
      totalPop += p.population;
      avgComposite += p.compositeRisk;
      if (p.compositeRisk >= 50) atRiskPop += p.population;
      // Displacement estimate based on composite risk, water stress, temp
      const displaceFrac = (p.compositeRisk / 100) * 0.3 * (p.water / 5.0);
      displacedPop += p.population * displaceFrac;
    }

    if (count > 0) avgComposite /= count;

    return {
      totalPopulation: totalPop,
      atRiskPopulation: atRiskPop,
      avgCompositeRisk: Math.round(avgComposite),
      displacedPopulation: Math.round(displacedPop),
      globalTemp: sspTempProjections[currentScenario] ? interpolateSSP(sspTempProjections[currentScenario], year) : 1.2
    };
  }

  /**
   * Get risk tier label
   */
  function getRiskTier(score) {
    if (score >= 80) return 'Extreme';
    if (score >= 65) return 'Very High';
    if (score >= 50) return 'High';
    if (score >= 35) return 'Elevated';
    if (score >= 20) return 'Moderate';
    return 'Low';
  }

  /**
   * Get color for a risk score (heatmap gradient)
   */
  function getRiskColor(score) {
    // Green → Yellow → Orange → Red → Dark Red
    if (score >= 80) return '#7f1d1d';
    if (score >= 65) return '#dc2626';
    if (score >= 50) return '#f97316';
    if (score >= 35) return '#eab308';
    if (score >= 20) return '#84cc16';
    return '#22c55e';
  }

  /**
   * Get color for temperature anomaly
   */
  function getTempColor(temp) {
    if (temp >= 5.0) return '#67000d';
    if (temp >= 4.0) return '#a50f15';
    if (temp >= 3.0) return '#ef3b2d';
    if (temp >= 2.5) return '#fc4e2a';
    if (temp >= 2.0) return '#fd8d3c';
    if (temp >= 1.5) return '#feb24c';
    if (temp >= 1.0) return '#fed976';
    return '#ffffcc';
  }

  /**
   * Interpolate population for a specific year
   */
  function getPopulationAtYear(base, year) {
    if (year <= 2025) return base.pop;
    if (year <= 2050) {
      const t = (year - 2025) / 25;
      return base.pop + (base.pop2050 - base.pop) * t;
    } else {
      const t = (year - 2050) / 50;
      return base.pop2050 + (base.pop2100 - base.pop2050) * t;
    }
  }

  // ============================================================
  // PUBLIC API
  // ============================================================
  return {
    countryData,
    sspTempProjections,
    regionalTempMultipliers,
    projectCountry,
    getAllProjections,
    getGlobalAggregates,
    getRiskTier,
    getRiskColor,
    getTempColor,
    getPopulationAtYear,
    interpolateSSP,
    computeCompositeRisk,

    get currentScenario() { return currentScenario; },
    set currentScenario(s) { currentScenario = s; },
    get currentYear() { return currentYear; },
    set currentYear(y) { currentYear = y; },
    get simulationSpeed() { return simulationSpeed; },
    set simulationSpeed(s) { simulationSpeed = s; },
    get isPlaying() { return isPlaying; },
    set isPlaying(p) { isPlaying = p; },
    get simulationInterval() { return simulationInterval; },
    set simulationInterval(i) { simulationInterval = i; },
  };
})();
