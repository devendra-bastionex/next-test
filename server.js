// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const next = require('next');
const connectDB = require('./apiconfig/db');

// Connect to MongoDB
connectDB();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

// Import routes
const userRoutes = require('./apiroutes/userRoutes');
const productRoutes = require('./apiroutes/productRoutes');

app.prepare().then(() => {
  const server = express();

  // Body parser middleware
  server.use(express.json());
  
  // Mount API routes
  server.use('/api/users', userRoutes);
  server.use('/api/products', productRoutes);
  
  // Custom API routes can be defined here
  server.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from custom server!' });
  });

  // Handle specific Next.js routes
  server.get('/reset-password', (req, res) => {
    return handle(req, res);
  });
  
  server.get('/login', (req, res) => {
    return handle(req, res);
  });
  
  server.get('/forgot-password', (req, res) => {
    return handle(req, res);
  });
  
  server.get('/register', (req, res) => {
    return handle(req, res);
  });
  
  server.get('/dashboard', (req, res) => {
    return handle(req, res);
  });
  
  server.get('/products', (req, res) => {
    return handle(req, res);
  });
  
  server.get('/', (req, res) => {
    return handle(req, res);
  });
  
  // Handle Next.js static files and other routes
  server.get(/^\/(?!api).*/, (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});