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
        THE_WRITINGS: {
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
            API_NAME: '1SA',
            NEXT: 'SSA',
        },
        SSA: {
            CHAPTER_COUNT: 25,
            API_NAME: '2SA',
            NEXT: 'FKI',
        },
        FKI: {
            CHAPTER_COUNT: 23,
            API_NAME: '1KI',
            NEXT: 'SKI',
        },
        SKI: {
            CHAPTER_COUNT: 26,
            API_NAME: '2KI',
        },
        ISA: {
            CHAPTER_COUNT: 67
        },
        EZK: {
            CHAPTER_COUNT: 49
        },
        HOS: {
            CHAPTER_COUNT: 15
        },
        JOL: {
            CHAPTER_COUNT: 4
        },
        AMO: {
            CHAPTER_COUNT: 10
        },
        OBA: {
            CHAPTER_COUNT: 2
        },
        JON: {
            CHAPTER_COUNT: 5
        },
        MIC: {
            CHAPTER_COUNT: 8
        },
        NAM: {
            CHAPTER_COUNT: 4
        },
        HAB: {
            CHAPTER_COUNT: 4
        },
        ZEP: {
            CHAPTER_COUNT: 4
        },
        HAG: {
            CHAPTER_COUNT: 3
        },
        ZEC: {
            CHAPTER_COUNT: 15
        },
        MAL: {
            CHAPTER_COUNT: 5
        },
        PSA: {
            CHAPTER_COUNT: 151
        },
        PRO: {
            CHAPTER_COUNT: 32
        },
        JOB: {
            CHAPTER_COUNT: 43
        },
        SNG: {
            CHAPTER_COUNT: 9
        },
        RUT: {
            CHAPTER_COUNT: 5
        },
        LAM: {
            CHAPTER_COUNT: 6
        },
        ECC: {
            CHAPTER_COUNT: 13
        },
        EST: {
            CHAPTER_COUNT: 11
        },
        DAN: {
            CHAPTER_COUNT: 13
        },
        EZR: {
            CHAPTER_COUNT: 35
        },
        NEH: {
            CHAPTER_COUNT: 14
        },
        FCH: {
            CHAPTER_COUNT: 30,
            API_NAME: '1CH',
        },
        SCH: {
            CHAPTER_COUNT: 37,
            API_NAME: '2CH',
        },
        MAT: {
            CHAPTER_COUNT: 29
        },
        MRK: {
            CHAPTER_COUNT: 17
        },
        JHN: {
            CHAPTER_COUNT: 22
        },
        LUK: {
            CHAPTER_COUNT: 25
        },
        ACT: {
            CHAPTER_COUNT: 29
        },
        ROM: {
            CHAPTER_COUNT: 17
        },
        FCO: {
            CHAPTER_COUNT: 17,
            API_NAME: '1CO',
        },
        SCO: {
            CHAPTER_COUNT: 14,
            API_NAME: '2CO',
        },
        EPH: {
            CHAPTER_COUNT: 7
        },
        PHP: {
            CHAPTER_COUNT: 5
        },
        COL: {
            CHAPTER_COUNT: 5
        },
        FTH: {
            CHAPTER_COUNT: 6,
            API_NAME: '1TH',
        },
        STH: {
            CHAPTER_COUNT: 4,
            API_NAME: '2TH',
        },
        FTI: {
            CHAPTER_COUNT: 7,
            API_NAME: '1TI',
        },
        STI: {
            CHAPTER_COUNT: 5,
            API_NAME: '2TI',
        },
        TIT: {
            CHAPTER_COUNT: 4
        },
        PHM: {
            CHAPTER_COUNT: 2
        },
        HEB: {
            CHAPTER_COUNT: 14
        },
        JAS: {
            CHAPTER_COUNT: 6
        },
        FPE: {
            CHAPTER_COUNT: 6,
            API_NAME: '1PE',
        },
        SPE: {
            CHAPTER_COUNT: 4,
            API_NAME: '2PE',
        },
        FJN: {
            CHAPTER_COUNT: 6,
            API_NAME: '1JN',
        },
        SJN: {
            CHAPTER_COUNT: 2,
            API_NAME: '2JN',
        },
        TJN: {
            CHAPTER_COUNT: 2,
            API_NAME: '3JN',
        },
        JUD: {
            CHAPTER_COUNT: 2
        },
        REV: {
            CHAPTER_COUNT: 23
        },
    }
}