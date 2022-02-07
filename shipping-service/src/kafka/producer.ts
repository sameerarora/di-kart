import {kafka} from "./common";

const producer = kafka.producer()

export const publish = async (topic: string, key: string, payload: any) => {
    await producer.connect()
    await producer.send({
        topic: topic,
        messages: [
            {key: key, value: JSON.stringify(payload)},
        ],
    });
    await producer.disconnect();
};
