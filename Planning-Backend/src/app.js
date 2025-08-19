import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Route de santé pour vérifier que le serveur tourne
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

export default app;
