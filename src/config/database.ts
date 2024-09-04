import { DataSource } from 'typeorm';
import { DataEntity } from '../entities/data.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite', // Nama file SQLite
  entities: [DataEntity],
  synchronize: true,
});
