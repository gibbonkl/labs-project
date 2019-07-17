const help = require('./HelpCenterController');

req = {
    session: { 
                user: { 
                    username: 'foda-se', 
                    tipo: 'admin'
                } 
            },
    body: { _id: '5d1de45b456b4f13c81de56f'}
}
help.resolvido(req)
    .then(res=> console.log(res));