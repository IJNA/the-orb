const TITLES = {
  GEN: {
    BOOK_NAME: "Genesis",
    API_NAME: "GEN",
  },
  EXO: {
    BOOK_NAME: "Exodus",
    API_NAME: "EXO",
  },
  LEV: {
    BOOK_NAME: "Leviticus",
    API_NAME: "LEV",
  },
  NUM: {
    BOOK_NAME: "Numbers",
    API_NAME: "NUM",
  },
  DEU: {
    BOOK_NAME: "Deuteronomy",
    API_NAME: "DEU",
  },
  JOS: {
    BOOK_NAME: "Joshua",
    API_NAME: "JOS",
  },
  JDG: {
    BOOK_NAME: "Judges",
    API_NAME: "JDG",
  },
  FSA: {
    BOOK_NAME: "1 Samuel",
    API_NAME: "1SA",
  },
  SSA: {
    BOOK_NAME: "2 Samuel",
    API_NAME: "1SA",
  },
  FKI: {
    BOOK_NAME: "1 Kings",
    API_NAME: "1KI",
  },
  SKI: {
    BOOK_NAME: "2 Kings",
    API_NAME: "2KI",
  },
  ISA: {
    BOOK_NAME: "Isaiah",
    API_NAME: "ISA",
  },
  JER: {
    BOOK_NAME: "Jeremiah",
    API_NAME: "JER",
  },
  EZK: {
    BOOK_NAME: "Ezekiel",
    API_NAME: "EZK",
  },
  HOS: {
    BOOK_NAME: "Hosea",
    API_NAME: "HOS",
  },
  JOL: {
    BOOK_NAME: "Joel",
    API_NAME: "JOL",
  },
  AMO: {
    BOOK_NAME: "Amos",
    API_NAME: "AMO",
  },
  OBA: {
    BOOK_NAME: "Obadiah",
    API_NAME: "OBA",
  },
  JON: {
    BOOK_NAME: "Jonah",
    API_NAME: "JON",
  },
  MIC: {
    BOOK_NAME: "Micah",
    API_NAME: "MIC",
  },
  NAM: {
    BOOK_NAME: "Nahum",
    API_NAME: "NAM",
  },
  HAB: {
    BOOK_NAME: "Habakkuk",
    API_NAME: "HAB",
  },
  ZEP: {
    BOOK_NAME: "Zephaniah",
    API_NAME: "ZEP",
  },
  HAG: {
    BOOK_NAME: "Haggai",
    API_NAME: "HAG",
  },
  ZEC: {
    BOOK_NAME: "Zechariah",
    API_NAME: "ZEC",
  },
  MAL: {
    BOOK_NAME: "Malachi",
    API_NAME: "MAL",
  },
  PSA: {
    BOOK_NAME: "Psalms",
    API_NAME: "PSA",
  },
  PRO: {
    BOOK_NAME: "Proverbs",
    API_NAME: "PRO",
  },
  JOB: {
    BOOK_NAME: "Job",
    API_NAME: "JOB",
  },
  SNG: {
    BOOK_NAME: "Song of Solomon",
    API_NAME: "SNG",
  },
  RUT: {
    BOOK_NAME: "Ruth",
    API_NAME: "RUT",
  },
  LAM: {
    BOOK_NAME: "Lamentations",
    API_NAME: "LAM",
  },
  ECC: {
    BOOK_NAME: "Ecclesiastes",
    API_NAME: "ECC",
  },
  EST: {
    BOOK_NAME: "Esther",
    API_NAME: "EST",
  },
  DAN: {
    BOOK_NAME: "Daniel",
    API_NAME: "DAN",
  },
  EZR: {
    BOOK_NAME: "Ezra",
    API_NAME: "EZR",
  },
  NEH: {
    BOOK_NAME: "Nehemiah",
    API_NAME: "NEH",
  },
  FCH: {
    BOOK_NAME: "1 Chronicles",
    API_NAME: "1CH",
  },
  SCH: {
    BOOK_NAME: "2 Chronicles",
    API_NAME: "2CH",
  },
  MAT: {
    BOOK_NAME: "Matthew",
    API_NAME: "MAT",
  },
  MRK: {
    BOOK_NAME: "Mark",
    API_NAME: "MRK",
  },
  JHN: {
    BOOK_NAME: "John",
    API_NAME: "JHN",
  },
  LUK: {
    BOOK_NAME: "Luke",
    API_NAME: "LUK",
  },
  ACT: {
    BOOK_NAME: "Acts",
    API_NAME: "ACT",
  },
  ROM: {
    BOOK_NAME: "Romans",
    API_NAME: "ROM",
  },
  FCO: {
    BOOK_NAME: '1 Corinthians',
    API_NAME: '1CO',
  },
  SCO: {
    BOOK_NAME: '2 Corinthians',
    API_NAME: '2CO',
  },
  GAL: {
    BOOK_NAME: 'Galatians',
    API_NAME: 'GAL',
  },
  EPH: {
    BOOK_NAME: 'Ephesians', 
    API_NAME: 'EPH',
  },
  PHP: {
    BOOK_NAME: 'Philippians',
    API_NAME: 'PHP',
  },
  COL: {
    BOOK_NAME: 'Colossians',
    API_NAME: 'COL',
  },
  FTH: {
    BOOK_NAME: '1 Thessalonians',
    API_NAME: '1TH',
},
STH: {
    BOOK_NAME: '2 Thessalonians',
    API_NAME: '2TH',
},
FTI: {
    BOOK_NAME: '1 Timothy',
    API_NAME: '1TI',
},
STI: {
    BOOK_NAME: '2 Timothy',
    API_NAME: '2TI',
},
TIT: {
    BOOK_NAME: 'Titus',
    API_NAME: 'TIT',
},
PHM: {
    BOOK_NAME: 'Philemon',
    API_NAME: 'PHM',
},
HEB: {
    BOOK_NAME: 'Hebrews',
    API_NAME: 'HEB',
},
JAS: {
    BOOK_NAME: 'James',
    API_NAME: 'JAS',
},
FPE: {
    BOOK_NAME: '1 Peter', 
    API_NAME: '1PE',
},
SPE: {
    
    BOOK_NAME: '2 Peter',
    API_NAME: '2PE',
},
FJN: {
    BOOK_NAME: '1 John',
    API_NAME: '1JN',
},
SJN: {
    BOOK_NAME: '2 John',
    API_NAME: '2JN',
},
TJN: {
    BOOK_NAME: '3 John',
    API_NAME: '3JN',
},
JUD: {
    BOOK_NAME: 'Jude',
    API_NAME: 'JUD',
},
REV: {
    BOOK_NAME: 'Revelation',
    API_NAME: 'REV',
},
};
export default TITLES;
