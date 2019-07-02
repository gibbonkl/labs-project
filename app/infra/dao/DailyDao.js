const TemplateDao = require("./TemplateDao");

class DailyDao extends TemplateDao {
    /*
        *   Verifica se daily note no banco,
        *   Se não existir, insere no banco de dados e retorna o objeto inserido
        *   Se não existir, retorna null
        *   @param {Model} dailyNote Modelo de daily mongoose
        *   @returns {object}
    */
    insertDailyNote(dailyNote) {
        if (dailyNote) {
            return this.validateDailyNote(dailyNote)
                .then(res => !res ? this._save(dailyNote) : null)
                .catch(err => {
                    console.log(err);
                    return ({ detail: "Impossível realizar operação", error: "Daily Note null ou undefined" })
                })
        }
    }
    /*
        *   Verifica se a daily note existe no banco com: username e date
        *   Se existir, retorna o document encontrado
        *   Se não existir, retorna null
        *   @param {Model} dailyNote Modelo de daily mongoose
        *   @returns {object}
    */
    validateDailyNote(dailyNote) {
        if (dailyNote) {
            return this._findOne({ usuario: dailyNote.usuario, data: dailyNote.data, ativo: true })
                .then(res => res ? res : null)
                .catch(err => {
                    console.error(err);
                    return ({ detail: "Impossível realizar operação", error: err })
                })

        }

        return ({ detail: "Impossível realizar operação", error: "Daily Note null ou undefined" })
    }
    /*
        *   Verifica se a daily note existe no banco com: username e date
        *   Se existir, faz update dos campos ontem, hoje e impedimentos
        *   Se não existir, retorna null
        *   @param {Model} dailyNote Modelo de daily mongoose
        *   @returns {object}
    */
    updateDailyNote(dailyNote) {
        if (dailyNote) {
            return this.validateDailyNote(dailyNote)
                .then(res => res ? this._updateOne(
                    { usuario: dailyNote.usuario, data: dailyNote.data, ativo: true },
                    { $set: { corpo: dailyNote.corpo } }) : null)
                .catch(err => {
                    console.log(err);
                    return ({ detail: "Impossível fazer update" })
                })
        }
    }
    /*
        *   Faz update no campo ativo mudando para false
        *   @param {Model} dailyNote Modelo de daily mongoose
        *   @returns {object}
    */
    
    removeDailyNoteById(id=''){
        if(id){
            return this._updateOne({_id:id},{$set:{ativo:false}})
        }
        return({detail:"Impossível remover"});
    }
   
    /*
        *   Lista todas as Daily Notes por Usuário 
        *   @param {string} username usuário das daily notes
        *   @returns {object}
    */
    listDailyNotesByUser(username = '', skip = '', limit = '') {
        if (username) {
            return this._find({ usuario: username, ativo: true }, { _id: 1, data: 1, corpo: 1, permissao: 1 }, { sort: { data: -1 }, skip: skip, limit: limit })
                .then(res => res ? res : null)
                .catch(err => {
                    console.error(err);
                    return ({ detail: "Impossível buscar para esse usuário", error: err })
                })
        }
        else return ({ detail: "Impossível realizar busca", error: "Usuário null ou undefined" })
    }
    /*
            *   Lista todas as Daily Notes por Data 
            *   @param {date} data data da daily note
            *   @returns {object}
        */
    listDailyNotesByDate(data = '', skip = '', limit = '') {
        if (data) {
            return this._find({ data: data, ativo: true }, { _id: 1, usuario: 1, corpo: 1, permissao: 1, data:1 },  { skip: skip, limit: limit })
                .then(res => res ? res : null)
                .catch(err => {
                    console.error(err);
                    return ({ detail: "Impossível buscar para essa data", error: err })
                })
        }
        else return ({ detail: "Impossível realizar busca", error: "Data null ou undefined" })
    }

    numberOfDailies(){
        return this._countDocuments({ativo: true})
            .then(response => response)
            .catch(console.error)
    }
}
module.exports = DailyDao;