var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var path = require('path');

var sessionExpress = require('./session-express');


module.exports = function() {

    var app = express();

    app.use(express.static('app/'));
<<<<<<< HEAD

    // initialize body-parser to parse incoming parameters requests to req.body
    app.use(bodyParser.urlencoded({ extended: true }));

    // configura a sessão
    app = sessionExpress(app);

=======
    app.use("/dao",express.static('infra/dao'))
>>>>>>> login_dao
    consign({ cwd: 'app' })
        .include('routes')
        .into(app);

    return app;
}