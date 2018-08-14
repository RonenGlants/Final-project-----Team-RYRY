const express = require('express'); // include express
const appLogic = require('./AppLogic');

const userManagement = express.Router();

userManagement.post('/loginUser',
    (req, res) => {
        let userName = JSON.parse(req.body).userName;
        let password = JSON.parse(req.body).userPassword;
        if (appLogic.loginUser(userName, password))
            res.sendStatus(200);
        else
            res.sendStatus(401);
    });

//todo: set status with meaning to numbers

module.exports = userManagement;