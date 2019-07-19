const help = require('./HelpCenterController');

help.listarPostagem('','tags')
    .then(res=> console.log(res));
