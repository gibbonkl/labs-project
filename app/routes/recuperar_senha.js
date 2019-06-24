let Model = require("../models/schema_usuario");
var UserDAO = require('../infra/dao/UserDao');
const email = require("../helper/sendEmail");
module.exports = function(app)
{
    // route for user Login
    app.route('/recuperar_senha')
        .get((req, res) => {
            res.render("recuperar_senha");
        })
        .post((req, res, next) => {
            let user = {
                username: req.body.username,
                email: req.body.email
            }
            let userDAO = new UserDAO(Model);
            return userDAO.updateHash(user.username,user.email)
                .then(hash =>{
                    if(hash){
                        console.log("ENTREI NO HASH");
                        email.send(user.email,hash)
                            .then(res.send("ok"))
                            .catch(error => res.send("error"))
                    }
                    else res.send("error")
                })
                .catch((error) => res.send("error"));
        });
    
}