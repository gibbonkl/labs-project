var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var date = require('../helper/date_helper');

var schema_comentario = new Schema({
    username:{ type: String, required: true },
    comentario:{ type: String, required: true },
    data: { type: String, required: true, default: date() }, 
    like: { type: Number, required: true, default: 0}

},{ timestamp: true });

module.exports = mongoose.model('Comentario', schema_comentario);
