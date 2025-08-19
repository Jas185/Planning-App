import mongoose from "mongoose";

// Assurez-vous que dotenv est chargé avant d'utiliser process.env
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("[db] Connecté à MongoDB ✅");
  } catch (err) {
    console.error("[db] Erreur de connexion à MongoDB ❌", err.message);
    process.exit(1);
  }
};