const TemplateDao = require('./TemplateDao');

class PostagemDao extends TemplateDao{

    /*
        *   Salva uma postagem no banco de dados
        *   @param {Object} postagem para salvar no banco
        *   @returns {object} postagem
    */
    insertPostagem(postagem){
        if(postagem){
            return this._save(postagem)
                .then((res, err) => res ? res : err)
        }
    }
    /*
        *   Faz update no campo ativo mudando para false
        *   @param {String} id da postagem 
        *   @returns {object} postagem
    */
    deletePostagemById(id){
        if(id){
            return this._findOneAndUpdate({_id:id},{$set:{ativo:false}})
                .then((res,err) => res ? res : err)
        }
    }
    /*
       *   Faz update na postagem 
       *   @param {Postagem} postagem 
       *   @returns {object} postagem
   */
    editarPostagem(postagem) {
        if (postagem) {
            return this._findOneAndUpdate({ _id: postagem._id }, { $set: { postagem: postagem.postagem } })
                .then((res, err) => res ? res : err)
        }
    }
    /*
        *   Lista todas as postagens por Data
        *   @param {Date} data data das postagens
        *   @param {Number} skip é o offset
        *   @param {Number} limit quantidade de postagens desejada
        *   @returns {Object}
    */
    listarPostagemByDate(data = '', skip = '', limit = '') {
        if (data) {
            return this._find({ data: data, ativo: true }, { }, { sort: { updatedAt: -1 }, skip: skip, limit: limit })
                .then((res, err) => res ? res : err)
                .catch(err => {
                    return ({ detail: "Impossível buscar para essa data", error: err })
                })
        }
        else return ({ detail: "Impossível realizar busca", error: "Data null ou undefined" })
    }
    /*
        *   Lista todas as postagens por Usuário
        *   @param {String} username Usuário das postagens
        *   @param {Number} skip é o offset
        *   @param {Number} limit quantidade de postagens desejada
        *   @returns {Object}
    */
    listarPostagemByUser(username = '', skip = '', limit = '') {
        if (username) {
            return this._find({ username: username, ativo: true }, {}, { sort: { updatedAt: -1 }, skip: skip, limit: limit })
                .then((res, err) => res ? res : err)
                .catch(err => {
                    return ({ detail: "Impossível buscar para esse usuário", error: err })
                })
        }
        else return ({ detail: "Impossível realizar busca"})
    }
}
module.exports = PostagemDao;