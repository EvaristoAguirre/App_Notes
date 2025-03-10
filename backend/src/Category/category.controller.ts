import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from 'src/Entities/category.entity';
import { CreateCategoryDto } from 'src/DTOs/create-category';
import { UpdateCategoryDto } from 'src/DTOs/update-category';
import { User } from 'src/Decorators/user.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  createCategory(
    @Body() category: CreateCategoryDto,
    @User('userId') userId: string,
  ): Promise<Category> {
    return this.categoryService.createCategory(category, userId);
  }

  @Patch(':id')
  updateCategory(
    @Param('id') id: string,
    @Body() category: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, category);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string): Promise<string> {
    return this.categoryService.deleteCategory(id);
  }

  @Get()
  getAllCategory(@User('userId') userId: string): Promise<Category[]> {
    return this.categoryService.getAllCategory(userId);
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }
}
