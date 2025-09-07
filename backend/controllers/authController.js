// controllers/authController.js

import db, { saveSessions } from "../config/db.js";

export const signup = (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (db.users.find((u) => u.email === email)) {
    return res.status(409).json({ error: "User already exists" });
  }
  const newUser = {
    id: db.users.length + 1,
    email,
    password, // In production, hash this!
    name,
  };
  db.users.push(newUser);
  const token = Math.random().toString(36).substring(2);
  db.sessions[token] = newUser.id;
  saveSessions();
  res.json({
    token,
    user: { id: newUser.id, email: newUser.email, name: newUser.name },
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = Math.random().toString(36).substring(2);
  db.sessions[token] = user.id;
  saveSessions();
  res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name },
  });
};

export const me = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const userId = db.sessions[token];
  const user = db.users.find((u) => u.id === userId);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.json({ id: user.id, email: user.email, name: user.name });
};
