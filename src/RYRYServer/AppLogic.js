const DBManager = require('./Database/DBManager.js');
var dbManager = new DBManager();

async function signUpUser(newUser) {
    let status = await dbManager.insertUser(newUser);
    return status;
}

async function loginUser(user) {
    let status = await dbManager.loginUser(user);
    return status;
}

//todo: connect with DB

module.exports = {signUpUser, loginUser,}