const PostagemInsertController = require('./PostagemInsertController');
let PostagemModel = require("../../models/schema_postagem");

let postagem = new PostagemModel({
    titulo: 'titulo do post',
    username: 'gibbon',
    corpo: 'corpo da postagem'
});
PostagemInsertController.insertPostagem(postagem)
    .then(console.log);
