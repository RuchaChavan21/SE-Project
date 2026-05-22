import 'dotenv/config';
import http from 'http';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.js';
import aiRoutes from './routes/ai.js';
import progressRoutes from './routes/progress.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || 'http://127.0.0.1:5173' },
});

app.use(cors({ origin: process.env.CLIENT_URL || 'http://127.0.0.1:5173' }));
app.use(express.json());

app.get('/api/health', (_, res) => {
  res.json({ status: 'alive', service: 'EduPulse AI API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/progress', progressRoutes);

io.on('connection', (socket) => {
  socket.emit('mentor:thought', {
    text: 'Your learning tree is listening. One focused session will strengthen the DSA branch.',
  });

  socket.on('focus:heartbeat', (payload) => {
    socket.broadcast.emit('tree:glow', payload);
  });
});

async function start() {
  if (process.env.MONGODB_URI) {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } else {
    console.log('MONGODB_URI missing; running API without database connection');
  }

  const port = process.env.PORT || 4000;
  server.listen(port, () => console.log(`EduPulse AI API listening on ${port}`));
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
