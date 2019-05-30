var expect = require('chai').expect;
const rewire = require('rewire');

const dalMock = {
    findNone: {
        find: (model, search) => {
            return Promise.resolve([]);
        },
        save: (model) => {
            model.__id = 'something';
            return Promise.resolve(model);
        }
    },
    findOne: {
        find: (model, search) => {
            return Promise.resolve([{
                _id: '5cb937601b0d4355cc32579b',
                category: ['Dice', 'Fighting', 'Movies / TV / Radio theme', 'Science Fiction'],
                mechanics: ['Area Control / Area Influence', 'Area Movement', 'Card Drafting', 'Dice Rolling', 'Player Elimination', 'Press Your Luck'],
                name: 'King of New York',
                bggId: '160499',
                thumbnail: 'https://cf.geekdo-images.com/thumb/img/WaW2VsdMYT0Xh3JWcuLA9e-L85Y=/fi...',
                image: 'https://cf.geekdo-images.com/original/img/R0dEpSy_FsE2iKVDL9Gn5Z8TYx0=...',
                playerCount: {
                    min: 2,
                    max: 6,
                    best: '4'
                },
                playTime: 40,
                bggLink: 'https://www.boardgamegeek.com/boardgame/160499',
                description: 'There\'s always something happening in the city that never sleeps. Mayb...'
            }]);
        }
    },
    findMany: {
        find: (model, search) => {
            return Promise.resolve({ something: 'else' });
        }
    }
}

const bggMock = {
    findNone: {
        getGames: (model, search) => {
            return Promise.resolve({
                '_declaration': {
                    '_attributes': {
                        'version': '1.0',
                        'encoding': 'utf-8'
                    }
                },
                'items': {
                    '_attributes': {
                        'termsofuse': 'https://boardgamegeek.com/xmlapi/termsofuse'
                    }
                }
            });
        }
    },
    findOne: {
        getGames: (model, search) => {
            return Promise.resolve({
                '_declaration': {
                    '_attributes': {
                        'version': '1.0',
                        'encoding': 'utf-8'
                    }
                },
                'items': {
                    '_attributes': {
                        'termsofuse': 'https:\/\/boardgamegeek.com\/xmlapi\/termsofuse'
                    },
                    'item': {
                        '_attributes': {
                            'type': 'boardgame',
                            'id': '1'
                        },
                        'thumbnail': {
                            '_text': 'anImage.png'
                        },
                        'image': {
                            '_text': 'anotherImage.png'
                        },
                        'name': {
                            '_attributes': {
                                'type': 'primary',
                                'sortindex': '1',
                                'value': 'Great Game'
                            }
                        },
                        'description': {
                            '_text': 'description of an amazing game'
                        },
                        'yearpublished': {
                            '_attributes': {
                                'value': '1999'
                            }
                        },
                        'minplayers': {
                            '_attributes': {
                                'value': '1'
                            }
                        },
                        'maxplayers': {
                            '_attributes': {
                                'value': '5'
                            }
                        },
                        'poll': [{
                                '_attributes': {
                                    'name': 'suggested_numplayers',
                                    'title': 'User Suggested Number of Players',
                                    'totalvotes': '28'
                                },
                                'results': [{
                                        '_attributes': {
                                            'numplayers': '1'
                                        },
                                        'result': [{
                                                '_attributes': {
                                                    'value': 'Best',
                                                    'numvotes': '0'
                                                }
                                            },
                                            {
                                                '_attributes': {
                                                    'value': 'Recommended',
                                                    'numvotes': '0'
                                                }
                                            },
                                            {
                                                '_attributes': {
                                                    'value': 'Not Recommended',
                                                    'numvotes': '13'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        '_attributes': {
                                            'numplayers': '2'
                                        },
                                        'result': [{
                                                '_attributes': {
                                                    'value': 'Best',
                                                    'numvotes': '0'
                                                }
                                            },
                                            {
                                                '_attributes': {
                                                    'value': 'Recommended',
                                                    'numvotes': '2'
                                                }
                                            },
                                            {
                                                '_attributes': {
                                                    'value': 'Not Recommended',
                                                    'numvotes': '12'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        '_attributes': {
                                            'numplayers': '3'
                                        },
                                        'result': [{
                                                '_attributes': {
                                                    'value': 'Best',
                                                    'numvotes': '999999'
                                                }
                                            },
                                            {
                                                '_attributes': {
                                                    'value': 'Recommended',
                                                    'numvotes': '15'
                                                }
                                            },
                                            {
                                                '_attributes': {
                                                    'value': 'Not Recommended',
                                                    'numvotes': '6'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        '_attributes': {
                                            'numplayers': '4'
                                        },
                                        'result': [{
                                                '_attributes': {
                                                    'value': 'Best',
                                                    'numvotes': '20'
                                                }
                                            },
                                            {
                                                '_attributes': {
                                                    'value': 'Recommended',
                                                    'numvotes': '6'
                                                }
                                            },
                                            {
                                                '_attributes': {
                                                    'value': 'Not Recommended',
                                                    'numvotes': '0'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        '_attributes': {
                                            'numplayers': '5'
                                        },
                                        'result': [{
                                                '_attributes': {
                                                    'value': 'Best',
                                                    'numvotes': '18'
                                                }
                                            },
                                            {
                                                '_attributes': {
                                                    'value': 'Recommended',
                                                    'numvotes': '6'
                                                }
                                            },
                                            {
                                                '_attributes': {
                                                    'value': 'Not Recommended',
                                                    'numvotes': '1'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        '_attributes': {
                                            'numplayers': '5+'
                                        },
                                        'result': [{
                                                '_attributes': {
                                                    'value': 'Best',
                                                    'numvotes': '0'
                                                }
                                            },
                                            {
                                                '_attributes': {
                                                    'value': 'Recommended',
                                                    'numvotes': '0'
                                                }
                                            },
                                            {
                                                '_attributes': {
                                                    'value': 'Not Recommended',
                                                    'numvotes': '12'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                '_attributes': {
                                    'name': 'suggested_playerage',
                                    'title': 'User Suggested Player Age',
                                    'totalvotes': '4'
                                },
                                'results': {
                                    'result': [{
                                            '_attributes': {
                                                'value': '2',
                                                'numvotes': '0'
                                            }
                                        },
                                        {
                                            '_attributes': {
                                                'value': '3',
                                                'numvotes': '0'
                                            }
                                        },
                                        {
                                            '_attributes': {
                                                'value': '4',
                                                'numvotes': '0'
                                            }
                                        },
                                        {
                                            '_attributes': {
                                                'value': '5',
                                                'numvotes': '0'
                                            }
                                        },
                                        {
                                            '_attributes': {
                                                'value': '6',
                                                'numvotes': '0'
                                            }
                                        },
                                        {
                                            '_attributes': {
                                                'value': '8',
                                                'numvotes': '1'
                                            }
                                        },
                                        {
                                            '_attributes': {
                                                'value': '10',
                                                'numvotes': '1'
                                            }
                                        },
                                        {
                                            '_attributes': {
                                                'value': '12',
                                                'numvotes': '0'
                                            }
                                        },
                                        {
                                            '_attributes': {
                                                'value': '14',
                                                'numvotes': '2'
                                            }
                                        },
                                        {
                                            '_attributes': {
                                                'value': '16',
                                                'numvotes': '0'
                                            }
                                        },
                                        {
                                            '_attributes': {
                                                'value': '18',
                                                'numvotes': '0'
                                            }
                                        },
                                        {
                                            '_attributes': {
                                                'value': '21 and up',
                                                'numvotes': '0'
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                '_attributes': {
                                    'name': 'language_dependence',
                                    'title': 'Language Dependence',
                                    'totalvotes': '6'
                                },
                                'results': {
                                    'result': [{
                                            '_attributes': {
                                                'level': '1',
                                                'value': 'No necessary in-game text',
                                                'numvotes': '5'
                                            }
                                        },
                                        {
                                            '_attributes': {
                                                'level': '2',
                                                'value': 'Some necessary text - easily memorized or small crib sheet',
                                                'numvotes': '1'
                                            }
                                        },
                                        {
                                            '_attributes': {
                                                'level': '3',
                                                'value': 'Moderate in-game text - needs crib sheet or paste ups',
                                                'numvotes': '0'
                                            }
                                        },
                                        {
                                            '_attributes': {
                                                'level': '4',
                                                'value': 'Extensive use of text - massive conversion needed to be playable',
                                                'numvotes': '0'
                                            }
                                        },
                                        {
                                            '_attributes': {
                                                'level': '5',
                                                'value': 'Unplayable in another language',
                                                'numvotes': '0'
                                            }
                                        }
                                    ]
                                }
                            }
                        ],
                        'playingtime': {
                            '_attributes': {
                                'value': '54'
                            }
                        },
                        'minplaytime': {
                            '_attributes': {
                                'value': '45'
                            }
                        },
                        'maxplaytime': {
                            '_attributes': {
                                'value': '45'
                            }
                        },
                        'minage': {
                            '_attributes': {
                                'value': '12'
                            }
                        },
                        'link': [{
                                '_attributes': {
                                    'type': 'boardgamecategory',
                                    'id': '1009',
                                    'value': 'fantasy'
                                }
                            },
                            {
                                '_attributes': {
                                    'type': 'boardgamecategory',
                                    'id': '1035',
                                    'value': 'space'
                                }
                            },
                            {
                                '_attributes': {
                                    'type': 'boardgamecategory',
                                    'id': '1086',
                                    'value': 'cowboy'
                                }
                            },
                            {
                                '_attributes': {
                                    'type': 'boardgamemechanic',
                                    'id': '2080',
                                    'value': 'dexterity'
                                }
                            },
                            {
                                '_attributes': {
                                    'type': 'boardgamemechanic',
                                    'id': '2043',
                                    'value': 'card drafting'
                                }
                            },
                            {
                                '_attributes': {
                                    'type': 'boardgamefamily',
                                    'id': '22783',
                                    'value': 'Admin: Better Description Needed!'
                                }
                            },
                            {
                                '_attributes': {
                                    'type': 'boardgamefamily',
                                    'id': '10643',
                                    'value': 'Country: Germany'
                                }
                            },
                            {
                                '_attributes': {
                                    'type': 'boardgamedesigner',
                                    'id': '2',
                                    'value': 'Reiner Knizia'
                                }
                            },
                            {
                                '_attributes': {
                                    'type': 'boardgameartist',
                                    'id': '13976',
                                    'value': 'William O\'Connor'
                                }
                            },
                            {
                                '_attributes': {
                                    'type': 'boardgameartist',
                                    'id': '11883',
                                    'value': 'Franz Vohwinkel'
                                }
                            },
                            {
                                '_attributes': {
                                    'type': 'boardgamepublisher',
                                    'id': '1705',
                                    'value': 'Face2Face Games'
                                }
                            },
                            {
                                '_attributes': {
                                    'type': 'boardgamepublisher',
                                    'id': '51',
                                    'value': 'Hasbro'
                                }
                            },
                            {
                                '_attributes': {
                                    'type': 'boardgamepublisher',
                                    'id': '28',
                                    'value': 'Parker Brothers'
                                }
                            }
                        ]
                    }
                }
            });
        }
    },
    findMany: {
        getGames: (model, search) => {
            return Promise.resolve({ something: 'else' });
        }
    }
}

// this requires, and allows the injection of overwritten dependencies for testing.
const controller = rewire('../../api/controllers/gameController');

describe('gameController - getting a game', () => {
    context('given a database with games in it', () => {
        context('and a web service that has game information', () => {
            context('when getting a game', () => {
                const gameId = 1;
                context('and the database doesn\'t have the game data', () => {
                    beforeEach(() => {
                        controller.__set__({
                            DAL: dalMock.findNone
                        });
                    });
                    context('and the game id exists in the web service', () => {
                        beforeEach(() => {
                            controller.__set__({
                                bggController: bggMock.findOne
                            });
                        });
                        it('then it should save the game data and return it', async() => {
                            const expected = [{
                                name: 'Great Game',
                                bggId: '1',
                                thumbnail: 'anImage.png',
                                image: 'anotherImage.png',
                                playerCount: {
                                    min: 1,
                                    max: 5,
                                    best: '3'
                                },
                                playTime: 54,
                                category: ['fantasy', 'space', 'cowboy'],
                                mechanics: ['dexterity', 'card drafting'],
                                description: 'description of an amazing game',
                                bggLink: 'https://www.boardgamegeek.com/boardgame/1'
                            }];
                            const actual = await controller.getGame(gameId);
                            expect(actual).to.be.eql(expected);
                        });
                    });
                    context('and the game id doesn\'t exist in the web service', () => {
                        beforeEach(() => {
                            controller.__set__({
                                bggController: bggMock.findNone
                            });
                        });
                        it('then it should return null', async() => {
                            const expected = null;
                            const actual = await controller.getGame(gameId);
                            expect(actual).to.eql(expected);
                        });
                    });
                });
                context('and the database does have the game data', () => {
                    beforeEach(() => {
                        controller.__set__({
                            DAL: dalMock.findOne
                        })
                    })
                    it('then it should return the game data', async() => {
                        const expected = [{
                            _id: '5cb937601b0d4355cc32579b',
                            category: ['Dice', 'Fighting', 'Movies / TV / Radio theme', 'Science Fiction'],
                            mechanics: ['Area Control / Area Influence', 'Area Movement', 'Card Drafting', 'Dice Rolling', 'Player Elimination', 'Press Your Luck'],
                            name: 'King of New York',
                            bggId: '160499',
                            thumbnail: 'https://cf.geekdo-images.com/thumb/img/WaW2VsdMYT0Xh3JWcuLA9e-L85Y=/fi...',
                            image: 'https://cf.geekdo-images.com/original/img/R0dEpSy_FsE2iKVDL9Gn5Z8TYx0=...',
                            playerCount: {
                                min: 2,
                                max: 6,
                                best: '4'
                            },
                            playTime: 40,
                            bggLink: 'https://www.boardgamegeek.com/boardgame/160499',
                            description: 'There\'s always something happening in the city that never sleeps. Mayb...'
                        }]
                        const actual = await controller.getGame(160499);
                        expect(actual).to.eql(expected);
                    });
                });
            });
        });
    });
});