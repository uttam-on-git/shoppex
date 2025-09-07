// controllers/productController.js
import db from "../config/db.js";

export const getProducts = (req, res) => {
  res.json(db.products);
};
