const DBManager = require('./Database/DBManager.js');
var dbManager = new DBManager();

function loginUser(userName, password){
    dbManager.insertUser(
        {
            userName: userName,
            password: password
        });
}
//todo: connect with DB

module.exports = {loginUser,}