const express = require('express'); // include express
const appLogic = require('./AppLogic');

const userManagement = express.Router();

userManagement.post('/signUpUser',
    async (req, res) => {
        let user = JSON.parse(req.body);
        let isSignUp = await appLogic.signUpUser(user);
        if(isSignUp){
            res.sendStatus(200);
        }
        else{
            res.sendStatus(403);
        }
    });

userManagement.get('/fullName',
    async (req, res) => {
        let userName= JSON.parse(req.body);
        let user = await appLogic.getUser(userName);

        res.json({firstName:user.firstName});

/*
        if(isSignUp){
            res.sendStatus(200);
        }
        else{
            res.sendStatus(403);
        }
   */
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