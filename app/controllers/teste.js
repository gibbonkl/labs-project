const help = require('./HelpCenterController');

help.listarPostagem('','busca')
    .then(res=> console.log(res));
