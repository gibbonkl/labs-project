let sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');
let controller = require('../controllers/DailiesController');

module.exports = function(app)
{
    // route for user's dashboard
    app.route('/daily')
        .get((req, res) => {
            
            controller.listDailies(req)
            res.render('dashboard');
        })
        .post(sessionCheckerRedLogin, (req,res) => {
            // controller adicionar nova daily
            
            controller.addDaily(req)
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