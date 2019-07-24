let Model = require("../models/schema_usuario");
var UserDAO = require('../infra/dao/UserDao');
var sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');

module.exports = function (app) {
    // rota para editar perfil
    app.route('/editar_perfil')
        .get(sessionCheckerRedLogin, (req, res) => {
            let user = {
                username: req.session.user.username,
                tipo: req.session.user.tipo,
                imagem: req.session.user.imagem
            }
            res.render('editar_perfil', {user: user});
        })
        .post(sessionCheckerRedLogin, (req, res, next) => {
            let user = {
                senha: req.body.senha
            }
            let userDAO = new UserDAO(Model);
            return userDAO.checkPassword(req.session.user.username, user.senha)
                .then(response => response ? res.send('Senha atual correta') : res.send('Senha atual incorreta'))
                .catch((error) => res.send("Um erro inesperado aconteceu"))  
        })
}