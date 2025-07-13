const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Configure multer for memory storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Process and save images in different sizes
const processImage = async (buffer, filename, productId) => {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products', `${productId}`);
  
  // Ensure directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const baseFilename = path.parse(filename).name;
  const ext = '.jpg';

  // Generate different sizes
  const sizes = {
    thumbnail: { width: 150, height: 150, suffix: '_thumb' },
    medium: { width: 400, height: 400, suffix: '_medium' },
    large: { width: 800, height: 800, suffix: '_large' }
  };

  const imagePaths = {};

  for (const [key, config] of Object.entries(sizes)) {
    const outputFilename = `${baseFilename}${config.suffix}${ext}`;
    const outputPath = path.join(uploadDir, outputFilename);

    await sharp(buffer)
      .resize(config.width, config.height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    imagePaths[key] = `/uploads/products/${productId}/${outputFilename}`;
  }

  return imagePaths;
};

module.exports = { upload, processImage };