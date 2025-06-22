const { client } = require('../config/db');

const db = client.db('Smart_parking');
const adminLogCollection = db.collection('AdminLogs');

// POST /api/adminlogs
const createAdminLog = async (req, res) => {
    try {
        const { adminName, action } = req.body;
        const log = {
            adminName,
            action,
            timestamp: new Date()
        };
        const result = await adminLogCollection.insertOne(log);
        res.status(201).json({ message: 'Admin log created', id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET /api/adminlogs
const getAdminLogs = async (req, res) => {
    try {
        const logs = await adminLogCollection.find({}).toArray();
        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createAdminLog, getAdminLogs };
