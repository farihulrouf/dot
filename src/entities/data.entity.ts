import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;
}
