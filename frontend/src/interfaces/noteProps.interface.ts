import { INote } from "./note.interface";

export interface INoteProps {
  note: INote;
  onArchive?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}
