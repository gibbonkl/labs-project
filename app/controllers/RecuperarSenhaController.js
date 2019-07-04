const Model = require("../models/schema_usuario");
const UserDAO = require('../infra/dao/UserDao');
const Email = require("../helper/sendEmail");

/*
    *   Controller responsável por enviar o email 
    *   para recuperar a senha do usuário
    *
    * 
    *   @author Diego Bastos da Costa 
*/
class RecuperarSenhaController{
    /*
        * Instância um DAO para realizar a busca no banco
    */
    constructor(){
        this._userDAO = new UserDAO(Model);
    }
    /*
        *   Envia email para o usuário 
        *   Se for possível, retorna true
        *   Se não, retorna false
        *   Em caso de erro, lança uma exceção com o erro
        *   @param {string} user Nome de usuário
        *   @param {string} email Email de usuário
        *   @returns {bool}
    */
    recoveryPassword(user="",email=""){
        return this._userDAO.updateHash(user,email)
            .then(hash=> 
                hash? Email.send(email,hash) : null
            )
            .then(res => res ? true:false)
            .catch(err=> {
                console.error(err);
                throw new Error(err);
            })
    }
    /*
        *   Recupera a senha do usuário pelo link enviado por email
        *   Se for possível, envia true
        *   Se a senha for trocada, reseta a hash do usuário
        *   Se não, false
        *   Em caso de erro, retorna uma exception
        *   @param {string} hash Hash do usuário
        *   @param {string} newPassword Nova senha de usuário
        *   @returns {bool}
    */
    changePassword(hash="",newPassword=""){
        return this._userDAO.updatePassword(hash,newPassword)
            .then(res =>
                res? true:false
            )
            .catch(err=>{
                console.log(err);
                throw new Error(err);
            })

    }
}
module.exports = RecuperarSenhaController;