const { redirect } = require('express/lib/response');
const kafka = require('kafka-node');
const Redis = require("ioredis");
const Entry = require('../models/Entry');
//const redisClient = require('../models/RedisClient');

exports.getFahrenheitTemperature = async (req, res, next) => {
  try{
    const redis = new Redis();    
    //const kafkaClientOptions = { sessionTimeout: 100, spinDelay: 100, retries: 5 };
    const kafkaClient = new kafka.KafkaClient('localhost:2181', 'test-topic');
    const kafkaProducer = new kafka.HighLevelProducer(kafkaClient);
    
    kafkaClient.on('error', (error) => console.error('Kafka client error:', error));
    kafkaProducer.on('error', (error) => console.error('Kafka producer error:', error));

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

        let x = entry.Key;
      
        (function () {
          let e = new Date().getTime() + (1 * 1000);
          while (new Date().getTime() <= e) {}
          //console.log("end time")
        })();
  
        redis.get(x, (err, r) => {
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