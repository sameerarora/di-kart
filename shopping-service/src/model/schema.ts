import * as mongoose from 'mongoose';
import 'dotenv/config'

const uri: string = `mongodb://${process.env.DB_HOST_NAME}:/productdb`

mongoose.connect(uri, (error => {
    if (error) {
        console.log("Error occurred while connecting to the database!!!", error)
    } else {
        console.log(`Successfully connected to Mongo DB at ${uri}`)
    }
}));

export const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    quantity: {type: Number, required: true}
}, {
    collection: "products",
    versionKey: false
});

export const ItemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true}
});

export const CartSchema = new mongoose.Schema({
    username: {type: String, required: true},
    items: {type: [ItemSchema], required: false}
}, {
    collection: "cart",
    versionKey: false
})
export const Product = mongoose.model('Product', ProductSchema);
export const Item = mongoose.model('Item', ItemSchema);
export const Cart = mongoose.model('Cart', CartSchema);