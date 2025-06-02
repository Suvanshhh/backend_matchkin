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
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);

const server = http.createServer(app);
setupSocket(server);

mongoose.connect(config.mongoUri)
  .then(() => {
    server.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
