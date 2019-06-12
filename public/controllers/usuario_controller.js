/*  
 *  Este arquivo serve de exemplo de como usar o modulo 'multer', pegar o body da requisição e
 *  usar o modelo importado do schema
 *  Dúvidas tratar com @Karolina Gibbon ou @Rafael Romeu
 */
var multer = require('multer');
var upload = multer();
var modelo = require('../model/schema/schema_usuario');

module.exports = function(app) {
    app.post("/cadastrar", upload.none(), function(req, res) {

        const { nome, sobrenome, username, email, senha, data_nascimento } = req.body;

        var usuario = new modelo({
            'nome': nome,
            'sobrenome': sobrenome,
            'username': username,
            'email': email,
            'senha': senha,
            'data_nascimento': data_nascimento
        });

        console.log(usuario);
        console.log(req.body);

        res.send('ok');
    });
}