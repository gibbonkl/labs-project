var userDAO = require('../infra/dao/UserDao');
var sessionChecker = require('../helper/sessionChecker');

// Esse Array não existirá, ele foi criado aqui apenas para testar a sessão
const User = [{username: 'user', password: 'user'}, {username: 'user', password: '123'}];

module.exports = function(app)
{
    // route for user signup
    app.route('/signup')
        .get(sessionChecker, (req, res, next) => {
            res.sendFile('signup.html', { root: './app/views' });
        })
        .post((req, res) => {
            // Nessa parte o DAO será acionado para gravar um novo usuário
            User.push({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            try //Se o usuario for cadastrado corretamente será criado uma sessão para ele
            {
                var user = User[User.length -1];

                console.log(user);
                req.session.user = user;
                res.redirect('/dashboard');
            }
            catch //Se for rejeitado voltara para página de signup
            {
                res.redirect('/signup');
            }

        });
}