// controllers/authController.js

import prisma from "../config/db.js";

function generateToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "User already exists" });
    }
    const user = await prisma.user.create({ data: { email, password, name } });
    const token = generateToken();
    await prisma.session.create({ data: { token, userId: user.id } });
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken();
    await prisma.session.create({ data: { token, userId: user.id } });
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const me = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });
    if (!session || !session.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { id, email, name } = session.user;
    res.json({ id, email, name });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
