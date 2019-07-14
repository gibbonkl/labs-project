const help = require('./HelpCenterController');

help.listarPostagem('','busca',1,10)
    .then(res=> console.log(res));