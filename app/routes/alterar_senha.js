let Model = require("../models/schema_usuario");
var UserDAO = require('../infra/dao/UserDao');
var sessionChecker = require('../helper/sessionChecker');

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
        .get( (req, res) => {
            res.send(req.session.user.username);
            //res.render('alterar_senha');
        })
        .post((req, res, next) => {
            let user = {
                senha: req.body.senha,
                novasenha: req.body.novasenha,
                confirmacaosenha: req.body.confirmacaosenha,
            } 

            //console.log(session.user);
            
            let userDAO = new UserDAO(Model);
            return userDAO.updatePassword(username = req.session.user.username, newPassword = user.novasenha)
                .then()
                .catch((error) => res.send("Impossível modificação de senha", error))
        });
}