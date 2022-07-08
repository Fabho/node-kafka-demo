const crypto = require('crypto');

class Entry {
    Key="";
    Temperature = 0.0;

    constructor(temperature) {
        this.Key = crypto.randomUUID();
        this.Temperature = temperature;
    }
}

module.exports = Entry;
// const avro = require('avsc');

// const temperatureSchema = {
//     name: 'TemperatureType',
//     type: 'record',
//     fields: [
//       {
//         name: 'key',
//         type: 'string'
//       },
//       {
//         name: 'temperature',
//         type: 'double'
//       }
//     ]
//   };
  
//   const type = avro.parse(temperatureSchema)
  
//   module.exports = type;