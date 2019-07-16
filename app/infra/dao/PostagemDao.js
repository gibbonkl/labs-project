const TemplateDao = require('./TemplateDao');
const mongoose = require('mongoose');

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
            return this._findOneAndUpdate({_id:id, ativo:true},{$set:{ativo:false}}, {new: true})
                .then(res => res ? true : false)
                .catch(error => {
                    console.error(error);
                    throw new Error(error);
                })
        }
    }
    /*
       *   Faz update na postagem 
       *   @param {Postagem} postagem 
       *   @returns {object} postagem
    */
    editarPostagem(postagem) {
        return this._findOneAndUpdate({ _id: postagem._id }, { $set: { corpo: postagem.corpo, titulo:postagem.titulo } }, {new: true})
            .then((res,err) => res ? res : err)
            .catch(error => {
                console.error(error);
                throw new Error(error);
            })
    }
    /*
        *   Lista todas as postagens por Data
        *   @param {Date} data data das postagens
        *   @param {Number} skip é o offset
        *   @param {Number} limit quantidade de postagens desejada
        *   @returns {Object}
    */
    listarPostagemByDate(data = '', skip = '', limit = '') {
            return this._aggregate([
                    { "$facet": {
                        "totalData": [
                            { "$match": { $and: [{ativo: true}, {data: data}]}},
                            { "$skip" : parseInt(skip)},
                            { "$limit": parseInt(limit)}
                        ],
                        "totalCount": [
                        { "$match": { $and: [{ativo: true}, {data: data}]}},
                        { "$count": "count" }
                        ]
                    }}
                ])
                .then((res, err) => res ? res : err)
                .catch(err => {
                    return ({ detail: "Impossível buscar para essa data", error: err })
                })
    }
    /*
        *   Lista todas as postagens por Usuário
        *   @param {String} username Usuário das postagens
        *   @param {Number} skip é o offset
        *   @param {Number} limit quantidade de postagens desejada
        *   @returns {Object}
    */
    listarPostagemByUser(username = '', skip = '', limit = '') {
        return this._aggregate([
                { "$facet": {
                    "totalData": [
                        { "$match": { $and: [{ativo: true}, {username: username}]}},
                        { "$skip" : parseInt(skip)},
                        { "$limit": parseInt(limit)}
                    ],
                    "totalCount": [
                        { "$match": { $and: [{ativo: true}, {username: username}]}},
                        { "$count": "count" }
                    ]
                }}
            ])
            .then((res, err) => res ? res : err)
            .catch(err => {
                return ({ detail: "Impossível buscar para esse usuário", error: err })
            })
    }

    /*
       *   Adiciona Like na postagem 
       *   @param {id} postagem
       *   @param {username} da sessão 
       *   @returns {true or false}
    */
    adicionaLike(id='', username='') {
        return this._findOneAndUpdate({ _id: id, likes: {$ne: username} }, { $addToSet:{ likes: username} }, {new: true})
            .then((res, err) => res ? true : false)
            .catch(() => false);
    }

    /*
       *   Remove Like na postagem 
       *   @param {id} postagem
       *   @param {username} da sessão 
       *   @returns {true or false}
    */
    removeLike(id='', username='') {
        return this._findOneAndUpdate({ _id: id, likes: {$eq: username} }, { $pull:{ likes: username} }, {new: true})
            .then((res, err) => res ? true : false)
            .catch(() => false);
    }

    /*
       *   Adiciona Tag na postagem 
       *   @param {id} postagem
       *   @param {Tag} tag da postagem 
       *   @returns {true or false}
    */
    adicionaTag(id='', tag='') {
        return this._findOneAndUpdate({ _id: id, tags: {$ne: tag} }, { $addToSet:{ tags: tag} }, {new: true})
            .then((res, err) => res ? true : false)
            .catch(() => false);
    }

    /*
        *   Remove tag da postagem 
        *   @param {id} postagem
        *   @param {tag} da postagem 
        *   @returns {true or false}
    */
    removeTag(id='', tag='') {
        return this._findOneAndUpdate({ _id: id, tags: {$eq: tag} }, { $pull:{ tags: tag} }, {new: true})
            .then((res, err) => res ? true : false)
            .catch(() => false);
    }

    /*
       *   Adiciona comentario na postagem 
       *   @param {idPostagem} postagem
       *   @param {idComentario} comentario
       *   @returns {true or false}
    */

    adicionaComentario(idPostagem='', idComentario='') {
        return this._findOneAndUpdate({ _id: idPostagem, comentarios: {$ne: idComentario} }, { $addToSet:{ comentarios: idComentario} }, {new: true})
            .then((res, err) => res ? true : false)
            .catch(() => false);
    }

    /*
       *   remove comentario na postagem 
       *   @param {idPostagem} postagem
       *   @param {idComentario} comentario
       *   @returns {true or false}
    */
    removeComentario(idPostagem='', idComentario='') {
        return this._findOneAndUpdate({ _id: idPostagem, comentarios: {$eq: idComentario} }, { $pull:{ comentarios: idComentario} }, {new: true})
            .then((res, err) => res ? true : false)
            .catch(() => false);
    }

    /*
       *   Pega numero de Likes da postagem 
       *   @param {id} postagem
       *   @returns {numero de likes}
    */
    getLikes(id='')
    {
        return this._findOne({ _id: id, ativo: true })
            .then((res, err) => res ? res.likes.length : 'Não foi possível acessar os likes da postagem')
            .catch(() => 'error');
    }
    /*
        *   Pega uma postagem 
        *   @param {id} postagem
        *   @returns {postagem} postagem e todos os comentarios associados
    */
   getPostagem(id=''){
        return this._findOne({ _id: id, ativo: true })
        .then(res => res ? res : 'error')
        .catch(console.error)
    }

    /*
        *   Pega uma postagem 
        *   @param {id} postagem
        *   @returns {postagem} postagem e todos os comentarios associados
    */
    getComentarios(id=''){
        return this._aggregate([
            {'$match': 
                {_id: mongoose.Types.ObjectId(id)}
            },
            {'$lookup': {
                    'from': 'comentarios', 
                    'localField': 'comentarios', 
                    'foreignField': '_id',
                    'as': 'comentarios.comentario'
                }
            },
            {'$lookup': {
                    'from': 'usuarios', 
                    'localField': 'username', 
                    'foreignField': 'username', 
                    'as': 'user'
                }
            },
            {'$lookup': {
                    'from': 'usuarios', 
                    'localField': 'comentarios.comentario.username', 
                    'foreignField': 'username', 
                    'as': 'comentarios.user'
                }
            }
        ])
        .then(res => res ? res : 'error')
        .catch(console.error)
    }
    /*
        *   Busca uma postagem na base de dados pelo título
        *   @param {string} searched A busca a ser realizada no banco
        *   @param {Number} skip
        *   @param {Number} limit Limite de postagens para busca
        *   @returns {Array}
    */
    search(searched,skip = '', limit = ''){
        return this._aggregate([
                { "$facet": {
                    "totalData": [
                        { "$match": { $and: [{ativo: true} , {titulo: {'$regex': searched,'$options':'i'}}] }},
                        { "$skip" : parseInt(skip)},
                        { "$limit": parseInt(limit)}
                    ],
                    "totalCount": [
                        { "$match": { $and: [{ativo: true}, {titulo: {'$regex': searched,'$options':'i'}}]}},
                        { "$count": "count" }
                    ]
                }}
            ])
            .then((res,err)=> res? res: err)
            .catch(err=>{
                return ({detail: "Impossível buscar postagens", error: err})
            })
    }
    /*
       *   Lista todas as postagens ordenando por último update
       *   @param {String} username Usuário das postagens
       *   @param {Number} skip é o offset
       *   @param {Number} limit quantidade de postagens desejada
       *   @returns {Object}
   */
    listarPostagemOrderByLastUpdate(skip = '', limit = '') {
        
        return this._aggregate([
                    { "$facet": {
                        "totalData": [
                            { "$match": { $and: [{ativo: true}] }},
                            { "$sort": {updatedAt: -1}},
                            { "$skip" : parseInt(skip)},
                            { "$limit": parseInt(limit)}
                        ],
                        "totalCount": [
                            { "$match": { $and: [{ativo: true}] }},
                            { "$count": "count" }
                        ]
                      }}
                ])
            .then((res, err) => res ? res : err)
            .catch(err => {
                return ({ detail: "Impossível buscar postagens", error: err })
            })
    }

}
module.exports = PostagemDao;