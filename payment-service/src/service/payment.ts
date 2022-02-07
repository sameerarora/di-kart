import {Payment} from "../model/payment";
import {publish} from "../kafka/producer";
import * as Math from "mathjs";

const FAILED = 'Failed';
const SUCCESSFUL = 'Successful';

const save = (payment: any, status: string) => {
    payment.status = status;
    payment.save((err: Error) => {
        if (err) {
            console.log('Error occurred while trying to create a Payment record', err);
            publish('payment-errors', payment.orderId, {orderId: payment.orderId, errorCode: 500, retryLink: 'payment-service/payment'});
        } else {
            console.log(`Successfully created a Payment record for order id ${payment.orderId}`);
        }
    });
}

export const paymentMessageHandler = (order: any) => {
    console.log(`Received Order to process : ${order}`);
    console.log(`Payment Method is : ${(order.paymentInfo)}`);
    let paymentId = (Math.random().toString(36)).slice(2, 24);
    let payment = new Payment({
        _id: paymentId, orderId: order._id, amount: order.total,
        paymentInfo: {name: order.paymentInfo.name, type: order.paymentInfo.type}, status: 'pending'
    });
    tryPayment(payment);
}

const tryPayment = (payment: any) => {
    console.log(`Attempting Payment for Order id ${payment.orderId}`);
    if (payment.amount % 12 == 0) {
        console.log('Payment Failed');
        publish('order-payment', payment.orderId, {
            orderId: payment.orderId,
            paymentId: payment.id,
            retryLink: 'payment-service/payment',
            message: `Payment failed for Payment Method ${payment.paymentInfo.name}`,
            status: FAILED
        });
        save(payment, FAILED);
    } else {
        console.log('Successfully processed payment for orderId', payment.orderId);
        publish('order-payment', payment.orderId, {
            orderId: payment.orderId,
            paymentId: payment.id,
            status: SUCCESSFUL
        });
        save(payment, SUCCESSFUL);
    }
};