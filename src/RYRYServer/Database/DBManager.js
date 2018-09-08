const UsersDBManager = require('./UsersDBManager.js');
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

            await db.close();
        }.bind(this));
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

    async insertUser(newUser) {
        let status = false;
        await mongo.connect(this.url, this.config).then(async (db) => {
               status = await this.handleInsertUser(newUser,db);
            }
        );
        return status;
    }

    async handleInsertUser(newUser,db){
      // assert.equal(null, err);
       let dbase = await Utils.getDataBase(db);
       let isInserted = await this.usersManager.insertUser(dbase, newUser);
       await db.close();
       return isInserted;
    }

}
