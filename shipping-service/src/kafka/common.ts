import {Kafka} from "kafkajs";
import 'dotenv/config';

export const kafka = new Kafka({
    clientId: 'shipping-service',
    brokers: [process.env.KAFKA_BOOTSTRAP_SERVER]
});