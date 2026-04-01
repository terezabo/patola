import { Question } from '@/lib/quizEngine';

export const pathologyQuestions: Question[] = [
  // Multiple Choice Questions
  {
    id: 'mc-001',
    topicId: 1,
    type: 'multiple-choice',
    difficulty: 'easy',
    points: 10,
    tags: ['buněčné poškození', 'základy'],
    question: 'Který z následujících mechanismů NENÍ hlavní příčinou buněčného poškození?',
    options: [
      { id: 'a', text: 'Deplece ATP', isCorrect: false },
      { id: 'b', text: 'Zvýšení intracelulárního kalcia', isCorrect: false },
      { id: 'c', text: 'Oxidační stres', isCorrect: false },
      { id: 'd', text: 'Zvýšená syntéza proteinů', isCorrect: true }
    ],
    explanation: 'Zvýšená syntéza proteinů je adaptivní mechanismus, ne příčina poškození. Hlavní mechanismy jsou: deplece ATP, ↑Ca2+, oxidační stres a poškození membrán.',
    mnemonicHint: 'ATOM: ATP deplece, Toxické O2 radikály, Membrány poškozené'
  },
  {
    id: 'mc-002',
    topicId: 2,
    type: 'multiple-choice',
    difficulty: 'medium',
    points: 15,
    tags: ['buněčná smrt', 'nekróza'],
    question: 'Které typy nekrózy správně odpovídají uvedeným orgánům/stavům?',
    options: [
      { id: 'a', text: 'Koagulační nekróza - mozek', isCorrect: false },
      { id: 'b', text: 'Likvefikační nekróza - infarkt myokardu', isCorrect: false },
      { id: 'c', text: 'Kaseózní nekróza - tuberkulóza', isCorrect: true },
      { id: 'd', text: 'Tuková nekróza - játra', isCorrect: false }
    ],
    explanation: 'Kaseózní (sýrovitá) nekróza je typická pro tuberkulózu. Mozek má likvefikační nekrózu, myokard koagulační, tuková nekróza je typická pro pankreas.',
    clinicalRelevance: 'Typ nekrózy pomáhá určit etiologii a ovlivňuje léčbu.'
  },

  // Clinical Case Questions
  {
    id: 'cc-001',
    topicId: 73,
    type: 'clinical-case',
    difficulty: 'hard',
    points: 25,
    tags: ['ICHS', 'infarkt', 'kardio'],
    patientPresentation: {
      age: 58,
      gender: 'M',
      chiefComplaint: 'Náhle vzniklá bolest na hrudi trvající 2 hodiny',
      history: 'Kuřák 40 cigaret/den, DM2, hypertenze, otec zemřel na infarkt v 55 letech',
      physicalExam: 'TK 90/60, P 110/min, dušný, opocený, poslechově chrůpky bazálně',
      labResults: [
        { test: 'Troponin I', value: '8.5 ng/ml', normal: '<0.04 ng/ml', isAbnormal: true },
        { test: 'CK-MB', value: '85 U/l', normal: '<25 U/l', isAbnormal: true },
        { test: 'D-dimery', value: '250 ng/ml', normal: '<500 ng/ml', isAbnormal: false }
      ],
      imaging: 'EKG: ST elevace ve V1-V4, Q vlny ve V1-V2'
    },
    question: 'Jaká je nejpravděpodobnější diagnóza a lokalizace?',
    options: [
      { id: 'a', diagnosis: 'STEMI přední stěny', isCorrect: true, reasoning: 'ST elevace V1-V4 + troponin + klinika' },
      { id: 'b', diagnosis: 'Plicní embolie', isCorrect: false, reasoning: 'D-dimery normální, EKG změny neodpovídají' },
      { id: 'c', diagnosis: 'Aortální disekce', isCorrect: false, reasoning: 'Chybí typická propagace bolesti' },
      { id: 'd', diagnosis: 'NSTEMI', isCorrect: false, reasoning: 'Přítomny ST elevace, ne deprese' }
    ],
    explanation: 'STEMI přední stěny - typické EKG změny V1-V4, elevace markerů, rizikové faktory.',
    clinicalRelevance: 'Urgentní PCI do 90 minut!'
  },

  // Image Identification
  {
    id: 'img-001',
    topicId: 33,
    type: 'image-identification',
    difficulty: 'medium',
    points: 20,
    tags: ['TBC', 'granulom', 'histologie'],
    imageUrl: '/images/histology/granuloma-tbc.jpg',
    imageType: 'histology',
    question: 'Identifikujte typ buněk označených šipkou v tomto granulomu:',
    hotspots: [
      { x: 150, y: 200, radius: 30, label: 'A', description: 'Centrální oblast' },
      { x: 250, y: 180, radius: 25, label: 'B', description: 'Obvodové buňky' }
    ],
    options: [
      { id: 'a', text: 'Langhansovy obrovské buňky', isCorrect: true },
      { id: 'b', text: 'Toutonovy obrovské buňky', isCorrect: false },
      { id: 'c', text: 'Reed-Sternbergovy buňky', isCorrect: false },
      { id: 'd', text: 'Osteoidní obrovské buňky', isCorrect: false }
    ],
    explanation: 'Langhansovy mnohojaderné obrovské buňky s periferně uspořádanými jádry jsou typické pro TBC granulomy.'
  },

  // Fill in the Blank
  {
    id: 'fb-001',
    topicId: 7,
    type: 'fill-blank',
    difficulty: 'easy',
    points: 15,
    tags: ['trombóza', 'Virchow'],
    text: 'Virchowova triáda trombózy zahrnuje: {{1}} endotelu, {{2}} krevního proudu a {{3}}.',
    blanks: [
      { id: '1', correctAnswers: ['poškození', 'léze'], hint: 'Změna cévní stěny' },
      { id: '2', correctAnswers: ['alterace', 'změna', 'porucha'], hint: 'Změna toku krve' },
      { id: '3', correctAnswers: ['hyperkoagulace', 'hyperkoagulační stav'], hint: 'Zvýšená srážlivost' }
    ],
    explanation: 'Virchowova triáda: poškození endotelu + alterace krevního proudu + hyperkoagulace',
    mnemonicHint: 'PAH: Poškození, Alterace, Hyperkoagulace'
  },

  // Matching Question
  {
    id: 'match-001',
    topicId: 26,
    type: 'matching',
    difficulty: 'easy',
    points: 10,
    tags: ['zánět', 'znaky'],
    instruction: 'Spojte klasické znaky zánětu s jejich latinskými názvy:',
    leftColumn: [
      { id: 'l1', text: 'Zarudnutí' },
      { id: 'l2', text: 'Otok' },
      { id: 'l3', text: 'Teplo' },
      { id: 'l4', text: 'Bolest' },
      { id: 'l5', text: 'Porucha funkce' }
    ],
    rightColumn: [
      { id: 'r1', text: 'Rubor', matchesId: 'l1' },
      { id: 'r2', text: 'Tumor', matchesId: 'l2' },
      { id: 'r3', text: 'Calor', matchesId: 'l3' },
      { id: 'r4', text: 'Dolor', matchesId: 'l4' },
      { id: 'r5', text: 'Functio laesa', matchesId: 'l5' }
    ],
    explanation: '5 klasických znaků zánětu podle Celsa a Galena',
    mnemonicHint: 'RuTuCaDoFu - Rubor, Tumor, Calor, Dolor, Functio laesa'
  },

  // Sequence Question
  {
    id: 'seq-001',
    topicId: 39,
    type: 'sequence',
    difficulty: 'medium',
    points: 15,
    tags: ['hojení', 'rána'],
    instruction: 'Seřaďte fáze hojení rány od nejranější po nejpozdější:',
    items: [
      { id: 's1', text: 'Hemostáza', correctOrder: 1 },
      { id: 's2', text: 'Zánětlivá fáze', correctOrder: 2 },
      { id: 's3', text: 'Proliferační fáze', correctOrder: 3 },
      { id: 's4', text: 'Remodelační fáze', correctOrder: 4 }
    ],
    explanation: 'Hojení probíhá v pořadí: 1) Hemostáza (minuty), 2) Zánět (dny), 3) Proliferace (týdny), 4) Remodelace (měsíce)',
    clinicalRelevance: 'Porucha kterékoliv fáze vede k patologickému hojení (keloid, dehiscence)'
  },

  // Differential Diagnosis
  {
    id: 'dd-001',
    topicId: 120,
    type: 'differential-diagnosis',
    difficulty: 'hard',
    points: 30,
    tags: ['žaludek', 'gastritida', 'diferenciál'],
    symptoms: [
      'Epigastrická bolest',
      'Nauzea',
      'Časná sytost',
      'Hmotnostní úbytek 5kg/3 měsíce'
    ],
    labFindings: [
      'Anémie (Hb 95 g/l)',
      'Pozitivní H. pylori',
      'Elevace CA 19-9'
    ],
    imagingFindings: [
      'Gastroskopie: ulcerace v antru, rigidní stěna',
      'CT: ztluštění stěny žaludku, lymfadenopatie'
    ],
    correctDiagnosis: 'Karcinom žaludku',
    differentials: [
      {
        diagnosis: 'Karcinom žaludku',
        supportingFeatures: ['Hmotnostní úbytek', 'Anémie', 'Rigidní stěna', 'Lymfadenopatie'],
        againstFeatures: [],
        isCorrect: true
      },
      {
        diagnosis: 'Peptický vřed',
        supportingFeatures: ['Epigastrická bolest', 'H. pylori+', 'Ulcerace'],
        againstFeatures: ['Hmotnostní úbytek', 'Rigidní stěna'],
        isCorrect: false
      },
      {
        diagnosis: 'Chronická gastritida',
        supportingFeatures: ['H. pylori+', 'Epigastrická bolest'],
        againstFeatures: ['Hmotnostní úbytek', 'Lymfadenopatie', 'CA 19-9'],
        isCorrect: false
      },
      {
        diagnosis: 'MALT lymfom',
        supportingFeatures: ['H. pylori+', 'Ztluštění stěny'],
        againstFeatures: ['CA 19-9 elevace'],
        isCorrect: false
      }
    ],
    explanation: 'Alarmující příznaky (úbytek hmotnosti, anémie) + endoskopický nález + lymfadenopatie svědčí pro malignitu',
    clinicalRelevance: 'Nutná biopsie a staging, zvážit neoadjuvantní chemoterapii'
  }
];