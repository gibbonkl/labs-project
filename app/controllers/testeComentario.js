const controller = require('./_editarComentario');

/* Testar editar comentario
let req = {
    body: {
        _id: '5d1de5b834def81af0b59424',
        corpo: 'testando editar controller',
    }
}
controller.editarComentario(req).then(res => res ? console.log() : 'error')
*/

controller.deletarComentario('5d1de5b834def81af0b59424','5d1de45b456b4f13c81de56f').then(res => res ? console.log(res) : 'error')