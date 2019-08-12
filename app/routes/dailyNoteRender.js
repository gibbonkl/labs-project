let sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');
let controller = require('../controllers/DailiesController');

module.exports = function(app)
{
    // route for user's dashboard
    app.route('/dailynote')
        .get((req, res) => {           
            if (req.session.user && req.cookies.user_sid) {
                user = {
                    username: req.session.user.username,
                    tipo: req.session.user.tipo,
                    imagem: req.session.user.imagem,
                    nome: req.session.user.nome
                }
                res.render('dailyNote.ejs', user);
            } else {
                user = {
                    username: '',
                    tipo: '',
                    imagem: '',
                    nome: ''
                }
                res.render('dailyNote.ejs', user);                
            }      
        })
}