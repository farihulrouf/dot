import { Request, Response } from 'express';
import { DataService } from '../services/data.service';
import axios from 'axios';
import { AppDataSource } from '../config/database';
import { DataEntity } from '../entities/data.entity';

export class DataController {
  private dataService: DataService;

  constructor() {
    this.dataService = new DataService();
  }

  async fetchData(req: Request, res: Response) {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      const posts = response.data;

      // Save data to database
      const dataRepository = AppDataSource.getRepository(DataEntity);
      await dataRepository.save(posts.map((post: any) => ({
        id: post.id,
        title: post.title,
        body: post.body
      })));

      // Return the saved data
      const savedPosts = await dataRepository.find();
      res.json({
        message: 'Data fetched and saved to database.',
        data: savedPosts
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Failed to fetch data.' });
    }
  }

 
  async createData(req: Request, res: Response) {
    try {
      const { title, body } = req.body;
      const newData = new DataEntity();
      newData.title = title;
      newData.body = body;

      const dataRepository = AppDataSource.getRepository(DataEntity);
      const savedData = await dataRepository.save(newData);

      res.status(201).json({
        message: 'Data created successfully.',
        data: savedData
      });
    } catch (error) {
      console.error('Error creating data:', error);
      res.status(500).json({ message: 'Failed to create data.' });
    }
  }

  async updateData(req: Request, res: Response) {
    try {
      // Konversi ID dari parameter URL menjadi angka
      const { id } = req.params;
      const numericId = parseInt(id, 10);

      // Validasi ID
      if (isNaN(numericId)) {
        return res.status(400).json({ message: 'Invalid ID.' });
      }

      const { title, body } = req.body;
      const dataRepository = AppDataSource.getRepository(DataEntity);
      const existingData = await dataRepository.findOneBy({ id: numericId });

      if (!existingData) {
        return res.status(404).json({ message: 'Data not found.' });
      }

      existingData.title = title || existingData.title;
      existingData.body = body || existingData.body;

      const updatedData = await dataRepository.save(existingData);
      res.json({
        message: 'Data updated successfully.',
        data: updatedData
      });
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ message: 'Failed to update data.' });
    }
  }

  async deleteData(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const dataRepository = AppDataSource.getRepository(DataEntity);
      const result = await dataRepository.delete({ id: parseInt(id) });

      if (result.affected === 0) {
        return res.status(404).json({ message: 'Data not found.' });
      }

      res.json({ message: 'Data deleted successfully.' });
    } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).json({ message: 'Failed to delete data.' });
    }
  }

  async getAllData(req: Request, res: Response) {
    try {
      const allData = await this.dataService.getAllData();
      res.json({
        message: 'Data fetched successfully.',
        data: allData
      });
    } catch (error) {
      console.error('Error fetching all data:', error);
      res.status(500).json({ message: 'Failed to fetch all data.' });
    }
  }

  async patchData(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const numericId = parseInt(id, 10);

      if (isNaN(numericId)) {
        return res.status(400).json({ message: 'Invalid ID.' });
      }

      const partialData = req.body;
      const updatedData = await this.dataService.patchData(numericId, partialData);

      if (!updatedData) {
        return res.status(404).json({ message: 'Data not found.' });
      }

      res.json({
        message: 'Data partially updated successfully.',
        data: updatedData
      });
    } catch (error) {
      console.error('Error partially updating data:', error);
      res.status(500).json({ message: 'Failed to partially update data.' });
    }
  }

}
