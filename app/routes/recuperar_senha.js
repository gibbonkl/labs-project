
const Controller = require("../controllers/RecuperarSenhaController");
const passwordController = new Controller();

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
           passwordController.recoveryPassword(user.username,user.email)
            .then(response => 
                response? res.send('Email enviado com sucesso.'):res.send('Não foi possível enviar o email.')
            )
            .catch(error=> res.send('Ocorreu um erro ao enviar o email.'))
        });
    app.route('/recuperar_senha/:hash')
        .get((req,res)=>
            res.render("recuperar_senha")
        )
        .post((req,res)=>{
            const hash = req.params.hash;
            const newPassword = req.body.newPassword;
            passwordController.changePassword(hash,newPassword)
                .then(response=>
                    response? res.send("Senha alterada com sucesso.") : res.send("Não foi possível alterar a sua senha.")
                )
                .catch(error=> 
                    res.send("Ocorreu um erro ao alterar a senha.")
                );
        })
}