let Model = require("../models/schema_usuario");
var UserDAO = require('../infra/dao/UserDao');
var sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');
/*
    *
    *   @author Karolina Gibbon feat. Diego Bastos
    * 
*/
module.exports = function (app) {
    // rota para alterar senha
    app.route('/alterar_senha')
        .get(sessionCheckerRedLogin, (req, res) => {
            let user = {
                username: req.session.user.username,
                tipo: req.session.user.tipo,
                imagem: req.session.user.imagem
            }
            res.render('alterar_senha', {user: user});
        })
        .post(sessionCheckerRedLogin, (req, res, next) => {
            let user = {
                senha: req.body.senha,
                novasenha: req.body.novasenha,
                confirmacaosenha: req.body.confirmacaosenha,
            }
            let userDAO = new UserDAO(Model);
            return userDAO.checkPassword(req.session.user.username, user.senha)
                .then(response => response ? userDAO.changePassword(username = req.session.user.username, newPassword = user.novasenha) : res.send('Senha Atual Incorreta'))
                .then(response => response ? res.send('Senha Alterada') : res.send("Não Foi Possível Alterar Sua Senha"))
                .catch((error) => res.send("Um Erro Inesperado Aconteceu"))  
        })
}