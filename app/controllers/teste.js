const PostagemInsertController = require('./PostagemInsertController');
let PostagemModel = require("../models/schema_postagem");

let postagem = new PostagemModel({
    titulo: 'POST NOVO',
    username: 'gibbon',
    corpo: 'CORPO'
});
PostagemInsertController.insertPostagem(postagem)
    .then(console.log);

//-------------------------------------------------------
const ComentarioInsertController = require('./ComentarioInsertController');
let ComentarioModel = require("../models/schema_comentario");
let comentario = new ComentarioModel({

    username: 'gibbon',
    corpo: 'Corpo de comentario'
});
ComentarioInsertController.insertComentario("5d1f441bea4d892414de8578", comentario)
    .then(console.log);