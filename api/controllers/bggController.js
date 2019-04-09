const axios = require('axios');
const convert = require('xml-js');

module.exports = {
  getUser: (id) => {
    const URL = `https://www.boardgamegeek.com/xmlapi2/user?name=${id}`;
    return axios.get(URL).then((response) => {
      const user = convert.xml2json(response.data, { compact: true, spaces: 4 });
      return user;
    });
  }
}