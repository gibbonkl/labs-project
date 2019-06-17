var app = require('./config/custom-express')();
const porta = process.env.PORT;

app.listen( 1337, function() {
  console.log("Servidor rodando na porta %d!", porta);
});