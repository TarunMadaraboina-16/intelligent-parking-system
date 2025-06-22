const { client } = require('../config/db');
const { ObjectId } = require('mongodb'); // ⬅️ Required for converting string to ObjectId

const db = client.db('Smart_parking');
const parkingCollection = db.collection('ParkingSlots');

// POST /api/slots
const createSlot = async (req, res) => {
    try {
        const { slotNumber, isAvailable, location, garageId } = req.body;

        const newSlot = {
            slotNumber,
            isAvailable,
            location,
            garageId: new ObjectId(garageId), // ⬅️ Reference to ParkingGarage
            createdAt: new Date()
        };

        const result = await parkingCollection.insertOne(newSlot);
        res.status(201).json({ message: 'Slot created', id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET /api/slots
const getSlots = async (req, res) => {
    try {
        const slots = await parkingCollection.find({}).toArray();
        res.status(200).json(slots);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createSlot, getSlots };
