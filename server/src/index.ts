import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { sequelize } from './models';
import authRoutes from './routes/authRoutes';
import tripRoutes from './routes/tripRoutes';
// import tripRoutes from './routes/tripRoutes'; // Removed, will add new routes for PostgreSQL
// import authRoutes from './routes/authRoutes'; // Uncomment and use when ready

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// TODO: Connect to PostgreSQL database here
// Example: import { sequelize } from './models'; sequelize.authenticate() ...

// TODO: Add new routes for PostgreSQL here
// Example: app.use('/api/trips', newTripRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Travel App API' });
});

// Connect to PostgreSQL and start server
sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL database!');
    return sequelize.sync(); // For dev: sync models
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  }); 