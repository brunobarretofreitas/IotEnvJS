var controller = require('../app/controller/coletas.js');
var app = require('../express/express.js')();
var db = require('../db/database.js');
var config = require('../config/config.js');
var http = require('http');

class IoTEnvAPI{
  constructor(){
    this.raio = false;
    this.periodo = false;
    this.dadoColetado = false;
  }

  getColetas(){
      return this;
  }

  basedOnRadius(){
    this.raio = true;
    return this;
  }

  basedOnPeriod(){
    this.periodo = true;
    return this;
  }

  basedOnSensorType(){
    this.dadoColetado = true;
    return this;
  }

  onRoute(rota){
    if(this.raio && !this.dadoColetado && !this.periodo)
      app.post(rota,controller.getByRaio);
    else if(this.raio && this.dadoColetado && !this.periodo)
      app.post(rota,controller.getByRaioAndDado);
    else if(this.raio && !this.dadoColetado && this.periodo)
      app.post(rota,controller.getByRaioAndPeriodo);
    else if(this.periodo && !this.dadoColetado && !this.raio)
      app.post(rota,controller.getByPeriodo);
    else if(this.periodo && !this.raio && this.dadoColetado)
      app.post(rota,controller.getByDadoAndPeriodo);
    else if(this.dadoColetado && !this.raio && !this.periodo)
      app.post(rota,controller.getByDado);
    else if(this.dadoColetado && this.raio && this.periodo)
      app.post(rota,controller.getByRaioAndPeriodoAndDado);
    else {
      app.post(rota,controller.getColetas);
    }

    this.raio = false;
    this.dadoColetado = false;
    this.periodo = false;
  }

  init(){
    http.createServer(app).listen(config.appPort,function(){
      console.log("Aplicação rodando na porta " + app.get('port'));
    });

    db(config.mongoURL);
  }
}

module.exports = function(){
  return new IoTEnvAPI();
}
