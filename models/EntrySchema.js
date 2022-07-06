const avro = require('avsc');

const temperatureSchema = {
    name: 'TemperatureType',
    type: 'record',
    fields: [
      {
        name: 'key',
        type: 'string'
      },
      {
        name: 'temperature',
        type: 'double'
      }
    ]
  };
  
  const type = avro.parse(temperatureSchema)
  
  module.exports = type;