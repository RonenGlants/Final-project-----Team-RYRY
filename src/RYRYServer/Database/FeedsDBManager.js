const assert = require('assert');
const Utils = require('./Utils.js');

module.exports = class FeedsDBManager {
    constructor() {
        this.feedsDBName = "feed-data";
    }

    async insertFeed(feedData) {
        var newDate = new Date();
        var datetime = newDate.today() + "@" + newDate.timeNow();
        var collection = await db.collection(this.feedsDBName);

        feedData.postTime = datetime;

        await collection.insertOne(feedData, function (err, result) {
            assert.equal(null, err);
        });
        console.log("feed inserted");

        return true;
    }

    async getFeedsByGroup(db, groupId) {
        var collection = await db.collection(this.usersDBName);
        var feeds = await Utils.find(collection, {groupId: groupId});

        return feeds;
    }

    async getFeedsByUser(db, userId) {
        var collection = await db.collection(this.usersDBName);
        var feeds = await Utils.find(collection, {userId: userId});

        return feeds;
    }
}


