import {kafka} from "./common";
import {dispatchOrder} from "../service/shipping";


export const consumer = (groupId: string) => kafka.consumer({groupId: groupId})

export const start = async (c: any, topic: string) => {
    console.log(`Starting Kafka consumer on topic : ${topic}`);
    await c.connect();
    await c.subscribe({topic: topic, fromBeginning: true});

    await c.run({
        eachMessage: async ({topic, partition, message}: any) => {
            const shippingInfo = JSON.parse(message.value);
            dispatchOrder(shippingInfo);
        },
    });
};