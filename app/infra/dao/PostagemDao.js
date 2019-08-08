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
    deletePostagemById(req='', tipo=''){
        if(tipo == 'admin')
            return this._findOneAndUpdate({_id:req.body.idpostagem, ativo:true},{$set:{ativo:false}}, {new: true})
                .then(res => res ? true : false)
                .catch(err => console.log(err.message))
        else
            return this._findOneAndUpdate({_id:req.body.idpostagem, username: req.session.user.username, ativo:true},{$set:{ativo:false}}, {new: true})
            .then(res => res ? true : false)
            .catch(err => console.log(err.message))
    }
    /*
       *   Faz update na postagem 
       *   @param {Postagem} postagem 
       *   @returns {object} postagem
    */
    editarPostagem(postagem) {
        return this._findOneAndUpdate({ _id: postagem._id }, { $set: { corpo: postagem.corpo, titulo:postagem.titulo, tags:postagem.tags } }, {new: true})
            .then((res,err) => {
                try{
                    this.addInteracao(postagem._id, 1);
                    return res;
                }
                catch (e){ 
                    return err;
                }
            })
            .catch(err => console.error(err.message))
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
                            {"$match":{
                                    data: data,
                                    ativo: true
                                }
                            },
                            {'$lookup': {
                                'from': 'usuarios', 
                                'localField': 'username', 
                                'foreignField': 'username', 
                                'as': 'user'
                                }
                            },
                            {"$sort":{
                                    updatedAt: -1
                                }
                            },
                            {
                                "$skip": skip
                            },
                            {
                                "$limit": limit
                            }
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
                        {"$match": {
                                username:{"$regex": username, "$options":'i'},   
                                ativo: true
                            }
                        },
                        {'$lookup': {
                            'from': 'usuarios', 
                            'localField': 'username', 
                            'foreignField': 'username', 
                            'as': 'user'
                            }
                        },
                        {"$sort":{
                                updatedAt: -1
                            }
                        },
                        {
                            "$skip": skip
                        },
                        {
                            "$limit": limit
                        }
                    ],
                    "totalCount": [
                        { "$match": { $and: [{ativo: true}, {username:{"$regex": username, "$options":'i'}}]}},
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
            .then((res, err) => 
            {
                try{
                    this.addInteracao(id, 1);
                    return true;
                }
                catch (e){ 
                    return false;
                }
            })
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
            .then((res, err) => 
            {
                try{
                    this.addInteracao(id, -1);
                    return true;
                }
                catch (e){ 
                    return false;
                }
                
            })
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
            .then((res, err) => {
                try{
                    this.addInteracao(idPostagem, 1);
                    return true;
                }
                catch (e){ 
                    return false;
                }
            })
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
        // return this._findOne({ _id: id, ativo: true })
        return this._aggregate([
            {'$match': {
                    _id: mongoose.Types.ObjectId(id),
                    ativo: true
                }
            },
            {'$lookup': {
                    'from': 'usuarios', 
                    'localField': 'username', 
                    'foreignField': 'username', 
                    'as': 'user'
                }
            }
        ])
        .then(res=> res[0])
        .then(res => res ? res : false)
        .catch(err => console.log('Erro ao realizar busca: ' + err.message))
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
                    'as': 'comentarios'
                }
            }
        ])
        .then(res => res[0])
        .then(res => {
            res.comentarios = res.comentarios.filter(comentario =>
                 comentario.ativo? comentario  :  null
             )
             return res
         })
        .then(res => res ? res : 'error')
        .catch(console.error)
    }
    /*
        *   Busca uma postagem na base de dados pelo título
        *   @param {string} searched A busca a ser realizada no banco
        *   @param {Number} skipq
        *   @param {Number} limit Limite de postagens para busca
        *   @returns {Array}
    */
    search(searched,skip = '', limit = ''){
        return this._aggregate([
                { "$facet": {
                    "totalData": [
                        {
                                    "$match": { $and: [ 
                                        {ativo: true}, 
                                        {$or: [
                                            {titulo:{"$regex": searched, "$options":'i'}}, 
                                            {corpo:{"$regex": searched, "$options":'i'}},
                                        ]}
                                    ]
                                    },
                                },
                                {'$lookup': {
                                    'from': 'usuarios', 
                                    'localField': 'username', 
                                    'foreignField': 'username', 
                                    'as': 'user'
                                    }
                                },
                                {
                                    "$skip": skip
                                },
                                {
                                    "$limit": limit
                                }
                    ],
                    "totalCount": [
                        { "$match": { $and: [ 
                                {ativo: true}, 
                                {$or: [
                                    {titulo:{"$regex": searched, "$options":'i'}}, 
                                    {corpo:{"$regex": searched, "$options":'i'}},
                                ]}]}},
                        { "$count": "count" }
                    ]
                }}
            ])
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
                            {'$match': { ativo: true}},
                            {'$lookup': {
                                'from': 'usuarios', 
                                'localField': 'username', 
                                'foreignField': 'username', 
                                'as': 'user'
                                }
                            },
                            {"$sort":{
                                    updatedAt: -1
                                }
                            },
                            {
                                "$skip": skip
                            },
                            {
                                "$limit": limit
                            }
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
    /*
        *   Encontra postagem e soma uma interação
        *   @param {id} postagem
        *   @returns {postagem} postagem
    */
    addInteracao(idPostagem, int) {
        return this._findOneAndUpdate({ _id: idPostagem }, { $inc: { interacoes: int } }, { new: true })
            .then((res, err) => res ? res : err)
            .catch(err => {
                return ({ detail: "Impossível adicionar interação", error: err })
            })
    }
    /*
        *   Pega uma postagem
        *   @param {id} postagem
        *   @returns {Number} quantidades de interacoes da postagem
    */
    getInteracoes(idPostagem) {
        return this._findOne({ _id: idPostagem },{ interacoes: 1})
            .then((res, err) => res ? res : err)
            .catch(err => {
                return ({ detail: "Impossível buscar interações", error: err })
            })
    }

    resolvido(postagem, tipoUser)
    {
        if( tipoUser == 'admin')
            return this._findOneAndUpdate({_id: postagem._id, ativo: true}, {resolvido: true}, { new: true})
                .then(res => res ? res : false)
                .catch(err => console.log(err.message))
        else
            return this._findOneAndUpdate({_id: postagem._id, ativo: true, username: postagem.username}, {resolvido: true}, { new: true})
                .then(res => res ? res : false)
                .catch(err => console.log(err.message))
    }


    /*
        *   Busca uma postagem na base de dados pela lista de tags
        *   @param {lista de strings} tags serem buscas no banco
        *   @param {Number} skipq
        *   @param {Number} limit Limite de postagens para busca
        *   @returns {Array}
    */
    listarPostagemByTags(tags, skip = '', limit = ''){
        return this._aggregate([
                { "$facet": {
                    "totalData": [
                        {
                                    "$match": { $and: [ 
                                        { tags: { $all: tags } }, 
                                        {ativo: true} ]
                                    },
                                },
                                {
                                    "$sort":{
                                        updatedAt: -1
                                    }
                                },
                                {'$lookup': {
                                    'from': 'usuarios', 
                                    'localField': 'username', 
                                    'foreignField': 'username', 
                                    'as': 'user'
                                    }
                                },
                                {
                                    "$skip": skip
                                },
                                {
                                    "$limit": limit
                                }
                    ],
                    "totalCount": [
                        { "$match": { $and: [ {ativo: true}, { tags: { $all: tags } } ]}},
                        { "$count": "count" }
                    ]
                }}
            ])
    }
    listarPostagens()
    {
        return this._find();
    }

}
module.exports = PostagemDao;