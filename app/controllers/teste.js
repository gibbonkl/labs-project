const help = require('./HelpCenterController');

help.listarPostagem('','data',1,10)
    .then(res=> console.log(res));