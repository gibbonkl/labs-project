var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var date = require('../helper/date_helper');

var schema_DailyNote = new Schema({

    usuario: { type: String, required: true },
    corpo: 
    {
        ontem: { type: String, required: true },
        hoje: { type: String, required: true },
        impedimento: { type: String, required: true }
    },
    data: { type: String, required: true, default: date() },
    ativo: { type: Boolean, required: true, default: true }

}, { timestamps: true });

module.exports = mongoose.model('DailyNote', schema_DailyNote);