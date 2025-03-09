import { ICategory } from "./category.interface";
import { INote } from "./note.interface";

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (noteData: INote) => void;
  categories: ICategory[];
  noteToEdit?: INote | null;
}
