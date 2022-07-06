const kafka = require('kafka-node');
const crypto = require('crypto');
const redis = require('redis');
const type = require('../models/EntrySchema');
//const redisClient = require('../models/RedisClient');

exports.getFahrenheitTemperature = async (req, res, next) => {
  try{
    const client = redis.createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    
    //const kafkaClientOptions = { sessionTimeout: 100, spinDelay: 100, retries: 5 };
    const kafkaClient = new kafka.KafkaClient('localhost:2181', 'test-topic');
    const kafkaProducer = new kafka.HighLevelProducer(kafkaClient);
    
    kafkaClient.on('error', (error) => console.error('Kafka client error:', error));
    kafkaProducer.on('error', (error) => console.error('Kafka producer error:', error));

    const uuid = crypto.randomUUID();

    const messageBuffer = type.toBuffer({
      key: uuid,
      temperature: Number(req.params.id)
    });

    const payload = [{
      topic: 'test-topic',
      messages: messageBuffer,
      attributes: 1
    }];
    
    kafkaProducer.send(payload, function(error, result) {
      
      console.info('Payload: ', payload);
      
      if (error) {
        console.error('Sending payload failed:', error);
        res.status(500).json(error);
      } else {
        console.log('Sending payload result:', result);
        
        
        
        client.set(uuid, req.params.id);
        res.status(202).json(result);
      }

    });

  }
  catch(e){
    console.log(e)
    throw new Error(`Error -> ${req.originalUrl}`);
  }
};