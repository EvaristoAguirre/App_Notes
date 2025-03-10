import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Note } from './note.entity';
import { Category } from './category.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];
}
