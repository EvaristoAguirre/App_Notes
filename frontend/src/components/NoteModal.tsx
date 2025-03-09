import { useEffect, useState } from "react";
import { IModalProps } from "../interfaces/modalProps.interface";
import { ICategory } from "../interfaces/category.interface";

export const NoteModal: React.FC<IModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  noteToEdit,
  categories,
}) => {
  const [title, setTitle] = useState(noteToEdit?.title || "");
  const [description, setDescription] = useState(noteToEdit?.description || "");
  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>(
    noteToEdit?.categories || []
  );

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setDescription(noteToEdit.description);
      setSelectedCategories(noteToEdit.categories || []);
    } else {
      setTitle("");
      setDescription("");
      setSelectedCategories([]);
    }
  }, [noteToEdit]);

  const handleSubmit = () => {
    onSubmit({
      id: noteToEdit?.id || "",
      isArchived: noteToEdit?.isArchived || false,
      title,
      description,
      categories: selectedCategories,
    });
    onClose();
  };
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOptions = Array.from(event.target.selectedOptions);
    const categories = selectedOptions.map((option) => ({
      id: option.value,
      name: option.text,
    }));
    setSelectedCategories(categories);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          {noteToEdit ? "Editar Nota" : "Crear Nota"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Descripción
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Categorías
            </label>
            <select
              multiple
              value={selectedCategories.map((category) => category.id)}
              onChange={handleCategoryChange}
              className="w-full border rounded px-3 py-2"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {noteToEdit ? "Guardar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
