
const User = require('../models/user');

const controller =  {
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
  },

  addUser: (userData, dbFetch, wsFetch, dbAdd) => {
    if(!userData.hasOwnProperty('bggName')) {
      const error = new Error('No BGG user name given');
      error.status = 400;
      throw error;
    }
    return controller.getUser(userData.bggName, dbFetch, wsFetch)
      .then((results) => {
        if(results.found === 'database') {
          return results;
        } else {
          const user = new User({
            bggName: userData.bggName,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email
          });
          return dbAdd(user);
        }
      });
  }
}

module.exports = controller;