import axios from 'axios';
import { AppDataSource } from '../config/database';
import { DataEntity } from '../entities/data.entity';
import NodeCache from 'node-cache';

export class DataService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
  }

  async fetchData(): Promise<DataEntity[]> {
    const cachedData = this.cache.get<DataEntity[]>('posts');
  
    if (cachedData) {
      console.log('Fetching data from cache...');
      return cachedData;
    } else {
      const response = await axios.get(this.apiUrl);
      const data = response.data;
  
      const repository = AppDataSource.getRepository(DataEntity);
      const savedData = await repository.save(
        data.map((item: any) => ({
          id: item.id,
          title: item.title,
          body: item.body,
        }))
      );
  
      // Simpan data ke cache
      this.cache.set('posts', savedData);
  
      return savedData;
    }
  }
  

  async createData(post: { title: string; body: string }): Promise<void> {
    const repository = AppDataSource.getRepository(DataEntity);
    const data = repository.create(post);
    await repository.save(data);

    // Clear cache karena data berubah
    this.cache.del('posts');
  }

  async updateData(id: number, post: { title: string; body: string }): Promise<void> {
    const repository = AppDataSource.getRepository(DataEntity);
    const result = await repository.update(id, post);
    if (result.affected === 0) {
      throw new Error('Data not found.');
    }
  }

  async deleteData(id: number): Promise<void> {
    const repository = AppDataSource.getRepository(DataEntity);
    await repository.delete(id);

    // Clear cache karena data berubah
    this.cache.del('posts');
  }

  async getAllData(): Promise<DataEntity[]> {
    const cachedData = this.cache.get<DataEntity[]>('posts');

    if (cachedData) {
      console.log('Fetching all data from cache...');
      return cachedData;
    } else {
      const repository = AppDataSource.getRepository(DataEntity);
      const data = await repository.find();

      // Simpan data ke cache
      this.cache.set('posts', data);

      return data;
    }
  }

  async patchData(id: number, post: { title?: string; body?: string }): Promise<void> {
    const repository = AppDataSource.getRepository(DataEntity);
    const existingData = await repository.findOneBy({ id });

    if (!existingData) {
      throw new Error('Data not found.');
    }

    existingData.title = post.title !== undefined ? post.title : existingData.title;
    existingData.body = post.body !== undefined ? post.body : existingData.body;

    await repository.save(existingData);
  }  
}
