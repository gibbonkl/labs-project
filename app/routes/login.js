var sessionChecker = require('../helper/sessionChecker');
let Model = require("../models/schema_usuario");
var UserDAO = require('../infra/dao/UserDao');

module.exports = function(app)
{
    // route for user Login
    app.route('/login')
        .get(sessionChecker, (req, res) => {
            res.render('login');
        })
        .post( (req, res, next) => {
            let user = {
                username : req.body.username,
                senha : req.body.senha
            }
            console.log(user);
            
            let userDAO = new UserDAO(Model);
            userDAO.login(user.username,user.senha,'')
                .then((user) => 
                {
                    if(user)
                    {
                        //console.log(user);
                        req.session.user = user;
                        res.redirect('/dashboard');
                    }
                    else
                    {
                        res.redirect('/login');
                    }
                    next();
                })
                .catch((error) => 
                {
                    console.error;
                    res.redirect('/login');
                });
        });
    
}