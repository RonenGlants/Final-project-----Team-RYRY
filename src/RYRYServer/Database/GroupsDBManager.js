const assert = require('assert');
const Utils = require('./Utils.js');

module.exports = class UsersDBManager {
    constructor() {
        this.groupsDBName = "group-data";
    }

    async isGroupExists(collection, group) {
        var resultTable = await Utils.find(collection, {name: group.name});

        return resultTable.length != 0;
    }

    async insertGroup(db, group) {
        var collection = await db.collection(this.groupsDBName);
        var isExists = await this.isGroupExists(collection, group);

        if (!isExists) {
            await collection.insertOne(group, function (err, result) {
                assert.equal(null, err);
            });
            console.log("group inserted");
            return true;
        }
        else {
            console.log("group exists!!!!!");
            return false;
        }
    }

    async getGroupsById(db, id) {
        var collection = await db.collection(this.groupsDBName);
        let cursor = await collection.find();
        let allGroups = await Utils.getTableFromCursor(cursor);
        let myGroups = [];
        for (var i = 0; i < allGroups.length; i++) {
            let amoutOfFriends = allGroups[i].friends ? allGroups[i].friends.length : 0;
            for (var j = 0; j < amoutOfFriends; j++) {
                if (allGroups[i].friends[j] == id) {
                    myGroups.push(allGroups[i]);
                    break;
                }
            }
        }
        return myGroups;
    }

    async getGroupById(db, id){
        var collection = await db.collection(this.groupsDBName);

    }
}


