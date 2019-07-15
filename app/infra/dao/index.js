const mongoose = require('mongoose');
let UserDao = require("./UserDao");
let UserModel = require("../../models/schema_usuario");
let DailyDao = require("./DailyDao");
let DailyModel = require("../../models/schema_DailyNote");
let PostagemDao = require("./PostagemDao");
let PostagemModel = require("../../models/schema_postagem");
let ComentarioDAO = require("./ComentarioDAO");
let ComentarioModel = require("../../models/schema_comentario");
//let obj = new Model({
    // nome: "Goku",
    // sobrenome:"SOn",
    // username:"goku",
    // email:"goku@compasso.com.br",
    // senha:"teste123,",
    // hash:"3094ijifj1394k4o5ko23",
    // imagem:"diego.png",
    // data_nascimento: new Date("1996","09","17")
//});
/*
let obj = new DailyModel({
    usuario: "pessoinha",
     corpo: {
        ontem: 'stuff',
         hoje: 'controller',
         impedimento: 'não',
     }

     //data: "01/7/2019"
    // username:"goku",
    // email:"goku@compasso.com.br",
    // senha:"teste123"
    // hash:"3094ijifj1394k4o5ko23",
    // imagem:"diego.png",
    // data_nascimento: new Date("1996","09","17")
});
*/
/*
DailyDao = new DailyDao(DailyModel);
DailyDao.removeDailyNoteById('5d1a0cbebccab74284faeb7e')
    .then(console.log)
    .catch(console.error);
*/
//Dao.changePassword('gibbon', 'gibb')
//    .then(console.log)
//    .catch(console.error);
// let postagem = new PostagemModel ({
//     titulo: 'Titulo postagem',
//     username: 'Albano',
//     corpo: 'corpo da postagem 4',
//     likes: ['asd','asd','asde'],
//     comentarios: ['asd','asd','asde']
//  });

// PostagemDao = new PostagemDao(PostagemModel);
// PostagemDao.insertPostagem(postagem)
//     .then(res => console.log(res))

//let comentario = new ComentarioModel ({
 //   username: 'Goten',
 //   corpo: 'comentario do Goten'
// });

PostagemDao = new PostagemDao(PostagemModel);
PostagemDao.listarPostagemOrderByLastUpdate(5,2)
     .then(res => console.log(res))
     .catch(console.error)
// PostagemDao.getPagesNumber()
//     .then(console.log)
//     .catch(console.log)