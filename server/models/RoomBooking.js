import {Schema, model } from 'mongoose'

const roomBookingSchema = new Schema(
    {
        userId: {
            type:Schema.Types.ObjectId,
            ref: 'User',
        },
        roomId: {
            type: Schema.Types.ObjectId,
            ref: 'Room',
        },
        bookingStartDate: {
            type: Date,
            require: [true, 'bookingStartDate is required']
        },
        bookingEndDate: {
            type: Date,
            required: [true, 'bookingEndDate is required'],
        },
    },
    { timestamps: true }
);

const RoomBooking = model('RoomBooking', roomBookingSchema)

export default RoomBooking;