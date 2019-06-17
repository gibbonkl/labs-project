let Model = require("../models/schema_usuario");
var userDAO = require('../infra/dao/UserDao');
var sessionChecker = require('../helper/sessionChecker');
var multer = require("multer");
var upload = multer();
// Esse Array não existirá, ele foi criado aqui apenas para testar a sessão
const User = [{username: 'user', password: 'user'}, {username: 'user', password: '123'}];

module.exports = function(app)
{
    // route for user signup
    app.route('/cadastro')
        .get(sessionChecker, (req, res, next) => {
            res.sendFile('cadastro.html', { root: './app/views/cadastro' });
        })
        .post(upload.none(),(req, res) => {
            // Nessa parte o DAO será acionado para gravar um novo usuário
            /*User.push({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            try //Se o usuario for cadastrado corretamente será criado uma sessão para ele
            // {
            //     var user = User[User.length -1];

            //     console.log(user);
            //     req.session.user = user;
            //     res.redirect('/dashboard');
            // }
            catch //Se for rejeitado voltara para página de signup
            {
                res.redirect('/cadastro');
            }
            */
            console.log(req.body);
        //    let user = new Model({
        //         nome: req.body.login_name,
        //         sobrenome: req.body.login_lastname,
        //         username: req.body.login_login,
        //         email: req.body.login_email,
        //         senha: req.body.login_senha,
        //         imagem: req.body.imagem,
        //         data_nascimento: new Date(req.body.login_date)
        //     });

        //     userDAO = new userDAO(Model);
        //     userDAO.insertUser(user)
        //         .then(user => {
        //             if(user && !user.error){
        //                 req.session.user = user;
        //                 res.redirect('/dashboard');
        //             }
        //             else {
        //                 res.redirect('/cadastro');
        //             }
        //         })
        //         .catch();

        });
}

