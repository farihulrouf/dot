import 'reflect-metadata';  // Ensure this line is included
import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from './config/database';
import { DataController } from './controllers/data.controller';

const app = express();
const port = 3000;

// Middlewares
app.use(bodyParser.json());

// Initialize database
AppDataSource.initialize()
  .then(() => {
    const dataController = new DataController();

    // Define routes
    app.get('/fetch-data', (req, res) => dataController.fetchData(req, res));
    app.post('/data', (req, res) => dataController.createData(req, res));
    app.put('/data/:id', (req, res) => dataController.updateData(req, res));
    app.delete('/data/:id', (req, res) => dataController.deleteData(req, res));
    app.get('/data', (req, res) => dataController.getAllData(req, res));

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch(error => console.error('Error initializing database', error));
