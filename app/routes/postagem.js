let sessionCheckerRedLogin = require('../helper/sessionCheckerRedLogin');
let controller = require('../controllers/HelpCenterController');

module.exports = function(app) {

    app.route('/helpCenter')
        //insere uma postagem
        .post((req,res) => {
            controller.insertPostagem(req)
        .then(postagem => res.send(postagem))
        .catch(console.error)
        })
}
