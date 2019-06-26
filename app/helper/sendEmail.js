const mailer = require('nodejs-nodemailer-outlook');
const Class_config = require('../../config/config_localOUremoto');
const config = new Class_config();
const local = `http://localhost:1337`;
const remote = `https://gob-p1.azurewebsites.net`
const route = "/recuperar_senha";
class sendEmail{
    constructor(){
        throw new Error("Classe estática. Impossível instanciar.");
    }
    static send(dest='',hash=''){
        let link;
       return new Promise((resolve,reject)=>
            mailer.sendEmail({
                secure: false,
                auth: {
                    user: 'casadobolsista@outlook.com',
                    pass: '#c4s4d0b0ls1st4.2019'
                },
                from: 'casadobolsista@outlook.com',
                to: dest,
                subject: `Recuperar senha - Casa do Código`,
                html: `
<pre>Olá! Vi que você precisa recuperar sua senha =)
É só clicar nesse link <a href="${config.get() == "local" ? local : remote  }${route}/hash=${hash}">recuperar senha</a>

Atenciosamente,
Casa dos Bolsistas.</pre>`
                ,
                onError: (e) => reject(e),
                onSuccess: (i) => resolve(i)
            })
        )
    }
}
module.exports = sendEmail;