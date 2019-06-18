let Model = require("../models/schema_usuario");
var UserDAO = require('../infra/dao/UserDao');
var sessionChecker = require('../helper/sessionChecker');
var multer = require("multer");
var upload = multer();

module.exports = function(app)
{
    // route for user signup
    app.route('/cadastro')
        .get(sessionChecker, (req, res, next) => {
            res.sendFile('cadastro.html', { root: './app/views/cadastro' });
        })
        .post(upload.none(),(req, res) => {
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
                    else {
                        res.redirect('/cadastro');
                    }
                })
                .catch(console.log);
            
        });
}

