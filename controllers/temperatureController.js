const Entry = require('../models/Entry');
const kafkaProducer = require('../models/KafkaProducer');
const ioRedisClient = require('../models/RedisClient');

exports.getFahrenheitTemperature = async (req, res, next) => {
  try{
       
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
        let intervalCount = 0;

        let refreshId = setInterval(function() {

          ioRedisClient.get(entry.Key, (err, r) => {
            if (err) {
              console.error(err);
            } else {
              if(r != null){
                clearInterval(refreshId);
                res.status(202).json(JSON.parse(r));
              }
            }
            
            intervalCount++;
            if(intervalCount >= 5)
              clearInterval(refreshId);
          });

        }, 500);
  
      }
    });

  }
  catch(e){
    console.log(e)
    throw new Error(`Error -> ${req.originalUrl}`);
  }
};