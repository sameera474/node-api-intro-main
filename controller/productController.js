const Product = require("../models/productModel.js");
const mongoose = require("mongoose");

// get all the products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get a single product
const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No product with id: ${id}`);

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// create a new product
const createProduct = async (req, res) => {
  const { name, price, description, category, image, rate, count } = req.body;

  try {
    const newProduct = await Product.create({
      name,
      price,
      description,
      category,
      image,
      rate,
      count,
    });
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// create multiple products
const createMultipleProducts = async (req, res) => {
  const products = req.body;

  try {
    const newProducts = await Product.insertMany(products);
    res.status(200).json(newProducts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: `No product with id: ${id}` });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No product with id: ${id}`);

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, category, image, rate, count },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCategory = async (req, res) => {
  const { categoryName } = req.params;

  try {
    const normalizedCategory = decodeURIComponent(categoryName).toLowerCase();
    const products = await Product.find({ category: normalizedCategory });
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  createMultipleProducts,
  getCategory,
};
