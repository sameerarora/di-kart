import * as express from "express";
import * as orderController from './controller/order';
import {consumeOrderNotifications, consumeShippingNotifications, consumer} from "./kafka/consumer";


const app = express();

app.set('port', 3003);
app.use(express.json());

const {getOrder, checkout, addPayment, createOrder, addAddress} = orderController;

app.post('/checkout', createOrder);
app.put('/order/:orderId/payment', addPayment);
app.put('/order/:orderId/address', addAddress);
app.get('/order/:orderId', getOrder);
app.post('/checkout/:orderId', checkout);

app.listen(app.get('port'), () => {
    console.log("Starting order service...");
    consumeOrderNotifications(consumer('os1001'), 'order-payment');
    consumeShippingNotifications(consumer('os1002'), 'order-shipping');
});