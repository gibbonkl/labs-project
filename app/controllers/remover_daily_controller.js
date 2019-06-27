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
        dailyDao.removeDailyNotebyId(data._id,'')
            .then()
            .catch()
    else if (data.username)
        dailyDao.removeDailyNotebyUser(data._id,data.username)
            .then()
            .catch()
}