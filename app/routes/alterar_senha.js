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
            let promise = userDAO.checkPassword(req.session.user.username, user.senha)
                .then(res => {userDAO.changePassword(username = req.session.user.username, newPassword = user.novasenha)
                        return res.send("Senha Alterada!");
                    })
                .catch((res) => { return res.send("Erro!")}) 
            return promise;      
        })

}