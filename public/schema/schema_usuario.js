var mongoose = require('mongoose');
var schema = mongoose.Schema;


var schema_usuario = new Schema({

    _id : String,
    nome : { type : String, required : true},
    sobrenome : String,
    username : String,
    email : String,
    senha : String,
    tipo : {
        type : String,
        enum : ['admin', 'user'], 
        default : 'user'
    }, 
    hash : String,
    imagem : String,
    data_nascimento : {type : Date}

}, {timestamps : true});