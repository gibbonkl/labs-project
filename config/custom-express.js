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

    app.get('*', function(req, res){

        if (req.session.user && req.cookies.user_sid)
            var user = { username: req.session.user.username, tipo: req.session.user.tipo, imagem: req.session.user.imagem, nome: req.session.user.nome }
        else
            var user = { username: '', tipo: '', imagem: '', nome: '' }
        res.status(404).render('404_template', {user: user, title: "Página não encontrada"});
    });

    return app;
}