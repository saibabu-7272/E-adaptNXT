const Product = require('../models/productModel');

// Get all products (with optional search & pagination)
exports.getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 5, search = '' } = req.query;
        const query = search ? { name: { $regex: search, $options: 'i' } } : {};

        const products = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Product.countDocuments(query);

        res.json({
            total,
            page: Number(page),
            totalPages: Math.ceil(total / limit),
            products
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Admin: Create product
exports.createProduct = async (req, res) => {
    try {
        const { name, category, price, description, stock } = req.body;
        const product = await Product.create({ name, category, price, description, stock });
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Admin: Update product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Admin: Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
