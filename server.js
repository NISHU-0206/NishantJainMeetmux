const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
// const orderRoutes = require('./routes/orderRoutes');
const cors = require('cors');
const orderrouter = require('./routes/orderRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.get('/', (req, res) => {
    res.send('Welcome to the API server!');
});
app.use('/api/users', userRoutes);
app.use('/api/orders', orderrouter);
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
