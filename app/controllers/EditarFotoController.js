let Model = require("../models/schema_usuario");
let UserDAO = require('../infra/dao/UserDao');
const Image = require("../helper/image");

module.exports = function(req) {
    console.log('Controller edita foto');
    if(req.file){
        var filename = Image.save(req.file, req.body.username);
    }
    console.log(filename);
    let user = {
        imagem: filename
    }
    let userDAO = new UserDAO(Model);
    return userDAO.updatePhoto(req.session.user.username,user.imagem)
        .then(response => response ? response: null)
        .catch((error) => null)
}