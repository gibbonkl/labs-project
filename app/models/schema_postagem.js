var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var date = require('../helper/date_helper');

var schema_postagem = new Schema({
    username: { type: String, required: true },
    corpo: { type: String, required: true },
    data: { type: String, required: true, default: date() },
    comentarios: { type: [String] },
    tags: { type: [String] },
    likes: { type: [String]},
    ativo: { type: Boolean, required: true, default: true }

},{ timestamp: true });

module.exports = mongoose.model('Postagem', schema_postagem);