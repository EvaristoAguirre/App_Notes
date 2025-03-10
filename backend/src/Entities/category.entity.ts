import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Note } from './note.entity';
import { User } from './user.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Note, (note) => note.categories)
  notes: Note[];

  @ManyToOne(() => User, (user) => user.categories)
  user: User;
}
