
const User = require('../models/user');

module.exports = {
  getUser: (userName, dbFetch, wsFetch) => {

    return dbFetch(User, userName)
      .then((dbResults) => {
        // if there is a result for the DB, return it.
        if(dbResults) {
          dbResults.found = 'database';
          return dbResults;
        } else {
          // if not, check BGG.
          return wsFetch(userName)
            .then((wsResults) => {
              // if there is a result from BGG, return it.
              if(wsResults._id.length > 0) {
                wsResults.found = 'BGG';
                return wsResults;
              } else {
                // otherwise return null
                return null;
              }
            })
            .catch((wsError) => {
              throw wsError;
            })
        }
      })
      .catch((error) => { throw error; });
  }
}