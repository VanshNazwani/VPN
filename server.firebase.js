// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Import the main Express app
import app from './index.js';

// Import and initialize Firebase Admin SDK
import db from './config/firebase.admin.js'; // This is likely an object, not a function

const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
    db;
  // Firebase is already initialized when imported
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
