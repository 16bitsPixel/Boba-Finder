import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Shop } from "./models/shopModel.js";

const app = express();

// middleware for parsing request body
app.use(express.json());

// basic format of routes
app.get('/', (req, resp) => {
    console.log(req);
    return resp.status(234).send("Hello World! Server is up");
});

// route to save a new shop
app.post('/shops', async (req, resp) => {
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

// runs the server and connects to DB, else logs error
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
