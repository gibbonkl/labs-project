let Model = require("../models/schema_usuario");
let UserDAO = require('../infra/dao/UserDao');
let ModeloUsuarioCadastro = require('../models/modelo_usuario_cadastro');
const uuidv4 = require("uuid/v4");

const path = require("path");
const fs = require('fs');

module.exports = function(req)
{
    console.log('controller cadastra usuario');

    function type(file){
        let tmp = file.split(".");
        return tmp[1];
    }
    const format = type(req.file.originalname);
    const filename = `${uuidv4()}.${format}`;
    const targetPath = path.join(__dirname, `../public/uploads/${filename}`);
    let user = new Model({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        username: req.body.username,
        email: req.body.email,
        senha: req.body.senha,
        imagem: filename,
        data_nascimento: new Date(req.body.data_nasc)
    });
    const tempPath = req.file.path;
    if (path.extname(req.file.originalname).toLowerCase() === `.${format}`) {
      fs.rename(tempPath, targetPath, err => {
        if(err) console.log(err)
      })
    }
    let userDAO = new UserDAO(Model);
    let promise = userDAO.insertUser(user)
        .then(user => {
            if(user && !user.error){
                
                return{"status" : "ok", "user" : user};
            }
            else 
            {
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