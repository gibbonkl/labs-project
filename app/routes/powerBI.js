var PostagemDAO = require('../infra/dao/PostagemDao');
var PostagemModel = require('../models/schema_postagem');

var ComentarioDAO = require('../infra/dao/ComentarioDAO');
var ComentarioModel = require('../models/schema_comentario');

var UserDAO = require('../infra/dao/UserDao');
var UserModel = require('../models/schema_usuario');

var DailyDAO = require('../infra/dao/DailyDao');
var DailyModel = require('../models/schema_DailyNote');

module.exports = function(app) 
{
    app.get('/pbihelps/:hash', (req, res) => {
        
        let postagemDAO = new PostagemDAO(PostagemModel);
        
        if(req.params.hash == '67e4006e39aaa3bfddcf3ed873efef33')     
            postagemDAO.listarPostagens().then(response => res.send(response));
        else
            res.send('Hoje Não!!'); 
    })

    app.get('/pbicomments/:hash', (req, res) => {
        let comentarioDAO = new ComentarioDAO(ComentarioModel);
        
        if(req.params.hash == '67e4006e39aaa3bfddcf3ed873efef33')     
            comentarioDAO.listarComentarios().then(response => res.send(response));
        else
            res.send('Hoje Não!!');
    })

    app.get('/pbiusers/:hash', (req, res) => {

        let userDAO = new UserDAO(UserModel)
        
        if(req.params.hash == '67e4006e39aaa3bfddcf3ed873efef33')     
            userDAO.listarUsers().then(response => res.send(response));
        else
            res.send('Hoje Não!!');
    })

    app.get('/pbidailies/:hash', (req, res) => {
        let dailyDAO = new DailyDAO(DailyModel);
        
        if(req.params.hash == '67e4006e39aaa3bfddcf3ed873efef33')     
            dailyDAO.listarDailies().then(response => res.send(response));
        else
            res.send('Hoje Não!!');
    })
}