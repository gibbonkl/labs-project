let Model = require("../models/schema_usuario");
let UserDAO = require('../infra/dao/UserDao');
let ModeloUsuarioCadastro = require('../models/modelo_usuario_cadastro');

module.exports = new Promise()
                .then((req) => {
                    let user = new Model({
                        nome: req.body.nome,
                        sobrenome: req.body.sobrenome,
                        username: req.body.username,
                        email: req.body.email,
                        senha: req.body.senha,
                        imagem: req.body.imagem,
                        data_nascimento: new Date(req.body.data_nasc)
                    });
                
                    let userDAO = new UserDAO(Model);
                    userDAO.insertUser(user)
                        .then(user => {
                            if(user && !user.error){
                                return JSON.parse({"status" : "ok", "user" : user});
                            }
                            else 
                            {
                                let modeloUsuario = new ModeloUsuarioCadastro();
                                modeloUsuario.preencheAutomatico(req.body);
                                modeloUsuario.erroUsuarioExistente();
                                return JSON.parse( {"status" : "error", "user" : modeloUsuario.getUser()});
                            }
                        })
                        .catch(console.log);

                })
                .catch();