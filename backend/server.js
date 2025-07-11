const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const connectDB = require('./config/db');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/products', require('./routes/productRoutes'));

app.use('/api/cart', require('./routes/cartRoutes'));

app.use('/api/orders', require('./routes/orderRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


