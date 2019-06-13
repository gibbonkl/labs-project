var express = require('express');
var consign = require('consign');
var path = require('path');


module.exports = function() {

    var app = express();

    app.use(express.static('app/'));

    consign({ cwd: 'app' })
        .include('routes')
        .into(app);

    return app;
}