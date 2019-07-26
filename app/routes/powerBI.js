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
    app.get('/pbihelps', (req, res) => {
        let postagemDAO = new PostagemDAO(PostagemModel);
        
        postagemDAO.listarPostagens()
            .then(response => res.send(response)); 
    })

    app.get('/pbicomments', (req, res) => {
        let comentarioDAO = new ComentarioDAO(ComentarioModel);
        
        comentarioDAO.listarComentarios()
            .then(response => res.send(response)); 
    })

    app.get('/pbiusers', (req, res) => {
        let userDAO = new UserDAO(UserModel)
        
        userDAO.listarUsers()
            .then(response => res.send(response)); 
    })

    app.get('/pbidailies', (req, res) => {
        let dailyDAO = new DailyDAO(DailyModel);
        
        dailyDAO.listarDailies()
            .then(response => res.send(response)); 
    })
}