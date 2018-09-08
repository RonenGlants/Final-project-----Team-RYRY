const DBManager = require('./Database/DBManager.js');
var dbManager = new DBManager();

async function signUpUser(newUser) {
    let status = await dbManager.insertUser(newUser);
    return status;
}

//todo: connect with DB

module.exports = {signUpUser,}