let Model = require("../models/schema_usuario");
var UserDAO = require('../infra/dao/UserDao');
var sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');

module.exports = function (app) {
    // rota para alterar senha
    app.route('/alterar_senha')
        .get(sessionCheckerRedLogin, (req, res) => {
            res.render('alterar_senha');
        })
        .post(sessionCheckerRedLogin, (req, res, next) => {
            let user = {
                senha: req.body.senha,
                novasenha: req.body.novasenha,
                confirmacaosenha: req.body.confirmacaosenha,
            }

            let userDAO = new UserDAO(Model);
            if (userDAO.checkPassword(req.session.user.username, user.senha)) {
                return userDAO.changePassword(username = req.session.user.username, newPassword = user.novasenha)
                    .then(res.send("Senha Alterada"))
                    .catch((error) => res.send("Impossível modificação de senha"))
            }
            else {
                return res.send("Erro inesperado");
            }

        })
}