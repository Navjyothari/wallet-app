const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });
require('./config/db');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/auth.routes');
const walletRoutes = require('./routes/wallet.routes');

app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Wallet backend running 🚀');
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});