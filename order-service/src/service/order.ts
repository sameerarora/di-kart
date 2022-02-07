import {Order} from "../model/order";
import {publish} from "../kafka/producer";

export const messageHandler = (order: any) => {
    console.log(`Received Order Message ${order}`);
    let updateQuery: {};
    if (order.status === 'Successful') {
        updateQuery = {status: 'PAYMENT_SUCCESSFUL'};
    } else {
        updateQuery = {status: 'PAYMENT_FAILED'};
    }
    Order.findByIdAndUpdate(order.orderId, updateQuery, (err: any, row: any) => {
        if (err) {
            console.log("Exception occurred while trying to update Order status", err);
        } else {
            console.log('Successfully updated order status');
            publish('shipping', row._id, {orderId: row._id, address: row.shippingAddress});
        }
    });
};

export const shippingHandler = (order: any) => {
    let updateQuery = {status: 'DELIVERED'};

    Order.findByIdAndUpdate(order.orderId, updateQuery, (err: any, row: any) => {
        if (err) {
            console.log("Exception occurred while trying to update Order status", err);
        } else {
            console.log('Successfully updated order status');
        }
    });
}