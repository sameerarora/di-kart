import * as mongoose from 'mongoose';
import 'dotenv/config'

const url: string = `mongodb://${process.env.DB_HOST_NAME}:/paymentdb`;

mongoose.connect(url, (error => {
    if (error) {
        console.log("Error occurred while connecting to the database!!!", error)
    } else {
        console.log(`Successfully connected to Mongo DB at ${url}`)
    }
}));

export const PaymentInfoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: true}
});

export const PaymentSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    orderId: {type: String, required: true},
    amount: {type: Number, required: true},
    paymentInfo: {type: PaymentInfoSchema, required: true},
    status: {type: String, required: true, default: 'Pending'}
}, {
    collection: "payments",
    versionKey: false
});

export const Payment = mongoose.model('Payment', PaymentSchema);