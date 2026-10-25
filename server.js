const express = require('express');
const cors = require('cors');
require('dotenv').config();
const reportRoutes = require('./routes/reportRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', reportRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'API Sistem Pelacakan Kerusakan Jalan Indragiri Hilir aktif!' });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});