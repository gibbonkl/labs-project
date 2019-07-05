const controllerHelpCenter = require('./HelpCenterController');

let user = {
    session : {
        user: {
            tipo: 'admin',
            username: 'admin'
        },
    }
}
controllerHelpCenter.listarPostagem(user, 'lastUpdate').then(console.log);