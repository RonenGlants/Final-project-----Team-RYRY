const express = require('express'); // include express
const DBManager = require('./Database/DBManager.js');
let dbManager = new DBManager();

const groupManagement = express.Router();

groupManagement.get('/',
    (req, res) => {
        res.writeHead(302, {
            'Location': 'http://localhost:3000/'
        });
        res.end();
    });

groupManagement.get('/usersGroups',
    async (req, res) => {
        let userName = req.query.userName;
        let groups = await dbManager.getGroupsById(userName);

        res.json(groups);
    });

groupManagement.get('/allGroups',
    async (req, res) => {
        let allGroups = await dbManager.getAllGroups();

        res.json({allGroups});
    });

groupManagement.post('/addGroup',
    async (req, res) => {
        let group = JSON.parse(req.body);
        let isAdded = await dbManager.insertGroup(group);
        if (isAdded){
            res.sendStatus(200);
        }
        else {
            res.sendStatus(403);
        }
    });

groupManagement.post('/deleteGroup',
    async (req, res) => {
        let groupName = JSON.parse(req.body);
        let isDeleted = await dbManager.deleteGroup(groupName);
        if (isDeleted){
            res.sendStatus(200);
        }
        else {
            res.sendStatus(403);
        }
    });

groupManagement.post('/removeUserFromGroup',
    async (req, res) => {
        let groupAndUserData = JSON.parse(req.body);
        let isRemoved = await dbManager.removeUserFromGroup(groupAndUserData);

        if (isRemoved){
            res.sendStatus(200);
        }
        else {
            res.sendStatus(403);
        }
    });

groupManagement.post('/addUserToGroup',
    async (req, res) => {
        let groupAndUserData = JSON.parse(req.body);
        let isAdded = await dbManager.addUserToGroup(groupAndUserData);

        if (isAdded){
            res.sendStatus(200);
        }
        else {
            res.sendStatus(403);
        }
    });

groupManagement.post('/removeUserToGroup',
    async (req, res) => {
        let groupAndUserData = JSON.parse(req.body);
        let isAdded = await dbManager.removeUserFromGroup(groupAndUserData);

        if (isAdded){
            res.sendStatus(200);
        }
        else {
            res.sendStatus(403);
        }
    });

module.exports = groupManagement;