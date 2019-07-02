let DailyModel = require("../models/schema_DailyNote");
var DailyDao = require('../infra/dao/DailyDao');

let UserModel = require("../models/schema_usuario");
var UserDAO = require('../infra/dao/UserDao');

class DailiesController {
    constructor() {
        throw new Error("Classe estática. Impossível instanciar.");
    }

    static listDailies(req, op, page=1, batch=20){
        let userDao = new UserDAO(UserModel);
        let dailyDao = new DailyDao(DailyModel);
        //verificar user
        let user = 'visitante'
        let username = ''
        if(req.session.user) {
            user = userDao.checkUserPermission(req.session.user.username);
            username = req.session.user.username;
        }

         // get dailies
        if (op == 'user'){
            return dailyDao.listDailyNotesByUser(req.body.filtro, (page-1)*batch, batch) 
                .then(dailies => 
                    dailies.map(function(daily){ 
                        if (user == 'admin' || daily.username == username)
                            daily['permissao'] = true;
                        return daily}))
                .catch(console.error)
        }

        else if(op == 'data'){
            return dailyDao.listDailyNotesByDate(req.body.filtro, (page-1)*batch, batch) 
                .then(dailies => 
                    dailies.map(daily=>{
                        user == 'admin' || daily['usuario'] == username? daily['permissao'] = true : daily['permissao'] = false
                        return daily
                    })
                )
                .catch(console.error)
        }

    }

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

    static deleteDaily(req) {
        let dailyDao = new DailyDao(DailyModel);
        return dailyDao.removeDailyNoteById(req.body.daily_id)
            .then(response => response)
            .catch(console.error)
    }

    static updateDaily(req) {

        let dailyDao = new DailyDao(DailyModel);
        let dailyNote = {
                usuario : req.session.user.username,
                data: req.body.data,
                corpo: req.body.corpo,
        }

        return dailyDao.updateDailyNote(dailyNote)
            .then(response => response)
            .catch(console.error)
    }
}

module.exports = DailiesController;