let sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');
let EditarFotoController = require('../controllers/EditarFotoController');
const multer = require("multer");
var upload = multer({dest: 'app/public/binary'});

module.exports = function (app) {
    // rota para editar perfil
    app.route('/editar_foto')
        .get(sessionCheckerRedLogin, (req, res) => {
            let user = {
                username: req.session.user.username,
                tipo: req.session.user.tipo,
                imagem: req.session.user.imagem
            }
            res.render('editar_foto', {user: user});
        })
        .post(upload.single('upload'),sessionCheckerRedLogin, ( req, res) => {
            if(req.file){
                EditarFotoController(req)
                .then(retorno => {
                    console.log(retorno)
                    if (retorno) {
                        req.session.user.imagem = retorno;
                        res.redirect('/');
                    } else {                        
                        res.render('editar_foto', { user: req.session.user.imagem});
                    }
                }) 
            }
            else {  
                res.redirect('/')
            }

        });
}