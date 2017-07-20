var mongoose = require('mongoose');

module.exports = function(uri){
  mongoose.connect(uri);

  mongoose.connection.on('connected', function(){
    console.log("Conexão estabelecida com mongoDB");
  });

  mongoose.connection.on('disconnected',function(){
    console.log("Conexão encerrada com mongoDB");
  });

  mongoose.connection.on('error',function(){
    console.log("Erro de Conexão com mongoDB");
  });

  mongoose.set('debug', true);
}
