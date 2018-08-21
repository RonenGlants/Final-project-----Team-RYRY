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

    getUsers(){
        mongo.connect(this.url, this.config, function (err, db) {
            assert.equal(null, err);

            var dbase = db.db("ryryDB");
            var cursor = this.usersManager.getAllUsers(dbase);
            var finalTable = [];

            cursor.forEach(function(itr,err){
                assert.equal(null, err);
                finalTable.push(itr);
            }).then(function(value) {
                    db.close();

                    return finalTable;
                }
            ) // todo: what is happening here?????
        }.bind(this))
    }

    insertUser(user) {
        var insertOperation = mongo.connect(this.url, this.config, function (err, db) {
            assert.equal(null, err);

            var dbase = db.db("ryryDB");

            this.usersManager.insertUser(dbase, user);
            db.close();
        }.bind(this))
    }
}

