import mongoose from "mongoose";

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

export const Shop = mongoose.model('Cat', shopSchema);