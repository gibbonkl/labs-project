let sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');
const HelpCenterController = require('../controllers/HelpCenterController');

module.exports = function(app)
{
    // Renderiza Pagina de Postagens
    app.get('/helpCenter', (req,res) => {
        
        if (req.session.user && req.cookies.user_sid) 
            var user = {username: req.session.user.username, tipo: req.session.user.tipo}
        else
            var user = {username: '', tipo: ''}
            
        res.render('helpcenter.ejs', {user : user});
    });
    
    app.get('/helpCenter/novo', sessionCheckerRedLogin, (req,res) => {
        
        var user = {username: req.session.user.username, tipo: req.session.user.tipo}
            
        res.render('novo_topico.ejs', {user : user});
    });

    app.get('/helpCenter/topico/:id', (req,res) => {
        
        if (req.session.user && req.cookies.user_sid) 
            var user = {username: req.session.user.username, tipo: req.session.user.tipo}
        else
            var user = {username: '', tipo: ''}
        
        HelpCenterController.getPostagem(req)
            .then(response => {
                console.log(response);
                res.render('topico.ejs', {user : user, response: response})
            })
            .catch(err => res.render(err))
        
    });

}
