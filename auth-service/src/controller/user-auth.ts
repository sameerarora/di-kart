import {Request, Response} from "express";
import {UserAuth} from "../model/auth";

export const setCredentials = (req: Request, res: Response) => {
    let userAuth = new UserAuth(req.body);
    UserAuth.findOneAndUpdate({username: userAuth.username}, {password: userAuth.password}, (err: any, authInfo: any) => {
        if (err) {
            res.status(500).send(`error occurred while saving user credentials ${err}`);
        } else {
            if (authInfo) {
                res.status(201).send("Successfully updated user credentials");
            } else {
                save(userAuth, res);
            }
        }
    });
};

const save = (userAuth: any, res: Response) => {
    userAuth.save((err: any) => {
        if (err) {
            res.status(500).send(`user ${userAuth.username} could not be added`);
        } else {
            res.status(201).send("Successfully added user credentials");
        }
    });
};