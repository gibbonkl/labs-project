let Model = require("../models/schema_usuario");
var UserDAO = require('../infra/dao/UserDao');
const email = require("../helper/sendEmail");
const onSucess = "E-mail enviado com sucesso. Favor verificar sua caixa de entrada.";
const onError = "Não foi possível alterar a sua hash. Favor verificar as informações fornecidas.";
const onFail = "Tivemos um problema com o nosso sistema. Tente novamente mais tarde.";
module.exports = function(app)
{
    // route for user Login
    app.route('/recuperar_senha')
        .get((req, res) => {
            res.render("recuperar_senha");
        })
        .post((req, res, next) => {
            let user = {
                username: req.body.modal_username,
                email: req.body.modal_email
            }
            let userDAO = new UserDAO(Model);
            userDAO.updateHash(user.username,user.email,'')
                .then((hash) =>{ 
                    if(hash){
                        email.send(user.email,hash)
                        res.redirect('/login');
                    }
                    else res.redirect('/login');
                })
                .catch((error) => 
                {
                    console.error;
                    res.redirect('/login');
                });
        });
    
}