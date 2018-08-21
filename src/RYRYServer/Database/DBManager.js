const UsersDBManager = require('./UsersDBManager.js');
const mongo = require('mongodb');
const assert = require('assert');


module.exports = class DBManager {
    constructor(){
        this.url = "mongodb://localhost:27017/ryryDB";
        this.usersManager = new UsersDBManager();
    }

    insertUser(user){
            mongo.connect(this.url,function (err,db) {
            assert.equal(null,err);
            this.usersManager.insertUser(db,user);
        }.bind(this))

    }
}

