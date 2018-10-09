const express = require('express'); // include express
const DBManager = require('./Database/DBManager.js');
let dbManager = new DBManager();

const feedManagement = express.Router();

feedManagement.get('/managersFeeds',
    async (req, res) => {
        let groupManagerId = req.query.groupManagerId;
        let feeds = await dbManager.getFeedsByUser(groupManagerId);

        res.json({feeds});
    });

feedManagement.get('/groupsFeeds',
    async (req, res) => {
        let groupName = req.query.groupName;
        let feeds = await dbManager.getFeedsByGroup(groupName);

        res.json({feeds});
    });

feedManagement.get('/groupsListFeeds',
    async (req, res) => {
        let groupsNames = req.query.groupsNames;
        let feeds = await dbManager.getFeedsByGroupsNames(groupsNames);

        res.json({feeds});
    });

feedManagement.post('/addFeed',
    async (req, res) => {
        let feed = JSON.parse(req.body);
        let isAdded = await dbManager.insertFeed(feed);
        if (isAdded){
            res.sendStatus(200);
        }
        else {
            res.sendStatus(403);
        }
    });

module.exports = feedManagement;