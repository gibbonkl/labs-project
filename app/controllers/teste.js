const help = require('./HelpCenterController');

help.listarPostagem('','username',1,10)
    .then(res=> console.log());