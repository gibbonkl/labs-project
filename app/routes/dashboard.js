let sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');

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
        .post(sessionCheckerRedLogin, (req,res) => {
        
            console.log(req.params.id);
            // controller adicionar nova daily
        })
        .delete(sessionCheckerRedLogin, (req,res) => {

            // controller deletar daily
        })
        .put(sessionCheckerRedLogin, (req,res) => {

            // controller alterar daily
        })
}