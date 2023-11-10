import mongoose from "mongoose";

/* //the final schema we will use ?
const shopSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        teas: {
            type: Array,
            required: true
        },
        teaPrices: {
            type: Array,
            required: true
        },
        toppings: {
            type: Array,
            required: true
        },
        toppingPrices: {
            type: Array,
            required: true
        }
    },
    {
        timestamps: true
    }
);
*/

// current schema for individual drinks we will delete later
const shopSchema = mongoose.Schema(
    {
        "Drink Name": {
            type: String,
            required: true
        },
        Description: {
            type: String,
            required: true
        },
        Price: {
            type: String,
            required: true
        }
    }
);

export const Shop = mongoose.model('Cat', shopSchema, 'bobaShop');