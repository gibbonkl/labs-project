
const path = require('path');
const ENV_FILE = path.join(__dirname, '.env');
require('dotenv').config({ path: ENV_FILE });
const async = require('async');
const mongoose = require('mongoose');

// const schema = new Mongoose.Schema({name:'string',size:'string'})
class TemplateDao{
    constructor(model){
        this.model = model
        this.host = process.env.host;
        this.port = process.env.port;
        this.dbName = process.env.dbName;
        this.uri = `mongodb://${this.host}:${this.port}/${this.dbName}`;
        
        mongoose.connect(this.uri,{useNewUrlParser: true});
        this.db = mongoose.connection;
    }
    _save(data){
        
        let model = new this.model(data);
        //console.log(model);
        //return model.save((erro, res) => erro ? console.error(erro):res);
        return model.save();
    }

    _find(filter={}, projection={},options={}){
        return this.model
            .find(filter, projection,options)
            .exec();
    }

    _findOne(filter={},projection={},options={}){
        return this.model
            .findOne(filter,projection,options)
            .exec();
    }

    _update(filter={},doc={},options={}){
        return this.model
            .update(filter,doc,options)
            .exec();
        
    }
    _updateOne(filter={},doc={},options={}){
        return this.model
            .updateOne(filter,doc,options)
            .exec();
        
    }

}
module.exports = TemplateDao;