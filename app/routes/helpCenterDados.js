const HelpCenterController = require('../controllers/HelpCenterController');
let sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');

var comentarioDoVegeta = {
    id : '12312312312',
    username : 'Vegeta',
    comentario : 'Eu sou melhor que voce Kakaroto',
    data : '01/02/2000',
    like : 5000
}

module.exports = function(app)
{
    // Envia uma única Postagem
    app.get('/helpcenter/post/:id', (req,res) => {
    
        HelpCenterController.getPostagem(req)
            .then(response => res.send(response))
            .catch(err => res.send('Deu brete' + err));
    });
    
    // Lista Postagens por data
    app.get('/helpcenter/filtrodata/:data/:pagina', (req,res) => {

        HelpCenterController.listarPostagem(req, 'data', req.params.pagina)
            .then(response => res.send(response))
            .catch(err => res.send(err));
    });

    // Lista Postagens por atividade
    app.get('/helpcenter/filtroatividade/:pagina', (req,res) => {
            
        HelpCenterController.listarPostagem(req, 'lastUpdate', req.params.pagina)
            .then(response => res.send(response))
            .catch(err => res.send(err));
    });

    // Lista Postagens por username
    app.get('/helpcenter/filtrousername/:username/:pagina', (req,res) => {
            
        HelpCenterController.listarPostagem(req, 'username', req.params.pagina)
            .then(response => res.send(response))
            .catch(err => res.send(err));
    });

    app.route('/helpcenter')
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
        //deletar Postagem
        .delete(sessionCheckerRedLogin, (req, res) => {
            controller.deletarPostagem(req.body.idpostagem)
                .then(postagem => postagem ? res.send(postagem) : res.send("Não foi possível deletar postagem"))
                .catch(console.error)
        })

    app.route('/helpCenter/comentario')
        //Inserir Comentário
        .post(sessionCheckerRedLogin, (req,res) => {
            comentcontroller.insertComentario(req.params.idpostagem, req.body)
                .then(comentario => comentario ? res.send(comentario) : res.send("Não foi possível inserir comentario"))
                .catch(console.error)
        })

        //Editar Comentário
        .put(sessionCheckerRedLogin, (req,res) => {
            comentcontroller.editarComentario(req)
                .then(comentario => comentario ? res.send(comentario) : res.send("Não foi possível editar comentario"))
                .catch(console.error)
        })

        //Deletar Comentario
        .delete(sessionCheckerRedLogin, (req,res) => {
                comentcontroller.deletarComentario(req.body._id_comentario, req.body._id_postagem)
                    .then(comentario => comentario ? res.send(comentario) : res.send("Não foi possível deletar comentario"))
                    .catch(console.error)
        });

    // Adiciona/Remove Like em uma postagem
    app.post('/helpcenter/like', (req, res) => {

        res.send(true);
    });
    // Adiciona/Remove Like em um comentário
    app.post('/helpcenter/comentario/like', (req, res) => {

        res.send(true);
    });

}
