let PostagemDao = require("../infra/dao/PostagemDao");
let PostagemModel = require("../models/schema_postagem");

class HelpCenterController {
    constructor() {
        throw new Error("Classe estática. Impossível instanciar.");
    }

    static listarPostagem(req, op, page=1, batch=10){
        
        let postagemDao = new PostagemDao(PostagemModel);
        
        //verificar user
        let user = 'visitante'
        let username = ''
        if(req.session.user) {
            user = req.session.user.tipo;
            username = req.session.user.username;
        }

         // get postagens
        if (op == 'lastUpdate'){
            return postagemDao.listarPostagemOrderByLastUpdate((page-1)*batch, batch)
                .then(postagem => 
                    postagem.map(function(postagem){
                        if (user == 'admin' || postagem.username == username)
                            postagem['permissao'] = true;
                        HelpCenterController.insereLikesEComentarios(postagem);
                        return postagem}))
                .catch(console.error)
        }
        else if(op == 'data')
        {
            var data = req.params.data.replace(/(\d{1})(\d{1})/, "$1/$2/");
            return postagemDao.listarPostagemByDate(data, (page-1)*batch, batch)
                .then(postagem => 
                    postagem.map(function(postagem){
                        if (user == 'admin' || postagem.username == username)
                            postagem['permissao'] = true;
                        HelpCenterController.insereLikesEComentarios(postagem);
                        return postagem}))
                .catch(console.error)
        }
        else if(op == 'username')
        {
            let username = req.params.username;
            return postagemDao.listarPostagemByUser(username, (page-1)*batch, batch)
                .then(postagem => 
                    postagem.map(function(postagem){
                        if (user == 'admin' || postagem.username == username)
                            postagem['permissao'] = true;
                        HelpCenterController.insereLikesEComentarios(postagem);
                        return postagem}))
                .catch(console.error)
        }
    }

    static insereLikesEComentarios(postagem)
    {
        postagem['likes'] = []
        postagem['comentarios'] = []
        postagem['numeroLikes'] = postagem.likes.length;
        postagem['numeroComentarios'] = postagem.comentarios.length;
    }

    static insertPostagem(req) {
        
        let postagem = new PostagemModel ({
            username: req.body.username,
            corpo: req.body.corpo,
            titulo: req.body.titulo
        });

        return new PostagemDao(PostagemModel).insertPostagem(postagem)
            .then(response => response ? response : null)
            .catch(error => {
                console.error(error);
                throw new Error(error);
            })
    }

    static editarPostagem(req){
        let postagem = new PostagemModel ({
            _id: req.body._id,
            username: req.body.username,
            corpo: req.body.corpo,
            //titulo: req.body.titulo
        });
        console.log(postagem);
       
        return new PostagemDao(PostagemModel).editarPostagem(postagem)
                .then(res=> res ? res : 'erro ao editar postagem')
        
    }

    static deletarPostagem(id){

        return new PostagemDao(PostagemModel).deletePostagemById(id)
    }

}

module.exports = HelpCenterController;