let ComentarioDao = require("../infra/dao/ComentarioDAO");
let ComentarioModel = require("../models/schema_comentario");

class Comentariocontroller {
    constructor() {
        throw new Error("Classe estática. Impossível instanciar.");
    }

    static editarComentario(req){

        let comentario = new ComentarioModel ({
            _id: req.body._id,
            corpo: req.body.corpo,
        });
       
        return new ComentarioDao(ComentarioModel).editarComentario(comentario)
                .then(res=> res ? res : 'erro ao editar comentario')
        
    }

    static deletarComentario(idComentario, idPostagem){

        return new ComentarioDao(ComentarioModel).deleteComentarioById(idComentario, idPostagem)
                .then(res => res? true: false)
    }

}

module.exports = Comentariocontroller;