import express, { json } from 'express';
import sequelize from './config/db.js'; // Ensure sync is exported correctly in db.js
import gadgetRoutes from './routes/gadgetRoutes.js';

import 'dotenv/config';

// Initialize Express app
const app = express();

// Middleware to parse JSON requests
app.use(json());

// Routes
app.use('/api', gadgetRoutes); // Gadget-related routes

import authRoutes from './routes/authRoutes.js'
app.use('/api/auth', authRoutes);  // Ensure this is correct
 // Authentication-related routes

// Sync Database
sequelize.sync()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection failed:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));