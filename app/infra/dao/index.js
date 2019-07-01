const mongoose = require('mongoose');
let UserDao = require("./UserDao");
let UserModel = require("../../models/schema_Usuario");
let DailyDao = require("./DailyDao");
let DailyModel = require("../../models/schema_DailyNote");
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
Dao = new DailyDao(DailyModel);
Dao.insertDailyNote(obj)
    .then(console.log)
    .catch(console.error);

//Dao.changePassword('gibbon', 'gibb')
//    .then(console.log)
//    .catch(console.error);
