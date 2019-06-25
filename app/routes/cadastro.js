let sessionChecker = require('../helper/sessionChecker');
let captcha_render = require('../helper/recaptcha_render');
let captcha_verify = require('../helper/recaptcha_verify');
let ModeloUsuarioCadastro = require('../models/modelo_usuario_cadastro');
let ValidacaoCadastro = require('../controllers/validacao_cadastro');
let controllerCadastraUsuario = require('../controllers/controller_cadastra_usuario');

module.exports = function(app)
{
    //middleware de validação
    app.use('/cadastro', captcha_verify, captcha_render, (req,res,next) => {
        if(req.method == 'POST')
        {
            console.log('Middleware Validação Cadastro');

            let modeloUsuario = new ModeloUsuarioCadastro();
            modeloUsuario.preencheAutomatico(req.body);

            
            let validacao = new ValidacaoCadastro(modeloUsuario);
            modeloUsuario = validacao.valida();
            
            if (req.recaptcha.error) 
            {
                modeloUsuario.erros.push('erro recaptcha');
                res.render('cadastro', {user : modeloUsuario.getUser(), captcha:res.recaptcha});
            } 
            else if(modeloUsuario.temErro())
                res.render('cadastro', {user : modeloUsuario.getUser(), captcha:res.recaptcha});
            else
                next();
        }else
            next();
    });

    // route for user signup
    app.route('/cadastro')
        .get(sessionChecker, captcha_render, (req, res) => {
            let modeloUsuario = new ModeloUsuarioCadastro();
            res.render('cadastro', { user : modeloUsuario.getUser(), captcha:res.recaptcha});
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
                    res.render('cadastro', { user : retorno.user, captcha:res.recaptcha});
                }
            }); 
        });
}