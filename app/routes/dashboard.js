let sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');
let controllerAdicionarDaily = require('../controllers/adicionar_nova_daily');

module.exports = function(app)
{
    // route for user's dashboard
    app.route('/')
        .get((req, res) => {
            
            console.log("DASHBOARD");
            // console.log(req.cookies);
            // console.log(req.session.user);
            res.render('dashboard');
        })
}