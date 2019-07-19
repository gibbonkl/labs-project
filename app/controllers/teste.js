const help = require('./HelpCenterController');

help.listarPostagem('','username')
    .then(res=> console.log(res));
