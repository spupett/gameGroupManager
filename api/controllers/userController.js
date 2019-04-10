
const User = require('../models/user');

module.exports = {
  getUser: (userName, dbFetch, wsFetch) => {

    return dbFetch(User, userName)
      .then((results) => {
        // if there is a result for the DB, return it.
        if(results) {
          return results;
        } else {
          // if not, check BGG.
          return wsFetch(userName)
            .then((wsResults) => {
              // if there is a result from BGG, return it.
              return wsResults;
            })
            .catch((wsError) => {
              throw wsError;
            })
        }
      })
      .catch((error) => { throw error; });
  }
}