let Model = require("../models/schema_usuario");
let UserDAO = require('../infra/dao/UserDao');
let ModeloUsuarioCadastro = require('../models/modelo_usuario_cadastro');
const Image = require("../helper/image");

module.exports = function(req) {
    console.log('Controller cadastra usuario');
    if(req.file) {
        var filename = Image.save(req.file);
    }
    let user = new Model({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        username: req.body.username,
        email: req.body.email,
        senha: req.body.senha,
        imagem: filename,
        data_nascimento: new Date(req.body.data_nasc)
    });
    let userDAO = new UserDAO(Model);
    let promise = userDAO.insertUser(user)
        .then(user => {
            if(user && !user.error){                
                return{"status" : "ok", "user" : user};
            }
            else {
                let modeloUsuario = new ModeloUsuarioCadastro();
                modeloUsuario.preencheAutomatico(req.body);
                modeloUsuario.erroUsuarioExistente();
                return {"status" : "error", "user" : modeloUsuario.getUser()};
            }
        })
        .catch(() => {
            let modeloUsuario = new ModeloUsuarioCadastro();
            modeloUsuario.preencheAutomatico(req.body);
            modeloUsuario.erroUsuarioExistente();
            return {"status" : "error", "user" : modeloUsuario.getUser()};
        });
        return promise;
}