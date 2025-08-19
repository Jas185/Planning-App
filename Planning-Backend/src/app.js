import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import cron from "node-cron";
import Event from "./models/Event.js";
import { sendEmail } from "./utils/sendEmail.js";


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

// Tâche quotidienne pour les emails de rappel
cron.schedule("0 8 * * *", async () => {
  const today = new Date();
  const twoDaysLater = new Date();
  twoDaysLater.setDate(today.getDate() + 2);

  // Rappel 2 jours avant
  const eventsInTwoDays = await Event.find({
    date: { $gte: new Date(twoDaysLater.setHours(0,0,0,0)), $lt: new Date(twoDaysLater.setHours(23,59,59,999)) }
  }).populate("participants", "email name");

  for (const event of eventsInTwoDays) {
    for (const user of event.participants) {
      await sendEmail(
        user.email,
        `Rappel : ${event.title} dans 2 jours`,
        `Bonjour ${user.name},\n\nVous avez l'événement "${event.title}" le ${event.date}.\n\nDescription: ${event.description}`
      );
    }
  }

  // Rappel le jour même
  const eventsToday = await Event.find({
    date: { $gte: new Date(today.setHours(0,0,0,0)), $lt: new Date(today.setHours(23,59,59,999)) }
  }).populate("participants", "email name");

  for (const event of eventsToday) {
    for (const user of event.participants) {
      await sendEmail(
        user.email,
        `Rappel : ${event.title} aujourd'hui`,
        `Bonjour ${user.name},\n\nVous avez l'événement "${event.title}" aujourd'hui à ${event.date}.\n\nDescription: ${event.description}`
      );
    }
  }
});


export default app;
