module.exports = {
    SECTIONS: {
        THE_LAW: {
            GEN: {
                CHAPTER_COUNT: 51,
                NEXT: 'EXO',
            },
            EXO: {
                CHAPTER_COUNT: 41,
                NEXT: 'LEV',
            },
            LEV: {
                CHAPTER_COUNT: 28,
                NEXT: 'NUM',
            },
            NUM: {
                CHAPTER_COUNT: 37,
                NEXT: 'DEU',
            },
            DEU: {
                CHAPTER_COUNT: 35,
                NEXT: 'JOS' // figure out a way to detect last book of section and have next button go to next section instead of book
            },
        },
        THE_PROPHETS: {
            JOS: {
                CHAPTER_COUNT: 25,
                NEXT: 'JDG',
            },
            JDG: {
                CHAPTER_COUNT: 22,
                NEXT: 'FSA',
            },
            FSA: {
                CHAPTER_COUNT: 32,
                NEXT: 'SSA',
            },
            SECOND_SAMUEL: {
                CHAPTER_COUNT: 25,
                NEXT: 'FKI',
            },
            FIRST_KINGS: {
                CHAPTER_COUNT: 23,
                NEXT: 'SKI',
            },
            SECOND_KINGS: {
                CHAPTER_COUNT: 26
            },
            ISAIAH: {
                CHAPTER_COUNT: 67
            },
            EZEKIEL: {
                CHAPTER_COUNT: 49
            },
            HOSEA: {
                CHAPTER_COUNT: 15
            },
            JOEL: {
                CHAPTER_COUNT: 4
            },
            AMOS: {
                CHAPTER_COUNT: 10
            },
            OBADIAH: {
                CHAPTER_COUNT: 2
            },
            JONAH: {
                CHAPTER_COUNT: 5
            },
            MICAH: {
                CHAPTER_COUNT: 8
            },
            NAHUM: {
                CHAPTER_COUNT: 4
            },
            HABAKKUK: {
                CHAPTER_COUNT: 4
            },
            ZEPHANIAH: {
                CHAPTER_COUNT: 4
            },
            HAGGAI: {
                CHAPTER_COUNT: 3
            },
            ZECHARIAH: {
                CHAPTER_COUNT: 15
            },
            MALACHI: {
                CHAPTER_COUNT: 5
            },
        },
        THE_WRITING: {
            BOOKS: {
                PSALMS: {
                    CHAPTER_COUNT: 151
                },
                PROVERBS: {
                    CHAPTER_COUNT: 32
                },
                JOB: {
                    CHAPTER_COUNT: 43
                },
                SONG_OF_SOLOMON: {
                    CHAPTER_COUNT: 9
                },
                RUTH: {
                    CHAPTER_COUNT: 5
                },
                LAMENTATIONS: {
                    CHAPTER_COUNT: 6
                },
                ECCLESIASTES: {
                    CHAPTER_COUNT: 13
                },
                ESTHER: {
                    CHAPTER_COUNT: 11
                },
                DANIEL: {
                    CHAPTER_COUNT: 13
                },
                EZRA: {
                    CHAPTER_COUNT: 35
                },
                NEHEMIAH: {
                    CHAPTER_COUNT: 14
                },
                FIRST_CHRONICLES: {
                    CHAPTER_COUNT: 30
                },
                SECOND_CHRONICLES: {
                    CHAPTER_COUNT: 37
                },
            },
        },
        THE_GOSPELS_AND_ACTS: {
            BOOKS: {
                MATTHEW: {
                    CHAPTER_COUNT: 29
                },
                MARK: {
                    CHAPTER_COUNT: 17
                },
                JOHN: {
                    CHAPTER_COUNT: 22
                },
                LUKE: {
                    CHAPTER_COUNT: 25
                },
                ACTS: {
                    CHAPTER_COUNT: 29
                },
            },
        },
        THE_LETTERS: {
            BOOKS: {
                ROMANS: {
                    CHAPTER_COUNT: 17
                },
                FIRST_CORINTHIANS: {
                    CHAPTER_COUNT: 17
                },
                SECOND_CORINTHIANS: {
                    CHAPTER_COUNT: 14
                },
                EPHESIANS: {
                    CHAPTER_COUNT: 7
                },
                PHILIPPIANS: {
                    CHAPTER_COUNT: 5
                },
                COLOSSIANS: {
                    CHAPTER_COUNT: 5
                },
                FIRST_THESSALONIANS: {
                    CHAPTER_COUNT: 6
                },
                SECOND_THESSALONIANS: {
                    CHAPTER_COUNT: 4
                },
                FIRST_TIMOTHY: {
                    CHAPTER_COUNT: 7
                },
                SECOND_TIMOTHY: {
                    CHAPTER_COUNT: 5
                },
                TITUS: {
                    CHAPTER_COUNT: 4
                },
                PHILEMON: {
                    CHAPTER_COUNT: 2
                },
                HEBREWS: {
                    CHAPTER_COUNT: 14
                },
                JAMES: {
                    CHAPTER_COUNT: 6
                },
                FIRST_PETER: {
                    CHAPTER_COUNT: 6
                },
                SECOND_PETER: {
                    CHAPTER_COUNT: 4
                },
                FIRST_JOHN: {
                    CHAPTER_COUNT: 6
                },
                SECOND_JOHN: {
                    CHAPTER_COUNT: 2
                },
                THIRD_JOHN: {
                    CHAPTER_COUNT: 2
                },
                JUDE: {
                    CHAPTER_COUNT: 2
                },
            },
        },
        THE_REVELATION: {
            BOOKS: {
                REVELATION: {
                    CHAPTER_COUNT: 23
                },
            },
        },
    },
    
    BOOKS: {
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
            NEXT:'Obadiah',
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
            NEXT:'Esther',
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
            NEXT_API_NAME:'ROM',
            NEXT: 'Romans',
        },
        ROM: {
            BOOK_NAME: 'Romans',
            CHAPTER_COUNT: 17,
            NEXT_API_NAME:'1CO',
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
            NEXT_API_NAME:'REV',
            NEXT: 'Revelation',
        },
        REV: {
            BOOK_NAME: 'Revelation',
            CHAPTER_COUNT: 23,
            NEXT_API_NAME: 'GEN',
            NEXT: 'Genesis',
        },
    }
}