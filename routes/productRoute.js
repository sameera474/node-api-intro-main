const express = require("express");
const passport = require("passport");
const checkRoles = require("../middleware/checkRole");

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  createMultipleProducts,
  getCategory,
} = require("../controller/productController");
const router = express.Router();

// Get all products
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllProducts
);

// Get  products by category
router.get(
  "/category/:categoryName",
  passport.authenticate("jwt", { session: false }),
  getCategory
);

// Create a new product
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles(["admin"]),
  createProduct
);

// Create multiple new product
router.post("/", createMultipleProducts);

// Update a product
router.patch("/:id", updateProduct);

// Delete a product
router.delete("/:id", deleteProduct);

// Get a single product
router.get("/:id", getSingleProduct);

module.exports = router;
