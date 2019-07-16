const expect = require('chai').expect;

const mask = require('../../util-module').Mask;

describe('util-module.conversion.maskGameDetail', () => {
  context('given some game details', () => {
    context('game detail that contains all info needed', () => {
      const detail = {
        name: 'game name',
        bggId: 1,
        thumbnail: 'thumbnail.img',
        image: 'image.img',
        playTime: 1,
        description: 'description',
        bggLink: 'bggLink',
        playerCount: {
            min: 1,
            max: 1,
            best: 1
        },
        category: ['cat1', 'cat2'],
        mechanics: ['mech1'], 
        display: true
      }

      it('should return an object that matches the input', () => {
        const expected = {
          name: 'game name',
          bggId: 1,
          thumbnail: 'thumbnail.img',
          image: 'image.img',
          playTime: 1,
          description: 'description',
          bggLink: 'bggLink',
          playerCount: {
              min: 1,
              max: 1,
              best: 1
          },
          category: ['cat1', 'cat2'],
          mechanics: ['mech1'], 
          display: true
        }
        const actual = mask.maskGameDetail(detail);
        expect(actual).to.eql(expected);
      });
    });
    context('game details that is missing some \'required\' info', () => {
      const detail = {
        name: 'game name',
        bggId: 1,
        thumbnail: 'thumbnail.img',
        playTime: 1,
        description: 'description',
        bggLink: 'bggLink',
        playerCount: {
            min: 1,
            max: 1,
            best: 1
        },
        mechanics: ['mech1'], 
        display: true
      }

      it('should return an object that has all the required fields with default info', () => {
        const expected = {
          name: 'game name',
          bggId: 1,
          thumbnail: 'thumbnail.img',
          image: '',
          playTime: 1,
          description: 'description',
          bggLink: 'bggLink',
          playerCount: {
              min: 1,
              max: 1,
              best: 1
          },
          category: [],
          mechanics: ['mech1'], 
          display: true
        }
        const actual = mask.maskGameDetail(detail);
        expect(actual).to.eql(expected);
      });
    });
    context('game details has more info than \'required\' info', () => {
      const detail = {
        name: 'game name',
        bggId: 1,
        thumbnail: 'thumbnail.img',
        image: 'image.img',
        playTime: 1,
        description: 'description',
        bggLink: 'bggLink',
        playerCount: {
            min: 1,
            max: 1,
            best: 1
        },
        mechanics: ['mech1'], 
        category: ['cat1', 'cat2'],
        display: true,
        extraJunk: 'blah'
      }

      it('should return an object that has all the required fields with default info', () => {
        const expected = {
          name: 'game name',
          bggId: 1,
          thumbnail: 'thumbnail.img',
          image: 'image.img',
          playTime: 1,
          description: 'description',
          bggLink: 'bggLink',
          playerCount: {
              min: 1,
              max: 1,
              best: 1
          },
          category: ['cat1', 'cat2'],
          mechanics: ['mech1'], 
          display: true
        }
        const actual = mask.maskGameDetail(detail);
        expect(actual).to.eql(expected);
      });
    });
  })
})