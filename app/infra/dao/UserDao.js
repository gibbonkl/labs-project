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
    updateHash(email){
        if(email){
            
            let newHash =  createHash(Math.random().toString(36).substring(7));
            return this._updateOne({email:email},{$set:{hash: newHash}})
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
    /*
        *   Busca por um usuário pelo username e senha
        *   @param {string} username Nome de usuário
        *   @param {string} password Senha de usuário
        *   @param {string} email Email do usuário
        *   @returns {object}
    */
    login(user='', password=''){        
        return this._findOne({ $or: [{ username: user, senha: password }, { email: user, senha: password }], ativo: true })
            .then(res=> res? res: null)
            .catch(err=>{
                console.error(err);
                return({detail:"Impossível realizar autenticação.",error:err})
        });
    }
    checkEmail(email = ''){
        if(email){
            return this._findOne({email:email})
                .then(res=> res? true:false)
                .catch(err=>{
                    console.error(err);
                    return(false);
                })
        }
        return(false)
    }
    /*
        *   Busca por um usuário pelo username e senha
        *   @param {string} username Nome de usuário
        *   @param {string} password Senha de usuário
        *   @returns true se a senha for do usuário
    */
    checkPassword(username = '', password = '') {
        if (username && password) {
            return this._findOne({ username: username, senha: password })
                .then(res => res ? true : false)
                .catch(err => {
                    console.error(err);
                    return (false);
                })
        }
        return (false);
    }
    /*
    *   Busca por um usuário pelo username e senha
    *   @param {string} username Nome de usuário
    *   @param {string} password Senha de usuário
    *   @param {string} email Email do usuário
    *   @returns {object}
    */
    changePassword(username = "", newPassword = "") {
        if (username && newPassword) {
            return this._findOneAndUpdate({ username: username }, { $set: { senha: newPassword } })
                .then(res => res ? res : null)
                .catch(err => {
                    console.error(err);
                    return ({ detail: "Impossível trocar senha", error: err });
                })
        }
    }    
    updatePhoto(username, newPhoto){
        if(username && newPhoto){
            return this._findOneAndUpdate({username: username}, {$set:{imagem: newPhoto}})
                .then(res => res? res : null)
                .catch(err=>{
                    return({detail:"Impossível atualizar a foto.", error:err});
                })
        }
    }
    /*
    *   Verifica tipo de permissão de usuário
    *   @param {string} username Nome de usuário
    *   @returns {enum} 'admin' ou 'user'
    */
    checkUserPermission(username = "") {
        if (username) {
            return this._findOne({ username: username }, { type: 1 })
                .then(res => res ? res : null)
                .catch(err => {
                    return ({ detail: "Impossível verificar ", error: err });
                })
        }
    }
    listarUsers()
    {
        return this._find();
    }
}
module.exports = UserDao;