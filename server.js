const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/slots', require('./routes/parkingSlotRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/adminlogs', require('./routes/adminLogRoutes'));
app.use('/api/garages', require('./routes/garageRoutes'));






// Temporary base route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Later we'll add: app.use('/api/slots', require('./routes/parkingSlotRoutes'))

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
