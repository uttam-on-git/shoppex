// config/db.js
// For demo: in-memory DB setup. Replace with real DB logic as needed.
import products from "../products.js";
import users from "../users.js";
import fs from "fs";
const SESSIONS_FILE = "./sessions.json";
let cart = [];
let sessions = {};

// Load sessions from disk
try {
  if (fs.existsSync(SESSIONS_FILE)) {
    sessions = JSON.parse(fs.readFileSync(SESSIONS_FILE, "utf-8"));
  }
} catch (e) {
  sessions = {};
}

// Save sessions to disk
export function saveSessions() {
  fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions));
}

export default {
  products,
  users,
  cart,
  sessions,
  saveSessions,
};
