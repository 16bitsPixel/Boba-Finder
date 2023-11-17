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
        toppings: {
            type: Array,
            required: true
        }
    },
    {
        timestamps: true
    }
);
*/

/*
    {restaurantName, address, teaBases, teaToppings}
*/

// current schema for individual drinks we will delete later
const shopSchema = mongoose.Schema(
    {
        restaurantName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        teaBases: {
            type: Array,
            required: true
        },
        teaToppings: {
            type: Array,
        }
    }
);

export const Shop = mongoose.model('Cat', shopSchema, 'bobaNewShop');