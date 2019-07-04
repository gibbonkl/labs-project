var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var date = require('../helper/date_helper');

var schema_comentario = new Schema({
    username:{ type: String, required: true },
    corpo:{ type: String, required: true },
    data: { type: String, required: true, default: date() }, 
    likes: { type: [String] },
    ativo: { type: Boolean, required: true, default: true }

},{ timestamps: true });

module.exports = mongoose.model('Comentario', schema_comentario);
