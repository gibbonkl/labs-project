const TemplateDao = require("./TemplateDao");
var createHash = require('../../helper/createHash');

class UserDao extends TemplateDao{
    /*
        *   Verifica se usuário existe no banco,
        *   Se não existir, insere no banco de dados e retorna o objeto inserido
        *   Se existir, retorna null
        *   @param {Model} user Modelo de usuário mongoose
        *   @returns {object}
        * 
    */
    insertUser(user){
        if(user){
            return this.validateUser(user)
                .then(res =>
                    !res? this._save(user): null
                )
                .catch(err=>{
                    console.error(err);
                    return({detail:"Impossível realizar operação",error:err})
                }) 
        }
        return({detail:"Impossível realizar operação",error:"Usuário null ou undefined"})

    }
    /*
        *   Verifica se usuário existe no banco com: username e email
        *   Se existir, retorna o document encontrado
        *   Se não existir, retorna null
        *   @param {Model} user Modelo de usuário mongoose
        *   @returns {object}
    */
    validateUser(user){
        if(user){
            return this._findOne({$or: [{username:user.username},{email:user.email}]})
                .then(res => res? res : null)
                .catch(err=>{
                    console.erro(err);
                    return({detail:"Impossível realizar operação.",error:err});
                })
        }
        return({detail:"Impossível realizar operação",error:"Usuário null ou undefined"})
    }
    updateHash(username, email){
        if(username && email){
            
            let newHash =  createHash(Math.random().toString(36).substring(7));
            return this._updateOne({username:username, email:email},{$set:{hash: newHash}})
                .then(() => newHash)
                .catch(console.error);
                
        }
        return({detail:"Impossível realizar operação",error:"Campo inválido"})
    }
    /*
        *   Verifica se o username possui a hash determinada
        *   @param {string} username Nome de usuário
        *   @param {string} hash Hash do usuário
        *   @returns {bool}
    */
    getHash(username='',hash=''){
        if(username && hash){
            return this._findOne({username: username,hash: hash})
                .then(res=> res?true:false)
                .catch(err=>{
                    console.error(err);
                    return(false);
                })
        }
        return(false);
    }

    updatePassword(username="",newPassword=""){
        if(username && newPassword){
            return this._update({username:username},{$set:{senha: newPassword}})
        }
    }
    /*
        *   Busca por um usuário pelo username e senha
        *   @param {string} username Nome de usuário
        *   @param {string} password Senha de usuário
        *   @param {string} email Email do usuário
        *   @returns {object}
    */
    login(user='', password=''){
        
        return this._findOne({$or: [{username:user},{email:user}]}, {senha:password})
            .then(res=> res? res: null)
            .catch(err=>{
                console.error(err);
                return({detail:"Impossível realizar autenticação.",error:err})
        });
    }
}
module.exports = UserDao;