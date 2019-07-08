let sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');
let controller = require('../controllers/HelpCenterController');

module.exports = function(app) {

    app.route('/testehelpCenter')
        //inserir postagem
        .post(sessionCheckerRedLogin, (req,res) => {
            controller.insertPostagem(req)
                .then(postagem => postagem ? res.send(postagem) : res.send("Não foi possível inserir postagem"))
        .catch(console.error)
        })

        //editar postagem
        .put(sessionCheckerRedLogin, (req, res) => {
            controller.editarPostagem(req)
                .then(postagem => postagem ? res.send(postagem) : res.send("Não foi possível editar postagem"))
                .catch(console.error)
        })


    app.route('/testehelpCenter/:idpostagem')
        //deletar postagem
        .delete(sessionCheckerRedLogin, (req, res) => {
            controller.deletarPostagem(req.params.idpostagem)
                .then(postagem => postagem ? res.send(postagem) : res.send("Não foi possível deletr postagem"))
                .catch(console.error)
        })
}

