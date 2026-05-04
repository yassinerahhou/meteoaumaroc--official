/** Monthly climate data for Moroccan cities, organized by climate zone */

export interface MonthData {
  high: number;  // avg max °C
  low: number;   // avg min °C
  rain: number;  // avg rainfall mm
  sun: number;   // avg sunshine hours/day
}

export interface ZoneClimate {
  label: string;        // human-readable climate type label (FR)
  labelAr: string;
  labelEn: string;
  bestMonths: number[]; // 0-indexed (0=Jan)
  months: MonthData[];  // 12 entries Jan→Dec
}

// ── Climate zones ────────────────────────────────────────────────
const ZONES: Record<string, ZoneClimate> = {
  atlantic: {
    label: "Océanique atlantique",
    labelAr: "مناخ أطلسي محيطي",
    labelEn: "Atlantic oceanic",
    bestMonths: [3, 4, 5, 8, 9], // Apr–Jun, Sep–Oct
    months: [
      { high: 17, low: 8,  rain: 65, sun: 6 },  // Jan
      { high: 18, low: 9,  rain: 55, sun: 7 },  // Feb
      { high: 20, low: 11, rain: 40, sun: 8 },  // Mar
      { high: 22, low: 13, rain: 28, sun: 9 },  // Apr
      { high: 24, low: 15, rain: 15, sun: 10 }, // May
      { high: 27, low: 18, rain: 4,  sun: 11 }, // Jun
      { high: 28, low: 20, rain: 1,  sun: 12 }, // Jul
      { high: 29, low: 21, rain: 1,  sun: 11 }, // Aug
      { high: 27, low: 19, rain: 8,  sun: 9 },  // Sep
      { high: 23, low: 15, rain: 32, sun: 8 },  // Oct
      { high: 20, low: 12, rain: 58, sun: 6 },  // Nov
      { high: 17, low: 9,  rain: 72, sun: 5 },  // Dec
    ],
  },

  agadir: {
    label: "Côtier semi-aride",
    labelAr: "ساحلي شبه جاف",
    labelEn: "Coastal semi-arid",
    bestMonths: [2, 3, 4, 9, 10, 11], // Mar–May, Oct–Dec
    months: [
      { high: 20, low: 9,  rain: 30, sun: 8 },  // Jan
      { high: 22, low: 10, rain: 25, sun: 8 },  // Feb
      { high: 24, low: 12, rain: 18, sun: 9 },  // Mar
      { high: 25, low: 14, rain: 10, sun: 9 },  // Apr
      { high: 27, low: 16, rain: 3,  sun: 10 }, // May
      { high: 28, low: 19, rain: 1,  sun: 10 }, // Jun
      { high: 29, low: 21, rain: 0,  sun: 10 }, // Jul
      { high: 30, low: 22, rain: 0,  sun: 10 }, // Aug
      { high: 29, low: 20, rain: 3,  sun: 9 },  // Sep
      { high: 27, low: 17, rain: 15, sun: 9 },  // Oct
      { high: 24, low: 13, rain: 28, sun: 8 },  // Nov
      { high: 21, low: 10, rain: 35, sun: 7 },  // Dec
    ],
  },

  marrakech: {
    label: "Continental semi-aride",
    labelAr: "قاري شبه جاف",
    labelEn: "Continental semi-arid",
    bestMonths: [2, 3, 9, 10], // Mar–Apr, Oct–Nov
    months: [
      { high: 18, low: 4,  rain: 25, sun: 7 },  // Jan
      { high: 21, low: 6,  rain: 20, sun: 8 },  // Feb
      { high: 24, low: 9,  rain: 20, sun: 9 },  // Mar
      { high: 28, low: 12, rain: 18, sun: 10 }, // Apr
      { high: 33, low: 16, rain: 9,  sun: 11 }, // May
      { high: 38, low: 20, rain: 3,  sun: 12 }, // Jun
      { high: 42, low: 24, rain: 1,  sun: 12 }, // Jul
      { high: 41, low: 23, rain: 2,  sun: 11 }, // Aug
      { high: 36, low: 20, rain: 7,  sun: 10 }, // Sep
      { high: 30, low: 15, rain: 18, sun: 9 },  // Oct
      { high: 23, low: 9,  rain: 22, sun: 7 },  // Nov
      { high: 19, low: 5,  rain: 25, sun: 6 },  // Dec
    ],
  },

  fes: {
    label: "Continental méditerranéen",
    labelAr: "قاري متوسطي",
    labelEn: "Continental Mediterranean",
    bestMonths: [2, 3, 4, 8, 9], // Mar–May, Sep–Oct
    months: [
      { high: 14, low: 4,  rain: 65, sun: 5 },  // Jan
      { high: 17, low: 5,  rain: 55, sun: 6 },  // Feb
      { high: 21, low: 8,  rain: 45, sun: 7 },  // Mar
      { high: 24, low: 11, rain: 35, sun: 8 },  // Apr
      { high: 28, low: 14, rain: 20, sun: 9 },  // May
      { high: 35, low: 19, rain: 8,  sun: 11 }, // Jun
      { high: 40, low: 22, rain: 2,  sun: 12 }, // Jul
      { high: 39, low: 22, rain: 3,  sun: 11 }, // Aug
      { high: 33, low: 18, rain: 12, sun: 9 },  // Sep
      { high: 26, low: 14, rain: 38, sun: 7 },  // Oct
      { high: 19, low: 9,  rain: 58, sun: 5 },  // Nov
      { high: 14, low: 5,  rain: 72, sun: 4 },  // Dec
    ],
  },

  tanger: {
    label: "Méditerranéen atlantique",
    labelAr: "متوسطي أطلسي",
    labelEn: "Atlantic Mediterranean",
    bestMonths: [3, 4, 5, 8, 9], // Apr–Jun, Sep–Oct
    months: [
      { high: 15, low: 7,  rain: 115, sun: 5 }, // Jan
      { high: 16, low: 8,  rain: 92,  sun: 6 }, // Feb
      { high: 18, low: 9,  rain: 75,  sun: 7 }, // Mar
      { high: 20, low: 11, rain: 60,  sun: 8 }, // Apr
      { high: 23, low: 14, rain: 35,  sun: 9 }, // May
      { high: 27, low: 18, rain: 10,  sun: 10 },// Jun
      { high: 29, low: 21, rain: 2,   sun: 11 },// Jul
      { high: 29, low: 21, rain: 4,   sun: 10 },// Aug
      { high: 27, low: 19, rain: 22,  sun: 8 }, // Sep
      { high: 23, low: 15, rain: 72,  sun: 7 }, // Oct
      { high: 19, low: 11, rain: 102, sun: 5 }, // Nov
      { high: 16, low: 8,  rain: 118, sun: 4 }, // Dec
    ],
  },

  mediterranean: {
    label: "Méditerranéen oriental",
    labelAr: "متوسطي شرقي",
    labelEn: "Eastern Mediterranean",
    bestMonths: [3, 4, 8, 9], // Apr–May, Sep–Oct
    months: [
      { high: 16, low: 6,  rain: 60, sun: 6 },  // Jan
      { high: 18, low: 7,  rain: 50, sun: 7 },  // Feb
      { high: 20, low: 9,  rain: 40, sun: 8 },  // Mar
      { high: 23, low: 12, rain: 30, sun: 9 },  // Apr
      { high: 26, low: 15, rain: 20, sun: 10 }, // May
      { high: 31, low: 18, rain: 8,  sun: 11 }, // Jun
      { high: 35, low: 22, rain: 1,  sun: 12 }, // Jul
      { high: 35, low: 22, rain: 2,  sun: 11 }, // Aug
      { high: 30, low: 19, rain: 12, sun: 9 },  // Sep
      { high: 25, low: 15, rain: 36, sun: 8 },  // Oct
      { high: 20, low: 10, rain: 55, sun: 6 },  // Nov
      { high: 16, low: 7,  rain: 65, sun: 5 },  // Dec
    ],
  },

  mountain: {
    label: "Montagnard",
    labelAr: "جبلي",
    labelEn: "Mountain",
    bestMonths: [3, 4, 5, 6, 7, 8, 9], // Apr–Oct
    months: [
      { high: 5,  low: -4, rain: 65, sun: 5 },  // Jan
      { high: 7,  low: -2, rain: 55, sun: 6 },  // Feb
      { high: 11, low: 1,  rain: 50, sun: 7 },  // Mar
      { high: 14, low: 3,  rain: 45, sun: 8 },  // Apr
      { high: 20, low: 7,  rain: 30, sun: 9 },  // May
      { high: 27, low: 11, rain: 10, sun: 11 }, // Jun
      { high: 33, low: 14, rain: 2,  sun: 12 }, // Jul
      { high: 32, low: 14, rain: 3,  sun: 11 }, // Aug
      { high: 26, low: 10, rain: 20, sun: 9 },  // Sep
      { high: 19, low: 6,  rain: 40, sun: 7 },  // Oct
      { high: 11, low: 1,  rain: 60, sun: 5 },  // Nov
      { high: 6,  low: -3, rain: 70, sun: 4 },  // Dec
    ],
  },

  saharan: {
    label: "Pré-saharien",
    labelAr: "شبه صحراوي",
    labelEn: "Pre-Saharan",
    bestMonths: [2, 3, 9, 10], // Mar–Apr, Oct–Nov
    months: [
      { high: 16, low: 2,  rain: 15, sun: 8 },  // Jan
      { high: 19, low: 5,  rain: 12, sun: 9 },  // Feb
      { high: 24, low: 8,  rain: 10, sun: 10 }, // Mar
      { high: 28, low: 12, rain: 8,  sun: 10 }, // Apr
      { high: 33, low: 17, rain: 5,  sun: 11 }, // May
      { high: 40, low: 22, rain: 2,  sun: 12 }, // Jun
      { high: 44, low: 25, rain: 1,  sun: 12 }, // Jul
      { high: 43, low: 24, rain: 1,  sun: 11 }, // Aug
      { high: 37, low: 20, rain: 5,  sun: 10 }, // Sep
      { high: 29, low: 14, rain: 8,  sun: 9 },  // Oct
      { high: 22, low: 7,  rain: 10, sun: 8 },  // Nov
      { high: 17, low: 3,  rain: 15, sun: 7 },  // Dec
    ],
  },

  desert: {
    label: "Désertique côtier",
    labelAr: "صحراوي ساحلي",
    labelEn: "Coastal desert",
    bestMonths: [0, 1, 2, 9, 10, 11], // Nov–Apr
    months: [
      { high: 22, low: 14, rain: 10, sun: 7 },  // Jan
      { high: 23, low: 15, rain: 8,  sun: 7 },  // Feb
      { high: 24, low: 16, rain: 7,  sun: 8 },  // Mar
      { high: 25, low: 17, rain: 4,  sun: 8 },  // Apr
      { high: 26, low: 18, rain: 2,  sun: 9 },  // May
      { high: 27, low: 20, rain: 1,  sun: 9 },  // Jun
      { high: 28, low: 22, rain: 0,  sun: 10 }, // Jul
      { high: 30, low: 24, rain: 0,  sun: 10 }, // Aug
      { high: 30, low: 23, rain: 2,  sun: 9 },  // Sep
      { high: 28, low: 20, rain: 5,  sun: 8 },  // Oct
      { high: 26, low: 17, rain: 8,  sun: 7 },  // Nov
      { high: 23, low: 15, rain: 10, sun: 7 },  // Dec
    ],
  },

  essaouira: {
    label: "Côtier tempéré",
    labelAr: "ساحلي معتدل",
    labelEn: "Temperate coastal",
    bestMonths: [3, 4, 8, 9, 10], // Apr–May, Sep–Nov
    months: [
      { high: 17, low: 10, rain: 55, sun: 6 },  // Jan
      { high: 18, low: 11, rain: 45, sun: 7 },  // Feb
      { high: 19, low: 12, rain: 35, sun: 8 },  // Mar
      { high: 20, low: 13, rain: 22, sun: 8 },  // Apr
      { high: 21, low: 14, rain: 12, sun: 9 },  // May
      { high: 22, low: 16, rain: 3,  sun: 9 },  // Jun
      { high: 23, low: 17, rain: 1,  sun: 9 },  // Jul
      { high: 23, low: 17, rain: 1,  sun: 9 },  // Aug
      { high: 23, low: 17, rain: 5,  sun: 8 },  // Sep
      { high: 22, low: 15, rain: 22, sun: 7 },  // Oct
      { high: 20, low: 12, rain: 45, sun: 6 },  // Nov
      { high: 18, low: 11, rain: 60, sun: 5 },  // Dec
    ],
  },
};

// ── Slug → zone mapping ─────────────────────────────────────────
const SLUG_TO_ZONE: Record<string, string> = {
  // Atlantic coast
  casablanca: "atlantic",
  mohammedia: "atlantic",
  "el-jadida": "atlantic",
  safi: "atlantic",
  rabat: "atlantic",
  sale: "atlantic",
  kenitra: "atlantic",
  temara: "atlantic",
  "souk-el-arbaa": "atlantic",
  "sidi-kacem": "atlantic",
  larache: "atlantic",
  asilah: "atlantic",
  "benslimane": "atlantic",

  // Agadir coastal zone
  agadir: "agadir",
  tiznit: "agadir",
  "sidi-ifni": "agadir",
  guelmim: "agadir",
  taroudant: "agadir",

  // Marrakech / hot interior
  marrakech: "marrakech",
  "beni-mellal": "marrakech",
  "kelaa-sraghna": "marrakech",
  "azilal": "mountain",

  // Continental interior (Fes/Meknes belt)
  fes: "fes",
  meknes: "fes",
  taza: "fes",
  sefrou: "fes",
  "sidi-harazem": "fes",
  berrechid: "fes",
  settat: "fes",
  khouribga: "fes",
  "beni-mellal-2": "fes",
  oujda: "mediterranean",

  // Tanger / Atlantic-Mediterranean north
  tanger: "tanger",
  tetouan: "tanger",
  chefchaouen: "tanger",
  fnideq: "tanger",
  mdiq: "tanger",
  "al-hoceima": "mediterranean",
  nador: "mediterranean",
  driouch: "mediterranean",
  berkane: "mediterranean",
  jerada: "mediterranean",

  // Mountain
  ifrane: "mountain",
  azrou: "mountain",
  midelt: "mountain",
  imouzzer: "mountain",
  "ain-leuh": "mountain",
  khenifra: "mountain",

  // Pre-Saharan
  ouarzazate: "saharan",
  errachidia: "saharan",
  zagora: "saharan",
  tinghir: "saharan",
  rissani: "saharan",
  "merzouga": "saharan",
  erfoud: "saharan",
  "tata": "saharan",
  "ait-melloul": "agadir",

  // Saharan coast
  laayoune: "desert",
  dakhla: "desert",
  "boujdour": "desert",
  "tarfaya": "desert",
  "tan-tan": "desert",

  // Essaouira wind zone
  essaouira: "essaouira",
};

/** Get monthly climate data for a city slug (falls back to "atlantic") */
export function getCityClimate(slug: string): ZoneClimate {
  const zone = SLUG_TO_ZONE[slug] ?? "atlantic";
  return ZONES[zone] ?? ZONES.atlantic;
}

export const MONTH_NAMES_FR = ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"];
export const MONTH_NAMES_AR = ["يناير","فبراير","مارس","أبريل","ماي","يونيو","يوليوز","غشت","شتنبر","أكتوبر","نونبر","دجنبر"];
export const MONTH_NAMES_EN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
