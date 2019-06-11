var express = require('express');
var consign = require('consign');
var path = require('path');


module.exports = function() {

    var app = express();

    app.use(express.static('public/'));  

    consign({cwd: 'public'})
    .include('controllers')
    .into(app);

    return app;
}