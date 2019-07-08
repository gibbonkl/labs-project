const uuidv4 = require("uuid/v4");
const path = require("path");
const fs = require("fs");
/*
    *   Classe responsável por salvar
    *   as fotos do usuário
    * 
    *   @static
    *   @author Diego Bastos
*/
class Image{
    /*
        *   Classe estática
        *   @static
    */
    constructor(){
        throw new Error("Impossível instanciar a classe. Motivo: classe estática.");
    }
    /*
        *   Retorna o formato da imagem
        *   @static
        *   @param {object} file Imagem recebida do formulário
        *   @return {string}
        * 
    */
    static type(file){
        let tmp = file.split(".");
        return tmp[1];
    }
    /*
        *   Salva o arquivo na pasta: /public/uploads
        *   Com o nome do arquivo gerado pelo módulo: uuidv4
        *   @static
        *   @param {object} file Imagem recebida do formulário
        *   @return {string}
    */
    static save(file){
        this._originalName = file.originalname;
        this._format = this.type(this._originalName);
        this._filename = `${uuidv4()}.${this._format}`;
        this._targetPath = path.join(__dirname, `../public/uploads/${this._filename}`);
        this._tempPath = file.path;
        if (path.extname(this._originalName).toLowerCase() === `.${this._format}`) {
            fs.rename(this._tempPath, this._targetPath, err => {
                if(err) return ""
            });
        }
        return this._filename;
    }

}

module.exports = Image;
