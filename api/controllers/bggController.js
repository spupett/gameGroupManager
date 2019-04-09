const axios = require('axios');
const convert = require('xml-js');

function getDataFromBGG(url) {
  return axios.get(url).then((response) => {
    return convert.xml2json(response.data, { compact: true, spaces: 4 });
  });
}

module.exports = {
  getUser: (userName) => {
    const URL = `https://www.boardgamegeek.com/xmlapi2/user?name=${userName}`;
    return getDataFromBGG(URL);
  },

  getGame: (gameId) => {
    const URL = `https://www.boardgamegeek.com/xmlapi2/thing?&id=${gameId}`;
    return getDataFromBGG(URL);
  }
}