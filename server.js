var app = require('./config/custom-express')();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello World</h1>');
})

app.listen(3000, function() {
    console.log("Servidor rodando!");
});