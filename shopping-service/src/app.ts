import * as express from "express"
import * as productController from "./controller/product"
import * as cartController from './controller/cart';

const app = express()

app.set("port", 3000)
app.use(express.json());

app.get('/categories', productController.allCategories);
app.get('/products/:category', productController.productByCategory);
app.put('/cart', cartController.addToCart);
app.get('/cart', cartController.getCart);

app.listen(app.get("port"), () => {
    console.log("Starting shopping service....")
});