var sessionChecker = require('../helper/sessionChecker');
const Controller = require('../controllers/LoginController')

module.exports = function(app)
{
    // route for user Login
    app.route('/login')
        .get(sessionChecker, (req, res) => {
            res.render('login', {errorMessage:''});
        })
        .post( (req, res) => {
            if (req.body.username && req.body.senha){
                
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
            }else {
                res.render('login', {errorMessage: "Os campos não podem estar vazios!"});
            }
            //next();
        });
}
    