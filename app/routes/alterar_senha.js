let Model = require("../models/schema_usuario");
var UserDAO = require('../infra/dao/UserDao');
var sessionChecker = require('../helper/sessionChecker');

module.exports = function(app)
{
    //middleware de validação
    app.use('/alterar_senha', (req,res,next) => 
    {
        if(req.method == 'POST')
        {
            
        }
        else
        {
            next();
        }
    });
    // route for user signup
    app.route('/alterar_senha')
        .get(sessionChecker, (req, res) => {
            
            res.render('alterar_senha');
        })
        .post((req, res) => {
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
                            erros : ['username ou email já existente']
                        };
                        res.render('cadastro', { user : user});
                    }
                })
                .catch(console.log);
            
        });
}

