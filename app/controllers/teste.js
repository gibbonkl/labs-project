const PostagemInsertController = require('./PostagemInsertController');
let PostagemModel = require("../models/schema_postagem");

let postagem = new PostagemModel({
    titulo: 'POST NOVO',
    username: 'gibbon',
    corpo: 'CORPO'
});
PostagemInsertController.insertPostagem(postagem)
    .then(console.log);
