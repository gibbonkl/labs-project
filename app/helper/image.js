const uuidv4 = require("uuid/v4");
const path = require("path");
const sharp = require("sharp");
class Image{
    constructor(folder){
        this.folder = folder;
    }
    save(buffer){
        console.log(buffer);
        const filename = this.filename();
        const filepath = this.filepath(filename);
        sharp(buffer)
            .toFile(filepath);
        return(filename);
    }
    filename() {
        return `${uuidv4()}.png`;
    }
    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`)
    }
}

module.exports = Image;