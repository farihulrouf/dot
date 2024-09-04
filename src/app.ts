import 'reflect-metadata';  // Ensure this line is included
import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from './config/database';
import dataRoutes from './routes/data.routes';

const app = express();
const port = 3000;

// Middlewares
app.use(bodyParser.json());

// Initialize database
AppDataSource.initialize()
  .then(() => {
    // Use routes
    app.use('/', dataRoutes);

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch(error => console.error('Error initializing database', error));
