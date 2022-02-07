import * as express from 'express';
import {consumer, start} from "./kafka/consumer";

const app = express();

app.set('port', 3004);
app.use(express.json());


app.listen(app.get("port"), () => {
    console.log("Starting payment service....")
    start(consumer('payment-consumer-001'), 'payment');
});