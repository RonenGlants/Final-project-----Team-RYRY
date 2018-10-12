const UsersDBManager = require('./UsersDBManager.js');
const GroupsDBManager = require('./GroupsDBManager.js');
const FeedsDBManager = require('./FeedsDBManager.js');
const Utils = require('./Utils.js');
const mongo = require('mongodb').MongoClient;
const assert = require('assert');
const FriendRequestsDBManager = require('./FriendRequestsDBManager.js');

module.exports = class DBManager {
    constructor() {
        this.config = {
            useNewUrlParser: true,
        };
        this.url = "mongodb://localhost:27017/ryryDB";
        this.usersManager = new UsersDBManager();
        this.groupsManager = new GroupsDBManager();
        this.feedsManager = new FeedsDBManager();
        this.friendRequestsManager = new FriendRequestsDBManager();
        this.initDB.bind(this)();
    }

    async initDB() {
        await mongo.connect(this.url, this.config, async function (err, db) {
            if (err) {
                return console.dir(err);
            }

            var dbase = await Utils.getDataBase(db);

            await dbase.createCollection("user-data", function (err, collection) {
            });
            await dbase.createCollection("group-data", function (err, collection) {
            });
            await db.close();
        }.bind(this));
    }

    async getUserById(id) {
        let user = null;
        await mongo.connect(this.url, this.config).then(async (db) => {
                user = await this.handleGetUserById(id, db);
            }
        );
        return user;
    }

    async getUsers() {
        await mongo.connect(this.url, this.config, async function (err, db) {
            assert.equal(null, err);

            var dbase = await Utils.getDataBase(db);
            var cursor = await this.usersManager.getAllUsers(dbase);
            var finalTable = await Utils.getTableFromCursor(cursor);

            await db.close();

            return finalTable;
        }.bind(this));
    }

    async getFriends(friendsIds) {
        var currentUser;
        var friends = [];

        friendsIds = this.convertQueryArray(friendsIds);


        for (var friendIdIndex = 0; friendIdIndex < friendsIds.length; friendIdIndex++) {
            currentUser = await this.getUserById(friendsIds[friendIdIndex]);
            currentUser = currentUser[0];

            friends.push({
                id: currentUser.userName,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                mySkills: currentUser.mySkills,
                desiredSkills:  currentUser.desiredSkills,
            });
        }

        return friends;
    }

    async getGroupsById(userId) {
        let myGroups = [];
        let communities = [];
        let events = [];
        await mongo.connect(this.url, this.config).then(async (db) => {
                myGroups = await this.handleGetGroupsById(userId, db);
            }
        );

        myGroups.map((group) => {
            if (group.endingDate) {
                events.push(group);
            } else {
                communities.push(group);
            }
        });

        return {events: events, communities: communities};
    }

    async insertUser(newUser) {
        let status = false;
        await mongo.connect(this.url, this.config).then(async (db) => {
                status = await this.handleInsertUser(newUser, db);
            }
        );
        return status;
    }

    async insertGroup(newGroup) {
        let status = false;
        await mongo.connect(this.url, this.config).then(async (db) => {
                status = await this.handleInsertGroup(newGroup, db);
            }
        );
        return status;
    }

    async loginUser(user) {
        let status = false;
        await mongo.connect(this.url, this.config)
            .then(async (db) => {
                    status = await this.handleLoginUser(user, db);
                }
            );
        return status;
    }

    async insertFeed(feed) {
        let status = false;
        await mongo.connect(this.url, this.config)
            .then(async (db) => {
                    status = await this.handleInsertFeed(feed, db);
                }
            );
        return status;
    }

    async getFeedsByGroup(groupName) {
        let feeds = null;
        await mongo.connect(this.url, this.config).then(async (db) => {
                feeds = await this.handleGetFeedsByGroup(groupName, db);
            }
        );
        return feeds;
    }

    async getFeedsByGroupsNames(groupsNames) {
        let feeds = null;
        let groupArrayedNames = this.convertQueryArray(groupsNames);

        await mongo.connect(this.url, this.config).then(async (db) => {
                feeds = await this.handleGetFeedsByGroupsNames(groupArrayedNames, db);
            }
        );
        return feeds;
    }

    async getFeedsByUser(userId) {
        let feeds = null;

        await mongo.connect(this.url, this.config).then(async (db) => {
                feeds = await this.handleGetFeedsByUser(userId, db);
            }
        );
        return feeds;
    }

    async removeUserFromGroup(groupAndUserData) {
        let isRemoved = false;

        await mongo.connect(this.url, this.config).then(async (db) => {
            let dbase = await Utils.getDataBase(db);
            isRemoved = await this.groupsManager.removeUserFromGroup(dbase, groupAndUserData);
            await db.close();
        });

        return isRemoved;
    }

    async addUserToGroup(groupAndUserData) {
        let isAdded = false;

        await mongo.connect(this.url, this.config).then(async (db) => {
            let dbase = await Utils.getDataBase(db);
            isAdded = await this.groupsManager.addUserToGroup(dbase, groupAndUserData);
            await db.close();
        });

        return isAdded;
    }

    async deleteGroup(groupName) {
        let isDeleted = false;

        await mongo.connect(this.url, this.config).then(async (db) => {
            let dbase = await Utils.getDataBase(db);
            isDeleted = await this.groupsManager.deleteGroup(dbase, groupName);
            await db.close();
        });

        return isDeleted;
    }

    async updateUserProfile(newUser) {
        let status = false;
        await mongo.connect(this.url, this.config).then(async (db) => {
                status = await this.handleUpdateUser(newUser, db);
            }
        );
        return status;
    }

    async getFriendRequests(adminId) {
        let adminRequests = null;

        await mongo.connect(this.url, this.config).then(async (db) => {
                adminRequests = await this.handleGetFriendRequests(adminId, db);
            }
        );
        return adminRequests;
    }

    async addFriendRequest(request) {
        let status = false;

        await mongo.connect(this.url, this.config).then(async (db) => {
                let dbase = await Utils.getDataBase(db);
                status = await this.friendRequestsManager.addRequest(dbase, request);
            }
        );

        return status;
    }

    async removeFriendRequest(request) {
        let status = false;

        await mongo.connect(this.url, this.config).then(async (db) => {
                let dbase = await Utils.getDataBase(db);
                status = await this.friendRequestsManager.removeRequest(dbase, request);
            }
        );

        return status;
    }

    async getAllGroups() {
        let allGroups = [];

        await mongo.connect(this.url, this.config).then(async (db) => {
                let dbase = await Utils.getDataBase(db);
                allGroups = await this.groupsManager.getAllGroups(dbase);
            }
        );

        return allGroups;
    }

    async handleGetFeedsByUser(userId, db) {
        let dbase = await Utils.getDataBase(db);
        let feeds = await this.feedsManager.getFeedsByUser(dbase, userId);
        await db.close();

        return feeds;
    }

    async handleGetFeedsByGroup(groupName, db) {
        let dbase = await Utils.getDataBase(db);
        let feeds = await this.feedsManager.getFeedsByGroup(dbase, groupName);
        await db.close();

        return feeds;
    }

    async handleGetFeedsByGroupsNames(groupsNames, db) {
        let dbase = await Utils.getDataBase(db);
        let feeds = await this.feedsManager.getFeedsByGroupsNames(dbase, groupsNames);
        await db.close();

        return feeds;
    }

    async handleInsertGroup(newGroup, db) {
        let dbase = await Utils.getDataBase(db);
        let isInserted = await this.groupsManager.insertGroup(dbase, newGroup);
        await db.close();
        return isInserted;
    }

    async handleGetUserById(id, db) {
        let dbase = await Utils.getDataBase(db);
        let user = await this.usersManager.getUserById(dbase, id);
        await db.close();

        return user;
    }

    async handleGetGroupsById(userId, db) {
        let dbase = await Utils.getDataBase(db);
        let myGroups = await this.groupsManager.getGroupsById(dbase, userId);
        await db.close();

        return myGroups;
    }

    async handleInsertUser(newUser, db) {
        let dbase = await Utils.getDataBase(db);
        let isInserted = await this.usersManager.insertUser(dbase, newUser);
        await db.close();

        return isInserted;
    }

    async handleGetFriendRequests(adminId, db) {
        let dbase = await Utils.getDataBase(db);
        let myGroups = await this.friendRequestsManager.getRequests(dbase, adminId);
        await db.close();

        return myGroups;
    }

    async handleLoginUser(user, db) {
        let dbase = await Utils.getDataBase(db);
        let isLoggedIn = await this.usersManager.loginUser(dbase, user);
        await db.close();

        return isLoggedIn;
    }

    async handleInsertFeed(feed, db) {
        let dbase = await Utils.getDataBase(db);
        let isInserted = await this.feedsManager.insertFeed(dbase, feed);

        await db.close();

        return isInserted;
    }

    async handleUpdateUser(newUser, db) {
        let dbase = await Utils.getDataBase(db);
        let isUpdated = await this.usersManager.updateUser(dbase, newUser);
        await db.close();
        return isUpdated;
    }

    convertQueryArray(queryParams) {
        return queryParams.split(",");
    }
}

