import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from 'src/Entities/category.entity';
import { CreateCategoryDto } from 'src/DTOs/create-category';
import { UpdateCategoryDto } from 'src/DTOs/update-category';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(
    categoryToCreate: CreateCategoryDto,
    userId: string,
  ): Promise<Category> {
    return await this.categoryRepository.createCategory(
      categoryToCreate,
      userId,
    );
  }

  async updateCategory(
    id: string,
    categoryToUpdate: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryRepository.updateCategory(id, categoryToUpdate);
  }

  async deleteCategory(id: string): Promise<string> {
    return await this.categoryRepository.deleteCategory(id);
  }

  async getAllCategory(userId: string): Promise<Category[]> {
    return await this.categoryRepository.getAllCategories(userId);
  }

  async getCategoryById(id: string): Promise<Category> {
    return await this.categoryRepository.getCategoryById(id);
  }
}
