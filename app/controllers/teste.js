const controllerHelpCenter = require('./HelpCenterController');

controllerHelpCenter.listarPostagem('', 'lastUpdate',1, 2).then(console.log);

'/helpCenter/filtroData/:data'
'/helpCenter/filtroData/:username'