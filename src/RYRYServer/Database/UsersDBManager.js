const assert = require('assert');

module.exports = class UsersDBManager {
    constructor(){
        this.usersDBName = "user-data";

    }

    async getAllUsers(db){
        var collection = await db.collection(this.usersDBName);
        var table = await collection.find();

        return table;
    }

    validateUser(db,user){

    }

    async insertUser(db,user){
        var collection = await db.collection(this.usersDBName);
        await collection.insertOne(user,function (err,result) {
            assert.equal(null,err);
            console.log("user inserted");
        }.bind(this))
    }
}


