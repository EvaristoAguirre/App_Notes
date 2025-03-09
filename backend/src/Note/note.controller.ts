import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from '../DTOs/create-note.dto';
import { UpdateNoteDto } from '../DTOs/update-note.dto';
import { Note } from 'src/Entities/note.entity';
import { CategoriesToSearchDto } from 'src/DTOs/categoriesToSearch.dto';
import { JwtAuthGuard } from 'src/Guards/jwt-auth.guard';
import { User } from 'src/Decorators/user.decorator';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createNote(
    @Body() createNoteDto: CreateNoteDto,
    @User('userId') userId: string,
  ): Promise<Note> {
    return this.noteService.createNote(createNoteDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateNote(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @User('userId') userId: string,
  ): Promise<Note> {
    return this.noteService.updatenote(id, updateNoteDto, userId);
  }

  @Delete(':id')
  delteNote(@Param('id') id: string): Promise<string> {
    return this.noteService.deleteNote(id);
  }

  @Patch('un-archived/:id')
  unArchivedNote(@Param('id') id: string): Promise<Note> {
    return this.noteService.unArchivedNote(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllNotes(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @User('userId') userId: string,
  ): Promise<Note[]> {
    return this.noteService.getAllNotes(page, limit, userId);
  }

  @Get('by-categories')
  getNotesByCategories(
    @Query('categories') categories?: string,
  ): Promise<Note[] | null> {
    if (categories) {
      const categoryIds = categories.split(',');
      return this.noteService.getNotesByCategories(categoryIds);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('archived')
  getArchivedNotes(
    @User('userId') userId: string,
    req: Request,
  ): Promise<Note[] | null> {
    return this.noteService.getArchivedNotes(userId);
  }

  @Get(':id')
  getNoteById(@Param('id') id: string): Promise<Note> {
    return this.noteService.getNoteById(id);
  }
}
