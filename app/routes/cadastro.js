let sessionChecker = require('../helper/sessionChecker');
let ModeloUsuarioCadastro = require('../models/modelo_usuario_cadastro');
let ValidacaoCadastro = require('../controllers/validacao_cadastro');
let controllerCadastraUsuario = require('../controllers/controller_cadastra_usuario');

module.exports = function(app)
{
    //middleware de validação
    app.use('/cadastro', (req,res,next) => {
        if(req.method == 'POST')
        {
            console.log('Middleware Validação Cadastro');

            let modeloUsuario = new ModeloUsuarioCadastro();
            modeloUsuario.preencheAutomatico(req.body);

            let validacao = new ValidacaoCadastro(modeloUsuario);
            modeloUsuario = validacao.valida();

            if(modeloUsuario.temErro())
                res.render('cadastro', {user : modeloUsuario.getUser()});
            else
                next();
        }else
            next();
    });

    // route for user signup
    app.route('/cadastro')
        .get(sessionChecker, (req, res) => {
            let modeloUsuario = new ModeloUsuarioCadastro();
            res.render('cadastro', { user : modeloUsuario.getUser()});
        })
        .post((req, res) => {
            console.log('Rota Cadastro (metodo Post)');
            
            controllerCadastraUsuario(req)
                .then((retorno) => {
                    if( retorno.status == 'ok')
                    {
                        req.session.user = retorno.user;
                        res.redirect('/dashboard');
                    }else{
                        res.render('cadastro', { user : retorno.user});
                    }
                });
        });
}