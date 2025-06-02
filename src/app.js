import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config.js';
import authRoutes from './routes/auth.js';
import setupSocket from './socket.js';

const allowedOrigins = [
  'https://matchkin-frontend.vercel.app',
  'http://localhost:5173'
];

const app = express();

// CORS configuration (must come first!)
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'], // Allow necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow necessary headers
}));

// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Handle preflight requests for all routes
app.options('*', cors());

// Create HTTP server and setup Socket.IO
const server = http.createServer(app);
setupSocket(server);

// Connect to MongoDB and start server
mongoose.connect(config.mongoUri)
  .then(() => {
    server.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
