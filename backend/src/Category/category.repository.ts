import {
  ConflictException,
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

  async createCategory(categoryToCreate: CreateCategoryDto): Promise<Category> {
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
      throw new NotFoundException(
        `Category with ID ${id} not found`,
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
      throw new InternalServerErrorException(
        'Failed to deactivate category',
        error.message,
      );
    }
  }

  async getAllCategories(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find({
        order: { name: 'ASC' },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve all categories',
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
      throw new InternalServerErrorException(
        'Error fetching the category',
        error.message,
      );
    }
  }
}
