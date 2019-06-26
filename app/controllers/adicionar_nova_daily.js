let dailyDAO = require('../infra/dao/DailyDao');
let modelDaily = require('../models/schema_DailyNote');

module.exports = function(req)
{
    let daily = new modelDaily({
        usuario : req.session.user.username,
        corpo : 
        {
            ontem : req.body.ontem,
            hoje: req.body.hoje,
            impedimento: req.body.impedimento
        }
    });
    let dailyDAO = new dailyDAO(modelDaily);
    let promise = dailyDAO.insertDailyNote(daily);

    console.log(promise);
    return promise;
}
