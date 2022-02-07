import {kafka} from "./common";
import {messageHandler, shippingHandler} from "../service/order";

export const consumer = (groupId: string) => {
    return kafka.consumer({groupId: groupId});
}

export const consumeOrderNotifications = async (c: any, topic: string) => {
    console.log(`Starting Kafka consumer on topic : ${topic}`);
    await c.connect();
    await c.subscribe({topic: topic, fromBeginning: true});

    await c.run({
        eachMessage: async ({topic, partition, message}: any) => {
            const order = JSON.parse(message.value);
            console.log("[order-service]:In the consumer message received is ", message.value);
            messageHandler(order);
        },
    });
};

export const consumeShippingNotifications = async (c: any, topic: string) => {
    console.log(`Starting Kafka consumer on topic : ${topic}`);
    await c.connect();
    await c.subscribe({topic: topic, fromBeginning: true});

    await c.run({
        eachMessage: async ({topic, partition, message}: any) => {
            const order = JSON.parse(message.value);
            console.log("[order-service]:In the consumer message received is ", message.value);
            shippingHandler(order);
        },
    });
};