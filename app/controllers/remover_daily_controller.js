let Model = require("../models/schema_DailyNote");
var DailyDao = require('../infra/dao/DailyDao');

req.session.user.username
req.session.user.tipo

module.exports = function(req){

    const dailyDao = new DailyDao(Model)

    const data = {
        _id: req.body._id,
        username: req.session.username,
        tipo: req.session.tipo
    };

    if(data.tipo == 'admin')
        return dailyDao.removeDailyNotebyId(data._id,'')
            .then(res.send("Daily Removida"))
            .catch((error) => res.send("Impossível deletar DailyNote", error))
    else if (data.username)
        return dailyDao.removeDailyNotebyUser(data._id,data.username)
            .then(res.send("Daily Removida"))
            .catch((error) => res.send("Impossível deletar DailyNote", error))    
}