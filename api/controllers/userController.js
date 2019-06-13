const User = require('../models/user');

const controller = {
    getUsers: (dbFetch) => {
        return dbFetch(User)
            .then((dbResults) => {
                const users = JSON.parse(JSON.stringify(dbResults));
                return users.map((user) => {
                    return { "bggName": user.bggName, "firstName": user.firstName, "lastName": user.lastName };
                });
            })
    },
    getUser: (userName, dbFetch, wsFetch) => {

        return dbFetch(User, userName)
            .then((dbResults) => {
                // if there is a result for the DB, return it.
                if (dbResults) {
                    const user = JSON.parse(JSON.stringify(dbResults));
                    user.found = 'database';
                    user.urls = { gameList: `/api/v1/${userName}/games` }
                    return user;
                }
                // if not, check BGG.
                return wsFetch(userName)
                    .then((wsResults) => {
                        const user = JSON.parse(JSON.stringify(wsResults));
                        // if there is a result from BGG, return it.
                        if (wsResults._id.length > 0) {
                            user.found = 'BGG';
                            user.urls = { gameList: `/api/v1/${userName}/games` }
                            return user;
                        } else {
                            // otherwise return null
                            return null;
                        }
                    })
                    .catch((wsError) => {
                        throw wsError;
                    })
            })
            .catch((error) => { throw error; });
    },

    addUser: (userData, dbFetch, wsFetch, dbAdd) => {
        if (!userData.hasOwnProperty('bggName')) {
            const error = new Error('No BGG user name given');
            error.status = 400;
            throw error;
        }
        return controller.getUser(userData.bggName, dbFetch, wsFetch)
            .then((results) => {
                if (results.found === 'database') {
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
    },

    getUserGames: (userName, dbFetch, wsFetch) => {
        // getting ahead of myself here, but I want to first check the db, then the ws.

        // but for now, I really just want to get the ws working.
        return wsFetch(userName)
            .then((results) => {
                return results;
            });
    }
}

module.exports = controller;