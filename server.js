var app = require('./config/custom-express')();

var Class_config = require('./config/config_localOUremoto');

const porta = process.env.PORT;

app.listen(porta || 1337, function() {
  var config = new Class_config();
  config.set('remoto');

  console.log("Servidor rodando na porta %d!", porta);
});