const express = require('express'); // include express
const appLogic = require('./AppLogic');

const groupManagement = express.Router();

groupManagement.get('/usersGroups',
    async (req, res) => {
        let userName = req.query.userName;
        let groups = await appLogic.getGroups(userName);

        groups = groups[0];
        res.json(groups);
    });

module.exports = groupManagement;