const BOOKS = {
    GEN: {
        BOOK_NAME: 'Genesis',
        CHAPTER_COUNT: 51,
        NEXT_API_NAME: 'EXO',
        NEXT: 'Exodus',
    },
    EXO: {
        BOOK_NAME: 'Exodus',
        CHAPTER_COUNT: 41,
        NEXT_API_NAME: 'LEV',
        NEXT: 'Leviticus',
    },
    LEV: {
        BOOK_NAME: 'Leviticus',
        CHAPTER_COUNT: 28,
        NEXT_API_NAME: 'NUM',
        NEXT: 'Numbers',

    },
    NUM: {
        BOOK_NAME: 'Numbers',
        CHAPTER_COUNT: 37,
        NEXT_API_NAME: 'DEU',
        NEXT: 'Deuteronomy',

    },
    DEU: {
        BOOK_NAME: 'Deuteronomy',
        CHAPTER_COUNT: 35,
        NEXT_API_NAME: 'JOS', // figure out a way to detect last book of section and have next button go to next section instead of book
        NEXT: 'Joshua',
    },
    JOS: {
        BOOK_NAME: 'Joshua',
        CHAPTER_COUNT: 25,
        NEXT_API_NAME: 'JDG',
        NEXT: 'Judges',
    },
    JDG: {
        BOOK_NAME: 'Judges',
        CHAPTER_COUNT: 22,
        NEXT_API_NAME: '1SA',
        NEXT: '1 Samuel',

    },
    FSA: {
        BOOK_NAME: '1 Samuel',
        CHAPTER_COUNT: 32,
        API_NAME: '1SA',
        NEXT_API_NAME: '2SA',
        NEXT: '2 Samuel',
    },
    SSA: {
        BOOK_NAME: '2 Samuel',
        CHAPTER_COUNT: 25,
        API_NAME: '2SA',
        NEXT_API_NAME: '1KI',
        NEXT: '1 Kings',
    },
    FKI: {
        BOOK_NAME: '1 Kings',
        CHAPTER_COUNT: 23,
        API_NAME: '1KI',
        NEXT_API_NAME: '2KI',
        NEXT: '2 Kings',
    },
    SKI: {
        BOOK_NAME: '2 Kings',
        CHAPTER_COUNT: 26,
        API_NAME: '2KI',
        NEXT_API_NAME: 'ISA',
        NEXT: 'Isaiah',
    },
    ISA: {
        BOOK_NAME: 'Isaiah',
        CHAPTER_COUNT: 67,
        NEXT_API_NAME: 'EZK',
        NEXT: 'Ezekiel',
    },
    JER: {
        BOOK_NAME: 'Jeremiah',
        CHAPTER_COUNT: 53,
        NEXT_API_NAME: 'EZK',
        NEXT: 'Ezekiel',
    },
    EZK: {
        BOOK_NAME: 'Ezekiel',
        CHAPTER_COUNT: 49,
        NEXT_API_NAME: 'HOS',
        NEXT: 'Hosea',
    },
    HOS: {
        BOOK_NAME: 'Hosea',
        CHAPTER_COUNT: 15,
        NEXT_API_NAME: 'JOL',
        NEXT: 'Joel',
    },
    JOL: {
        BOOK_NAME: 'Joel',
        CHAPTER_COUNT: 4,
        NEXT_API_NAME: 'AMO',
        NEXT: 'Amos',
    },
    AMO: {
        BOOK_NAME: 'Amos',
        CHAPTER_COUNT: 10,
        NEXT_API_NAME: 'OBA',
        NEXT: 'Obadiah',
    },
    OBA: {
        BOOK_NAME: 'Obadiah',
        CHAPTER_COUNT: 2,
        NEXT_API_NAME: 'JON',
        NEXT: 'Jonah',
    },
    JON: {
        BOOK_NAME: 'Jonah',
        CHAPTER_COUNT: 5,
        NEXT_API_NAME: 'MIC',
        NEXT: 'Micah'
    },
    MIC: {
        BOOK_NAME: 'Micah',
        CHAPTER_COUNT: 8,
        NEXT_API_NAME: 'NAM',
        NEXT: 'Nahum',
    },
    NAM: {
        BOOK_NAME: 'Nahum',
        CHAPTER_COUNT: 4,
        NEXT_API_NAME: 'HAB',
        NEXT: 'Habakkuk',
    },
    HAB: {
        BOOK_NAME: 'Habakkuk',
        CHAPTER_COUNT: 4,
        NEXT_API_NAME: 'ZEP',
        NEXT: 'Zephaniah'
    },
    ZEP: {
        BOOK_NAME: 'Zephaniah',
        CHAPTER_COUNT: 4,
        NEXT_API_NAME: 'HAG',
        NEXT: 'Haggai',
    },
    HAG: {
        BOOK_NAME: 'Haggai',
        CHAPTER_COUNT: 3,
        NEXT_API_NAME: 'ZEC',
        NEXT: 'Zechariah'
    },
    ZEC: {
        BOOK_NAME: 'Zechariah',
        CHAPTER_COUNT: 15,
        NEXT_API_NAME: 'MAL',
        NEXT: 'Malachi',
    },
    MAL: {
        BOOK_NAME: 'Malachi',
        CHAPTER_COUNT: 5,
        NEXT_API_NAME: 'PSA',
        NEXT: 'Psalms',
    },
    PSA: {
        BOOK_NAME: 'Psalms',
        CHAPTER_COUNT: 151,
        NEXT_API_NAME: 'PRO',
        NEXT: 'Proverbs',
    },
    PRO: {
        BOOK_NAME: 'Proverbs',
        CHAPTER_COUNT: 32,
        NEXT_API_NAME: 'JOB',
        NEXT: 'Job',
    },
    JOB: {
        BOOK_NAME: 'Job',
        CHAPTER_COUNT: 43,
        NEXT_API_NAME: 'SNG',
        NEXT: 'Song of Solomon',
    },
    SNG: {
        BOOK_NAME: 'Song of Solomon',
        CHAPTER_COUNT: 9,
        NEXT_API_NAME: 'RUT',
        NEXT: 'Ruth',
    },
    RUT: {
        BOOK_NAME: 'Ruth',
        CHAPTER_COUNT: 5,
        NEXT_API_NAME: 'LAM',
        NEXT: 'Lamentations'
    },
    LAM: {
        BOOK_NAME: 'Lamentations',
        CHAPTER_COUNT: 6,
        NEXT_API_NAME: 'ECC',
        NEXT: 'Ecclesiastes',
    },
    ECC: {
        BOOK_NAME: 'Ecclesiastes',
        CHAPTER_COUNT: 13,
        NEXT_API_NAME: 'EST',
        NEXT: 'Esther',
    },
    EST: {
        BOOK_NAME: 'Esther',
        CHAPTER_COUNT: 11,
        NEXT_API_NAME: 'DAN',
        NEXT: 'Daniel',
    },
    DAN: {
        BOOK_NAME: 'Daniel',
        CHAPTER_COUNT: 13,
        NEXT_API_NAME: 'EZR',
        NEXT: 'Ezra',
    },
    EZR: {
        BOOK_NAME: 'Ezra',
        CHAPTER_COUNT: 35,
        NEXT_API_NAME: 'NEH',
        NEXT: 'Nehemiah',
    },
    NEH: {
        BOOK_NAME: 'Nehemiah',
        CHAPTER_COUNT: 14,
        NEXT_API_NAME: '1CH',
        NEXT: '1 Chronicles',
    },
    FCH: {
        BOOK_NAME: '1 Chronicles',
        CHAPTER_COUNT: 30,
        API_NAME: '1CH',
        NEXT_API_NAME: '2CH',
        NEXT: '2 Chronicles',
    },
    SCH: {
        BOOK_NAME: '2 Chronicles',
        CHAPTER_COUNT: 37,
        API_NAME: '2CH',
        NEXT_API_NAME: 'MAT',
        NEXT: 'Matthew',
    },
    MAT: {
        BOOK_NAME: 'Matthew',
        CHAPTER_COUNT: 29,
        NEXT_API_NAME: 'MRK',
        NEXT: 'Mark',
    },
    MRK: {
        BOOK_NAME: 'Mark',
        CHAPTER_COUNT: 17,
        NEXT_API_NAME: 'JHN',
        NEXT: 'John',
    },
    JHN: {
        BOOK_NAME: 'John',
        CHAPTER_COUNT: 22,
        NEXT_API_NAME: 'LUK',
        NEXT: 'Luke',
    },
    LUK: {
        BOOK_NAME: 'Luke',
        CHAPTER_COUNT: 25,
        NEXT_API_NAME: 'ACT',
        NEXT: 'Acts',
    },
    ACT: {
        BOOK_NAME: 'Acts',
        CHAPTER_COUNT: 29,
        NEXT_API_NAME: 'ROM',
        NEXT: 'Romans',
    },
    ROM: {
        BOOK_NAME: 'Romans',
        CHAPTER_COUNT: 17,
        NEXT_API_NAME: '1CO',
        NEXT: '1 Corinthians',
    },
    FCO: {
        BOOK_NAME: '1 Corinthians',
        CHAPTER_COUNT: 17,
        API_NAME: '1CO',
        NEXT_API_NAME: '2CO',
        NEXT: '2 Corinthians',
    },
    SCO: {
        BOOK_NAME: '2 Corinthians',
        CHAPTER_COUNT: 14,
        API_NAME: '2CO',
        NEXT_API_NAME: 'EPH',
        NEXT: 'Ephesians',
    },
    GAL: {
        BOOK_NAME: 'Galatians',
        CHAPTER_COUNT: 7,
        NEXT_API_NAME: 'EPH',
        NEXT: 'Ephesians',
    },
    EPH: {
        BOOK_NAME: 'Ephesians',
        CHAPTER_COUNT: 7,
        NEXT_API_NAME: 'PHP',
        NEXT: 'Philippians',
    },
    PHP: {
        BOOK_NAME: 'Philippians',
        CHAPTER_COUNT: 5,
        NEXT_API_NAME: 'COL',
        NEXT: 'Colossians'
    },
    COL: {
        BOOK_NAME: 'Colossians',
        CHAPTER_COUNT: 5,
        NEXT_API_NAME: '1TH',
        NEXT: '1 Thessalonians',
    },
    FTH: {
        BOOK_NAME: '1 Thessalonians',
        CHAPTER_COUNT: 6,
        API_NAME: '1TH',
        NEXT_API_NAME: '2TH',
        NEXT: '2 Thessalonians',
    },
    STH: {
        BOOK_NAME: '2 Thessalonians',
        CHAPTER_COUNT: 4,
        API_NAME: '2TH',
        NEXT_API_NAME: '1TI',
        NEXT: '1 Timothy',
    },
    FTI: {
        BOOK_NAME: '1 Timothy',
        CHAPTER_COUNT: 7,
        API_NAME: '1TI',
        NEXT_API_NAME: '2TI',
        NEXT: '2 Timothy',
    },
    STI: {
        BOOK_NAME: '2 Timothy',
        CHAPTER_COUNT: 5,
        API_NAME: '2TI',
        NEXT_API_NAME: 'TIT',
        NEXT: 'Titus',
    },
    TIT: {
        BOOK_NAME: 'Titus',
        CHAPTER_COUNT: 4,
        NEXT_API_NAME: 'PHM',
        NEXT: 'Philemon',
    },
    PHM: {
        BOOK_NAME: 'Philemon',
        CHAPTER_COUNT: 2,
        NEXT_API_NAME: 'HEB',
        NEXT: 'Hebrews',
    },
    HEB: {
        BOOK_NAME: 'Hebrews',
        CHAPTER_COUNT: 14,
        NEXT_API_NAME: 'JAS',
        NEXT: 'James',
    },
    JAS: {
        BOOK_NAME: 'James',
        CHAPTER_COUNT: 6,
        NEXT_API_NAME: '1PE',
        NEXT: '1 Peter',
    },
    FPE: {
        BOOK_NAME: '1 Peter',
        CHAPTER_COUNT: 6,
        API_NAME: '1PE',
        NEXT_API_NAME: '2PE',
        NEXT: '2 Peter'
    },
    SPE: {
        BOOK_NAME: '2 Peter',
        CHAPTER_COUNT: 4,
        API_NAME: '2PE',
        NEXT_API_NAME: '1JN',
        NEXT: '1 John',
    },
    FJN: {
        BOOK_NAME: '1 John',
        CHAPTER_COUNT: 6,
        API_NAME: '1JN',
        NEXT_API_NAME: '2JN',
        NEXT: '2 John',
    },
    SJN: {
        BOOK_NAME: '2 John',
        CHAPTER_COUNT: 2,
        API_NAME: '2JN',
        NEXT_API_NAME: '3JN',
        NEXT: '3 John',
    },
    TJN: {
        BOOK_NAME: '3 John',
        CHAPTER_COUNT: 2,
        API_NAME: '3JN',
        NEXT_API_NAME: 'JUD',
        NEXT: 'Jude',
    },
    JUD: {
        BOOK_NAME: 'Jude',
        CHAPTER_COUNT: 2,
        NEXT_API_NAME: 'REV',
        NEXT: 'Revelation',
    },
    REV: {
        BOOK_NAME: 'Revelation',
        CHAPTER_COUNT: 23,
        NEXT_API_NAME: 'GEN',
        NEXT: 'Genesis',
    },
}
module.exports.setBookInfo = (book) => {
    let chapters = 0;
    let bookName = '';
    let nextBook = '';
    let nextApiName = '';
    switch (book) {
        case '1SA':
            chapters = BOOKS.FSA.CHAPTER_COUNT;
            bookName = BOOKS.FSA.BOOK_NAME;
            nextBook = BOOKS.FSA.NEXT;
            nextApiName = BOOKS.FSA.NEXT_API_NAME;
            break;
        case '2SA':
            chapters = BOOKS.SSA.CHAPTER_COUNT;
            bookName = BOOKS.SSA.BOOK_NAME;
            nextBook = BOOKS.SSA.NEXT;
            nextApiName = BOOKS.SSA.NEXT_API_NAME;
            break;
        case '1KI':
            chapters = BOOKS.FKI.CHAPTER_COUNT;
            bookName = BOOKS.FKI.BOOK_NAME;
            nextBook = BOOKS.FKI.NEXT;
            nextApiName = BOOKS.FKI.NEXT_API_NAME;
            break;
        case '2KI':
            chapters = BOOKS.SKI.CHAPTER_COUNT;
            bookName = BOOKS.SKI.BOOK_NAME;
            nextBook = BOOKS.SKI.NEXT;
            nextApiName = BOOKS.SKI.NEXT_API_NAME;
            break;
        case '1CH':
            chapters = BOOKS.FCH.CHAPTER_COUNT;
            bookName = BOOKS.FCH.BOOK_NAME;
            nextBook = BOOKS.FCH.NEXT;
            nextApiName = BOOKS.FCH.NEXT_API_NAME;
            break;
        case '2CH':
            chapters = BOOKS.SCH.CHAPTER_COUNT;
            bookName = BOOKS.SCH.BOOK_NAME;
            nextBook = BOOKS.SCH.NEXT;
            nextApiName = BOOKS.SCH.NEXT_API_NAME;
            break;
        case '1CO':
            chapters = BOOKS.FCO.CHAPTER_COUNT;
            bookName = BOOKS.FCO.BOOK_NAME;
            nextBook = BOOKS.FCO.NEXT;
            nextApiName = BOOKS.FCO.NEXT_API_NAME;
            break;
        case '2CO':
            chapters = BOOKS.SCO.CHAPTER_COUNT;
            bookName = BOOKS.SCO.BOOK_NAME;
            nextBook = BOOKS.SCO.NEXT;
            nextApiName = BOOKS.SCO.NEXT_API_NAME;
            break;
        case '1TH':
            chapters = BOOKS.FTH.CHAPTER_COUNT;
            bookName = BOOKS.FTH.BOOK_NAME;
            nextBook = BOOKS.FTH.NEXT;
            nextApiName = BOOKS.FTH.NEXT_API_NAME;
            break;
        case '2TH':
            chapters = BOOKS.STH.CHAPTER_COUNT;
            bookName = BOOKS.STH.BOOK_NAME;
            nextBook = BOOKS.STH.NEXT;
            nextApiName = BOOKS.STH.NEXT_API_NAME;
            break;
        case '1TI':
            chapters = BOOKS.FTI.CHAPTER_COUNT;
            bookName = BOOKS.FTI.BOOK_NAME;
            nextBook = BOOKS.FTI.NEXT;
            nextApiName = BOOKS.FTI.NEXT_API_NAME;
            break;
        case '2TI':
            chapters = BOOKS.STI.CHAPTER_COUNT;
            bookName = BOOKS.STI.BOOK_NAME;
            nextBook = BOOKS.STI.NEXT;
            nextApiName = BOOKS.STI.NEXT_API_NAME;
            break;
        case '1PE':
            chapters = BOOKS.FPE.CHAPTER_COUNT;
            bookName = BOOKS.FPE.BOOK_NAME;
            nextBook = BOOKS.FPE.NEXT;
            nextApiName = BOOKS.FPE.NEXT_API_NAME;
            break;
        case '2PE':
            chapters = BOOKS.SPE.CHAPTER_COUNT;
            bookName = BOOKS.SPE.BOOK_NAME;
            nextBook = BOOKS.SPE.NEXT;
            nextApiName = BOOKS.SPE.NEXT_API_NAME;
            break;
        case '1JN':
            chapters = BOOKS.FJN.CHAPTER_COUNT;
            bookName = BOOKS.FJN.BOOK_NAME;
            nextBook = BOOKS.FJN.NEXT;
            nextApiName = BOOKS.FJN.NEXT_API_NAME;
            break;
        case '2JN':
            chapters = BOOKS.SJN.CHAPTER_COUNT;
            bookName = BOOKS.SJN.BOOK_NAME;
            nextBook = BOOKS.SJN.NEXT;
            nextApiName = BOOKS.SJN.NEXT_API_NAME;
            break;
        case '3JN':
            chapters = BOOKS.TJN.CHAPTER_COUNT;
            bookName = BOOKS.TJN.BOOK_NAME;
            nextBook = BOOKS.TJN.NEXT;
            nextApiName = BOOKS.TJN.NEXT_API_NAME;
            break;
        default:
            chapters = BOOKS[book].CHAPTER_COUNT;
            bookName = BOOKS[book].BOOK_NAME;
            nextBook = BOOKS[book].NEXT;
            nextApiName = BOOKS[book].NEXT_API_NAME;
            break;
    }
    return { chapters, bookName, nextBook, nextApiName };
}