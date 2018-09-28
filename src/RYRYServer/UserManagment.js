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

userManagement.get('/user',
    async (req, res) => {
        let userName = req.query.userName;
        let user = await appLogic.getUser(userName);
        user = user[0];
        res.json({user});
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

userManagement.post('/updateProfile',
    async (req, res) => {
        let user = JSON.parse(req.body);
        let updateStatus = await appLogic.updateUserProfile(user);
        if(updateStatus){
            res.sendStatus(200);
        }
        else{
            res.sendStatus(403);
        }
    });
module.exports = userManagement;