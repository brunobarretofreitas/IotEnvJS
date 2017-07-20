var mongoose = require('mongoose');

module.exports = function(){
  var schema = mongoose.Schema({
    dispositivo:{type:String, required: true},
    localizacao:{
      longitude:{type:Number,required:true},
      latitude:{type:Number, required:true}
    },
    dados:[{
      nome:{type:String, required:true},
      valor:{type:String, required:true}
    }],
    data:{type:Date,default:Date.now}
  }, {
    versionKey : false
  });

  return mongoose.model('Coleta',schema);
}();
