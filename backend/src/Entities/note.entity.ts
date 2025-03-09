import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';
@Entity({ name: 'notes' })
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  isArchived: boolean;

  @ManyToMany(() => Category, (category) => category.notes, { cascade: true })
  @JoinTable({ name: 'note_categories' })
  categories: Category[];

  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn({ name: 'userId' })
  user: User;
}
