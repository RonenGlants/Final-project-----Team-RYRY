const DBManager = require('./Database/DBManager.js');
var dbManager = new DBManager();

function loginUser(userName, password){
    dbManager.insertUser(
        {
            userName: userName,
            password: password
        });
    var users = dbManager.getUsers();
}
//todo: connect with DB

module.exports = {loginUser,}