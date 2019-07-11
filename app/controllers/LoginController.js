let Model = require("../models/schema_usuario");
var UserDAO = require('../infra/dao/UserDao');

class LoginController {
    constructor(){
        throw new Error("Classe estática. Impossível instanciar.");
    }

    /*
        *   Invoca o DAO que verificará se as credenciais de login são válidas
        *   @param {string} user: email ou login do usuário
        *   @param {string} password: senha do usuário
    */
    static validateUser(user, password){
       
        let userDAO = new UserDAO(Model);
        return userDAO.login(user, password)
            .then((user) => {
                //console.log(user)
                if(user) return {"status":"ok", "user":user};
                else return {"status":"Credenciais inválidas.", "user":""};
            })
            .catch((err) => console.log(err));
    }
}

module.exports = LoginController;