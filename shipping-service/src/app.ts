import * as express from 'express';
import {consumer, start} from "./kafka/consumer";

const app = express();

app.set('port', 3005);
app.use(express.json());


app.listen(app.get("port"), () => {
    console.log("Starting shipping service....");
    start(consumer('shipping-1000001'), 'shipping');
});