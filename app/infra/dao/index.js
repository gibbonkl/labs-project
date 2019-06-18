const mongoose = require('mongoose');
let Dao = require("./UserDao");
let Model = require("../../models/schema_usuario");
let obj = new Model({
    // nome: "Goku",
    // sobrenome:"SOn",
    // username:"goku",
    // email:"goku@compasso.com.br",
    // senha:"teste123,",
    // hash:"3094ijifj1394k4o5ko23",
    // imagem:"diego.png",
    // data_nascimento: new Date("1996","09","17")
});
Dao = new Dao(Model);
Dao.login('','12345','teste@gmail.com')
    .then(console.log)
    .catch(console.error);