const TemplateDao = require("./TemplateDao");

class DailyDao extends TemplateDao{
    /*
        *   Verifica se existe daily note no banco,
        *   Se não existir, insere no banco de dados e retorna o objeto inserido
        *   Se não existir, retorna null
        *   @param {Model} dailyNote Modelo de daily mongoose
        *   @returns {object}
    */
    insertDailyNote(dailyNote){
        if(dailyNote){
            return this.validateDailyNote(dailyNote)
                .then(res => !res ? this._save(dailyNote) : null)
                .catch(err => {
                    console.log(err);
                    return({detail:"Impossível realizar operação", error:"Daily Note null ou undefined"})
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
    validateDailyNote(dailyNote){
        if(dailyNote){
            return this._findOne({usuario: dailyNote.usuario,data: dailyNote.data})
                .then(res => res ? res : null)
                .catch(err =>{
                    console.error(err);
                    return({detail:"Impossível realizar operação", error:err})
                })
            
        }
        
    return({detail:"Impossível realizar operação", error:"Daily Note null ou undefined"})
    }
    /*
        *   Verifica se a daily note existe no banco com: username e date
        *   Se existir, faz update dos campos ontem, hoje e impedimentos
        *   Se não existir, retorna null
        *   @param {Model} dailyNote Modelo de daily mongoose
        *   @returns {object}
    */
    updateDailyNote(dailyNote){
        if(dailyNote){
            return  this._updateOne({usuario:dailyNote.usuario,data:dailyNote.data},
                        {$set:{ontem:dailyNote.ontem, hoje:dailyNote.hoje, impedimento:dailyNote.impedimento}})
                .catch(err => {
                    console.log(err);
                    return({detail:"Impossível fazer update"})
                })
        }
    }

    removeDailyNote(dailyNote){
        if(dailyNote){
            return  this._updateOne({ usuario: dailyNote.usuario, data: dailyNote.data },
                        { $set: { ativo: "false"} })
                .catch(err => {
                    console.log(err);
                    return ({ detail: "Impossível remover" })
                })
        }
    }
}
module.exports = DailyDao;