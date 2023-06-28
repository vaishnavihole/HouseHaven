import { Schema, model } from "mongoose";

const roomSchema = new Schema(
    {

        roomNo: {
            type: Number,
            require:[true, 'roomNo is require']
        },

        roomType: {
            type: String,
            require:[true, 'roomType is require']
        },

        BHK: {
            type: String,
            require:[true, 'BHK is require']
        },

        city: {
            type: String,
            require:[true, 'city is require']
        },

        price: {
            type: Number,
            require:[true, 'price is require']
        },

        imgUrl: {
            type: String,
            require:[true, 'imgUrl is require']
        },
    },
        { timestamps: true}
);

const Room = model('Room', roomSchema)

export default Room;

