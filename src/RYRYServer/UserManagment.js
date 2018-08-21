const express = require('express'); // include express
const appLogic = require('./AppLogic');

const userManagement = express.Router();

userManagement.post('/loginUser',
    (req, res) => {
        let userName = JSON.parse(req.body).userName;
        let password = JSON.parse(req.body).userPassword;
        appLogic.loginUser(userName, password);
    });

//todo: set status with meaning to numbers

module.exports = userManagement;