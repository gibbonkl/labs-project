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
                        return postagem}))
                .catch(console.error)
        }
        else if(op == 'data')
        {
            return postagemDao.listarPostagemByDate('4/7/2019', (page-1)*batch, batch)
                .then(postagem => 
                    postagem.map(function(postagem){
                        if (user == 'admin' || postagem.username == username)
                            postagem['permissao'] = true;
                        return postagem}))
                .catch(console.error)
        }
        else if(op == 'username')
        {
            return postagemDao.listarPostagemByUser('Goku', (page-1)*batch, batch)
                .then(postagem => 
                    postagem.map(function(postagem){
                        if (user == 'admin' || postagem.username == username)
                            postagem['permissao'] = true;
                        return postagem}))
                .catch(console.error)
        }
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

}

module.exports = HelpCenterController;