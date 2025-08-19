import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Route santé
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// Routes utilisateurs
app.use('/users', userRoutes);
app.use('/event',eventRoutes);

export default app;
