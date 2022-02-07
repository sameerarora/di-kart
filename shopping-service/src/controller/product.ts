import {Request, Response} from "express";
import {Product} from '../model/schema';
import * as _ from "underscore";

export const allCategories = async (request: Request, response: Response) => {
    Product.find((err: any, products: any) => {
        if (err) {
            response.send(err).status(500);
        } else {
            let categories = _.unique(_.map(products, (product) => product.category));
            response.send(categories).status(200);
        }
    })
};

export const productByCategory = async (request: Request, response: Response) => {
    let category = request.params.category;
    Product.find({category: category}, (err: any, products: any) => {
        if (err) {
            response.send(err).status(500);
        } else if (products === undefined || products.length == 0) {
            response.send(`No products found for category : ${category}`).status(404);
        } else {
            response.send(products).status(200);
        }
    })
};