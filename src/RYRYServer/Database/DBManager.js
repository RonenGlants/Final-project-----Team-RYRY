const UsersDBManager = require('./UsersDBManager');
const mongo = require('mongodb');
const assert = require('assert');


class DBManager {
    constructor(){
        this.url = "mongodb://localhost:27017/ryryDB";
        this.usersManager = new UsersDBManager.UsersDBManager();
    }

    insertUser(user){
            mongo.connect(this.url,function (err,db) {
            assert.equal(null,err);
            this.usersManager.insertUser(db,user);
        })

    }
}

module.exports = {DBManager,}