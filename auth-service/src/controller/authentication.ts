import {Request, Response} from "express";
import {AuthToken, UserAuth} from "../model/auth";
import * as jwt from "jsonwebtoken";

const secret = 'secret'

function createAuthToken(authInfo: { password?: any; username?: any; }) {
    let now = new Date().getTime();
    return new AuthToken({
        username: authInfo.username,
        token: jwt.sign(authInfo.username, secret),
        validity: new Date(now + 30 * 60000)
    });
}

function saveAuthToken(authToken: any, res: Response) {
    authToken.save((err: any) => {
        if (err) {
            console.log("Error occurred", err);
            res.status(500).send("Error Occurred while trying to save auth token in database");
        } else {
            res.status(200).send(authToken);
        }
    });
}

export const authenticate = (req: Request, res: Response) => {
    let userAuth = new UserAuth(req.body);
    UserAuth.findOne({username: userAuth.username}, (err: any, authInfo: { password: any; }) => {
        if (err) {
            res.status(500).send("Error Occurred while trying to authenticate");
        } else if (authInfo && authInfo.password === userAuth.password) {
            saveAuthToken(createAuthToken(authInfo), res);
        } else {
            res.status(401).send("Incorrect credentials");
        }
    })
}