let DailyModel = require("../models/schema_DailyNote");
var DailyDao = require('../infra/dao/DailyDao');

let UserModel = require("../models/schema_usuario");
var UserDAO = require('../infra/dao/UserDao');
/*
    *   Controller responsável por gerenciar as dailies
    *   Busca todas por filtro, adiciona daily, remove daily,
    *   edita e a retorna a paginação
    * 
    *   @note   Todos os retornos são por meio de Promise
    *   @author Albano Borba
    *   @edit Diego Bastos
*/
class DailiesController {
    /*
        *   Classe estática
        *   @static
    */
    constructor() {
        throw new Error("Classe estática. Impossível instanciar.");
    }
    /*
        *   Retorna a lista de daily
        *   Caso a operação seja por usuário,
        *   Retorna todas dailies para aquele usuário,
        *   Caso a operação seja por data,
        *   Retorna todas operações para aquela data
        * 
        *   @static
        *   @param {Request} req Requisição do usuário
        *   @param {string} op Operação solicitada pelo usuário
        *   @param {Number} page Referente a paginação
        *   @param {Number} batch Número máximo de dailies por retorno
        *   @return {Array}    
    */
    static listDailies(req, op, page=1, batch=20){
        let userDao = new UserDAO(UserModel);
        let dailyDao = new DailyDao(DailyModel);
        //verificar user
        /*
            *   Verifica o tipo de usuário
            *   E o username
        */
        let user = 'visitante'
        let username = ''
        /*
            *   Se existe um usuário na sessão,
            *   Verifica as permissões e
            *   Seta para a variável username
            *   Caso contrário, realiza as operações como visitante
        */
        if(req.session.user) {
            if(req.session.user.tipo == "admin")
                user = "admin"
            else{
                user = userDao.checkUserPermission(req.session.user.username);
                username = req.session.user.username;
            }

        }
        
         // get dailies
        if (op == 'user'){
            /*
                *   Se a operação for por usuário
                *   Seta as permissões para true somente se o usuário for dono da daily
                *   Ou se o usuário for admin do sistema
                *   Se não, seta a permissão para false
            */
            return dailyDao.listDailyNotesByUser(req.body.filtro, (page-1)*batch, batch) 
                .then(dailies => 
                    dailies.map((daily)=>{
                        user == 'admin' || daily['usuario'] == username ? daily['permissao'] = true : daily['permissao'] = false
                        daily.imagem = daily.user.imagem
                        delete(daily.user);
                        return daily;

                    }))
                .catch(console.error)
        }

        else if(op == 'data'){
            /*
                *   Se a operação for por data
                *   Seta as permissões para true somente se o usuário for dono da daily
                *   Ou se o usuário for admin do sistema
                *   Se não, seta a permissão para false
            */
            return dailyDao.listDailyNotesByDate(req.body.filtro, (page-1)*batch, batch) 
                .then(dailies => 
                    dailies.map(daily=>{
                        user == 'admin' || daily['usuario'] == username? daily['permissao'] = true : daily['permissao'] = false
                        daily.imagem = daily.user[0].imagem
                        delete(daily.user);
                        return daily
                    })
                )
                .catch(console.error)
        }

    }
    /*
        *   Insere uma lista na base de dados,
        *   Só é possível inserir uma daily
        *   por usuário para determinado dia
        * 
        *   Retorna a daily inserida no banco, se possível
        *   @param {Request} req Requisição com as informações da daily
        *   @return {object}
    */
    static addDaily(req){
        
        let daily = new DailyModel({
            usuario : req.session.user.username,
            corpo : 
            {   
                ontem : req.body.ontem,
                hoje: req.body.hoje,
                impedimento: req.body.impedimento
            }
        });

        let dailyDAO = new DailyDao(DailyModel);
        return dailyDAO.insertDailyNote(daily)
            .then(response => response)
            .catch(console.error)
    }
    /*
        *   Remove uma daily da base dados
        *   E seta o campo ativo para false
        * 
        *   @param {Request} req Requisição com o id para remoção
        *   @return {object}
    */
    static deleteDaily(req) {
        let dailyDao = new DailyDao(DailyModel);
        return dailyDao.removeDailyNoteById(req.body.daily_id)
            .then(response => response)
            .catch(console.error)
    }
    /*
        *   Edita uma daily na base de dados
        * 
        *   @param {Request} req Requisição com o corpo para modificação
        *   @return {object}
    */
    static updateDaily(req) {

        let dailyDao = new DailyDao(DailyModel);
        let dailyNote = {
                usuario : req.session.user.username,
                _id: req.body._id,
                corpo: {
                    ontem: req.body.ontem,
                    hoje: req.body.hoje,
                    impedimento: req.body.impedimento,
                }
        }

        return dailyDao.updateDailyNote(dailyNote)
            .then(response => response)
            .catch(console.error)
    }
    /*
        *   Verifica a paginação das dailies
        * 
        *   @return {Number}
    */
    static numberOfDailies() {
        let dailyDao = new DailyDao(DailyModel);

        return dailyDao.numberOfDailies()
            .then(count)
            .catch(console.error)
    }
}

module.exports = DailiesController;