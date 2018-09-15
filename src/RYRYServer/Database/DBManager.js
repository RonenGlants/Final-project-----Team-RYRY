const UsersDBManager = require('./UsersDBManager.js');
const GroupsDBManager = require('./GroupsDBManager.js');
const Utils = require('./Utils.js');
const mongo = require('mongodb').MongoClient;
const assert = require('assert');

module.exports = class DBManager {
    constructor() {
        this.config = {
            useNewUrlParser: true,
        };
        this.url = "mongodb://localhost:27017/ryryDB";
        this.usersManager = new UsersDBManager();
        this.groupsManager = new GroupsDBManager();
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
                user = await this.handleGetUserById(id,db);
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

    async getGroupsById(userId) {
        let myGroups = null;
        await mongo.connect(this.url, this.config).then(async (db) => {
            myGroups = await this.handleGetGroupsById(userId,db);
            }
        );
        return myGroups;
    }

    async insertUser(newUser) {
        let status = false;
        await mongo.connect(this.url, this.config).then(async (db) => {
               status = await this.handleInsertUser(newUser,db);
            }
        );
        return status;
    }

    async insertGroup(newGroup) {
        let status = false;
        await mongo.connect(this.url, this.config).then(async (db) => {
                status = await this.handleInsertGroup(newGroup,db);
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

    async handleInsertGroup(newGroup,db){
        let dbase = await Utils.getDataBase(db);
        let isInserted = await this.groupsManager.insertGroup(dbase, newGroup);
        await db.close();
        return isInserted;
    }

    async handleGetUserById(id,db){
        let dbase = await Utils.getDataBase(db);
        let user = await this.usersManager.getUserById(dbase, id);
        await db.close();
        return user;
    }

    async handleGetGroupsById(userId,db){
        let dbase = await Utils.getDataBase(db);
        let myGroups = await this.groupsManager.getGroupsById(dbase, userId);
        await db.close();
        return myGroups;
    }

    async handleInsertUser(newUser,db){
       let dbase = await Utils.getDataBase(db);
       let isInserted = await this.usersManager.insertUser(dbase, newUser);
       await db.close();
       return isInserted;
    }

    async handleLoginUser(user, db) {
        let dbase = await Utils.getDataBase(db);
        let isLoggedIn = await this.usersManager.loginUser(dbase, user);
        await db.close();
        return isLoggedIn;

    }
}

