var IoTEnvAPI = require('./api/iotenvapi.js')();

IoTEnvAPI.getColetas().onRoute("/iotenv/coletas");
IoTEnvAPI.getColetas().basedOnRadius().onRoute("/iotenv/raio");
IoTEnvAPI.getColetas().basedOnRadius().basedOnSensorType().onRoute("/iotenv/raio/dado");
IoTEnvAPI.getColetas().basedOnRadius().basedOnSensorType().basedOnPeriod().onRoute("/iotenv/raio/dado/periodo");

IoTEnvAPI.init();
