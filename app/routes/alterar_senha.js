let Model = require("../models/schema_usuario");
var UserDAO = require('../infra/dao/UserDao');
var sessionChecker = require('../helper/sessionChecker');

module.exports = function (app) {
    //middleware de validação
    app.use('/alterar_senha', (req, res, next) => {
        if (req.method == 'POST') {
            //validar campos redirecionar pra alt senha
        }
        else {
            next();
        }
    });
    // route for user signup
    app.route('/alterar_senha')
        .get(sessionChecker, (req, res) => {
            res.render('alterar_senha');
        })
        .post((req, res) => {
            //passar body da requisicao 

        });
}