import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Route santé
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// Routes utilisateurs
app.use('/users', userRoutes);

export default app;
