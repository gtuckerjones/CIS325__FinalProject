let loggedInUserId = null;

module.exports = {
    getUserId: () => loggedInUserId,
    setUserId: (id) => { loggedInUserId = id;},
    clearUser: () => {loggedInUserId = null;}
};