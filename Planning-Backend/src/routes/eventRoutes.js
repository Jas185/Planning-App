import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// GET /events → liste tous les événements
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("participants", "name email role");
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// POST /events → créer un événement
router.post("/", async (req, res) => {
  try {
    const { title, description, date, participants } = req.body;

    const event = await Event.create({ title, description, date, participants });
    res.status(201).json({ message: "Événement créé", event });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
