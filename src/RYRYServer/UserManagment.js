const express = require('express'); // include express
const appLogic = require('./AppLogic');

const userManagement = express.Router();

userManagement.post('/signUpUser',
    async (req, res) => {
        let body = JSON.parse(req.body);
        let isSignUp = await appLogic.signUpUser(body.newUser);
        if(isSignUp){
            res.sendStatus(200);
        }
        else{
            res.sendStatus(403);
        }
    });

userManagement.post('/loginUser',
    async (req, res) => {
        let user = JSON.parse(req.body);
        let isLoggedIn = await appLogic.loginUser(user);
        if (isLoggedIn){
            res.sendStatus(200);
        }
        else {
            res.sendStatus(403);
        }
    });

//todo: set status with meaning to numbers

module.exports = userManagement;