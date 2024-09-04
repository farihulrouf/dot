import { Router } from 'express';
import { DataController } from '../controllers/data.controller';

const router = Router();
const dataController = new DataController();

// Define routes
router.get('/fetch-data', (req, res) => dataController.fetchData(req, res));
router.post('/data', (req, res) => dataController.createData(req, res));
router.put('/data/:id', (req, res) => dataController.updateData(req, res));
router.delete('/data/:id', (req, res) => dataController.deleteData(req, res));
router.get('/data', (req, res) => dataController.getAllData(req, res));
router.patch('/data/:id', (req, res) => dataController.patchData(req, res)); // Route PATCH

export default router;
