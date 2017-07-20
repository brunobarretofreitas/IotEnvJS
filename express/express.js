var express = require('express');
var coletaRota = require('../app/routes/coletas.js');
var bodyParser = require('body-parser');
var config = require('../config/config.js')

module.exports = function(){
  var app = express();
  app.set("port",config.appPort);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  coletaRota(app);

  return app;
}
