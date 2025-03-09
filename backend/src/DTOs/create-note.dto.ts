import { IsString } from '@nestjs/class-validator';
import { IsArray, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { CategoryDto } from './categories.dto';
import { Type } from 'class-transformer';

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  categories?: CategoryDto[];
}
