export interface PandemicData {
  id: string
  name: string
  pathogen: string
  startYear: number
  endYear?: number
  deaths: string
  infected: string
  origin: string
  description: string
  globalImpact: string
  keyMilestones: { year: number; event: string }[]
  color: string
}

export const pandemics: PandemicData[] = [
  {
    id: 'covid19',
    name: 'COVID-19 Pandemic',
    pathogen: 'SARS-CoV-2',
    startYear: 2019,
    deaths: '7+ million (official); 14–26M (excess mortality)',
    infected: '774+ million confirmed cases',
    origin: 'Wuhan, Hubei Province, China',
    description: 'Caused by the novel coronavirus SARS-CoV-2, COVID-19 was declared a pandemic by the WHO in March 2020. It triggered global lockdowns, overwhelmed healthcare systems, and accelerated the development of mRNA vaccine technology. The pandemic reshaped global health infrastructure and led to over 13.8 billion vaccine doses administered worldwide.',
    globalImpact: 'Global GDP contracted by 3.5% in 2020 (worst since WWII). Over 200 countries affected. Accelerated remote work, telemedicine, and vaccine technology.',
    keyMilestones: [
      { year: 2019, event: 'First cases identified in Wuhan, China (Dec)' },
      { year: 2020, event: 'WHO declares Public Health Emergency; global lockdowns begin' },
      { year: 2020, event: 'First mRNA vaccines authorized in December' },
      { year: 2021, event: 'Global vaccination campaigns; Delta variant emerges' },
      { year: 2022, event: 'Omicron variant dominates; restrictions lifted globally' },
      { year: 2023, event: 'WHO ends COVID-19 as a Public Health Emergency of International Concern' },
    ],
    color: '#ef4444',
  },
  {
    id: 'spanish-flu',
    name: 'Spanish Flu',
    pathogen: 'H1N1 Influenza A',
    startYear: 1918,
    endYear: 1920,
    deaths: '50–100 million',
    infected: '500 million (1/3 of world population)',
    origin: 'Multiple origins proposed; Kansas, USA prominent theory',
    description: 'The 1918 influenza pandemic was the most severe pandemic in recent history. Unusual in that it disproportionately killed healthy young adults aged 20–40, likely due to cytokine storms. It occurred in three major waves and was exacerbated by WWI troop movements and lack of antibiotics for secondary bacterial infections.',
    globalImpact: 'Killed more people than WWI. Reduced life expectancy in the US by 12 years. Led to advances in virology and public health infrastructure.',
    keyMilestones: [
      { year: 1918, event: 'First wave: Spring – relatively mild initial outbreak' },
      { year: 1918, event: 'Second wave: Fall – highly lethal wave kills millions' },
      { year: 1919, event: 'Third wave: Winter – moderately severe' },
      { year: 1920, event: 'Pandemic subsides; H1N1 becomes seasonal influenza' },
    ],
    color: '#f59e0b',
  },
  {
    id: 'hiv-aids',
    name: 'HIV/AIDS Pandemic',
    pathogen: 'HIV (Human Immunodeficiency Virus)',
    startYear: 1981,
    deaths: '40+ million (since start)',
    infected: '79+ million infected; 39 million living with HIV',
    origin: 'Central Africa (DRC); crossed to humans early 20th century',
    description: 'The HIV/AIDS pandemic has been one of the most destructive in human history, particularly devastating Sub-Saharan Africa. Since its identification in 1981, it has claimed over 40 million lives. The development of antiretroviral therapy (ART) in 1996 transformed HIV from a death sentence to a manageable chronic condition.',
    globalImpact: 'Decimated healthcare workforces in Africa. Led to stigma and discrimination. Spurred medical research and social movements. PEPFAR (2003) became largest health initiative for a single disease.',
    keyMilestones: [
      { year: 1981, event: 'First CDC report of unusual pneumonia in gay men; named AIDS in 1982' },
      { year: 1983, event: 'HIV identified as the causative agent' },
      { year: 1987, event: 'First antiretroviral drug (AZT) approved' },
      { year: 1996, event: 'Combination ART (HAART) transforms treatment outcomes' },
      { year: 2003, event: 'PEPFAR launched; global access to ART expands' },
      { year: 2022, event: '39 million living with HIV; 29.8 million on treatment' },
    ],
    color: '#8b5cf6',
  },
  {
    id: 'black-death',
    name: 'Black Death (Bubonic Plague)',
    pathogen: 'Yersinia pestis',
    startYear: 1347,
    endYear: 1353,
    deaths: '75–200 million',
    infected: 'Approximately 30–60% of Europe\'s population',
    origin: 'Central or East Asia; spread via trade routes',
    description: 'The Black Death was the most devastating pandemic in recorded human history, wiping out 30–60% of Europe\'s population. Caused by the bacterium Yersinia pestis, transmitted through flea bites on infected rats. The pandemic had profound social, cultural, religious, and demographic consequences that shaped European civilization.',
    globalImpact: 'Fundamentally altered European society, labor markets, and the Catholic Church\'s authority. Led to increased scrutiny of medical knowledge and early public health measures like quarantine.',
    keyMilestones: [
      { year: 1347, event: 'Plague arrives in Sicily via trading ships' },
      { year: 1348, event: 'Spreads to France, England, and Germany' },
      { year: 1349, event: 'Peak mortality across Europe' },
      { year: 1353, event: 'First wave subsides; recurrent outbreaks continue for centuries' },
    ],
    color: '#6b7280',
  },
  {
    id: 'cholera',
    name: 'Cholera Pandemics',
    pathogen: 'Vibrio cholerae',
    startYear: 1817,
    deaths: 'Millions across 7 pandemics',
    infected: 'Millions per decade in endemic regions',
    origin: 'Ganges Delta, India',
    description: 'Cholera has caused seven pandemics since 1817. The current (7th) pandemic began in 1961 in Indonesia. John Snow\'s investigation of the 1854 London cholera outbreak famously established the foundations of epidemiology. Cholera remains a global threat, with 1.3–4 million cases annually in endemic regions.',
    globalImpact: 'Drove the development of modern sanitation, epidemiology, and public health systems. Currently affects 47+ countries, with climate change expanding endemic zones.',
    keyMilestones: [
      { year: 1817, event: '1st pandemic begins in India' },
      { year: 1854, event: 'John Snow maps the Broad Street pump outbreak in London' },
      { year: 1883, event: 'Robert Koch identifies Vibrio cholerae' },
      { year: 1961, event: '7th pandemic begins (El Tor biotype)' },
      { year: 2010, event: 'Devastating outbreak in post-earthquake Haiti' },
    ],
    color: '#0ea5e9',
  },
]

export interface PandemicTimelinePoint {
  year: number
  deaths: number
  pathogen: string
  name: string
}

export const pandemicTimeline: PandemicTimelinePoint[] = [
  { year: 1347, deaths: 75, pathogen: 'Yersinia pestis', name: 'Black Death' },
  { year: 1817, deaths: 3, pathogen: 'Vibrio cholerae', name: 'Cholera (1st)' },
  { year: 1918, deaths: 50, pathogen: 'H1N1 Influenza', name: 'Spanish Flu' },
  { year: 1957, deaths: 1.1, pathogen: 'H2N2 Influenza', name: 'Asian Flu' },
  { year: 1968, deaths: 1, pathogen: 'H3N2 Influenza', name: 'Hong Kong Flu' },
  { year: 1981, deaths: 40, pathogen: 'HIV', name: 'HIV/AIDS' },
  { year: 2009, deaths: 0.5, pathogen: 'H1N1 Influenza', name: 'Swine Flu' },
  { year: 2019, deaths: 7, pathogen: 'SARS-CoV-2', name: 'COVID-19' },
]
