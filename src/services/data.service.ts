import axios from 'axios';
import { AppDataSource } from '../config/database';
import { DataEntity } from '../entities/data.entity';

export class DataService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  async fetchData(): Promise<void> {
    const response = await axios.get(this.apiUrl);
    const data = response.data;

    const repository = AppDataSource.getRepository(DataEntity);
    await repository.save(data.map((item: any) => ({
      id: item.id,
      title: item.title,
      body: item.body
    })));
  }

  async createData(post: { title: string; body: string }): Promise<void> {
    const repository = AppDataSource.getRepository(DataEntity);
    const data = repository.create(post);
    await repository.save(data);
  }

  async updateData(id: number, post: { title: string; body: string }): Promise<void> {
    const repository = AppDataSource.getRepository(DataEntity);
    await repository.update(id, post);
  }

  async deleteData(id: number): Promise<void> {
    const repository = AppDataSource.getRepository(DataEntity);
    await repository.delete(id);
  }

  async getAllData(): Promise<DataEntity[]> {
    const repository = AppDataSource.getRepository(DataEntity);
    return await repository.find();
  }
}
