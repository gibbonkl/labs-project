const mailer = require('nodejs-nodemailer-outlook');
class sendEmail{
    constructor(){
        throw new Error("Classe estática. Impossível instanciar.");
    }
    static send(dest='',hash=''){
        let link;
       return new Promise((resolve,reject)=>
        mailer.sendEmail({
                auth: {
                    user: 'casadobolsista@outlook.com',
                    pass: '#c4s4d0b0ls1st4.2019'
                },
                from: 'casadobolsista@outlook.com',
                to: dest,
                subject: `Recuperar senha - Casa do Código`,
                text: `
Olá! Vi que você precisa recuperar sua senha =)
É só clicar nesse link <a href="http://google.com.br">recuperar senha</a>

Atenciosamente,
Casa dos Bolsistas.`
                ,
                onError: (e) => resolve(e),
                onSuccess: (i) => reject(i)
            })
        )
    }
}
module.exports = sendEmail;