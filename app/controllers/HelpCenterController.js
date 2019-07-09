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
                        HelpCenterController.insereNumeroDeLikesEComentarios(postagem);
                        HelpCenterController.apagaLikesEComentarios(postagem);
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
                        HelpCenterController.insereNumeroDeLikesEComentarios(postagem);
                        HelpCenterController.apagaLikesEComentarios(postagem);
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
                        HelpCenterController.insereNumeroDeLikesEComentarios(postagem);
                        HelpCenterController.apagaLikesEComentarios(postagem);
                        return postagem}))
                .catch(console.error)
        }
        else if(op == 'busca')
        {
            let busca = req.params.dados.replace(/-/g,' ');
            return postagemDao.search(busca, (page-1)*batch, batch)
                .then(postagem => 
                    postagem.map(function(postagem){
                        if (user == 'admin' || postagem.username == username)
                            postagem['permissao'] = true;
                        HelpCenterController.insereNumeroDeLikesEComentarios(postagem);
                        HelpCenterController.apagaLikesEComentarios(postagem);
                        return postagem}))
                .catch(console.error)
        }
    }

    static apagaLikesEComentarios(postagem)
    {
        postagem['likes'] = [];
        postagem['comentarios'] = [];
    }
    static insereNumeroDeLikesEComentarios(postagem)
    {
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

    static getPostagem(req){
        let user = 'visitante'
        let username = ''
        if(req.session.user) {
            user = req.session.user.tipo;
            username = req.session.user.username;
        }

        return new PostagemDao(PostagemModel).getPostagem(req.params.id)
                .then(postagem => 
                    {
                        postagem.map(function(postagem){
                            HelpCenterController.insereNumeroDeLikesEComentarios(postagem);
                            if (user == 'admin' || postagem.username == username)
                                postagem['permissao'] = true;
                            else
                                postagem['permissao'] = false;
                            return postagem;
                        })
                        return postagem[0];
                    })
                .catch(console.error)
    }

    static like(req)
    {
        if(req.body.like == -1)
        {
            return new PostagemDao(PostagemModel).removeLike(req.body._id, req.session.user.username)
        }
        else if(req.body.like == 1)
        {
            return new PostagemDao(PostagemModel).adicionaLike(req.body._id, req.session.user.username)
        }
    }

}

module.exports = HelpCenterController;