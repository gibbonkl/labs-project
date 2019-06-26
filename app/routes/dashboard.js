let sessionCheckerLogout = require('../helper/sessionCheckerLogout');

module.exports = function(app)
{
    // route for user's dashboard
    app.route('/dashboard')
        .get(sessionCheckerLogout, (req, res) => {
            
            console.log("DASHBOARD");
            // console.log(req.cookies);
            // console.log(req.session.user);
            res.render('dashboard');
        });

    app.route('/dashboard/daily_note/:id')
        .get(sessionCheckerLogout, (req,res) => {
            
            res.send('ok');
            console.log(req.params.id);
        })
        .post(sessionCheckerLogout, (req,res) => {
        
            console.log(req.params.id);
            // controller adicionar nova daily
        })
        .delete(sessionCheckerLogout, (req,res) => {

            // controller deletar daily
        })
        .put(sessionCheckerLogout, (req,res) => {

            // controller alterar daily
        })
}