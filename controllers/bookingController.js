const { client } = require('../config/db');
const { ObjectId } = require('mongodb');

const db = client.db('Smart_parking');
const bookingCollection = db.collection('Bookings');
const userCollection = db.collection('Users');
const slotCollection = db.collection('ParkingSlots');
const garageCollection = db.collection('ParkingGarages');

// POST /api/bookings
const createBooking = async (req, res) => {
    try {
        const { userId, slotId, startTime, endTime, status } = req.body;

        const booking = {
            userId: new ObjectId(userId),
            slotId: new ObjectId(slotId),
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            status,
            createdAt: new Date()
        };

        const result = await bookingCollection.insertOne(booking);

        // Embed Pattern: recentBookings inside Users
        const embeddedBooking = {
            slotId: booking.slotId,
            startTime: booking.startTime,
            endTime: booking.endTime,
            status: booking.status
        };

        await userCollection.updateOne(
            { _id: new ObjectId(userId) },
            {
                $push: {
                    recentBookings: {
                        $each: [embeddedBooking],
                        $slice: -3
                    }
                }
            }
        );

        // Computed Pattern: Update totalBookings in Garages
        const slot = await slotCollection.findOne({ _id: new ObjectId(slotId) });

        if (slot && slot.garageId) {
            await garageCollection.updateOne(
                { _id: new ObjectId(slot.garageId) },
                { $inc: { totalBookings: 1 } }
            );
        }

        res.status(201).json({ message: 'Booking created', id: result.insertedId });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET /api/bookings
const getBookings = async (req, res) => {
    try {
        const bookings = await bookingCollection.find({}).toArray();
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createBooking, getBookings };
