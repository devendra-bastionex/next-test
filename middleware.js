// Example middleware that can be used with the custom server
const customMiddleware = (req, res, next) => {
  // Add custom headers
  res.setHeader('X-Custom-Header', 'Hello from middleware');
  
  // You can perform authentication checks here
  // if (!isAuthenticated(req)) {
  //   return res.status(401).json({ error: 'Unauthorized' });
  // }
  
  // Continue to the next middleware or route handler
  next();
};

module.exports = { customMiddleware };