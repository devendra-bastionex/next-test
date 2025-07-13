const validateProduct = (productData) => {
  const { name, description, price, stock, category } = productData;
  
  // Check required fields
  if (!name || !description || price === undefined || price === '' || stock === undefined || stock === '' || !category) {
    return { isValid: false, error: 'All fields are required' };
  }
  
  // Validate name length
  if (name.length < 2) {
    return { isValid: false, error: 'Product name must be at least 2 characters' };
  }
  
  // Validate price
  if (isNaN(price) || price < 0) {
    return { isValid: false, error: 'Price must be a positive number' };
  }
  
  // Validate stock
  if (isNaN(stock) || Number(stock) < 0) {
    return { isValid: false, error: 'Stock must be a positive number' };
  }
  
  return { isValid: true };
};

module.exports = { validateProduct };