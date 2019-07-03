var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var date = require('../helper/date_helper');

var schema_postagem = new Schema({
    username: { type: String, required: true },
    postagem: { type: String, required: true },
    data: { type: String, required: true, default: date() },
    comentarios: [ String ],
    tags: [ String ],
    like: { type:Number, required: true, default: 0}

},{ timestamp: true });

module.exports = mongoose.model('Postagem', schema_postagem);