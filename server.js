import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import Message from './models/Message.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => res.send({ ok: true, message: 'Premium Chat Backend' }));

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: '*' }
});

// Keep a map of socketId -> username for simple online list
const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log('Socket connected', socket.id);

  socket.on('registerUser', (username) => {
    onlineUsers.set(socket.id, username);
    socket.username = username;
    io.emit('onlineUsers', Array.from(onlineUsers.values()));
  });

  socket.on('disconnect', () => {
    onlineUsers.delete(socket.id);
    io.emit('onlineUsers', Array.from(onlineUsers.values()));
    console.log('Socket disconnected', socket.id);
  });

  // Join personal room for private messages
  socket.on('join', (room) => {
    socket.join(room);
  });

  // public/group message
  socket.on('sendMessage', async (data) => {
    try {
      // data: { sender, text, group? }
      const saved = await Message.create({
        sender: data.sender,
        text: data.text,
        group: data.group || null
      });
      io.emit('receiveMessage', saved);
    } catch (err) {
      console.error('sendMessage err', err.message);
    }
  });

  // private message: { sender, receiver, text }
  socket.on('privateMessage', async (data) => {
    try {
      const saved = await Message.create({
        sender: data.sender,
        receiver: data.receiver,
        text: data.text
      });
      // Emit to receiver room and back to sender
      io.to(data.receiver).emit('privateMessage', saved);
      io.to(data.sender).emit('privateMessage', saved);
    } catch (err) {
      console.error('privateMessage err', err.message);
    }
  });

  // Allow sockets to join rooms named by username for private messages
  socket.on('joinUserRoom', (username) => {
    socket.join(username);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on ${PORT}`));
