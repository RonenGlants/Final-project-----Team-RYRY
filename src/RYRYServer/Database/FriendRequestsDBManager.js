const assert = require('assert');
const Utils = require('./Utils.js');

module.exports = class FriendRequestsDBManager {
    constructor() {
        this.groupsDBName = "friend-request-data";
    }

    async addRequest(db, request) {
        var collection = await db.collection(this.groupsDBName);
        var isExists = await this.isRequestExists(collection, request);

        if (!isExists) {
            await collection.insertOne(request, function (err, result) {
                assert.equal(null, err);
            });
            console.log("request inserted");
            return true;
        }
        else {
            console.log("request exists!!!!!");
            return false;
        }
    }

    async getRequests(db, adminId) {
        var collection = await db.collection(this.groupsDBName);
        let allAdminsRequests = await Utils.find(collection, {adminId: adminId});

        return allAdminsRequests;
    }

    async isRequestExists(collection, request) {
        var resultTable = await Utils.find(collection, request);

        return resultTable.length != 0;
    }
}
