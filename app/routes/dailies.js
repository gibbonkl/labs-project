let sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');
let controller = require('../controllers/DailiesController');

module.exports = function(app)
{
    // route for user's dashboard
    app.route('/daily/:op')
        .get((req, res) => {
            
            controller.listDailies(req, op)
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
        });
    app.route('/daily')
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