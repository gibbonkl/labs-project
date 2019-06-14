var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema_usuario = new Schema({

    //_id: { type: String, required: false },
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    tipo: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    hash: { type: String, required: false },
    imagem: { type: String, required: false },
    data_nascimento: { type: Date, required: true },
    ativo: { type: Boolean, required: true, default: true }

}, { timestamps: true });

module.exports = mongoose.model('Usuario', schema_usuario);