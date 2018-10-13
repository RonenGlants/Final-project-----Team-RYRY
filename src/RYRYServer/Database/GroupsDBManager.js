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

    async addUserToGroup(db, groupAndUserData) {
        var collection = await db.collection(this.groupsDBName);
        var query = {name: groupAndUserData.groupName};
        var relevantGroupInArray = await Utils.find(collection, query);

        if (relevantGroupInArray.length == 0) {
            return false;
        }

        var relevantGroup = relevantGroupInArray[0];

        for (var i = 0; i < relevantGroup.friends.length; i++) {
            if (relevantGroup.friends[i] == groupAndUserData.userId) {
                return false;
            }
        }

        relevantGroup.friends.push(groupAndUserData.userId);
        Utils.update(collection, query, relevantGroup);

        return true;
    }

    async removeUserFromGroup(db, groupAndUserData) {
        var collection = await db.collection(this.groupsDBName);
        var query = {name: groupAndUserData.groupName};
        var relevantGroupInArray = await Utils.find(collection, query);

        if (relevantGroupInArray.length == 0) {
            return false;
        }

        var relevantGroup = relevantGroupInArray[0];

        if(relevantGroup.manager === groupAndUserData.userId)
        {
            return false;
        }

        for (var i = 0; i < relevantGroup.friends.length; i++) {
            if (relevantGroup.friends[i] == groupAndUserData.userId) {
                relevantGroup.friends.splice(i, 1);
                Utils.update(collection, query, relevantGroup);

                return true;
            }
        }

        return false;
    }

    async deleteGroup(db, groupName){
        var query = {name: groupName};
        var collection = await db.collection(this.groupsDBName);
        var isExists = await this.isGroupExists(collection, query);

        if (isExists) {
            await collection.remove(query);
            console.log("group deleted");
            return true;
        }
        else {
            console.log("group does not exist!!!!!");
            return false;
        }
    }

    async getAllGroups(db) {
        var collection = await db.collection(this.groupsDBName);
        return await Utils.find(collection, {});
    }

    async deleteAll(db) {
        var collection = await db.collection(this.groupsDBName);

        await collection.remove({});
        console.log("group-data removed");
        return true;
    }
}


