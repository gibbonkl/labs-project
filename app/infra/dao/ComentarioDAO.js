const TemplateDao = require('./TemplateDao');
let PostagemDao = require("./PostagemDao");
let PostagemModel = require("../../models/schema_postagem");

class ComentarioDAO extends TemplateDao {

    /*
     *   Salva um comentario no banco de dados
     *   @param {String} Id Postagem 
     *   @param {Object} comentario para salvar no banco
     *   @returns {object} comentario
     */
    insertComentario(idPostagem, comentario, user) {
            let postagemDao = new PostagemDao(PostagemModel);
            if (comentario && idPostagem) {
                return this._save({ corpo: comentario, username: user })
                    .then((res, err) => {
                        try {
                            postagemDao.adicionaComentario(idPostagem, res._id);
                            return res;
                        } catch (e) {
                            return 'erro';
                        }
                    })
            }
        }
        /*
         *   Faz update no campo ativo mudando para false
         *   @param {String} id do comentario
         *   @param {String} id da Postagem 
         *   @returns {object} comentario
         */
    deleteComentarioById(req, tipo) {
            //console.log(req.body)
            var idPostagem = req.body.idPostagem;
            var idComentario = req.body.idComentario;
            if (tipo == 'admin') {
                let idComentario = req.body.idComentario;
                var postagemDao = new PostagemDao(PostagemModel);
                return this._findOneAndUpdate({ _id: idComentario }, { $set: { ativo: false } }, { new: true })
                    .then((res, err) => {
                        try {
                            postagemDao.removeComentario(idPostagem, idComentario);
                            return true;
                        } catch (e) {
                            return false;
                        }
                    })
            } else {
                let idComentario = req.body.idComentario;
                var postagemDao = new PostagemDao(PostagemModel);
                return this._findOneAndUpdate({ _id: idComentario, username: req.session.user.username }, { $set: { ativo: false } }, { new: true })
                    .then((res, err) => {
                        try {
                            postagemDao.removeComentario(idPostagem, idComentario);
                            return true;
                        } catch (e) {
                            return false;
                        }
                    })
            }
        }
        /*
         *   Faz update no comentario 
         *   @param {Comentario} comentario 
         *   @returns {object} comentario
         */
    editarComentario(comentario) {
        //console.log(comentario)
        if (comentario) {
            return this._findOneAndUpdate({ _id: comentario._id }, { $set: { corpo: comentario.corpo } }, { new: true })
                .then((res, err) => res ? res : err)
        }
    }

    /*
     *   Adiciona Like no comentario 
     *   @param {id} comentario
     *   @param {username} da sessão 
     *   @returns {true or false}
     */
    adicionaLike(id = '', username = '') {
        return this._findOneAndUpdate({ _id: id, likes: { $ne: username } }, { $addToSet: { likes: username } }, { new: true })
            .then((res, err) => res ? true : false)
            .catch(() => false);
    }

    removeLike(id = '', username = '') {
        return this._findOneAndUpdate({ _id: id, likes: { $eq: username } }, { $pull: { likes: username } }, { new: true })
            .then((res, err) => res ? true : false)
            .catch(() => false);
    }

    // adicionaLike_comments(id = '', username = '') {
    //     return this._findOneAndUpdate({ _id: id, likes_comments: { $ne: username } }, { $addToSet: { likes_comments: username } }, { new: true })
    //         .then((res, err) => res ? true : false)
    //         .catch(() => false);
    // }


    // removeLike_comments(id = '', username = '') {
    //     return this._findOneAndUpdate({ _id: id, likes_comments: { $eq: username } }, { $pull: { likes_comments: username } }, { new: true })
    //         .then((res, err) => res ? true : false)
    //         .catch(() => false);
    // }


    /*
     *   Remove Like no comentario 
     *   @param {id} comentario
     *   @param {username} da sessão 
     *   @returns {true or false}
     */
   

    
    /*
     *   Pega numero de Likes do comentario '
     *   @param {id} comentario
     *   @returns {numero de likes}
     */
    getLikes(id = '') {
        return this._findOne({ _id: id, ativo: true })
            .then((res, err) => res ? res.likes.length : 'Não foi possível acessar os likes do comentario')
            .catch(() => 'error');
    }

    listarComentarios()
    {
        return this._find();
    }
}
module.exports = ComentarioDAO;