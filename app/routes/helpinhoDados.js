
const path = require('path');
const ENV_FILE = path.join(__dirname, '.env');
require('dotenv').config({ path: ENV_FILE });

let DailyController = require('../controllers/DailiesController');
const HelpCenterController = require('../controllers/HelpCenterController');
const comentcontroller = require('../controllers/ComentarioController');

module.exports = function(app){
    app.route('/daily-bot')
        .post((req, res) => {
            if(req.body.secret_key == process.env.secret_key){
                console.log(req.body)
                let data = {
                    username: req.body.username,
                    ontem: req.body.ontem,
                    hoje: req.body.hoje,
                    impedimento: req.body.impedimento
                }
                DailyController.addDaily(data)
                    .then(retorno => {
                        !retorno?
                            res.send({erro:'Já existe uma daily registrada nesse dia.'}):
                            res.send({okay: "Sua daily foi adicionada com sucesso."})  
                })
                .catch(console.error);
            }
            else{
                res.send({erro: "Oops. Alguma coisa deu errado. Você não pode adicionar essa daily"})
            }
    })
    app.route('/helpcenter-bot')
        .post((req,res)=>{
            if(req.body.secret_key == process.env.secret_key){
                let data = {
                    username: req.body.username,
                    corpo: req.body.corpo,
                    titulo: req.body.titulo,
                    tags: req.body.tags.split(",")
                }
                HelpCenterController.insertPostagem(data)
                    .then(postagem => postagem ? res.send({okay:"Postagem adicionada com sucesso!"}) : res.send({erro:"Não foi possível inserir postagem"}))
                    .catch(console.error)
            }   
            else res.send({erro: "Oops. Alguma coisa deu errado. Você não pode adicionar essa daily"})

        })
}
