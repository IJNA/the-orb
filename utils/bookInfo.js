module.exports = {
    SECTIONS: {
        THE_LAW: {
            GEN: {
                CHAPTER_COUNT: 51,
                API_NAME: 'GEN',
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
            API_NAME: 'GEN',
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
        REVELATION: {
            CHAPTER_COUNT: 23
        },
    }
}