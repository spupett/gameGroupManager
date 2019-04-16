const axios = require('axios');
const convert = require('xml-js');

function makeUserModel(obj) {
  return {
    bggName: obj.user._attributes.name,
    firstName: obj.user.firstname._attributes.value,
    lastname: obj.user.lastname._attributes.value,
    email: '',
    _id: obj.user._attributes.id
  }
}

function makeGameModel(obj) {
  return gameList = obj.items.item.map((item) => {
    return {
      name: item.name._text,
      thumbnail: item.thumbnail._text,
      id: item._attributes.objectid
    }
  });
}

function getDataFromBGG(url, makeModel) {
  return axios.get(url).then((response) => {
    return makeModel(JSON.parse(convert.xml2json(response.data, { compact: true, spaces: 4 })));
  });
}

module.exports = {
  getUser: (userName) => {
    const URL = `https://www.boardgamegeek.com/xmlapi2/user?name=${userName}`;
    return getDataFromBGG(URL, makeUserModel);
  },

  getGame: (gameId) => {
    const URL = `https://www.boardgamegeek.com/xmlapi2/thing?&id=${gameId}`;
    return getDataFromBGG(URL);
  },

  getUserGames: (userName) => {
    const URL = `https://www.boardgamegeek.com/xmlapi2/collection?own=1&username=${userName}`;
    return getDataFromBGG(URL, makeGameModel);
  }
}