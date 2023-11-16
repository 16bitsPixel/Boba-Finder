import express from 'express';
import { Shop } from '../models/shopModel.js';

const router = express.Router();

// route to save a new shop
router.post('/', async (req, resp) => {
    try {
        // check if required fields were given else error
        if (
            !req.body.name ||
            !req.body.location ||
            !req.body.teas ||
            !req.body.teaPrices ||
            !req.body.toppings ||
            !req.body.toppingPrices
        ) {
            return response.status(400).send({
                message: "Send all required fields: shopName, location, teas, teaprices, toppings, toppingPrices"
            });
        }

        // make a new shop
        const newShop = {
            name: req.body.name,
            location: req.body.location,
            teas: req.body.teas,
            teaPrices: req.body.teaPrices,
            toppings: req.body.toppings,
            toppingPrices: req.body.toppingPrices
        };

        const shop = await Shop.create(newShop);
        return resp.status(201).send(shop);
    } catch (error) {
        console.log(error.message);
        resp.status(500).send({ message: error.message });
    }
});

// route to get all shops from database
router.get("/", async (req, resp) => {
    try {
        const shops = await Shop.find({});
        return resp.status(200).json(shops);
    } catch (error) {
        console.log(error.message);
        resp.status(500).send({ message: error.message });
    }
});

export default router;
