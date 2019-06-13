const TemplateDao = require("./TemplateDao");

class UserDao extends TemplateDao{
    insertUser(user){
        this._save(user)
            .then(res => 'Usuário inserido com sucesso')
            .catch(err => {
                console.error(err);
                return("Erro ao inserir o usuário");
            })
    }
    validateUser(){

    }
    getHash(){

    }
    updatePassword(){

    }
}