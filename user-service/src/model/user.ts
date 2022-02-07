import * as mongoose from "mongoose";

import 'dotenv/config'

const url: string = `mongodb://${process.env.DB_HOST_NAME}:/userdb`

mongoose.connect(url, (error => {
    if (error) {
        console.log("Error occurred while connecting to the database!!!", error)
    } else {
        console.log(`Successfully connected to Mongo DB at ${url}`)
    }
}));

export const PaymentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    validity: {type: String, required: true}
});

export const AddressSchema = new mongoose.Schema({
    addressLine1: {type: String, required: true},
    addressLine2: {type: String, required: false},
    city: {type: String, required: true},
    state: {type: String, required: true},
    pincode: {type: Number, required: true},
});

export const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    address: {type: AddressSchema, required: false},
    paymentMethods: {type: [PaymentSchema], required: false}
}, {
    collection: "user",
    versionKey: false
});

export class UserVO {
    firstName: String;
    lastName: String;
    username: String;

    constructor(firstName: String, lastName: String, username: String) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
    }
}

export const User = mongoose.model('User', UserSchema);
export const Payment = mongoose.model('Payment', PaymentSchema);
export const Address = mongoose.model('Address', AddressSchema);