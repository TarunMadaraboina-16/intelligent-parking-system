const { client } = require('../config/db');

const db = client.db('Smart_parking');
const userCollection = db.collection('Users');

// POST /api/users - create user
const createUser = async (req, res) => {
    try {
        const { name, email, phone, userType } = req.body;
        const newUser = {
            name,
            email,
            phone,
            userType, // "driver" or "admin"
            createdAt: new Date()
        };
        const result = await userCollection.insertOne(newUser);
        res.status(201).json({ message: 'User created', id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET /api/users - fetch all users
const getUsers = async (req, res) => {
    try {
        const users = await userCollection.find({}).toArray();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createUser, getUsers };
