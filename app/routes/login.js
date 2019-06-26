var sessionCheckerRedDash = require('../helper/sessionCheckerRedDash');
const Controller = require('../controllers/LoginController')

module.exports = function(app)
{
    // route for user Login
    app.route('/login')
        .get(sessionCheckerRedDash, (req, res) => {
            res.render('login', {errorMessage:''});
        })
        .post(sessionCheckerRedDash, (req, res) => {

            Controller.validateUser(req.body.username, req.body.senha)
                .then((user)=>{
                    //console.log(user);
                    if(user.status == 'ok'){
                        req.session.user = user.user;
                        res.redirect('/dashboard');
                    }
                    else{
                        res.render('login', {errorMessage: user.status});
                    }
                    
                })
                .catch((err)=>console.log(err));
          
            //next();
        });
}
    