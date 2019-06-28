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
        .post(sessionCheckerRedLogin, (req,res) => {
            // controller adicionar nova daily
            
            controllerAdicionarDaily(req)
            .then(retorno => {
                if(!retorno)
                    res.send('erro');
            })
            .catch(retorno => {
                if(!retorno)
                    res.send('erro');
            });
        })
        .delete(sessionCheckerRedLogin, (req,res) => {

            // controller deletar daily
        })
        .put(sessionCheckerRedLogin, (req,res) => {

            // controller alterar daily
        })
}