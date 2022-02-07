import {Request, Response} from "express";
import {Cart, Item} from '../model/schema';
import * as jwt from "jsonwebtoken";

const secret = 'secret';

export const addToCart = (req: Request, res: Response) => {
    if (req.headers.authorization) {
        let decoded = jwt.verify(req.headers.authorization, secret);
        Cart.findOne({username: decoded}, (err: any, cart: any) => {
            if (err) {
                res.status(500).send({"message": `Error occurred while trying to access cart : ${err}`});
            } else if (cart) {
                cart.items.push(new Item(req.body));
                cart.save((err:any) => saveCallback(err, res));
            } else {
                new Cart({username: decoded, items: [new Item(req.body)]}).save((err:any) => saveCallback(err, res));
            }
        })
    } else {
        res.status(401).send({'message': 'Invalid auth info'});
    }
}


const saveCallback = (err: any, res: Response) => {
    if (err) {
        res.status(500).send({"message": `Error occurred while trying to add item to the cart : ${err}`});
    } else {
        res.status(200).send({"message": "Successfully added item to the cart"});
    }
}