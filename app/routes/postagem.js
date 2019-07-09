let sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');
let controller = require('../controllers/HelpCenterController');
let comentcontroller = require('../controllers/ComentarioController');


module.exports = function(app) {

    app.route('/testehelpcenter')
        //inserir postagem
        .post(sessionCheckerRedLogin, (req,res) => {
            controller.insertPostagem(req)
                .then(postagem => postagem ? res.send(postagem) : res.send("Não foi possível inserir postagem"))
        .catch(console.error)
        })

    app.route('/testehelpcenter/:idpostagem')
        //editar postagem
        .put(sessionCheckerRedLogin, (req, res) => {
            controller.editarPostagem(req, req.params.idpostagem)
                .then(postagem => postagem ? res.send(postagem) : res.send("Não foi possível editar postagem"))
                .catch(console.error)
        })
        //deletar postagem
        .delete(sessionCheckerRedLogin, (req, res) => {
            controller.deletarPostagem(req.params.idpostagem)
                .then(postagem => postagem ? res.send(postagem) : res.send("Não foi possível deletr postagem"))
                .catch(console.error)
        })

    app.route(sessionCheckerRedLogin, '/testehelpcenter/:idpostagem/insertcomentario')
        //Inserir Comentário
        .post((req, res) => {
            comentcontroller.insertComentario(req.params.idpostagem, req.body)
                .then(comentario => comentario ? res.send(comentario) : res.send("Não foi possível inserir comentario"))
                .catch(console.error)
        })

    app.route(sessionCheckerRedLogin, '/editcomentario')
        //Editar Comentário  
        .put( (req, res) => {
            comentcontroller.editarComentario(req)
                .then(comentario => comentario ? res.send(comentario) : res.send("Não foi possível editar comentario"))
                .catch(console.error)
        })
      
    
    app.route('/testehelpcenter/deletecomentario')
        //Delete Comentário   
        .delete((req, res) => {
            comentcontroller.deletarComentario(req.body._id_comentario, req.body._id_postagem)
                .then(comentario => comentario ? res.send(comentario) : res.send("Não foi possível deletar comentario"))
                .catch(console.error)
        })
    
}

