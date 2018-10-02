const express = require('express'); // include express
const appLogic = require('./AppLogic');

const groupManagement = express.Router();

groupManagement.get('/usersGroups',
    async (req, res) => {
        let userName = req.query.userName;
        let groups = await appLogic.getGroups(userName);

        res.json(groups);
    });

groupManagement.get('/allGroups',
    async (req, res) => {
        let allGroups = await appLogic.getAllGroups();

        res.json({allGroups});
    });

groupManagement.post('/addGroup',
    async (req, res) => {
        let group = JSON.parse(req.body);
        let isAdded = await appLogic.addGroup(group);
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
        let isDeleted = await appLogic.deleteGroup(groupName);
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
        let isRemoved = await appLogic.removeUserFromGroup(groupAndUserData);

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
        let isAdded = await appLogic.addUserToGroup(groupAndUserData);

        if (isAdded){
            res.sendStatus(200);
        }
        else {
            res.sendStatus(403);
        }
    });

module.exports = groupManagement;