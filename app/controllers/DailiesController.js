let DailyModel = require("../models/schema_DailyNote");
var DailyDao = require('../infra/dao/DailyDao');

let UserModel = require("../models/schema_usuario");
var UserDAO = require('../infra/dao/UserDao');

class DailiesController {
    constructor(){
        throw new Error("Classe estática. Impossível instanciar.");
    }

    static listDailies(req, op, page=1, batch=20){
        console.log(req)
        let userDao = new UserDAO(UserModel);
        let dailyDao = new DailyDao(DailyModel);
        
        //verificar user
        let user = 'visitante'
        if(req.session) {
            user = userDao.checkUserPermission(req.session.user.username)
        }

         // get dailies
        if (op == 'user'){
            return dailyDao.listDailyNotesbyUser(req.body.filtro, (page-1)*batch, batch) 
                .then(dailies => 
                    dailies.map(function(daily){ 
                        if(user == 'admin' || daily.username == req.session.user.username)
                            daily['permissao'] = true;
                        return daily}))
                .catch(console.error)
        }

        else if(op == 'data'){
            return dailyDao.listDailyNotesByDate(req.body.filtro, (page-1)*batch, batch) 
                .then(dailies => 
                    dailies.map(function(daily){ 
                        if(user == 'admin' || daily.username == req.session.user.username)
                            daily['permissao'] = true;
                        return daily}))
                .catch(console.error)
        }

    }

    static addDaily(req){
        
        let daily = new modelDaily({
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
            .then(retorno)
            .catch(console.error)
    }

    static deleteDaily(req) {
        
        return dailyDao.removeDailyNoteById(req.body.daily_id)
            .then(retorno)
            .catch(console.error)
    }

    static updateDaily(req) {
        
        let dailyDao = new DailyDao(DailyModel);
        let dailyNote = {
                usuario : req.body.session.user,
                corpo: {
                    ontem: req.body.ontem,
                    hoje: req.body.hoje,
                    impedimento: req.body.impedimento
            },
        }
    
        return dailyDao.updateDailyNote(dailyNote)
            .then(retorno)
            .catch(console.error)
    }
}

module.exports = DailiesController;