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
        if (group.endingDate) {
            events.push(group);
        } else {
            communities.push(group);
        }
    });

    return {events: events, communities: communities};
}

async function addGroup(newGroup) {
    let status = await dbManager.insertGroup(newGroup);
    return status;
}

async function getFeedsByGroup(groupId) {
    let feeds = await dbManager.getFeedsByGroup(groupId);

    return feeds;
}

async function getFeedsByUser(userId) {
    let feeds = await dbManager.getFeedsByUser(userId);

    return feeds;
}

async function addFeed(feedData) {
    let status = await dbManager.insertFeed(feedData);
    return status;
}

async function removeUserFromGroup(groupAndUserData) {
    let status = await dbManager.removeUserFromGroup(groupAndUserData);

    return status;
}

async function addUserToGroup(groupAndUserData) {
    let status = await dbManager.addUserToGroup(groupAndUserData);

    return status;
}

async function updateUserProfile(newUser) {
    let status = await dbManager.updateUserProfile(newUser);
    return status;
}

async function getFriends(friendsIds) {
    var currentUser;
    var friends = [];

    friendsIds = this.convertQueryArray(friendsIds);


     await friendsIds.map(async friendId => {
        currentUser = await dbManager.getUserById(friendId);

        friends.push({
            id: currentUser.userName,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName
        });
    });

    return friends; // bug!!! needs sync!!!!
}

function convertQueryArray(queryParams)
{
    return queryParams.split(", ");
}

module.exports = {
    signUpUser,
    loginUser,
    getUser,
    getGroups,
    addGroup,
    getFeedsByGroup,
    getFeedsByUser,
    addFeed,
    removeUserFromGroup,
    addUserToGroup,
    updateUserProfile,
    getFriends,
    convertQueryArray
}

