const logInCheck = require('../loggedInCheck');

function requireLogIn(req, res, next) {
    if (!logInCheck.getUserId()) {
        return res.status(401).json({error: 'Unauthorized: Please log in'});
    }
    next();
}
module.exports = requireLogIn;

//Used copiolt to help with file and most of the data login protection 