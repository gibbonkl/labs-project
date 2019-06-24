var app = require('./config/custom-express')();

var Class_config = require('./config/config_localOUremoto');

app.listen(1337, function() {
  var config = new Class_config();
  config.set('local');

  console.log("Servidor rodando na porta %d!", 1337);
});