module.exports = function(app)
{
    // route for user's dashboard
    app.route('/dailynote100contrato')
        .get((req, res) => {           
            if (req.session.user && req.cookies.user_sid) {

                user = {
                    username: req.session.user.username,
                    tipo: req.session.user.tipo,
                    imagem: req.session.user.imagem,
                    nome: req.session.user.nome

                }

                res.render('daily100contrato.ejs', user);
            } else {

                user = {
                    username: '',
                    tipo: '',
                    imagem: '',
                    nome: ''
                }
                res.render('daily100contrato.ejs', user);                
            }      
        })

    app.route('/helpcenter100contrato')
        .get((req, res) => {           
            if (req.session.user && req.cookies.user_sid) {

                user = {
                    username: req.session.user.username,
                    tipo: req.session.user.tipo,
                    imagem: req.session.user.imagem,
                    nome: req.session.user.nome

                }

                res.render('helpcenter100contrato.ejs', user);
            } else {

                user = {
                    username: '',
                    tipo: '',
                    imagem: '',
                    nome: ''
                }
                res.render('helpcenter100contrato.ejs', user);
            }      
        })
}