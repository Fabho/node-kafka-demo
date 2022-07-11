
const Redis = require("ioredis");
const Entry = require('../models/Entry');
const kafkaProducer = require('../models/KafkaProducer');
//const redisClient = require('../models/RedisClient');

exports.getFahrenheitTemperature = async (req, res, next) => {
  try{

    const redis = new Redis();    
    const entry = new Entry(Number(req.params.id));
    const entryString = JSON.stringify(entry);

    const payload = [{
      topic: 'test-topic',
      messages: entryString,
      attributes: 1
    }];
    
    kafkaProducer.send(payload, function(error, result) {
      
      console.info('Payload: ', payload);
      
      if (error) {
        console.error('Sending payload failed:', error);
        res.status(500).json(error);
      } else {

        console.log('Sending payload result:', result);
      
        (function () {
          let e = new Date().getTime() + (1 * 1000);
          while (new Date().getTime() <= e) {}
          //console.log("end time")
        })();
  
        redis.get(entry.Key, (err, r) => {
          if (err) {
            console.error(err);
          } else {
            res.status(202).json(r);
          }
        });

      }
    });

  }
  catch(e){
    console.log(e)
    throw new Error(`Error -> ${req.originalUrl}`);
  }
};