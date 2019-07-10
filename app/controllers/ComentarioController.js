const ComentarioModel = require("../models/schema_comentario");
const ComentarioDAO = require('../infra/dao/ComentarioDAO');

class ComentarioController {

    static insertComentario(id_postagem, comentario) {

        let comentarioDAO = new ComentarioDAO(ComentarioModel);
        return comentarioDAO.insertComentario(id_postagem, comentario)
            .then(response => response ? response : null)
            .catch(error => {
                console.error(error);
                throw new Error(error);
            })
    }

    static editarComentario(req){

        let comentario = new ComentarioModel ({
            _id: req.body._id,
            corpo: req.body.corpo,
        });
       
        return new ComentarioDAO(ComentarioModel).editarComentario(comentario)
                .then(res=> res ? res : 'erro ao editar comentario')
        
    }

    static deletarComentario(idComentario, idPostagem){

        return new ComentarioDAO(ComentarioModel).deleteComentarioById(idComentario, idPostagem)
                .then(res => res? true: false)
    }

    static like(req)
    {
        if(req.body.like == -1)
        {
            return new ComentarioDAO(ComentarioModel).removeLike(req.body._id, req.session.user.username)
        }
        else
        {
            return new ComentarioDAO(ComentarioModel).adicionaLike(req.body._id, req.session.user.username)
        }
    }

}
module.exports = ComentarioController;