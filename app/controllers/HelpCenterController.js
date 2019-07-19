let PostagemDao = require("../infra/dao/PostagemDao");
let PostagemModel = require("../models/schema_postagem");

const batchPadrao = 5;
class HelpCenterController {
    constructor() {
        throw new Error("Classe estática. Impossível instanciar.");
    }

    static listHelper(promise, username, user)
    {
        return promise
            .then(postagem => postagem[0])
            .then(postagem =>{ 
                
                    postagem.totalData = postagem.totalData.map(function(postagem)
                    {
                        if (user == 'admin' || postagem.username == username)
                            postagem['permissao'] = true;

                        HelpCenterController.insereNumeroDeLikesEComentarios(postagem);
                        HelpCenterController.apagaLikesEComentario
                        postagem.imagem = postagem.user[0].imagem;
                        delete(postagem.user);
                        
                        return postagem
                    })
                    if(postagem.totalCount.length > 0)
                        return  { postagens: postagem.totalData, count: Math.ceil(postagem.totalCount[0].count/batchPadrao)}
                    else
                        return  { postagens: postagem.totalData, count:1}
                })
            .catch(console.error)
    }

    static listarPostagem(req, op, page=1, batch=batchPadrao){
        
        let postagemDao = new PostagemDao(PostagemModel);
        
        //verificar user
        let user = 'visitante'
        let username = ''
        // if(req.session.user) {
        //     user = req.session.user.tipo;
        //     username = req.session.user.username;
        // }

        // get postagens
        if (op == 'lastUpdate')
        {
            return this.listHelper(
                postagemDao.listarPostagemOrderByLastUpdate((page-1)*batch, batch),
                username,user)
        }
        else if(op == 'data')
        {
            let data = req.params.data.replace(/-/g,'/');
            return this.listHelper(
                postagemDao.listarPostagemByDate(data, (page-1)*batch, batch),
                username,user)
        }
        else if(op == 'username')
        {
            // let username = req.params.username;
            let username = 'foto';
            return this.listHelper(
                postagemDao.listarPostagemByUser(username, (page-1)*batch, batch),
                username,user)   
        }
        else if(op == 'busca')
        {
            let busca = req.params.dados.replace(/-/g,' ');
            return this.listHelper(
                postagemDao.search(busca, (page-1)*batch, batch),
                username,user)  
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
        return postagem;
    }

    static insertPostagem(req) {
        let postagem = new PostagemModel ({
            username: req.session.user.username,
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
        //console.log(req.body)
        let postagem = new PostagemModel ({
            _id: req.body._id,
            username: req.session.user.username,
            corpo: req.body.corpo,
            titulo: req.body.titulo
        });
        //console.log(postagem);
       
        return new PostagemDao(PostagemModel).editarPostagem(postagem)
            .then(res=> res ? res : false)
            .catch(error => {
                console.error(error);
                throw new Error(error);
            })
        
    }

    static deletarPostagem(req){

        return new PostagemDao(PostagemModel).deletePostagemById(req, req.session.user.tipo)
            .then(res => res ? res : false)
            .catch(err => console.log(err.message))
    }

    /*
        *   Retorna uma postagem
        *   @param {Request} req Requisição do usuário
        *   @return {object}
    */
    static getPostagem(req){
        let user = 'visitante'
        let username = ''
        
        if(req.session.user) {
            user = req.session.user.tipo;
            username = req.session.user.username;
        }
        
        return new PostagemDao(PostagemModel).getPostagem(req.params.id)
            .then(postagem => {
                if(postagem)
                {
                    if (user == 'admin' || postagem.username == username)
                                postagem['permissao'] = true;
                    HelpCenterController.insereNumeroDeLikesEComentarios(postagem)
                    return postagem;
                }
                else
                    return false;
            })
            .catch(console.error)
    }

    static getComentarios(req){
        let user = 'visitante'
        let username = ''
        /*
            *   Verifica se o usuário é admin
            *   ou dono da postagem
        */
        if(req.session.user) {
            user = req.session.user.tipo;
            username = req.session.user.username;
        }
        /*
            *   Busca na base de dados a postagem,
            *   a foto do usuário, e as fotos para os comentários
        */
        //console.log(req.params.id);
        return new PostagemDao(PostagemModel).getComentarios(req.params.id)
            /*
                *   Retorna a primeira posição do array de postagens
            */
            .then(postagens => postagens[0])
            .then(postagem =>{
                /*
                    *   Adiciona o campo imagem ao comentário
                    *   a partir do array de usuários
                */
                //for(let i=0;i<postagem.comentarios.comentario.length;i++){
                    //postagem.comentarios.comentario[i].imagem = postagem.comentarios.user[i].imagem;
                    /*
                        *   Se o usuário for admin ou dono da postagem,
                        *   Seta as permissões para verdadeiro
                        *   Caso contrário, falso
                    */


                //}
                /*
                    *   Desfaz o array de comentários para o campo comentário
                    *   Remove o array de usuário da postagem e adiciona a foto ao objeto
                */
               user == 'admin' || postagem.username == username? postagem.permissao = true : postagem.permissao = false
               postagem.comentarios = postagem.comentarios.comentario;
               postagem.imagem = postagem.user[0].imagem;
               delete(postagem.user);
               return postagem;

            })
            .then(postagem => 
                HelpCenterController.insereNumeroDeLikesEComentarios(postagem)
            )
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

    static resolvido(req)
    {
        let postagem = new PostagemModel ({
            _id: req.body._id,
            username: req.session.user.username,
        });
       
        return new PostagemDao(PostagemModel).resolvido(postagem, req.session.user.tipo)
            .then(res=> res ? true : false)
            .catch(error => console.error(error.message))
    }
}

module.exports = HelpCenterController;