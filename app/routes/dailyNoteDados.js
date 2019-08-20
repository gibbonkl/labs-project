let sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');
let controller = require('../controllers/DailiesController');

module.exports = function(app) {
    app.use( (request, response, next) => {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.route('/daily/:op')
        // controller listar daily notes
        .post((req, res) => {
            controller.listDailies(req, req.params.op)
                .then(dailies => res.status(200).send(dailies))
                .catch(console.error)
        });
    app.route('/daily')
        // controller adicionar nova daily
        .post(sessionCheckerRedLogin, (req,res) => {
            let data = {
                username: req.session.user.username,
                ontem: req.body.ontem,
                hoje: req.body.hoje,
                impedimento: req.body.impedimento
            }
            controller.addDaily(data)
                .then(retorno => {
                    if(!retorno)
                        res.send({erro:'Já existe uma daily registrada nesse dia.'});
                    else{
                        retorno = retorno.toObject();
                        retorno.imagem = req.session.user.imagem;
                        res.send(retorno)
                    }
            })
            .catch(console.error);
        })
        // controller deleta daily
        .delete(sessionCheckerRedLogin, (req, res) => {
            controller.deleteDaily(req)
                .then(retorno => {
                    if(!retorno)
                        res.send({erro: 'Não foi possível deletar a daily no momento.'});
                    else
                        res.send(retorno)
                })
                .catch(console.error)
        })
        // controller atualiza daily
        .put(sessionCheckerRedLogin, (req, res) => {
            controller.updateDaily(req)
                .then(retorno => {
                    if(!retorno)
                        res.send({erro: 'Não foi possível fazer update.'});
                    else
                        res.send(retorno)
                })
                .catch(console.error)
        })
}