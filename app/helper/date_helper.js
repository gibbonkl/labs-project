module.exports = function dateConverter(date = new Date()) {
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;           
} 