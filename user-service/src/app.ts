import * as express from "express";
import * as userController from "./controller/user";

const app = express()

app.set('port', 3001)
app.use(express.json())

const {addPaymentMethod, getUser, addUser, addAddress} = userController;

app.post('/user', addUser)
app.get('/user/:username', getUser)
app.patch('/user/:username/payment', addPaymentMethod)
app.patch('/user/:username/address', addAddress)

app.listen(app.get('port'), () => {
    console.log("Starting user service...")
})