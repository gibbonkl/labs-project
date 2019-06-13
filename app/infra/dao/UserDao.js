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
            return new Promise((resolve,reject)=>
                this.validateUser(user)
                    .then(res =>
                        !res? resolve(this._save(user)): reject(null)
                    )
                    .catch(console.error)
            )
        
        }

    }
    /*
        *   Verifica se usuário existe no banco: nome, sobrenome,username e email
        *   Se existir, retorna o document encontrado
        *   Se não existir, retorna null
        *   @param {Model} user Modelo de usuário mongoose
        *   @returns {object}
    */
    validateUser(user){
        if(user){
            return new Promise((resolve,reject)=>
                this._findOne({$or: [{nome:user.nome},{sobrenome:user.sobrenome},{username:user.username},{email:user.email}]})
                .then(res => res? resolve(res) : resolve(null))
                .catch(err=>{
                    console.log(err);
                    reject("Impossível realizar operação.");
                })
            )
        }
    }
    /*
        *   Verifica se o username possui a hash determinada
        *   @param {string} username Nome de usuário
        *   @param {string} hash Hash do usuário
        *   @returns {bool}
    */
    getHash(username,hash){
        if(user){
            return new Promise((resolve,reject)=>
                this._findOne({username: username,hash: hash})
                    .then(res=> res?resolve(true):resolve(false))
                    .catch(err=>{
                        console.log(err);
                        reject("Impossível realizar operação.");
                    })
            )
        }
    }
    updatePassword(){

    }
}
module.exports = UserDao;