const mongoose = require('mongoose');
let Dao = require("./UserDao");
let Model = require("../../models/schema_usuario");
let obj = new Model({
    nome: "Trunks",
    sobrenome:"S",
    username:"trunks",
    email:"trunks@compasso.com.br",
    senha:"teste123,",
    hash:"3094ijifj1394k4o5ko23",
    imagem:"diego.png",
    data_nascimento: new Date("1996","09","17")
});

