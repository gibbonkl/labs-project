
const Controller = require("../controllers/RecuperarSenhaController");
module.exports = function(app)
{
    /*
        *
        *   Rota para recuperação de senha
        * 
    */
    app.route('/recuperar_senha')
        .get((req, res) => 
            res.render("recuperar_senha")
        )
        .post((req, res, next) => {
            let user = {
                username: req.body.username,
                email: req.body.email
            };
           let passwordController = new Controller(user);
           passwordController.recoveryPassword(user.username,user.email)
            .then(response => 
                response? res.send('Email enviado com sucesso.'):res.send('Não foi possível enviar o email.')
            )
            .catch(error=> res.send('Ocorreu um erro ao enviar o email.'))
        })
}