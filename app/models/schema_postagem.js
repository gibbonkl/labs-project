var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var date = require('../helper/date_helper');

var ObjectId = mongoose.Schema.Types.ObjectId;

var schema_postagem = new Schema({
    username: { type: String, required: true },
    titulo: { type: String, required: true },
    corpo: { type: String, required: true },
    data: { type: String, required: true, default: date() },
    comentarios: { type: [ObjectId] },
    tags: { type: [String] },
    likes: { type: [String]},
    ativo: { type: Boolean, required: true, default: true },
    permissao: {type: Boolean, default: false}
},{ timestamps: true });

module.exports = mongoose.model('Postagem', schema_postagem);