const Model = require("../models/schema_comentario");
const ComentarioDAO = require('../infra/dao/ComentarioDAO');

class ComentarioInsertController {

    static insertComentario(id_postagem, comentario) {

        let comentarioDAO = new ComentarioDAO(Model);
        return comentarioDAO.insertComentario(id_postagem, comentario)
            .then(response => response ? response : null)
            .catch(error => {
                console.error(error);
                throw new Error(error);
            })
    }

}
module.exports = ComentarioInsertController;