import * as mongoose from "mongoose";
import 'dotenv/config'

const url: string = `mongodb://${process.env.DB_HOST_NAME}:/orderdb`

mongoose.connect(url, (error => {
    if (error) {
        console.log("Error occurred while connecting to the database!!!", error)
    } else {
        console.log(`Successfully connected to Mongo DB at ${url}`)
    }
}));

export enum OrderStatus {
    CREATED, PAYMENT_SUCCESSFUL, PAYMENT_FAILED, SHIPPED, DELIVERED
};

export const AddressSchema = new mongoose.Schema({
    addressLine1: {type: String, required: true},
    addressLine2: {type: String, required: false},
    city: {type: String, required: true},
    state: {type: String, required: true},
    pincode: {type: Number, required: true},
});

export const PaymentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    validity: {type: String, required: true}
});

export const ItemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quantity: {type: Number, required: false, default: 1}
});
export const OrderSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    username: {type: String, required: true},
    total: {type: Number, required: true},
    items: {type: [ItemSchema], required: true},
    shippingAddress: {type: AddressSchema, required: false},
    paymentInfo: {type: PaymentSchema, required: false},
    status: {type: String, required: true, default: 'CREATED'}
});

export const Order = mongoose.model('Order', OrderSchema);
export const Address = mongoose.model('Address', AddressSchema);
export const Payment = mongoose.model('Payment', PaymentSchema);