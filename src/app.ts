import 'reflect-metadata';  // Ensure this line is included
import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from './config/database';
import dataRoutes from './routes/data.routes';  // Import dataRoutes

const app = express();
const port = 3000;

// Middlewares
app.use(bodyParser.json());  // Parse JSON request bodies

// Initialize database
AppDataSource.initialize()
  .then(() => {
    // Use routes
    app.use('/', dataRoutes);  // Use dataRoutes for handling API requests

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch(error => console.error('Error initializing database', error));
