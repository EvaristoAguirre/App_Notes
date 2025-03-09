import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Note } from 'src/Entities/note.entity';
import { Entity } from 'typeorm';

@Entity()
export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  notes?: Note[];
}
