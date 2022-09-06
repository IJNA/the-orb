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
            NEXT: 'EXO',
        },
        EXO: {
            BOOK_NAME: 'Exodus',
            CHAPTER_COUNT: 41,
            NEXT: 'LEV',
        },
        LEV: {
            BOOK_NAME: 'Leviticus',
            CHAPTER_COUNT: 28,
            NEXT: 'NUM',
        },
        NUM: {
            BOOK_NAME: 'Numbers',
            CHAPTER_COUNT: 37,
            NEXT: 'DEU',
        },
        DEU: {
            BOOK_NAME: 'Deuteronomy',
            CHAPTER_COUNT: 35,
            NEXT: 'JOS' // figure out a way to detect last book of section and have next button go to next section instead of book
        },
        JOS: {
            BOOK_NAME: 'Joshua',
            CHAPTER_COUNT: 25,
            NEXT: 'JDG',
        },
        JDG: {
            BOOK_NAME: 'Judges',
            CHAPTER_COUNT: 22,
            NEXT: 'FSA',
        },
        FSA: {
            BOOK_NAME: '1 Samuel',
            CHAPTER_COUNT: 32,
            API_NAME: '1SA',
            NEXT: 'SSA',
        },
        SSA: {
            BOOK_NAME: '2 Samuel',
            CHAPTER_COUNT: 25,
            API_NAME: '2SA',
            NEXT: 'FKI',
        },
        FKI: {
            BOOK_NAME: '1 Kings',
            CHAPTER_COUNT: 23,
            API_NAME: '1KI',
            NEXT: 'SKI',
        },
        SKI: {
            BOOK_NAME: '2 Kings',
            CHAPTER_COUNT: 26,
            API_NAME: '2KI',
        },
        ISA: {
            BOOK_NAME: 'Isaiah',
            CHAPTER_COUNT: 67
        },
        EZK: {
            BOOK_NAME: 'Ezekiel',
            CHAPTER_COUNT: 49
        },
        HOS: {
            BOOK_NAME: 'Hosea',
            CHAPTER_COUNT: 15
        },
        JOL: {
            BOOK_NAME: 'Joel',
            CHAPTER_COUNT: 4
        },
        AMO: {
            BOOK_NAME: 'Amos',
            CHAPTER_COUNT: 10
        },
        OBA: {
            BOOK_NAME: 'Obadiah',
            CHAPTER_COUNT: 2
        },
        JON: {
            BOOK_NAME: 'Jonah',
            CHAPTER_COUNT: 5
        },
        MIC: {
            BOOK_NAME: 'Micah',
            CHAPTER_COUNT: 8
        },
        NAM: {
            BOOK_NAME: 'Nahum',
            CHAPTER_COUNT: 4
        },
        HAB: {
            BOOK_NAME: 'Habakkuk',
            CHAPTER_COUNT: 4
        },
        ZEP: {
            BOOK_NAME: 'Zephaniah',
            CHAPTER_COUNT: 4
        },
        HAG: {
            BOOK_NAME: 'Haggai',
            CHAPTER_COUNT: 3
        },
        ZEC: {
            BOOK_NAME: 'Zechariah',
            CHAPTER_COUNT: 15
        },
        MAL: {
            BOOK_NAME: 'Malachi',
            CHAPTER_COUNT: 5
        },
        PSA: {
            BOOK_NAME: 'Psalms',
            CHAPTER_COUNT: 151
        },
        PRO: {
            BOOK_NAME: 'Proverbs',
            CHAPTER_COUNT: 32
        },
        JOB: {
            BOOK_NAME: 'Job',
            CHAPTER_COUNT: 43
        },
        SNG: {
            BOOK_NAME: 'Song of Solomon',
            CHAPTER_COUNT: 9
        },
        RUT: {
            BOOK_NAME: 'Ruth',
            CHAPTER_COUNT: 5
        },
        LAM: {
            BOOK_NAME: 'Lamentations',
            CHAPTER_COUNT: 6
        },
        ECC: {
            BOOK_NAME: 'Ecclesiastes',
            CHAPTER_COUNT: 13
        },
        EST: {
            BOOK_NAME: 'Esther',
            CHAPTER_COUNT: 11
        },
        DAN: {
            BOOK_NAME: 'Daniel',
            CHAPTER_COUNT: 13
        },
        EZR: {
            BOOK_NAME: 'Ezra',
            CHAPTER_COUNT: 35
        },
        NEH: {
            BOOK_NAME: 'Nehemiah',
            CHAPTER_COUNT: 14
        },
        FCH: {
            BOOK_NAME: '1 Chronicles',
            CHAPTER_COUNT: 30,
            API_NAME: '1CH',
        },
        SCH: {
            BOOK_NAME: '2 Chronicles',
            CHAPTER_COUNT: 37,
            API_NAME: '2CH',
        },
        MAT: {
            BOOK_NAME: 'Matthew',
            CHAPTER_COUNT: 29
        },
        MRK: {
            BOOK_NAME: 'Mark',
            CHAPTER_COUNT: 17
        },
        JHN: {
            BOOK_NAME: 'John',
            CHAPTER_COUNT: 22
        },
        LUK: {
            BOOK_NAME: 'Luke',
            CHAPTER_COUNT: 25
        },
        ACT: {
            BOOK_NAME: 'Acts',
            CHAPTER_COUNT: 29
        },
        ROM: {
            BOOK_NAME: 'Romans',
            CHAPTER_COUNT: 17
        },
        FCO: {
            BOOK_NAME: '1 Corinthians',
            CHAPTER_COUNT: 17,
            API_NAME: '1CO',
        },
        SCO: {
            BOOK_NAME: '2 Corinthians',
            CHAPTER_COUNT: 14,
            API_NAME: '2CO',
        },
        EPH: {
            BOOK_NAME: 'Ephesians',
            CHAPTER_COUNT: 7
        },
        PHP: {
            BOOK_NAME: 'Philippians',
            CHAPTER_COUNT: 5
        },
        COL: {
            BOOK_NAME: 'Colossians',
            CHAPTER_COUNT: 5
        },
        FTH: {
            BOOK_NAME: '1 Thessalonians',
            CHAPTER_COUNT: 6,
            API_NAME: '1TH',
        },
        STH: {
            BOOK_NAME: '2 Thessalonians',
            CHAPTER_COUNT: 4,
            API_NAME: '2TH',
        },
        FTI: {
            BOOK_NAME: '1 Timothy',
            CHAPTER_COUNT: 7,
            API_NAME: '1TI',
        },
        STI: {
            BOOK_NAME: '2 Timothy',
            CHAPTER_COUNT: 5,
            API_NAME: '2TI',
        },
        TIT: {
            BOOK_NAME: 'Titus',
            CHAPTER_COUNT: 4
        },
        PHM: {
            BOOK_NAME: 'Philemon',
            CHAPTER_COUNT: 2
        },
        HEB: {
            BOOK_NAME: 'Hebrews',
            CHAPTER_COUNT: 14
        },
        JAS: {
            BOOK_NAME: 'James',
            CHAPTER_COUNT: 6
        },
        FPE: {
            BOOK_NAME: '1 Peter',
            CHAPTER_COUNT: 6,
            API_NAME: '1PE',
        },
        SPE: {
            BOOK_NAME: '2 Peter',
            CHAPTER_COUNT: 4,
            API_NAME: '2PE',
        },
        FJN: {
            BOOK_NAME: '1 John',
            CHAPTER_COUNT: 6,
            API_NAME: '1JN',
        },
        SJN: {
            BOOK_NAME: '2 John',
            CHAPTER_COUNT: 2,
            API_NAME: '2JN',
        },
        TJN: {
            BOOK_NAME: '3 John',
            CHAPTER_COUNT: 2,
            API_NAME: '3JN',
        },
        JUD: {
            BOOK_NAME: 'Jude',
            CHAPTER_COUNT: 2
        },
        REV: {
            BOOK_NAME: 'Revelation',
            CHAPTER_COUNT: 23
        },
    }
}