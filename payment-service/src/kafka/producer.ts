import {kafka} from "./common";

const producer = kafka.producer()

export const publish = async (topic: string, key: string, payload: any) => {
    await producer.connect();
    await producer.send({
        topic: topic,
        messages: [
            {key: key, value: JSON.stringify(payload)},
        ],
    });
    await producer.disconnect();
}

// import {IProducerConfig, ProducerConfig, SimpleProducer} from "kafka-typescript"
//
// const rdkafka = require("node-rdkafka")
// const rdkafkaProducer = rdkafka.Producer
//
// //const producers: { [topic: string]: SimpleProducer } = {}
//
// const createTopicProducer = async (topic: string, config: IProducerConfig) => {
//     const prod = await new SimpleProducer().create(rdkafkaProducer, config)
//         .connect()
//     prod.setTopic(topic);
//     return prod
// }
//
// const producer = async (topic: string) => createTopicProducer(topic, new ProducerConfig("localhost", "29092"))
//
// export const publish = async (topic: string, key: string, payload: any) => {
//     let p = await producer(topic)
//     p.send(key, Buffer.from(JSON.stringify(payload)));
// };