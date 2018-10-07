const express = require('express'); // include express
const DBManager = require('./Database/DBManager.js');
let dbManager = new DBManager();

const userManagement = express.Router();

userManagement.post('/signUpUser',
    async (req, res) => {
        let body = JSON.parse(req.body);
        let isSignUp = await dbManager.insertUser(body.newUser);
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
        let user = await dbManager.getUserById(userName);
        user = user[0];
        res.json({user});
    });

userManagement.get('/friends',
    async (req, res) => {
        let friendsIds = req.query.friendsIds;
        let friends = await dbManager.getFriends(friendsIds);

        res.json({friends});
    });

userManagement.post('/loginUser',
    async (req, res) => {
        let user = JSON.parse(req.body);
        let isLoggedIn = await dbManager.loginUser(user);

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
        let updateStatus = await dbManager.updateUserProfile(user);
        if(updateStatus){
            res.sendStatus(200);
        }
        else{
            res.sendStatus(403);
        }
    });

module.exports = userManagement;