let sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');
let controller = require('../controllers/DailiesController');

module.exports = function(app)
{
    // route for user's dashboard
    app.route('/')
        .get((req, res) => {
    
            console.log("DASHBOARD");
            
            //let count = controller.numberOfDailies()
            
            if (req.session.user && req.cookies.user_sid) {

                let user = {
                    username: req.session.user.username,
                    tipo: req.session.user.tipo
                }

                res.render('dashboard', user);
            } else {

                let user = {
                    username: '',
                    tipo: ''
                }
                res.render('dashboard', user);                
            }      
        })
}