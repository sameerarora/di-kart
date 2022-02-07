import {Kafka} from "kafkajs";
import 'dotenv/config';

export const kafka = new Kafka({
    clientId: 'order-service',
    brokers: [process.env.KAFKA_BOOTSTRAP_SERVER]
})