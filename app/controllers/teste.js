const controllerHelpCenter = require('./HelpCenterController');

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

req = {
    body: {
        _id: '5d1de45b456b4f13c81de56f',
        username: 'Goku',
        corpo: 'Novo corpo teste editar controller'
    }
};

controllerHelpCenter.editarPostagem(req).then(res => console.log(res));