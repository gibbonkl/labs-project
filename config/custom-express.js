var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var path = require('path');
var sessionExpress = require('./session-express');

module.exports = function() {

    var app = express();

    app.use(express.static('app/'));

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, './../app/views/'));

    app.use(express.static(path.join(__dirname, './../app/public/js/daily')));

    
    console.log(path.join(__dirname + './../app'));
    
    app.use(express.json());

    // initialize body-parser to parse incoming parameters requests to req.body
    app.use(bodyParser.urlencoded({ extended: true }));

    // configura a sessão
    app = sessionExpress(app);

    consign({ cwd: 'app' })
        .include('routes')
        .into(app);

    return app;
}