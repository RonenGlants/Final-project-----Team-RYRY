const DBManager = require('./Database/DBManager.js');
let dbManager = new DBManager();
let usersDbManager = new UsersDBManager();

async function signUpUser(newUser) {
    let status = await dbManager.insertUser(newUser);
    return status;
}

async function loginUser(user) {
    let status = await dbManager.loginUser(user);
    return status;
}

async function getUser(userName) {
    let user = await usersDbManager.getUserByUserName(userName);
    return user;
}

module.exports = {signUpUser, loginUser, getUser,}