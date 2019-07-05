const PostagemInsertController = require('./PostagemInsertController');
let PostagemModel = require("../models/schema_postagem");
const controllerHelpCenter = require('./HelpCenterController');

/* Teste Inserir Postagem
let postagem = new PostagemModel({
    titulo: 'POST NOVO',
    username: 'gibbon',
    corpo: 'CORPO'
});
PostagemInsertController.insertPostagem(postagem)
    .then(console.log);
*/

/* Teste Listar Postagens
let user = {
    session : {
        user: {
            tipo: 'admin',
            username: 'admin'
        },
    }
}
controllerHelpCenter.listarPostagem(user, 'lastUpdate').then(console.log);
*/
/* Teste Editar Postagem
req = {
    body: {
        _id: '5d1de45b456b4f13c81de56f',
        username: 'Goku',
        corpo: 'Novo corpo teste editar controller'
    }
};

controllerHelpCenter.editarPostagem(req).then(res => console.log(res));
*/

controllerHelpCenter.deletarPostagem('5d1de45b456b4f13c81de56f')
    .then(res => console.log(res));