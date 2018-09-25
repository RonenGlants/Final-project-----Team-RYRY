const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const userManagement = require('./RYRYServer/UserManagment');
const groupManagement = require('./RYRYServer/GroupManagment');
const feedManagement = require('./RYRYServer/FeedManagment');

const app = express();

app.use(session({ secret: 'keyboard cat', cookie: {maxAge:269999999999}}));
app.use(bodyParser.text());

app.use(express.static(path.resolve(__dirname, "..", "src/components/resources")));
app.use(express.static(path.resolve(__dirname, "..", "public")));

app.use('/users', userManagement);
app.use('/groups', groupManagement);
app.use('/feeds', feedManagement);

app.listen(3000, console.log('RYRY connect available at localhost:3000'));












/*
const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const userManagement = require('./RYRYServer/UserManagment.js');

const app = express();

app.use(session({ secret: 'keyboard cat', cookie: {maxAge:269999999998}}));
app.use(bodyParser.text());

app.use(express.static(path.resolve(__dirname, "..", "public")));

// app.get('/',auth.userAuthentication, (req, res, next) => {
// 	console.log('root', req.session.id);
// 	next();
// })

app.use('/users', userManagement);

app.listen(3000, console.log('RYRY available at localhost:3000'));*/