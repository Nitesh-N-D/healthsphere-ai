export interface Reference {
  id: string
  title: string
  organization: string
  type: 'guideline' | 'report' | 'database' | 'tool'
  url: string
  description: string
}

export const references: Reference[] = [
  {
    id: 'who-icd',
    title: 'International Classification of Diseases (ICD-11)',
    organization: 'World Health Organization',
    type: 'database',
    url: 'https://icd.who.int/',
    description: 'Global standard for diagnostic health information, used worldwide for clinical care, epidemiology, and research.',
  },
  {
    id: 'cdc-wonder',
    title: 'CDC WONDER – Wide-ranging Online Data for Epidemiologic Research',
    organization: 'Centers for Disease Control and Prevention',
    type: 'database',
    url: 'https://wonder.cdc.gov/',
    description: 'Comprehensive public health database for epidemiological and statistical data on mortality, natality, and disease surveillance.',
  },
  {
    id: 'who-gho',
    title: 'Global Health Observatory Data Repository',
    organization: 'World Health Organization',
    type: 'database',
    url: 'https://www.who.int/data/gho',
    description: 'WHO\'s gateway to health-related statistics for over 1000 indicators across 194 countries.',
  },
  {
    id: 'pubmed',
    title: 'PubMed – MEDLINE Database',
    organization: 'National Library of Medicine',
    type: 'database',
    url: 'https://pubmed.ncbi.nlm.nih.gov/',
    description: 'Free search engine for citations and abstracts in the biomedical and life sciences literature.',
  },
  {
    id: 'ada-standards',
    title: 'Standards of Medical Care in Diabetes',
    organization: 'American Diabetes Association',
    type: 'guideline',
    url: 'https://diabetesjournals.org/care/issue/47/Supplement_1',
    description: 'Annual evidence-based clinical practice recommendations for the management of diabetes.',
  },
  {
    id: 'who-cvd',
    title: 'Cardiovascular Diseases – Fact Sheet',
    organization: 'World Health Organization',
    type: 'report',
    url: 'https://www.who.int/news-room/fact-sheets/detail/cardiovascular-diseases-(cvds)',
    description: 'WHO fact sheet on cardiovascular diseases, the leading cause of death globally.',
  },
  {
    id: 'lancet-ncd',
    title: 'NCD Countdown 2030: Pathways to Achieving SDG Target 3.4',
    organization: 'The Lancet',
    type: 'report',
    url: 'https://www.thelancet.com',
    description: 'Comprehensive analysis of non-communicable disease trends and pathways to achieving global health targets.',
  },
  {
    id: 'nih-bmi',
    title: 'BMI Classification Guidelines',
    organization: 'National Institutes of Health',
    type: 'guideline',
    url: 'https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmicalc.htm',
    description: 'Evidence-based BMI classification system used for assessing weight status in adults.',
  },
]
