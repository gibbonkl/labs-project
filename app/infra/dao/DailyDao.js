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
            return this._findOne({ usuario: dailyNote.usuario, data: dailyNote.data })
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
                .then(res => !res ? this._updateOne(
                    { usuario: dailyNote.usuario, data: dailyNote.data },
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
    removeDailyNote(dailyNote) {
        if (dailyNote) {
            return this._updateOne({ usuario: dailyNote.usuario, data: dailyNote.data },
                { $set: { ativo: false } })
                .catch(err => {
                    console.log(err);
                    return ({ detail: "Impossível remover" })
                })
        }
    }
    removeDailyNotebyId(id='',username=''){
        if(id){
            return username? 
                this._updateOne({usuario:username,_id:id},{$set:{ativo:false}}):
                this._updateOne({_id:id},{$set:{ativo:false}})
        }
        return({detail:"Impossível remover"});
    }
    /*
        *   Lista todas as Daily Notes por Usuário ou por Data 
        *   @param {string} username usuário das daily notes
        *   @param {date} data data da daily note
        *   @returns {object}
    */
    listAllDailyNotes(username = '', data = '') {
        if (username) {
            return this._find({ usuario: username }, { data: 1, corpo: 1 }, { sort: { data: -1 } })
                .then(res => res ? res : null)
                .catch(err => {
                    console.error(err);
                    return ({ detail: "Impossível buscar para esse usuário", error: err })
                })
        }
        else if (data) {
            return this._find({ data: data }, { username: 1, corpo: 1 })
                .then(res => res ? res : null)
                .catch(err => {
                    console.error(err);
                    return ({ detail: "Impossível buscar para essa data", error: err })
                })
        }
        return ({ detail: "Impossível realizar busca", error: "Data ou Usuário null ou undefined" })
    }

}
module.exports = DailyDao;