const assert = require('assert');
const Utils = require('./Utils.js');

module.exports = class UsersDBManager {
    constructor(){
        this.usersDBName = "user-data";
    }

    async getAllUsers(db){
        var collection = await db.collection(this.usersDBName);
        var table = await collection.find();

        return table;
    }

    async isUserExists(collection,user) {
        var resultTable = await Utils.find(collection, {userName: user.userName});

        return resultTable.length != 0;
    }

    async isUserAuthenticated(collection, user) {
        var resultTable = await Utils.find(collection, {userName: user.userName, password: user.userPassword});

        return resultTable.length != 0;
    }

    async insertUser(db,user){
        var collection = await db.collection(this.usersDBName);
        var isExists = await this.isUserExists(collection,user.userName);

        if(!isExists) {
           await collection.insertOne(user,function (err,result) {
               assert.equal(null,err);
           });
            console.log("user inserted");
            return true;
        }
        else {
            console.log("user exists!!!!!");
            return false;
        }
    }

    async getUserById(db,id){
        var collection = await db.collection(this.usersDBName);
        let user = await Utils.find(collection,{userName: id});
        return user;
    }

    async loginUser(db, user) {
        var collection = await db.collection(this.usersDBName);
        var isExists = await this.isUserAuthenticated(collection, user);

        if(!isExists){
            console.log("Authentication failed - user or password doesn't appear in DB")
            return false;
        }
        else{
            console.log("Authentication success - user and password appear in DB")
            return true;
        }
    }

    async updateUser(db,user){
        var collection = await db.collection(this.usersDBName);
        let status = await Utils.update(
            collection,
            { userName: user.userName },
            {                            // replace object
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.userPassword,
                email: user.email,
                gender: user.gender,
                mySkills: user.mySkills,
                desiredSkills: user.desiredSkills,
                avatarNumber: user.avatarNumber,
            }
            );
        return status;
    }

    async deleteAll(db) {
        var collection = await db.collection(this.usersDBName);

        await collection.remove({});
        console.log("user-data removed");
        return true;
    }
}


