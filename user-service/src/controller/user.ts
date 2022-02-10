import {Request, Response} from "express";
import {Address, Payment, User, UserVO} from "../model/user";

export const addUser = (req: Request, res: Response) => {
    let user = new User(req.body);
    user.save((err: any) => {
        if (err) {
            res.send(`Exception occured while inserting user: ${err}`).status(500);
        } else {
            res.send(`Successfully created user ${user.username}`).status(201);
        }
    })
};

export const getUser = (request: Request, response: Response) => {
    let username = request.params.username;
    User.findOne({username: username}, (err: any, user: any) => {
        if (err) {
            response.send(err).status(500)
        } else if (user) {
            let userVO = new UserVO(user.firstName, user.lastName, user.username);
            response.send(userVO).status(200)
        } else {
            response.send(`No products found for username : ${username}`).status(404)
        }
    });
};

export const addPaymentMethod = (req: Request, res: Response) => {
    let username = req.params.username;
    User.findOne({username: username}, (err: any, user: any) => {
        let paymentMethod = new Payment(req.body);
        user.paymentMethods.push(paymentMethod);
        user.save((err: any) => {
            if (err) {
                res.send(err).status(500);
            } else {
                res.send("Successfully added Payment method").status(200);
            }
        })
    })
};

export const addAddress = (req: Request, res: Response) => {
    let username = req.params.username;
    let address = new Address(req.body);
    User.findOneAndUpdate({username: username}, {address: address}, (err: any, user: any) => {
        if (err) {
            res.status(500).send(`error occurred while updating user address ${err}`);
        } else {
            if (user) {
                res.status(201).send("Successfully updated user address");
            } else {
                res.status(404).send(`user not found with username: ${username}`);
            }
        }

    })
};