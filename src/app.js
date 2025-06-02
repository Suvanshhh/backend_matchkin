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

// 1. Handle preflight requests FIRST
app.options('*', cors());

// 2. Main CORS configuration
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Parse JSON bodies
app.use(express.json());

// 4. Routes
app.use('/api/auth', authRoutes);

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
