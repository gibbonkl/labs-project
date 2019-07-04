const Model = require("../models/schema_postagem");
const PostagemDAO = require('../infra/dao/PostagemDao');

class PostagemInsertController {
    /*
        * Instância um DAO para realizar a busca no banco
    */
   // constructor() {
   //     this._postagemDAO = new PostagemDAO(Model);
   //}
    
    insertPostagem(postagem) {

        this._postagemDAO = new PostagemDAO(Model);
        return _postagemDAO.insertPostagem(postagem)
            .then(response => response ? response : null)
            .catch(error => {
                console.error(error);
                throw new Error(error);
            })
    }
    
}
module.exports = PostagemInsertController;
/*
POST
    / helpcenter / {
        titulo:
        corpo:
        username:
}
    / helpCenter método POST retorna postagem adicionada
*/