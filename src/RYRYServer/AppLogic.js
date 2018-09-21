const DBManager = require('./Database/DBManager.js');
let dbManager = new DBManager();

async function signUpUser(newUser) {
    let status = await dbManager.insertUser(newUser);
    return status;
}

async function loginUser(user) {
    let status = await dbManager.loginUser(user);
    return status;
}

async function getUser(userName) {
    let user = await dbManager.getUserById(userName);
    return user;
}

async function getGroups(userName) {
    let communities = [];
    let events = [];
    let groups = await dbManager.getGroupsById(userName);

    groups.map((group) => {
        if (group.endDate) {
            events.add(group);
        } else {
            communities.add(group);
        }
    });

    return {events: events, communities: communities};
}

module.exports = {signUpUser, loginUser, getUser, getGroups}