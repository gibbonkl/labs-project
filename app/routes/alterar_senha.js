let Model = require("../models/schema_usuario");
var UserDAO = require('../infra/dao/UserDao');
var sessionChecker = require('../helper/sessionChecker');

/*
FALTA COLOCAR O SESSIO CHECKER LOGOUT
*/

module.exports = function (app) {
    //middleware de validação
    app.use('/alterar_senha', (req, res, next) => {
        if (req.method == 'POST') {

            let user = {
                senha: req.body.senha,
                novasenha: req.body.novasenha,
                confirmacaosenha: req.body.confirmacaosenha,
                erros: [],
                invalidClass: '',
            }

            if (!user.senha || !user.novasenha || !user.confirmacaosenha || (user.novasenha != user.confirmacaosenha)) {

                temErro = true;
                user.invalidClass = 'invalid';

                res.send("Impossível alteração de senha");
            }
            else {
                next();
            }
        }
        else {
            next();
        }
    });

    // rota para alterar senha
    app.route('/alterar_senha')
        //COLOCAR O SESSION CHECKER COMO PRIMEIRO ´PARAMETRO DO GET
        .get((req, res) => {
            res.render('alterar_senha');
        })
        .post((req, res, next) => {
            let user = {
                senha: req.body.senha,
                novasenha: req.body.novasenha,
                confirmacaosenha: req.body.confirmacaosenha,
            }

            let userDAO = new UserDAO(Model);
            if (userDAO.checkPassword(req.session.user.username, user.senha)) {
                return userDAO.changePassword(username = req.session.user.username, newPassword = user.novasenha)
                    .then(res.send("Senha Alterada"))
                    .catch((error) => res.send("Impossível modificação de senha", error))
            }
            else {
                return res.send(error);
            }

        })
}