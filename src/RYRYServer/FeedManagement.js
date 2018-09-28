const express = require('express'); // include express
const appLogic = require('./AppLogic');

const feedManagement = express.Router();

feedManagement.get('/usersFeeds',
    async (req, res) => {
        let userId = req.query.userId;
        let feeds = await appLogic.getFeedsByUser(userId);

        res.json(feeds);
    });

feedManagement.get('/groupsFeeds',
    async (req, res) => {
        let groupId = req.query.groupId;
        let feeds = await appLogic.getFeedsByGroup(groupId);

        res.json(feeds);
    });

feedManagement.post('/addFeed',
    async (req, res) => {
        let feedData = {
            groupId: req.query.groupId,
            userId: req.query.userId,
            feed: req.query.feedString,
        }
        let isAdded = await appLogic.addFeed(feedData);
        if (isAdded){
            res.sendStatus(200);
        }
        else {
            res.sendStatus(403);
        }
    });

module.exports = feedManagement;