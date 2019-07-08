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
    app.get('/helpCenter/post/:id', (req,res) => {
    
        HelpCenterController.getPostagem(req)
            .then(response => res.send(response))
            .catch(err => res.send('Deu brete' + err));
    });
    
    // Lista Postagens por data
    app.get('/helpCenter/filtroData/:data', (req,res) => {

        HelpCenterController.listarPostagem(req, 'data')
            .then(response => res.send(response))
            .catch(err => res.send(err));
    });

    // Lista Postagens por atividade
    app.get('/helpCenter/filtroAtividade', (req,res) => {
            
        HelpCenterController.listarPostagem(req, 'lastUpdate')
            .then(response => res.send(response))
            .catch(err => res.send(err));
    });

    // Lista Postagens por username
    app.get('/helpCenter/filtroUsername/:username', (req,res) => {
            
        HelpCenterController.listarPostagem(req, 'username')
            .then(response => res.send(response))
            .catch(err => res.send(err));
    });

    app.route('/helpCenter')
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

    app.route('helpCenter/comentario')
        //Inserir Comentário
        .post(sessionCheckerRedLogin, (req,res) => {
            res.send(comentarioDoVegeta);
        })

        //Editar Comentário
        .put(sessionCheckerRedLogin, (req,res) => {
            res.send(comentarioDoVegeta);
        })

        //Deletar Comentario
        .delete(sessionCheckerRedLogin, (req,res) => {
            res.send(true);
        });

    // Adiciona/Remove Like em uma postagem
    app.post('/helpCenter/like', (req, res) => {

        res.send(true);
    });
    // Adiciona/Remove Like em um comentário
    app.post('/helpCenter/comentario/like', (req, res) => {

        res.send(true);
    });

}
