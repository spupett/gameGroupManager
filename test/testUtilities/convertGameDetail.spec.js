const expect = require('chai').expect;

const convert = require('../../util-module').Convert;

describe('util-module.convert.convertGameDetail', () => {
  context('given that all info from BGG is returned', () => {
    const gameData = {
      '_declaration': {
          '_attributes': {
              'version': '1.0',
              'encoding': 'utf-8'
          }
      },
      'items': {
          '_attributes': {
              'termsofuse': 'https://boardgamegeek.com/xmlapi/termsofuse'
          },
          'item': {
              '_attributes': {
                  'type': 'boardgame',
                  'id': '5'
              },
              'thumbnail': {
                  '_text': 'someThumbnail'
              },
              'image': {
                  '_text': 'someImage'
              },
              'name': [
                  {
                      '_attributes': {
                          'type': 'primary',
                          'sortindex': '1',
                          'value': '9 Wonders'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'alternate',
                          'sortindex': '1',
                          'value': '7 csoda'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'alternate',
                          'sortindex': '1',
                          'value': '7 Cudów Świata'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'alternate',
                          'sortindex': '1',
                          'value': '7 divů světa'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'alternate',
                          'sortindex': '1',
                          'value': '7 чудес'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'alternate',
                          'sortindex': '1',
                          'value': '7 สิ่งมหัศจรรย์'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'alternate',
                          'sortindex': '1',
                          'value': 'Τα 7 θαύματα του κόσμου'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'alternate',
                          'sortindex': '1',
                          'value': '七大奇蹟'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'alternate',
                          'sortindex': '1',
                          'value': '世界の七不思議'
                      }
                  }
              ],
              'description': {
                  '_text': 'a really long description'
              },
              'yearpublished': {
                  '_attributes': {
                      'value': '2010'
                  }
              },
              'minplayers': {
                  '_attributes': {
                      'value': '2'
                  }
              },
              'maxplayers': {
                  '_attributes': {
                      'value': '7'
                  }
              },
              'poll': [
                  {
                      '_attributes': {
                          'name': 'suggested_numplayers',
                          'title': 'User Suggested Number of Players',
                          'totalvotes': '1731'
                      },
                      'results': [
                          {
                              '_attributes': {
                                  'numplayers': '1'
                              },
                              'result': [
                                  {
                                      '_attributes': {
                                          'value': 'Best',
                                          'numvotes': '4'
                                      }
                                  },
                                  {
                                      '_attributes': {
                                          'value': 'Recommended',
                                          'numvotes': '12'
                                      }
                                  },
                                  {
                                      '_attributes': {
                                          'value': 'Not Recommended',
                                          'numvotes': '981'
                                      }
                                  }
                              ]
                          },
                          {
                              '_attributes': {
                                  'numplayers': '2'
                              },
                              'result': [
                                  {
                                      '_attributes': {
                                          'value': 'Best',
                                          'numvotes': '111'
                                      }
                                  },
                                  {
                                      '_attributes': {
                                          'value': 'Recommended',
                                          'numvotes': '324'
                                      }
                                  },
                                  {
                                      '_attributes': {
                                          'value': 'Not Recommended',
                                          'numvotes': '804'
                                      }
                                  }
                              ]
                          },
                          {
                              '_attributes': {
                                  'numplayers': '3'
                              },
                              'result': [
                                  {
                                      '_attributes': {
                                          'value': 'Best',
                                          'numvotes': '374'
                                      }
                                  },
                                  {
                                      '_attributes': {
                                          'value': 'Recommended',
                                          'numvotes': '888'
                                      }
                                  },
                                  {
                                      '_attributes': {
                                          'value': 'Not Recommended',
                                          'numvotes': '154'
                                      }
                                  }
                              ]
                          },
                          {
                              '_attributes': {
                                  'numplayers': '4'
                              },
                              'result': [
                                  {
                                      '_attributes': {
                                          'value': 'Best',
                                          'numvotes': '889'
                                      }
                                  },
                                  {
                                      '_attributes': {
                                          'value': 'Recommended',
                                          'numvotes': '597'
                                      }
                                  },
                                  {
                                      '_attributes': {
                                          'value': 'Not Recommended',
                                          'numvotes': '32'
                                      }
                                  }
                              ]
                          },
                          {
                              '_attributes': {
                                  'numplayers': '5'
                              },
                              'result': [
                                  {
                                      '_attributes': {
                                          'value': 'Best',
                                          'numvotes': '741'
                                      }
                                  },
                                  {
                                      '_attributes': {
                                          'value': 'Recommended',
                                          'numvotes': '685'
                                      }
                                  },
                                  {
                                      '_attributes': {
                                          'value': 'Not Recommended',
                                          'numvotes': '45'
                                      }
                                  }
                              ]
                          },
                          {
                              '_attributes': {
                                  'numplayers': '6'
                              },
                              'result': [
                                  {
                                      '_attributes': {
                                          'value': 'Best',
                                          'numvotes': '345'
                                      }
                                  },
                                  {
                                      '_attributes': {
                                          'value': 'Recommended',
                                          'numvotes': '887'
                                      }
                                  },
                                  {
                                      '_attributes': {
                                          'value': 'Not Recommended',
                                          'numvotes': '126'
                                      }
                                  }
                              ]
                          },
                          {
                              '_attributes': {
                                  'numplayers': '7'
                              },
                              'result': [
                                  {
                                      '_attributes': {
                                          'value': 'Best',
                                          'numvotes': '302'
                                      }
                                  },
                                  {
                                      '_attributes': {
                                          'value': 'Recommended',
                                          'numvotes': '818'
                                      }
                                  },
                                  {
                                      '_attributes': {
                                          'value': 'Not Recommended',
                                          'numvotes': '221'
                                      }
                                  }
                              ]
                          },
                          {
                              '_attributes': {
                                  'numplayers': '7+'
                              },
                              'result': [
                                  {
                                      '_attributes': {
                                          'value': 'Best',
                                          'numvotes': '27'
                                      }
                                  },
                                  {
                                      '_attributes': {
                                          'value': 'Recommended',
                                          'numvotes': '73'
                                      }
                                  },
                                  {
                                      '_attributes': {
                                          'value': 'Not Recommended',
                                          'numvotes': '666'
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
                          'totalvotes': '387'
                      },
                      'results': {
                          'result': [
                              {
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
                                      'numvotes': '1'
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
                                      'numvotes': '14'
                                  }
                              },
                              {
                                  '_attributes': {
                                      'value': '8',
                                      'numvotes': '105'
                                  }
                              },
                              {
                                  '_attributes': {
                                      'value': '10',
                                      'numvotes': '152'
                                  }
                              },
                              {
                                  '_attributes': {
                                      'value': '12',
                                      'numvotes': '92'
                                  }
                              },
                              {
                                  '_attributes': {
                                      'value': '14',
                                      'numvotes': '19'
                                  }
                              },
                              {
                                  '_attributes': {
                                      'value': '16',
                                      'numvotes': '3'
                                  }
                              },
                              {
                                  '_attributes': {
                                      'value': '18',
                                      'numvotes': '1'
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
                          'totalvotes': '382'
                      },
                      'results': {
                          'result': [
                              {
                                  '_attributes': {
                                      'level': '1',
                                      'value': 'No necessary in-game text',
                                      'numvotes': '293'
                                  }
                              },
                              {
                                  '_attributes': {
                                      'level': '2',
                                      'value': 'Some necessary text - easily memorized or small crib sheet',
                                      'numvotes': '84'
                                  }
                              },
                              {
                                  '_attributes': {
                                      'level': '3',
                                      'value': 'Moderate in-game text - needs crib sheet or paste ups',
                                      'numvotes': '4'
                                  }
                              },
                              {
                                  '_attributes': {
                                      'level': '4',
                                      'value': 'Extensive use of text - massive conversion needed to be playable',
                                      'numvotes': '1'
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
                      'value': '30'
                  }
              },
              'minplaytime': {
                  '_attributes': {
                      'value': '30'
                  }
              },
              'maxplaytime': {
                  '_attributes': {
                      'value': '30'
                  }
              },
              'minage': {
                  '_attributes': {
                      'value': '10'
                  }
              },
              'link': [
                  {
                      '_attributes': {
                          'type': 'boardgamecategory',
                          'id': '1050',
                          'value': 'Ancient'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamecategory',
                          'id': '1002',
                          'value': 'Card Game'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamecategory',
                          'id': '1029',
                          'value': 'City Building'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamecategory',
                          'id': '1015',
                          'value': 'Civilization'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamemechanic',
                          'id': '2041',
                          'value': 'Card Drafting'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamemechanic',
                          'id': '2040',
                          'value': 'Hand Management'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamemechanic',
                          'id': '2004',
                          'value': 'Set Collection'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamemechanic',
                          'id': '2020',
                          'value': 'Simultaneous Action Selection'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamemechanic',
                          'id': '2015',
                          'value': 'Variable Player Powers'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamefamily',
                          'id': '17552',
                          'value': '7 Wonders'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamefamily',
                          'id': '27646',
                          'value': 'Tableau Building'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgameexpansion',
                          'id': '247315',
                          'value': '7 Wonders: Armada'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgameexpansion',
                          'id': '154638',
                          'value': '7 Wonders: Babel'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgameexpansion',
                          'id': '110308',
                          'value': '7 Wonders: Catan'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgameexpansion',
                          'id': '111661',
                          'value': '7 Wonders: Cities'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgameexpansion',
                          'id': '92539',
                          'value': '7 Wonders: Leaders'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgameexpansion',
                          'id': '83445',
                          'value': '7 Wonders: Manneken Pis'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgameexpansion',
                          'id': '133993',
                          'value': '7 Wonders: Wonder Pack'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgameexpansion',
                          'id': '164649',
                          'value': 'Collection (fan expansion for 7 Wonders)'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgameexpansion',
                          'id': '140098',
                          'value': 'Empires (fan expansion for 7 Wonders)'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgameexpansion',
                          'id': '138187',
                          'value': 'Game Wonders (fan expansion for 7 Wonders)'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgameexpansion',
                          'id': '134849',
                          'value': 'Lost Wonders (fan expansion for 7 Wonders)'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgameexpansion',
                          'id': '131947',
                          'value': 'More Wonders... (fan expansion for 7 Wonders)'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgameexpansion',
                          'id': '132146',
                          'value': 'Myths (fan expansion for 7 Wonders)'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgameexpansion',
                          'id': '164648',
                          'value': 'Ruins (fan expansion for 7 Wonders)'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgameexpansion',
                          'id': '164647',
                          'value': 'Sailors (fan expansion for 7 Wonders)'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgameimplementation',
                          'id': '173346',
                          'value': '7 Wonders Duel'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamedesigner',
                          'id': '9714',
                          'value': 'Antoine Bauza'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgameartist',
                          'id': '9714',
                          'value': 'Antoine Bauza'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgameartist',
                          'id': '12016',
                          'value': 'Miguel Coimbra'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamepublisher',
                          'id': '4384',
                          'value': 'Repos Production'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamepublisher',
                          'id': '23043',
                          'value': 'ADC Blackfire Entertainment'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamepublisher',
                          'id': '157',
                          'value': 'Asmodee'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamepublisher',
                          'id': '15889',
                          'value': 'Asterion Press'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamepublisher',
                          'id': '15605',
                          'value': 'Galápagos Jogos'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamepublisher',
                          'id': '8820',
                          'value': 'Gém Klub Kft.'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamepublisher',
                          'id': '1391',
                          'value': 'Hobby Japan'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamepublisher',
                          'id': '6214',
                          'value': 'Kaissa Chess & Games'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamepublisher',
                          'id': '3218',
                          'value': 'Lautapelit.fi'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamepublisher',
                          'id': '9325',
                          'value': 'Lifestyle Boardgames Ltd'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamepublisher',
                          'id': '32395',
                          'value': 'NeoTroy Games'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamepublisher',
                          'id': '7466',
                          'value': 'Rebel'
                      }
                  },
                  {
                      '_attributes': {
                          'type': 'boardgamepublisher',
                          'id': '33998',
                          'value': 'Siam Board Games'
                      }
                  }
              ]
          }
      }
    }
    it('then it should convert bgg data into our model', async () => {
      const expected = [{
        name: '9 Wonders',
        bggId: '5',
        thumbnail: 'someThumbnail',
        image: 'someImage',
        playTime: 30,
        description: 'a really long description',
        bggLink: 'https://www.boardgamegeek.com/boardgame/5',
        playerCount: {
          min: 2,
          max: 7,
          best: '4'
        },
        category: ['Ancient', 'Card Game', 'City Building', 'Civilization'],
        mechanics: ['Card Drafting', 'Hand Management', 'Set Collection', 'Simultaneous Action Selection', 'Variable Player Powers'],
        display: true
      }]
      const actual = await convert.convertGameDetail(gameData);
      expect(actual).to.eql(expected);
    });
  });
});