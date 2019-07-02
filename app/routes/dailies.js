let sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');
let controller = require('../controllers/DailiesController');

module.exports = function(app) {
    // route for user's dashboard
    app.route('/daily/:op')
        .post((req, res) => {
            controller.listDailies(req, req.params.op)
                .then(dailies => res.send(dailies))
                .catch(console.error)
        });
        app.route('/daily')
        .post(sessionCheckerRedLogin, (req,res) => {
            // controller adicionar nova daily

            controller.addDaily(req)
                .then(retorno => {
                    if(!retorno)
                        res.send('Não é possível Adicionar Essa Daily');
                    else{
                        res.send(retorno)
                    }
            })
            .catch(console.error);
        })
        .delete(sessionCheckerRedLogin, (req, res) => {

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
        .put(sessionCheckerRedLogin, (req, res) => {

            controller.updateDaily(req)
                .then(retorno => {
                    if(!retorno)
                        res.send('Não foi possível fazer update');
                    else{
                        res.send(retorno)
                    }
                })
                .catch(console.error)
        })
}