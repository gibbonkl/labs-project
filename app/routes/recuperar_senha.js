
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
            /*
                *   Tenta enviar um email para o user
                *   com a nova hash para trocar a senha
                *   @returns {string}
            */
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
            /*
                *   Tenta trocar a senha do usuário
                *   Se for possível, troca a hash do usuário
                *   no banco
                *   @returns {string}
            */
            passwordController.changePassword(hash,newPassword)
                .then(response=>
                    response? res.send("Senha alterada com sucesso.") : res.send("Não foi possível alterar a sua senha.")
                )
                .catch(error=> 
                    res.send("Ocorreu um erro ao alterar a senha.")
                );
        })
}