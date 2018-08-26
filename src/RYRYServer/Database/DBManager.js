const UsersDBManager = require('./UsersDBManager.js');
const mongo = require('mongodb').MongoClient;
const assert = require('assert');

module.exports = class DBManager {
    constructor() {
        this.config = {
            autoIndex: true,
            useNewUrlParser: true,
        };
        this.url = "mongodb://localhost:27017/ryryDB";
        this.usersManager = new UsersDBManager();
        this.initDB.bind(this)();
    }

    initDB() {
        mongo.connect(this.url, this.config, function (err, db) {
            if (err) {
                return console.dir(err);
            }

            var dbase = db.db("ryryDB");

            dbase.createCollection("user-data", function (err, collection) {
            });
        }.bind(this));
    }

    async getUsers() {
        await mongo.connect(this.url, this.config, async function (err, db) {
            assert.equal(null, err);

            var dbase = db.db("ryryDB");
            var finalTable = [];
            var cursor = await this.usersManager.getAllUsers(dbase);

            await cursor.forEach(user=>
            {
                finalTable.push(user);
            });

            db.close();

            return finalTable;
        }.bind(this));
    }

    async insertUser(user) {
        var insertOperation = await mongo.connect(this.url, this.config, async function (err, db) {
            assert.equal(null, err);

            var dbase = db.db("ryryDB");

            await this.usersManager.insertUser(dbase, user);
            db.close();
        }.bind(this))
    }
}

