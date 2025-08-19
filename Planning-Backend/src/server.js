import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

// Connexion Mongo avant de lancer le serveur
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`[server] Running on http://localhost:${PORT}`);
  });
});
