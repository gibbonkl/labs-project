let sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');
let controller = require('../controllers/DailiesController');

module.exports = function(app)
{
    // route for user's dashboard
    app.route('/daily')
        .get((req, res) => {
            
            controller.listDailies(req)
                .then(res.send(dailies))
                .catch(console.error)
        })
        .post(sessionCheckerRedLogin, (req,res) => {
            // controller adicionar nova daily
            
            controller.addDaily(req)
                .then(retorno => {
                    if(!retorno)
                        res.send('erro');
                    else{
                        res.send(retorno)
                    }
            })
            .catch(console.error);
        })
        .delete(sessionCheckerRedLogin, (req,res) => {

            controller.deleteDaily(req)
                .then(retorno => {
                    if(!retorno)
                        res.send('erro');
                    else{
                        res.send(retorno)
                    }
                })
                .catch(console.error)
        })
        .put(sessionCheckerRedLogin, (req,res) => {

            controller.updateDaily(req)
                .then(retorno => {
                    if(!retorno)
                        res.send('erro');
                    else{
                        res.send(retorno)
                    }
                })
                .catch(console.error)
        })
}