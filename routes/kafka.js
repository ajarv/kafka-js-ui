var express = require('express');
var router = express.Router();
const { Kafka } = require('kafkajs')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/connect',async function(req, res, next) {
  try{
    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: req.body.brokers
    })
    const admin = kafka.admin()
    await admin.connect()
    const clusterInfo = await admin.describeCluster()
    let topics = await admin.listTopics()
    let topicsMd = await admin.fetchTopicMetadata(topics)
    await Promise.all(topicsMd.topics.map(async (item)=>{
      let topic = item.name
      let offsets =  await admin.fetchTopicOffsets(topic)
      offsets.sort((a,b)=>{return a.partition-b.partition})
      item['offsets'] = offsets
    }));
    await admin.disconnect()
    res.send({topics: topicsMd,clusterInfo: clusterInfo})
  }catch(err){
    res.status({ status: 400 }).json({ reason: 'error '+err });
  }
});

module.exports = router;
