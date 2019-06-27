const mongoose = require('mongoose');
let Dao = require("./DailyDao");
let Model = require("../../models/schema_DailyNote");
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
let obj = new Model({
    usuario: "vedita",
    corpo: {
        ontem: 'cositas',
        hoje: 'controller',
        impedimento: 'não',
    },
    data: "27/5/2019"
    // username:"goku",
    // email:"goku@compasso.com.br",
    // senha:"teste123,",
    // hash:"3094ijifj1394k4o5ko23",
    // imagem:"diego.png",
    // data_nascimento: new Date("1996","09","17")
});
Dao = new Dao(Model);
//Dao.insertDailyNote(obj)
//    .then(console.log)
//    .catch(console.error);

Dao.listAllDailyNotesByDate('27/5/2019')
    .then(console.log)
    .catch(console.error);
