var sessionChecker = require('../helper/sessionChecker');

// Esse Array não existirá, ele foi criado aqui apenas para testar a sessão
const User = [{username: 'user', password: 'user'}, {username: 'user', password: '123'}];

module.exports = function(app)
{
    // route for user Login
    app.route('/login')
        .get(sessionChecker, (req, res) => {
            res.sendFile('login.html', { root: './app/views' });
        })
        .post((req, res) => {
            var username = req.body.username,
                password = req.body.password;

            //Essa busca será feita pelo DAO
            if( (User[0].username == username) && (User[0].password == password))
            {
                req.session.user = User[0];
                res.redirect('/dashboard');
            }
            else
            {
                res.redirect('/login');
            }
        });
}