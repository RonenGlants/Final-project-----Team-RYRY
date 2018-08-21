const DBManager = require('./Database/DBManager.js');
const dbManager = new DBManager.DBManager();

function loginUser(userName, password){
    dbManager.insertUser(
        {
            userName: userName,
            password: password
        });
    return true;
}
//todo: connect with DB

module.exports = {loginUser,}