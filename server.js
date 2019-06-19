var app = require('./config/custom-express')();
const porta = process.env.PORT;

app.listen(porta || 1337, function() {
  console.log("Servidor rodando na porta %d!", porta);
});