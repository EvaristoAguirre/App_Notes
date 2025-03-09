import { ICategory } from "./category.interface";

export interface INote {
  id: string;
  title: string;
  description: string;
  isArchived: boolean;
  categories: ICategory[];
}
