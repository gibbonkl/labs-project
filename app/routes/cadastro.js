let Model = require("../models/schema_usuario");
var UserDAO = require('../infra/dao/UserDao');
var sessionChecker = require('../helper/sessionChecker');
var multer = require("multer");
var upload = multer();

module.exports = function(app)
{
    //middleware de validação
    app.use('/cadastro', (req,res,next) => 
    {
        if(req.method == 'POST')
        {
            console.log('validacao');

            /* fazer validação
             * Se o form estiver errado redireciona para página de cadastro com os erros
             * Se estiver correto segue para o next
             */
            let user = {
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                username: req.body.username,
                email: req.body.email,                
                data_nasc: req.body.data_nasc,
                senha: req.body.senha,
                repsenha: req.body.repsenha,
                erros : [],
                invalidClass : ''
            }
            let temErro = false;

            if(!user.nome || !user.sobrenome || !user.username || !user.email)
            {
                temErro = true;
                user.invalidClass = 'invalid';
            }
            if(!user.data_nasc || !user.senha || !user.repsenha)
            {
                temErro = true;
                user.invalidClass = 'invalid';
            }

            if(req.body.senha != req.body.repsenha)
            {
                console.log('tem erro ai');
                temErro = true;
                user.erros.push('As senhas devem ser iguais');
            }

            //outros ifs de validação

            if(temErro)
            {
                temErro = false;
                res.render('cadastro', {user : user});
            }
            else
            {
                next();
            }
        }
        else
        {
            next();
        }
    });
    // route for user signup
    app.route('/cadastro')
        .get(sessionChecker, (req, res) => {
            let user = {
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                username: req.body.username,
                email: req.body.email,                
                data_nasc: req.body.data_nasc,
                senha: req.body.senha,
                repsenha: req.body.repsenha,
                erros : [],
                invalidClass : ''
            };
            res.render('cadastro', { user : user});
        })
        .post(upload.none(),(req, res) => {
            console.log('post');
            let user = new Model({
                    nome: req.body.nome,
                    sobrenome: req.body.sobrenome,
                    username: req.body.username,
                    email: req.body.email,
                    senha: req.body.senha,
                    imagem: req.body.imagem,
                    data_nascimento: new Date(req.body.data_nasc)
            });
            
            let userDAO = new UserDAO(Model);
            userDAO.insertUser(user)
                .then(user => {
                    if(user && !user.error){
                        req.session.user = user;
                        res.redirect('/dashboard');
                    }
                    else 
                    {
                        let user = {
                            nome: req.body.nome,
                            sobrenome: req.body.sobrenome,
                            username: req.body.username,
                            email: req.body.email,                
                            data_nasc: req.body.data_nasc,
                            senha: req.body.senha,
                            repsenha: req.body.repsenha,
                            invalidClass : '',
                            erros : ['username ou email já existente']
                        };
                        res.render('cadastro', { user : user});
                    }
                })
                .catch(console.log);
            
        });
}

