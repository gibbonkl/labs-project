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

    /*
        *   Retorna uma postagem com a foto do usuário
        *   Junto a um array com os comentários e as fotos de cada usuário,
        *   Um array com usuários que deram like na postagem
        *   E outro array com as tags da postagem
        *   @param {Request} req Requisição do usuário
        *   @return {object}
    */
   static getPostagem(req){
        let user = 'visitante'
        let username = ''
        /*
            *   Verifica se o usuário é admin
            *   ou dono da postagem
        */
        if(req.session.user) {
            if(req.session.user.tipo == "admin")
                user = "admin"
            else{
                user = userDao.checkUserPermission(req.session.user.username);
                username = req.session.user.username;
            }

        }
        /*
            *   Busca na base de dados a postagem,
            *   a foto do usuário, e as fotos para os comentários
        */
        return new PostagemDao(PostagemModel).getPostagem(req.params.id)
            /*
                *   @warning: Frágil
                *   Retorna a primeira posição do array de postagens
            */
            .then(postagens => postagens[0])
            .then(postagem =>{
                /*
                    *   Adiciona o campo imagem ao comentário
                    *   a partir do array de usuários
                */
                for(i=0;i<postagem.comentarios.comentario.length;i++){
                    postagem.comentarios.comentario[i].imagem = postagem.comentarios.user[i].imagem;
                    /*
                        *   Se o usuário for admin ou dono da postagem,
                        *   Seta as permissões para verdadeiro
                        *   Caso contrário, falso
                    */
                    user == 'admin' || postagem.username == username? postagem.permissao = true : postagem.permissao = false
                }
                /*
                    *   Desfaz o array de comentários para o campo comentário
                    *   Remove o array de usuário da postagem e adiciona a foto ao objeto
                */
                postagem.comentarios = postagem.comentarios.comentario;
                postagem.imagem = postagem.user[0].imagem;
                delete(postagem.user);
                return postagem;
            })
            .catch(console.error)
    }


}

module.exports = HelpCenterController;