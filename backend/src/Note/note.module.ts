import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from 'src/Entities/note.entity';
import { NoteRepository } from './note.repository';
import { Category } from 'src/Entities/category.entity';
import { CategoryRepository } from 'src/Category/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Category])],
  controllers: [NoteController],
  providers: [NoteService, NoteRepository, CategoryRepository],
})
export class NoteModule {}
