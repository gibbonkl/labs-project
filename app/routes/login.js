var sessionChecker = require('../helper/sessionChecker');
let Model = require("../models/schema_usuario");
var UserDAO = require('../infra/dao/UserDao');

module.exports = function(app)
{
    // route for user Login
    app.route('/login')
        .get(sessionChecker, (req, res) => {
            res.sendFile('login.html', { root: './app/views/login' });
        })
        .post((req, res) => {
            let user = {
                email : req.body.email,
                senha : req.body.senha
            }

            let userDAO = new UserDAO(Model);
            userDAO.login(user.email, user.senha)
                .then((user) => 
                {
                    req.session.user = user;
                    res.redirect('/dashboard');
                })
                .catch((error) => 
                {
                    console.error;
                    res.redirect('/login');
                });
        });
}