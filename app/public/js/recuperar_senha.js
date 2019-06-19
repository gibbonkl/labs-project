let Model = require("../models/schema_usuario");
var UserDAO = require('../infra/dao/UserDao');
const onSucess = "E-mail enviado com sucesso. Favor verificar sua caixa de entrada."
const onError = "Não foi possível alterar a sua hash. Favor verificar as informações fornecidas."
const onFail = "Tivemos um problema com o nosso sistema. Tente novamente mais tarde."
module.exports = function(app)
{
    // route for user Login
    app.route('/recuperar_senha')
        .get((req, res) => {
            res.render("<view>",{message:""});
        })
        .post((req, res, next) => {
            let dados = {
                user: req.body.username,
                email: req.body.email
            }
            
            let userDAO = new UserDAO(Model);
            userDAO.updateHash(user.username,user.senha,'')
                .then((hash) => 
                    hash? res.render('<view>',{message: onSucess}) : res.render('view',{message:onError})
                )
                .catch((error) => 
                {
                    console.error;
                    res.render('<view>',{message: onFail})
                });
        });
    
}