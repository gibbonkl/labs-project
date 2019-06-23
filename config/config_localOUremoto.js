const fs = require('fs');
const path = require('path');

class Config_localOUremoto
{
    constructor(){}
    get()
    {
        return JSON.parse(fs.readFileSync(path.join(__dirname) + '/config_localOUremoto.json', 'utf8')).executa;
    }

    set(where)
    {
        let config = {"executa": where};
  
        let data = JSON.stringify(config); 
        fs.writeFileSync(path.join(__dirname) + '/config_localOUremoto.json', data); 
    }
}

module.exports = Config_localOUremoto;