let DailyModel = require("../models/schema_DailyNote");
var DailyDao = require('../infra/dao/DailyDao');

let UserModel = require("../models/schema_usuario");
var UserDAO = require('../infra/dao/UserDao');

class DailiesController {
    constructor(){
        throw new Error("Classe estática. Impossível instanciar.");
    }

    static listDailies(req, page=1, batch=20){
        console.log(req)
        let userDao = new UserDAO(UserModel);
        let dailyDao = new DailyDao(DailyModel);
        
        //verificar user
        let user = 'visitante'
        if(req.session) {
            user = userDao.checkUserPermission(req.session.user.username)
        }

        // get dailies
        return dailyDao.listDailyNotes(req.session.user.username, (page-1)*batch, batch) 
            .then(dailies => 
                dailies.map(function(daily){ 
                    if(user == 'admin' || daily.username == req.session.user.username)
                        daily['permissao'] = true;
                    return daily}))
            .catch(console.error)
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
        let promise = dailyDAO.insertDailyNote(daily);
    
        console.log(promise);
        return promise;
    }

    static deleteDaily(req) {
        
        return dailyDao.removeDailyNoteById(req.body.daily_id)
            .then(res.send("Daily Removida"))
            .catch((error) => res.send("Impossível deletar DailyNote", error))

    }

    static updateDaily(req) {
        
        let dailyDao = new DailyDao(DailyModel);
        let dailyNote = {
                usuario = req.session.user.username,
                corpo: {
                    ontem: req.body.ontem,
                    hoje: req.body.hoje,
                    impedimento: req.body.impedimento
            },
        }
    
        return dailyDao.updateDailyNote(dailyNote)
            .then(res.send("Daily Alterada"))
            .catch((error) => res.send("Impossível alterar Daily", error))
    }
}

module.exports = DailiesController;