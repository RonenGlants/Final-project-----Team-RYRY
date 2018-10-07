const assert = require('assert');
const Utils = require('./Utils.js');

module.exports = class FeedsDBManager {
    constructor() {
        this.feedsDBName = "feed-data";
    }

    async insertFeed(db, feedObj) {
        var currentDate = new Date();
        var collection = await db.collection(this.feedsDBName);

        feedObj.postTime = currentDate;

        await collection.insertOne(feedObj, function (err, result) {
            assert.equal(null, err);
        });
        console.log("feed inserted");

        return true;
    }

    async getFeedsByGroup(db, groupName) {
        var collection = await db.collection(this.feedsDBName);
        var feeds = await Utils.find(collection, {groupName: groupName});

        return feeds || [];
    }

    async getFeedsByUser(db, userId) {
        var collection = await db.collection(this.feedsDBName);
        var feeds = await Utils.find(collection, {groupManagerId: userId});

        return feeds;
    }
}

