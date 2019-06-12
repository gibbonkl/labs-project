const mongoose = require('mongoose');
const async = require('async');
let Dao = require("./TemplateDao");

var schema = new mongoose.Schema({
    name: String
})
var model = mongoose.model('Kitty', schema);

Dao = new Dao(model);
// Dao._save({name:'Goku'}).then(console.log);
// let res = Dao._findOne({name:"Gohan"})
//     .then(console.log)
//     .catch(console.log);
// console.log(Dao);
let res = Dao._update({name:'Goku'},{name:'Son Goku'})
    .then(console.log)
    .catch(console.log);