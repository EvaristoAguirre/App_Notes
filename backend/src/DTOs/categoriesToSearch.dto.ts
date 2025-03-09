import { IsArray, IsNotEmpty } from 'class-validator';

export class CategoriesToSearchDto {
  @IsNotEmpty()
  @IsArray()
  categoriesIds: string[];
}
