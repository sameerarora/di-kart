import {kafka} from "./common";

const producer = kafka.producer()

export const publish = async (topic: string, key: string, payload: any) => {
    try {
        await producer.connect()
        await producer.send({
            topic: topic,
            messages: [
                {key: key, value: JSON.stringify(payload)},
            ],
        });
        await producer.disconnect()
    } catch (e) {
        console.error(`Error occurred while trying to publish message to topic:${topic}`, e);
    }
};