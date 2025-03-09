import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from 'src/Entities/category.entity';
import { CreateCategoryDto } from 'src/DTOs/create-category';
import { UpdateCategoryDto } from 'src/DTOs/update-category';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(categoryToCreate: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.createCategory(categoryToCreate);
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

  async getAllCategory(): Promise<Category[]> {
    return await this.categoryRepository.getAllCategories();
  }

  async getCategoryById(id: string): Promise<Category> {
    return await this.categoryRepository.getCategoryById(id);
  }
}
