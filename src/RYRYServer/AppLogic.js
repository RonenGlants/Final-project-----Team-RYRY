const DBManager = require('./Database/DBManager.js');
var dbManager = new DBManager();

async function loginUser(userName, password) {
    await dbManager.insertUser(
        {
            userName: userName,
            password: password
        });

    var users = await dbManager.getUsers();
}

//todo: connect with DB

module.exports = {loginUser,}