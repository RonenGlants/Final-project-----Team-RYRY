const UsersDBManager = require('./UsersDBManager.js');
const mongo = require('mongodb').MongoClient;
const assert = require('assert');


module.exports = class DBManager {
    constructor(){
        this.url = "mongodb://localhost:27017/ryryDB";
        this.usersManager = new UsersDBManager();
        this.initDB.bind(this)();
    }

    initDB(){
        mongo.connect(this.url,function (err,db) {
        assert.equal(null,err);
        db.createCollection("user-data",{autoIndexId: true});
        db.close();
       }.bind(this));
    }

    insertUser(user){
            mongo.connect(this.url,function (err,db) {
            assert.equal(null,err);
            this.usersManager.insertUser(db,user);
            db.close();
        }.bind(this))

    }
}

