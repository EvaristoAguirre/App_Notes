import { Note } from 'src/Entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto } from 'src/DTOs/create-note.dto';
import { UpdateNoteDto } from 'src/DTOs/update-note.dto';
import { Category } from 'src/Entities/category.entity';

@Injectable()
export class NoteRepository {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createNote(noteToCreate: CreateNoteDto, userId: string): Promise<Note> {
    console.log('noteToCreate:', noteToCreate);
    console.log('userId:', userId);

    try {
      const { categories, ...noteData } = noteToCreate;
      console.log(categories, 'categories');
      const note = this.noteRepository.create({
        ...noteData,
        user: { id: userId },
      });

      // Si hay categorías, asignarlas a la nota
      if (categories && categories.length > 0) {
        // Extraer solo los IDs de las categorías
        const categoryIdsArray = categories.map((category) => category.id);

        // Buscar las categorías en la base de datos usando los IDs
        const categoriesFromDb = await this.categoryRepository.findBy({
          id: In(categoryIdsArray),
        });

        // Verificar que todas las categorías existan
        if (categoriesFromDb.length !== categoryIdsArray.length) {
          throw new BadRequestException(
            'Some category IDs provided are invalid.',
          );
        }

        // Asignar las categorías a la nota
        note.categories = categoriesFromDb;
      }

      const savedNote = await this.noteRepository.save(note);

      const noteWithCategories = await this.noteRepository.findOne({
        where: { id: savedNote.id },
        relations: ['categories'],
      });

      return noteWithCategories;
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(
        'Failed to create category',
        error.message,
      );
    }
  }

  async updateNote(
    id: string,
    updateData: UpdateNoteDto,
    userId: string,
  ): Promise<Note> {
    try {
      const { categories, ...noteData } = updateData;

      const noteFinded = await this.noteRepository.findOne({
        where: { id, user: { id: userId } },
        relations: ['categories'],
      });

      if (!noteFinded) {
        throw new NotFoundException(
          'Note not found or does not belong to the user',
        );
      }

      if (categories && categories.length > 0) {
        const categoryIdsArray = categories.map((category) => category.id);

        const categoriesFromDb = await this.categoryRepository.findBy({
          id: In(categoryIdsArray),
        });

        if (categoriesFromDb.length !== categoryIdsArray.length) {
          throw new BadRequestException(
            'Some category IDs provided are invalid.',
          );
        }

        noteFinded.categories = categoriesFromDb;
      }

      Object.assign(noteFinded, updateData);

      const savedNote = await this.noteRepository.save(noteFinded);

      const noteWithCategories = await this.noteRepository.findOne({
        where: { id: savedNote.id },
        relations: ['categories'],
      });

      return noteWithCategories;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Failed to update the note',
        error.message,
      );
    }
  }

  async deleteNote(id: string): Promise<string> {
    try {
      const noteToDelete = await this.noteRepository.findOne({
        where: { id },
      });
      if (!noteToDelete) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
      await this.noteRepository.delete(id);
      return 'Note successfully deleted';
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(
        'Failed to create category',
        error.message,
      );
    }
  }

  async getAllNotes(
    page: number,
    limit: number,
    userId: string,
  ): Promise<Note[]> {
    try {
      return await this.noteRepository.find({
        where: { user: { id: userId }, isArchived: false },
        skip: (page - 1) * limit,
        take: limit,
        order: { createdAt: 'ASC' },
        relations: ['categories'],
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(
        'Failed to create category',
        error.message,
      );
    }
  }

  async getNoteById(id: string): Promise<Note> {
    try {
      const noteFinded = await this.noteRepository.findOne({
        where: { id },
        relations: ['categories'],
      });
      if (!noteFinded) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
      return noteFinded;
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(
        'Failed to create category',
        error.message,
      );
    }
  }

  async getNotesByCategories(categoryIds: string[]): Promise<Note[] | null> {
    try {
      return await this.noteRepository
        .createQueryBuilder('note')
        .innerJoin('note.categories', 'category')
        .where('category.id IN (:...categoryIds)', { categoryIds })
        .groupBy('note.id')
        .having('COUNT(category.id) = :numCategories', {
          numCategories: categoryIds.length,
        })
        .getMany();
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(
        'Failed to create category',
        error.message,
      );
    }
  }

  async getArchivedNotes(userId: string): Promise<Note[]> | null {
    try {
      return await this.noteRepository.find({
        where: { user: { id: userId }, isArchived: true },
        relations: ['categories'],
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(
        'Failed to create category',
        error.message,
      );
    }
  }

  async unArchivedNote(id: string): Promise<Note> {
    try {
      const noteFinded = await this.noteRepository.findOne({
        where: { id },
        relations: ['categories'],
      });
      if (!noteFinded) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
      noteFinded.isArchived = false;
      return await this.noteRepository.save(noteFinded);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(
        'Failed to create category',
        error.message,
      );
    }
  }
}
