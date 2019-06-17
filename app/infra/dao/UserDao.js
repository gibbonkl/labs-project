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
                    console.erro(err);
                    return({detail:"Impossível realizar operação.",error:err});
                })
        }
        return({detail:"Impossível realizar operação",error:"Usuário null ou undefined"})
    }
    updateHash(username='',newHash='',hash=''){
        if(username && newHash && hash){
            return this._update({username:username,hash:hash},{$set:{hash: newHash}})
                
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
        *   @returns {object}
    */
    login(username='',password=''){
        if(username && password){
            return this._findOne({username:username,senha:password})
                .then(res=> res? res: null)
                .catch(err=>{
                    console.error(err);
                    return({detail:"Impossível realizar autenticação.",error:err})
                })
        }
        return({detail:"Impossível realizar autenticação.",error:"Username e senha null ou undefined"})
    }
}
module.exports = UserDao;