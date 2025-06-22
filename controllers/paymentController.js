const { client } = require('../config/db');
const { ObjectId } = require('mongodb');

const db = client.db('Smart_parking');
const paymentCollection = db.collection('Payments');

const createPayment = async (req, res) => {
    try {
        const { bookingId, amountPaid, paymentStatus, paymentMethod } = req.body;
        const payment = {
            bookingId: new ObjectId(bookingId),
            amountPaid,
            paymentStatus,
            paymentMethod,
            paymentDate: new Date()
        };
        const result = await paymentCollection.insertOne(payment);
        res.status(201).json({ message: 'Payment recorded', id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getPayments = async (req, res) => {
    try {
        const payments = await paymentCollection.find({}).toArray();
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createPayment, getPayments };
