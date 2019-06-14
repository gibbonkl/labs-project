var app = require('./config/custom-express')();

app.listen(1337, function() {
    console.log("Servidor rodando!");
});
