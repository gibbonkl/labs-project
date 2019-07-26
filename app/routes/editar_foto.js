let sessionCheckerRedDash = require('../helper/sessionCheckerRedDash');
let controllerCadastraUsuario = require('../controllers/controller_cadastra_usuario');
const multer = require("multer");
var upload = multer({dest: 'app/public/binary'});
let Model = require("../models/schema_usuario");
var UserDAO = require('../infra/dao/UserDao');
var sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');

module.exports = function (app) {
    // rota para editar perfil
    app.route('/editar_foto')
        .get(sessionCheckerRedLogin, (req, res) => {
            let user = {
                username: req.session.user.username,
                tipo: req.session.user.tipo,
                imagem: req.session.user.imagem
            }
            res.render('editar_foto', {user: user});
        })
}