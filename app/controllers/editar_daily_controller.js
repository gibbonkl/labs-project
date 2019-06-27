let Model = require("../models/schema_DailyNote");
var DailyDao = require('../infra/dao/DailyDao');

module.exports = function (res) {

    let dailyDao = new dailyDao(Model);
    let dailynote = {
            usuario = req.session.user.username,
            corpo: {
                ontem: req.body.ontem,
                hoje: req.body.hoje,
                impedimento: req.body.impedimento
        },
    }

    return dailyDao.updateDailyNote(dailynote)
        .then(res.send("Daily Alterada"))
        .catch((error) => res.send("Impossível alterar Daily", error))
}
