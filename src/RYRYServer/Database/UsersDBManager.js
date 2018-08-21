const assert = require('assert');

module.exports = class UsersDBManager {
    constructor(){
        this.usersDBName = "user-data";

    }

    validateUser(db,user){

    }

    insertUser(db,user){
        var collection = db.collection(this.usersDBName);
        collection.insertOne(user,function (err,result) {
            assert.equal(null,err);
            console.log("user inserted");
        }.bind(this))
    }
}


