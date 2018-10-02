const express = require('express'); // include express
const appLogic = require('./AppLogic');

const friendRequestManagement = express.Router();

friendRequestManagement.get('/requests',
    async (req, res) => {
        let adminId = req.query.adminId;
        let requests = await appLogic.getFriendRequests(adminId);

        res.json({requests});
    });

friendRequestManagement.post('/addRequest',
    async (req, res) => {
        let request = JSON.parse(req.body);
        let isAdded = await appLogic.addFriendRequest(request);
        if (isAdded){
            res.sendStatus(200);
        }
        else {
            res.sendStatus(403);
        }
    });

friendRequestManagement.post('/deleteRequest',
    async (req, res) => {
        let request = JSON.parse(req.body);
        let isDeleted = await appLogic.removeFriendRequest(request);

        if (isDeleted){
            res.sendStatus(200);
        }
        else {
            res.sendStatus(403);
        }
    });

module.exports = friendRequestManagement;