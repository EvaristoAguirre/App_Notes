import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from '../DTOs/create-note.dto';
import { UpdateNoteDto } from '../DTOs/update-note.dto';
import { NoteRepository } from './note.repository';
import { Note } from 'src/Entities/note.entity';
import { CategoriesToSearchDto } from 'src/DTOs/categoriesToSearch.dto';

@Injectable()
export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}
  async createNote(
    createNoteDto: CreateNoteDto,
    userId: string,
  ): Promise<Note> {
    return await this.noteRepository.createNote(createNoteDto, userId);
  }

  async updatenote(
    id: string,
    updateNoteDto: UpdateNoteDto,
    userId: string,
  ): Promise<Note> {
    return await this.noteRepository.updateNote(id, updateNoteDto, userId);
  }

  async deleteNote(id: string): Promise<string> {
    return await this.noteRepository.deleteNote(id);
  }
  async getAllNotes(
    page: number,
    limit: number,
    userId: string,
  ): Promise<Note[]> {
    return await this.noteRepository.getAllNotes(page, limit, userId);
  }

  async getNoteById(id: string): Promise<Note> {
    return await this.noteRepository.getNoteById(id);
  }

  async getNotesByCategories(categoryIds: string[]): Promise<Note[] | null> {
    return await this.noteRepository.getNotesByCategories(categoryIds);
  }

  async getArchivedNotes(userId: string): Promise<Note[]> | null {
    return await this.noteRepository.getArchivedNotes(userId);
  }

  async unArchivedNote(id: string): Promise<Note> {
    return await this.noteRepository.unArchivedNote(id);
  }
}
