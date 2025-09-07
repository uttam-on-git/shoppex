// controllers/cartController.js
import db from "../config/db.js";

export const getCart = (req, res) => {
  res.json(db.cart);
};

export const addToCart = (req, res) => {
  const { product, quantity } = req.body;
  const existing = db.cart.find((item) => item.product.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    db.cart.push({ product, quantity });
  }
  res.json(db.cart);
};

export const updateCart = (req, res) => {
  const productId = parseInt(req.params.id);
  const { quantity } = req.body;
  if (quantity <= 0) {
    db.cart = db.cart.filter((item) => item.product.id !== productId);
  } else {
    db.cart = db.cart.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
  }
  res.json(db.cart);
};

export const removeFromCart = (req, res) => {
  const productId = parseInt(req.params.id);
  db.cart = db.cart.filter((item) => item.product.id !== productId);
  res.json(db.cart);
};

export const clearCart = (req, res) => {
  db.cart = [];
  res.json(db.cart);
};
