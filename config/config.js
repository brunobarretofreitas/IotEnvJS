var config = {};

config.appPort = 3000;

config.mongoHost = "localhost";
config.mongoPort = 27017;
config.mongoDatabase = "iotenv";

config.mongoURL = "mongodb://"+config.mongoHost+"/"+config.mongoDatabase;

module.exports = config;
