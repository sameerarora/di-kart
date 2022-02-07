import {Request, Response} from "express";
import * as Math from "mathjs";
import * as jwt from "jsonwebtoken";
import {Address, Order, Payment} from "../model/order";
import {publish} from '../kafka/producer';

const secret = 'secret';

export const getOrder = (req: Request, res: Response) => {
    Order.findById(req.params.orderId, (err: any, order: any) => {
        if (err) {
            res.status(500).send({'message': `Error occurred while retrieving Order: ${err}`});
        } else if (order) {
            res.status(200).send(order);
        } else {
            res.status(404).send({'message': `No order found for order id ${req.params.orderId}`});
        }
    });
};

export const createOrder = (req: Request, res: Response) => {
    let username = jwt.verify(req.headers.authorization, secret);
    const order = new Order(req.body);
    order._id = (Math.random().toString(36)).slice(2, 24);
    order.username = username;
    order.save((err: any) => {
        if (err) {
            res.status(500).send({"message": `Error occurred while creating order: ${err}`});
        } else {
            res.status(201).send({
                'message': `successfully created order id ${order.id}`,
                'links': [`/order/${order.id}/payment`, `/order/${order.id}/address`, `/order/${order.id}`]
            });
        }
    });
};

export const addPayment = (req: Request, res: Response) => {
    const payment: typeof Payment = new Payment(req.body);
    const orderId = req.params.orderId;
    Order.findOneAndUpdate({_id: orderId}, {paymentInfo: payment}, (err: any, order: any) => {
        if (err) {
            res.status(500).send({'message': `Error occurred while updating payment info: ${err}`});
        } else if (order) {
            res.status(200).send({'message': 'Successfully updated order!!'});
        } else {
            res.status(404).send({'message': `No order found for order id ${orderId}`});
        }
    });
};

export const addAddress = (req: Request, res: Response) => {
    const address: typeof Address = new Address(req.body);
    const orderId = req.params.orderId;
    Order.findOneAndUpdate({_id: orderId}, {shippingAddress: address}, (err: any, order: any) => {
        if (err) {
            res.status(500).send({'message': `Error occurred while updating shipping address info: ${err}`});
        } else if (order) {
            res.status(200).send({'message': 'Successfully updated order!!'});
        } else {
            res.status(404).send({'message': `No order found for order id ${orderId}`});
        }
    });
};

export const checkout = (req: Request, res: Response) => {
    const orderId = req.params.orderId;
    Order.findOne({_id: orderId}, (err: any, order: any) => {
        if (err) {
            res.status(500).send({'message': `Error occurred while updating shipping address info: ${err}`});
        } else if (order) {
            publish('payment', orderId, order);
            res.status(200).send({'message': 'Payment Initiated', 'links': [`/order/${order.id}`]});
        } else {
            res.status(404).send({'message': `No order found for order id ${orderId}`});
        }
    });
};