let sessionChecker = require('../helper/sessionChecker');
let ModeloUsuarioCadastro = require('../models/modelo_usuario_cadastro');
let ValidacaoCadastro = require('../controllers/validacao_cadastro');
let controllerCadastraUsuario = require('../controllers/controller_cadastra_usuario');

module.exports = function(app)
{
    //middleware de validação
    app.use('/cadastro', (req,res,next) => 
    {
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
            let retorno = controllerCadastraUsuario(req);
            console.log(retorno);

            // if( retorno.status == 'ok')
            // {
            //     req.session.user = retorno.user;
            //     res.redirect('/dashboard');
            // }else{
            //     res.render('cadastro', { user : retorno.user});
            // }

            // let user = new Model({
            //         nome: req.body.nome,
            //         sobrenome: req.body.sobrenome,
            //         username: req.body.username,
            //         email: req.body.email,
            //         senha: req.body.senha,
            //         imagem: req.body.imagem,
            //         data_nascimento: new Date(req.body.data_nasc)
            // });
            
            // let userDAO = new UserDAO(Model);
            // userDAO.insertUser(user)
            //     .then(user => {
            //         if(user && !user.error){
            //             req.session.user = user;
            //             res.redirect('/dashboard');
            //         }
            //         else 
            //         {
            //             let modeloUsuario = new ModeloUsuarioCadastro();
            //             modeloUsuario.preencheAutomatico(req.body);
            //             modeloUsuario.erroUsuarioExistente();
            //             res.render('cadastro', { user : modeloUsuario.getUser()});
            //         }
            //     })
            //     .catch(console.log);
        });
}

