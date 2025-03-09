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
import { request } from 'express';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createNote(
    @Body() createNoteDto: CreateNoteDto,
    @User('userId') userId: string,
  ): Promise<Note> {
    return this.noteService.createNote(createNoteDto, userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateNote(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @User('userId') userId: string,
  ): Promise<Note> {
    return this.noteService.updatenote(id, updateNoteDto, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delteNote(@Param('id') id: string): Promise<string> {
    return this.noteService.deleteNote(id);
  }

  @Patch('un-archived/:id')
  @UseGuards(JwtAuthGuard)
  unArchivedNote(@Param('id') id: string): Promise<Note> {
    return this.noteService.unArchivedNote(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllNotes(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @User('userId') userId: string,
  ): Promise<Note[]> {
    return this.noteService.getAllNotes(page, limit, userId);
  }

  @Get('by-categories')
  @UseGuards(JwtAuthGuard)
  getNotesByCategories(
    @Query('categories') categories?: string,
  ): Promise<Note[] | null> {
    if (categories) {
      const categoryIds = categories.split(',');
      return this.noteService.getNotesByCategories(categoryIds);
    }
  }

  @Get('archived')
  @UseGuards(JwtAuthGuard)
  getArchivedNotes(
    @User('userId') userId: string,
    req: Request,
  ): Promise<Note[] | null> {
    return this.noteService.getArchivedNotes(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getNoteById(@Param('id') id: string): Promise<Note> {
    return this.noteService.getNoteById(id);
  }
}
