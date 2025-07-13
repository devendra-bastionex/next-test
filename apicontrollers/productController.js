const Product = require('../apimodels/Product');
const { validateProduct } = require('../apiutils/productValidation');
const { upload, processImage } = require('../apiutils/imageUpload');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    console.log('Pagination params:', { page, limit, skip });
    
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
    
    const total = await Product.countDocuments();
    const totalPages = Math.ceil(total / limit);
    
    console.log('Query result:', { productsCount: products.length, total, totalPages });
    
    res.status(200).json({ 
      success: true, 
      count: products.length,
      total,
      totalPages,
      currentPage: page,
      data: products 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private
exports.createProduct = [upload.single('image'), async (req, res) => {
  console.log("body====>>>>>", req.body);
  
  try {
    const { name, description, price, stock, category, status } = req.body;
    
    // Validate product data
    const validation = validateProduct({ name, description, price, stock, category });
    if (!validation.isValid) {
      return res.status(400).json({ 
        success: false, 
        error: validation.error 
      });
    }
    
    const product = await Product.create({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      stock: Number(stock),
      category: category.trim(),
      status: status || 'Active'
    });    
    let images = {};
    
    // Process image if uploaded
    if (req.file) {
      const timestamp = Date.now();
      const filename = `product_${timestamp}`;
      images = await processImage(req.file.buffer, filename, product?._id.toString());
    }
    

    await Product.findByIdAndUpdate(
      product?._id,
      {
        images
      },
      { new: true, runValidators: true }
    );
    
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}];

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
exports.updateProduct = [upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, stock, category, status } = req.body;
    
    // Validate product data
    const validation = validateProduct({ name, description, price, stock, category });
    if (!validation.isValid) {
      return res.status(400).json({ 
        success: false, 
        error: validation.error 
      });
    }
    
    const updateData = {
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      stock: Number(stock),
      category: category.trim(),
      status: status
    };
    
    // Process new image if uploaded
    if (req.file) {
      const timestamp = Date.now();
      const filename = `product_${timestamp}`;
      updateData.images = await processImage(req.file.buffer, filename, req.params.id);
    }
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}];

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: 'Active' })
      .sort({ createdAt: -1 })
      .limit(4)
      .select('name price images category');
    
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};