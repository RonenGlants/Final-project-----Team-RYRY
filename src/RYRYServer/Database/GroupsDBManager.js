const assert = require('assert');
const Utils = require('./Utils.js');

module.exports = class UsersDBManager {
    constructor(){
        this.groupsDBName = "group-data";
    }

    async isGroupExists(collection,groupId) {
        var resultTable = await Utils.find(collection, groupId);

        return resultTable.length != 0;
    }

    async insertGroup(db,group){
        var collection = await db.collection(this.groupsDBName);
        var isExists = await this.isGroupExists(collection,{name: group.name});

        if(!isExists) {
            await collection.insertOne(group,function (err,result) {
                assert.equal(null,err);
            });
            console.log("group inserted");
            return true;
        }
        else {
            console.log("group exists!!!!!");
            return false;
        }
    }

    async getGroupsById(db,id){
        var collection = await db.collection(this.groupsDBName);
        let cursor = await collection.find();
        let allGroups = Utils.getTableFromCursor(cursor);
        let myGroups = [];
        for(var i = 0 ; i < allGroups.length ; i++){
            for(var j = 0 ; j < allGroups[i].friends.length ; j++){
                if(allGroups[i].friends[j] == id){
                    myGroups.push(allGroups[i]);
                    break;
                }
            }
        }
        return myGroups;
    }

}


