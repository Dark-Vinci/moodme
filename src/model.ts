import mongoose, { Schema } from "mongoose";

type grade = { date: { $date: string }, grade: string, score: number };
type address = { building: string; street: string };

export interface restaurantDocument {
    address: address;
    grades:  grade [];
    cuisine: string;
    name: string;
    restaurant_id: string;
}

const grade = new Schema({
    date: {
        $date: {
            type: Date,
            // required: true,
        }
    },

    grade: {
        type: String,
        // required: true,
        // minlength: 1,
        // maxlength: 1
    },

    score: {
        type: Number,
        // required: true,
        // min: 0
    }
}, { timestamps: false })

const restaurantId = new Schema({
    address: {
        building: {
            type: String,
            // required: true,
            // minlength: 1,
        },

        street: {
            type: String,
            // required: true,
            // minlength: 1,
        },
    },

    grades: {
        type: [ grade ]
    },

    name: {
        type: String,
        // required: true,
        // minlength: 1
    },

    restaurant_id: {
        type: String,
        // minlength: 1,
        // required: true,
    },

    cuisine: {
        type: String,
        // required: true,
        // minlength: 1
    },

    _id: {
        $oid: {
            type: String,
            // required: true,
            // minlength: 1
        }
    }
}, { timestamps: false });

const Restaurant = mongoose.model<restaurantDocument>('Restuarant', restaurantId);

export default Restaurant;