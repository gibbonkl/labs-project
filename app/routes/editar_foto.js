let sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');
let EditarFotoController = require('../controllers/EditarFotoController');
const multer = require("multer");
var upload = multer({dest: 'app/public/binary'});

module.exports = function (app) {
    app.use('/cadastro', upload.single('upload'), (req,res,next) => {
        if (req.method == 'POST') {
            console.log('Middleware Validação Editar Foto');   
        }
        next();
    });
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
        .post(upload.single('upload'),sessionCheckerRedLogin, (req, res) => {
            console.log('Rota Editar Foto (metodo Post)');
            EditarFotoController(req)
            .then(retorno => {
                if (retorno) {  
                    res.redirect('/');            
                } else {
                    res.render('editar_foto', { user: user});
                }
            })
        });
}