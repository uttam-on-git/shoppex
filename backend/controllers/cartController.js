// controllers/cartController.js
import prisma from "../config/db.js";

const getUserId = (req) => {
  const id = req.query.userId || req.body.userId;
  if (!id) return undefined;
  return parseInt(id);
};

export const getCart = async (req, res) => {
  const userId = getUserId(req);
  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }
  try {
    const cart = await prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

export const addToCart = async (req, res) => {
  const userId = getUserId(req);
  const { productId, quantity } = req.body;
  if (!userId || !productId || !quantity) {
    return res
      .status(400)
      .json({ error: "Missing userId, productId, or quantity" });
  }
  try {
    const existing = await prisma.cart.findFirst({
      where: { userId, productId },
    });
    let cartItem;
    if (existing) {
      cartItem = await prisma.cart.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    } else {
      cartItem = await prisma.cart.create({
        data: { userId, productId, quantity },
      });
    }
    const cart = await prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

export const updateCart = async (req, res) => {
  const userId = getUserId(req);
  const productId = parseInt(req.params.id);
  const { quantity } = req.body;
  if (!userId || !productId || typeof quantity !== "number") {
    return res
      .status(400)
      .json({ error: "Missing userId, productId, or quantity" });
  }
  try {
    if (quantity <= 0) {
      await prisma.cart.deleteMany({ where: { userId, productId } });
    } else {
      await prisma.cart.updateMany({
        where: { userId, productId },
        data: { quantity },
      });
    }
    const cart = await prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to update cart" });
  }
};

export const removeFromCart = async (req, res) => {
  // Support userId from body or query (for DELETE with fetch)
  let userId = req.body && req.body.userId ? req.body.userId : req.query.userId;
  if (userId) userId = parseInt(userId);
  const productId = parseInt(req.params.id);
  if (!userId || !productId) {
    return res.status(400).json({ error: "Missing userId or productId" });
  }
  try {
    await prisma.cart.deleteMany({ where: { userId, productId } });
    const cart = await prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove from cart" });
  }
};

export const clearCart = async (req, res) => {
  // Support userId from body or query (for DELETE with fetch)
  let userId = req.body && req.body.userId ? req.body.userId : req.query.userId;
  if (userId) userId = parseInt(userId);
  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }
  try {
    await prisma.cart.deleteMany({ where: { userId } });
    res.json([]);
  } catch (err) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
};
