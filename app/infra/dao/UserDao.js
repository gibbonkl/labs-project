const TemplateDao = require("./TemplateDao");

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
                    console.log(err);
                    return({detail:"Impossível realizar operação.",error:err});
                })
        }
        return({detail:"Impossível realizar operação",error:"Usuário null ou undefined"})
    }
    /*
        *   Verifica se o username possui a hash determinada
        *   @param {string} username Nome de usuário
        *   @param {string} hash Hash do usuário
        *   @returns {bool}
    */
    getHash(username,hash){
        if(username && hash){
            return this._findOne({username: username,hash: hash})
                .then(res=> res?true:false)
                .catch(err=>{
                    console.log(err);
                    return(false);
                })
        }
        return(false);
    }
    updatePassword(){

    }
}
module.exports = UserDao;