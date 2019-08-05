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
        return this.validateDailyNote(dailyNote)
            .then(res => !res ? this._save(dailyNote) : null)
            .catch(err => {
                console.log(err);
                return ({ detail: "Impossível realizar operação", error: "Daily Note null ou undefined" })
            })
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
    validateDailyNoteById(dailyNote) {
        return this._findOne({ usuario: dailyNote.usuario, _id: dailyNote._id, ativo: true })
            .then(res => res ? res : null)
            .catch(err => {
                console.error(err);
                return ({ detail: "Impossível realizar operação", error: err })
            })
    }
    /*
        *   Verifica se a daily note existe no banco com: username e date
        *   Se existir, faz update dos campos ontem, hoje e impedimentos
        *   Se não existir, retorna null
        *   @param {Model} dailyNote Modelo de daily mongoose
        *   @returns {object}
    */
    updateDailyNote(dailyNote) {
        return this.validateDailyNoteById(dailyNote)
            .then(res => res ? this._findOneAndUpdate(
                { usuario: dailyNote.usuario, _id: dailyNote._id, ativo: true },
                { $set: { corpo: dailyNote.corpo } }, {new: true}) : null)
            .catch(err => {
                console.log(err);
                return ({ detail: "Impossível fazer update" })
            })
    }
    /*
        *   Faz update no campo ativo mudando para false
        *   @param {Model} dailyNote Modelo de daily mongoose
        *   @returns {object}
    */    
    removeDailyNoteById(req=''){
        if(req.session.user.tipo == 'admin')
            return this._findOneAndUpdate({_id:req.body.daily_id},{$set:{ativo:false}})
                .then(res => res ? res : false)
                .catch(err => console.log(err.message))       
        else
            return this._findOneAndUpdate({_id:req.body.daily_id, usuario:req.session.user.username},{$set:{ativo:false}})
            .then(res => res ? res : false)
            .catch(err => console.log(err.message))    
    }
   
    /*
        *   Lista todas as Daily Notes por Usuário 
        *   @param {string} username usuário das daily notes
        *   @returns {object}
    */
    listDailyNotesByUser(username = '', skip = '', limit = '') {
        if (username) {
            return this._aggregate([
                {
                    '$match': {
                      'usuario': {"$regex": username, "$options":'i'},   
                      'ativo': true
                    }
                  },
                {
                    '$skip': skip
                },
                {
                    '$limit': limit
                },
                  {
                    '$lookup': {
                      'from': 'usuarios', 
                      'localField': 'usuario', 
                      'foreignField': 'username', 
                      'as': 'user'
                    }
                  }
            ])
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
            return this._aggregate([
                {
                    '$match': {
                      'data': data, 
                      'ativo': true
                    }
                  },
                {
                    '$skip': skip
                },
                {
                    '$limit': limit
                },
                  {
                    '$lookup': {
                      'from': 'usuarios', 
                      'localField': 'usuario', 
                      'foreignField': 'username', 
                      'as': 'user'
                    }
                  }
            ])
                .then(res => res? res : null)
                .catch(err => {
                    console.error(err);
                    return ({ detail: "Impossível buscar para esse usuário", error: err })
                })
        }
        else return ({ detail: "Impossível realizar busca", error: "Data null ou undefined" })
    }
    // Lista as 5 daily notes mais recentes // Controller manda limit = 5
    listDailyNotesDefault(skip = '', limit = '') {
        return this._aggregate([
            {
                '$sort': { 'data': -1 }
            },
            {
                '$match': { 'ativo': true }
            },
            {
                '$skip': skip
            },
            {
                '$limit': limit
            },
            {
                '$lookup': {
                    'from': 'usuarios', 
                    'localField': 'usuario', 
                    'foreignField': 'username', 
                    'as': 'user'
                }
            },
            {
                '$sort': { 'data': 1 }
            }
        ])
        .then(res => res? res : null)
        .catch(err => {
            console.error(err);
            return ({ detail: "Impossível buscar para esse usuário", error: err })
        })
    }
    numberOfDailies(){
        return this._countDocuments({ativo: true})
            .then(response => response)
            .catch(console.error)
    }
    listarDailies(){
        return this._find();
    }
}
module.exports = DailyDao;