const { client } = require('../config/db');
const db = client.db('Smart_parking');
const garageCollection = db.collection('ParkingGarages');

// POST /api/garages
const createGarage = async (req, res) => {
  try {
    const { garageName, location, capacity, availableSlots } = req.body;
    const garage = {
      garageName,
      location,
      capacity,
      availableSlots,
      createdAt: new Date()
    };
    const result = await garageCollection.insertOne(garage);
    res.status(201).json({ message: 'Garage created', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/garages
const getGarages = async (req, res) => {
  try {
    const garages = await garageCollection.find({}).toArray();
    res.status(200).json(garages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createGarage, getGarages };
