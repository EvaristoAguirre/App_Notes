import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/DTOs/create-category';
import { UpdateCategoryDto } from 'src/DTOs/update-category';
import { Category } from 'src/Entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepository {
  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  async createCategory(
    categoryToCreate: CreateCategoryDto,
    userId: string,
  ): Promise<Category> {
    try {
      const categoryExist = await this.categoryRepository.findOne({
        where: { name: categoryToCreate.name },
      });
      if (categoryExist) {
        throw new ConflictException(
          'Category with the same name already exists',
        );
      }
      return await this.categoryRepository.save(categoryToCreate);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(
        'Failed to create category',
        error.message,
      );
    }
  }

  async updateCategory(
    id: string,
    categoryToUpdate: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      const categoryFinded = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!categoryFinded) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      Object.assign(categoryFinded, categoryToUpdate);
      return await this.categoryRepository.save(categoryFinded);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(
        'Failed to create category',
        error.message,
      );
    }
  }

  async deleteCategory(id: string): Promise<string> {
    try {
      const categoryFinded = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!categoryFinded) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      await this.categoryRepository.delete(id);
      return 'Category successfully deleted';
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(
        'Failed to create category',
        error.message,
      );
    }
  }

  async getAllCategories(userId: string): Promise<Category[]> {
    try {
      return await this.categoryRepository.find({
        where: { user: { id: userId } },
        order: { name: 'ASC' },
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(
        'Failed to create category',
        error.message,
      );
    }
  }

  async getCategoryById(id: string): Promise<Category> {
    try {
      const categoryFinded = await this.categoryRepository.findOne({
        where: { id },
      });

      if (!categoryFinded) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return categoryFinded;
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(
        'Failed to create category',
        error.message,
      );
    }
  }
}
