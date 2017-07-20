var Coleta = require('../model/coleta.js');

module.exports.getByRaio = function(req,res){
  var raio = req.query.raio;
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;

  var area = {center:[latitude,longitude],radius:(raio*0.6)/3963.192};
  var query = Coleta.find({'localizacao':{'$within': {'$centerSphere':[[latitude,longitude],(raio*0.6)/3963.192]}}});

  let promise = query.exec();
  promise.then(
    function(coletas){
      res.json(coletas);
    },
    function(erro){
      res.status(500).send('erro');
    }
  );
}

module.exports.getByRaioAndDado = function(req,res){
  var raio = req.query.raio;
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;
  var dado = req.query.dado;

  var area = {center:[latitude,longitude],radius:(raio*0.6)/3963.192};
  var query = Coleta.find({'localizacao':{'$within': {'$centerSphere':[[latitude,longitude],(raio*0.6)/3963.192]}}}).and({'dados.nome' : dado});

  let promise = query.exec();
  promise.then(
    function(coletas){
      res.json(coletas);
    },
    function(erro){
      res.status(500).send('erro');
    }
  );
}

module.exports.getByRaioAndPeriodo = function(req,res){
  var raio = req.query.raio;
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;
  var dataInicio = req.query.dataInicio;
  var dataFinal = req.query.dataFinal;

  var area = {center:[latitude,longitude],radius:(raio*0.6)/3963.192};
  var query = Coleta.find({'localizacao':{'$within': {'$centerSphere':[[latitude,longitude],(raio*0.6)/3963.192]}}}).where('data').gt(new Date(dataInicio)).lt(new Date(dataFinal));
  //var query = Coleta.find().where('data').and({'data':{'$gt': new Date(dataInicio), '$lt': new Date(dataFinal)}});
  let promise = query.exec();
  promise.then(
    function(coletas){
      res.json(coletas);
    },
    function(erro){
      res.status(500).send('erro');
    }
  );
}

module.exports.getByDado = function(req,res){
  var dado = req.query.dado;
  var query = Coleta.find({'dados.nome' : dado});

  let promise = query.exec();
  promise.then(
    function(coletas){
      res.json(coletas);
    },
    function(erro){
      res.status(500).send('erro');
    }
  );
}
module.exports.getByDadoAndPeriodo = function(req,res){
  var dado = req.query.dado;
  var dataInicio = req.query.dataInicio;
  var dataFinal = req.query.dataFinal;

  var query = Coleta.find({'dados.nome' : dado}).where('data').gt(new Date(dataInicio)).lt(new Date(dataFinal));

  let promise = query.exec();
  promise.then(
    function(coletas){
      res.json(coletas);
    },
    function(erro){
      res.status(500).send('erro');
    }
  );
}

module.exports.getByPeriodo = function(req,res){
  var dataInicio = req.query.dataInicio;
  var dataFinal = req.query.dataFinal;

  var query = Coleta.find().where('data').gt(new Date(dataInicio)).lt(new Date(dataFinal));

  let promise = query.exec();
  promise.then(
    function(coletas){
      res.json(coletas);
    },
    function(erro){
      res.status(500).send('erro');
    }
  );
}

module.exports.getByRaioAndPeriodoAndDado = function(req,res){
  console.log("Entrei");
  var raio = req.query.raio;
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;
  var dataInicio = req.query.dataInicio;
  var dataFinal = req.query.dataFinal;
  var dado = req.query.dado;

  var area = {center:[latitude,longitude],radius:(raio*0.6)/3963.192};
  var query = Coleta.find({'localizacao':{'$within': {'$centerSphere':[[latitude,longitude],(raio*0.6)/3963.192]}}}).where('data').gt(new Date(dataInicio)).lt(new Date(dataFinal)).and({'dados.nome' : dado});
  //var query = Coleta.find().where('data').and({'data':{'$gt': new Date(dataInicio), '$lt': new Date(dataFinal)}});
  let promise = query.exec();
  promise.then(
    function(coletas){
      res.json(coletas);
    },
    function(erro){
      res.status(500).send('erro');
    }
  );
}

module.exports.getColetas = function(req,res){
  var query = Coleta.find();
  let promise = query.exec();
  promise.then(
    function(coletas){
      res.json(coletas);
    },
    function(erro){
      res.status(500).send('erro');
    }
  );
  console.log(promise);
}


module.exports.listaColetas = function(req,res){
  let promise = Coleta.find().exec();
  promise.then(
    function(coletas){
      res.json(coletas);
    },
    function(erro){
      res.status(500).send('Erro');
    }
  );
}

module.exports.filtrarColetas = function(req,res){
    var raio = 5;
    var latitude = -3.7656517;
    var longitude = -38.6372436;
    var dataInicio = "2017-06-02";
    var dataFinal = "2017-06-09";

    var area = {center:[latitude,longitude],radius:(raio*0.6)/3963.192};
    var query = Coleta.find({'localizacao':{'$within': {'$centerSphere':[[latitude,longitude],(raio*0.6)/3963.192]}}}).where('data').gt(new Date(dataInicio)).lt(new Date(dataFinal));
    //var query = Coleta.find().where('data').and({'data':{'$gt': new Date(dataInicio), '$lt': new Date(dataFinal)}});
    let promise = query.exec();
    promise.then(
      function(coletas){
        res.json(coletas);
      },
      function(erro){
        res.status(500).send('erro');
      }
    );

    console.log(promise);
}

module.exports.getDadosColetados = function(req,res){
  var query = Coleta.distinct("dados.nome");
  let promise = query.exec();
  promise.then(
    function(coletas){
      res.json(coletas);
      console.log(coletas);
    },
    function(erro){
      res.status(500).send('Erro');
      console.log(erro);
    }
  );
}
