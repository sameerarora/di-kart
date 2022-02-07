import {paymentMessageHandler} from "../service/payment";
import {kafka} from "./common";


export const consumer = (groupId: string) => {
    return kafka.consumer({groupId: groupId});
}

export const start = async (c: any, topic: string) => {
    console.log(`Starting Kafka consumer on topic : ${topic}`);
    await c.connect();
    await c.subscribe({topic: topic, fromBeginning: true});

    await c.run({
        eachMessage: async ({topic, partition, message}: any) => {
            console.log("Received Notification for orderId", message.key);
            const order = JSON.parse(message.value);
            console.log("[payment-service]:In the consumer message received is ", message.value);
            paymentMessageHandler(order);
        },
    });
};
