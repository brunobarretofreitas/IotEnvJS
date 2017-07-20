let controller = require('../controller/coletas.js');

module.exports = function(app){
  app.get('/iotenv/coletas', controller.listaColetas);
  app.get('/iotenv/coletas/busca',controller.filtrarColetas);
  app.get('/iotenv/dados', controller.getDadosColetados);
}
