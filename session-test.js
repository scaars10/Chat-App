"use strict";
const express = require('express');
const session = require('express-session');

const app = express();
var sess = {
    secret: 'keyboard cat',
    cookie: {}
};
app.use(session(sess));
app.get('/', function(req, res, next) {
    var sessData = req.session;
    console.log(req.session);
    sessData.someAttribute = "foo";
    console.log(req.session);
    res.send('Returning with some text');
});
var server = app.listen(3000, function(){
        console.log('Port 3000');
});