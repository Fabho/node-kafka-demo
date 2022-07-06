const kafka = require('kafka-node');
const crypto = require('crypto');
const type = require('../models/EntrySchema');

exports.getFahrenheitTemperature = /*async*/ (req, res, next) => {
  /*const tour = await Tour.findById(req.params.id);

  if(!tour) {
    return next(new AppError('No tour found with that ID', 404))
  }
  try
        {
            var entry = new Entry
            {
                Key = Guid.NewGuid().ToString(),
                Temperature = temperature
            };
            Producer producer = new Producer();
            await producer.SendMessage(entry);

            var response = await _clientPolicy.ExceptionHttpRetry.ExecuteAsync(async () => { Console.WriteLine("intento"); return await _entryRepoRedis.GetEntryByKey(entry.Key); });
            Console.WriteLine(response.ToString());
            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            throw;
        }
  */
  try{
    const kafkaClientOptions = { sessionTimeout: 100, spinDelay: 100, retries: 5 };
    const kafkaClient = new kafka.Client(process.env.KAFKA_ZOOKEEPER_CONNECT, 'test-topic', kafkaClientOptions);
    const kafkaProducer = new kafka.HighLevelProducer(kafkaClient);
    
    kafkaClient.on('error', (error) => console.error('Kafka client error:', error));
    kafkaProducer.on('error', (error) => console.error('Kafka producer error:', error));

    const messageBuffer = type.toBuffer({
      key: crypto.randomUUID(),
      temperature: Number(req.params.id)
    });

    const payload = [{
      topic: 'test-topic',
      messages: messageBuffer,
      attributes: 1
    }];
    console.log("******************")
    console.log(process.env.KAFKA_ZOOKEEPER_CONNECT)
    console.log("******************")
    kafkaProducer.send(payload, function(err, res) {
      
      console.info('Payload: ', payload);
      
      if (err) {
        console.error('Sending payload failed:', err);
        res.status(500).json(error);
      } else {
        console.log('Sending payload result:', res);
        res.status(202).json(res);
      }

    });

  }
  catch(e){
    console.log(e)
    throw new Error(`Error -> ${req.originalUrl}`);
  }

  // res.status(200).json({
  //   status: 'success',
  //   data: {

  //   }
  // });
};