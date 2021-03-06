const express = require('express'); // include express
const DBManager = require('./Database/DBManager.js');
let dbManager = new DBManager();

const feedManagement = express.Router();

feedManagement.get('/',
    (req, res) => {
        res.writeHead(302, {
            'Location': 'http://localhost:3000/'
        });
        res.end();
    });

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
        feeds.sort(function(a,b){
            return new Date(b.postTime) - new Date(a.postTime);
        });
        res.json({feeds});
    });

feedManagement.get('/groupsListFeeds',
    async (req, res) => {
        let groupsNames = req.query.groupsNames;
        let feeds = await dbManager.getFeedsByGroupsNames(groupsNames);
        feeds.sort(function(a,b){
            return new Date(b.postTime) - new Date(a.postTime);
        });
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