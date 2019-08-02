let sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');
let controller = require('../controllers/DailiesController');

module.exports = function(app) {
    app.use( (request, response, next) => {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    // route for user's dashboard
    app.route('/daily/:op')
        .post((req, res) => {
            controller.listDailies(req, req.params.op)
                .then(dailies => res.status(200).send(dailies))
                .catch(console.error)
        });
        app.route('/daily')
        .post(sessionCheckerRedLogin, (req,res) => {
            // controller adicionar nova daily

            controller.addDaily(req)
                .then(retorno => {
                    if(!retorno)
                        res.send({erro:'Já Existe Uma Daily Registrada Nesse Dia'});
                    else{
                        retorno = retorno.toObject();
                        retorno.imagem = req.session.user.imagem;
                        res.send(retorno)
                    }
            })
            .catch(console.error);
        })
        .delete(sessionCheckerRedLogin, (req, res) => {

            controller.deleteDaily(req)
                .then(retorno => {
                    if(!retorno)
                        res.send({erro: 'Não Foi Possível Deletar a Daily No Momento'});
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
                        res.send({erro: 'Não foi possível fazer update'});
                    else{
                        res.send(retorno)
                    }
                })
                .catch(console.error)
        })
}