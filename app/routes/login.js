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
        .post( (req, res, next) => {
            let user = {
                username : req.body.username,
                senha : req.body.senha
            }
            
            let userDAO = new UserDAO(Model);
            userDAO.login(user.username,user.senha,'')
                .then((user) => 
                {
                    if(user)
                    {
                        //console.log(user);
                        req.session.user = user;
                        
                        res.writeHead(301,
                            {Location: '/dashboard'}
                          );
                        res.end();
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