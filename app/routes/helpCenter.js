const HelpCenterController = require('../controllers/HelpCenterController');
var postagemDoGoku = {

    id : '012371273091283',
    titulo : 'Postagem do Goku',
    username : 'Goku',
    postagem : 'Oi eu sou o Goku',
    data : '01/01/2000',
    comentarios : ['12312312312'],
    like : 8000,
    tags : ['Goku'],
}
var postagemDoGohan = {

    id : '01237127231233091283',
    titulo : 'Postagem do Gohan',
    username : 'Gohan',
    postagem : 'Oi eu sou o Gohan',
    data : '01/01/2010',
    comentarios : [''],
    like : 3000,
    tags : ['Gohan'],
}

var comentarioDoVegeta = {
    id : '12312312312',
    username : 'Vegeta',
    comentario : 'Eu sou melhor que voce Kakaroto',
    data : '01/02/2000',
    like : 5000
}

module.exports = function(app)
{
    // Renderiza Pagina de Postagens
    app.get('/helpCenter', (req,res) => {
        
        if (req.session.user && req.cookies.user_sid) 
            var user = {username: req.session.user.username, tipo: req.session.user.tipo}
        else
            var user = {username: '', tipo: ''}
            
        res.render('helpcenter.ejs', {user : user});
    });
    
    // Envia uma única Postagem
    // app.get('/helpCenter/:id', (req,res) => {
    
    //     let response = {
    //         id : '012371273091283',
    //         username : 'Goku',
    //         postagem : 'Oi eu sou o Goku',
    //         data : '01/01/2000',
    //         comentarios : [comentarioDoVegeta],
    //         like : 8000,
    //         tags : ['Goku']
    //     };

    //     res.send(response);
    // });
    
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

    // Adiciona Postagem
    app.post('/helpCenter', (req,res) => {
        
        res.send(postagemDoGoku);
    });

    //Editar Postagem
    app.put('/helpCenter/:id', (req,res) => {
            
        res.send(postagemDoGoku);
    });

    //Deletar Postagem
    app.delete('/helpCenter/:id', (req,res) => {
            
        res.send(true);
    });

    //Inserir Comentário
    app.post('/helpCenter/:id/insertCommentario', (req,res) => {
                
        res.send(comentarioDoVegeta);
    });

    //Editar Comentário
    app.put('/helpCenter/:id/editCommentario', (req,res) => {
            
        res.send(comentarioDoVegeta);
    });

    //Deletar Comentario
    app.delete('/helpCenter/:id/deleteComentario', (req,res) => {
            
        res.send(true);
    });

    // Adiciona/Remove Like em uma postagem ou comentário
    app.post('/helpCenter/like', (req, res) => {

        res.send(true);
    })

}
