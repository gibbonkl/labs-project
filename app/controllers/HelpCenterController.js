let PostagemDao = require("../infra/dao/PostagemDao");
let PostagemModel = require("../models/schema_postagem");

class HelpCenterController {
    constructor() {
        throw new Error("Classe estática. Impossível instanciar.");
    }

    static listarPostagem(req, op, page=1, batch=10){
        
        let postagemDao = new PostagemDao(PostagemModel);
        
        //verificar user
        let user = 'user'
        let username = 'Goku'
        // if(req.session.user) {
        //     user = req.session.user.tipo;
        //     username = req.session.user.username;
        // }

         // get dailies
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

}

module.exports = HelpCenterController;