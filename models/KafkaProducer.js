const kafka = require('kafka-node');

//const kafkaClientOptions = { sessionTimeout: 100, spinDelay: 100, retries: 5 };
const kafkaClient = new kafka.KafkaClient('localhost:2181', 'test-topic');
const kafkaProducer = new kafka.HighLevelProducer(kafkaClient);

kafkaClient.on('error', (error) => console.error('Kafka client error:', error));
kafkaProducer.on('error', (error) => console.error('Kafka producer error:', error));


module.exports = kafkaProducer;