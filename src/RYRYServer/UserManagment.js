const express = require('express'); // include express
const appLogic = require('./AppLogic');

const userManagement = express.Router();

userManagement.post('/loginUser',
    (req, res) => {
        let userName = JSON.parse(req.body).userName;
        let password = JSON.parse(req.body).userPassword;
        if (appLogic.loginUser(userName, password)){
            console.log("user inserted 200");
            res.sendStatus(200);
        }
        else{
            console.log("failed to insert user 401");
            res.sendStatus(401);
        }
    });

//todo: set status with meaning to numbers

module.exports = userManagement;