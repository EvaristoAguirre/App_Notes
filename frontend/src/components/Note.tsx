import { useState } from "react";
import { INoteProps } from "../interfaces/noteProps.interface";

export const Note: React.FC<INoteProps> = ({
  note,
  onArchive,
  onEdit,
  onDelete,
}) => {
  const [showModal, setShowModal] = useState(false);

  if (!note.id) {
    console.error("Nota sin ID detectada:", note);
    return null;
  }

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    onDelete?.(note.id);
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-gray-50 border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-lg font-semibold text-gray-800">{note.title}</h2>
      <p className="text-gray-600 mt-2">
        {note.description || "Sin descripción"}
      </p>

      {note.categories?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-1">
            Categorías:
          </h3>
          <div className="flex flex-wrap gap-2">
            {note.categories.map((category) => (
              <span
                key={category.id}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end mt-4 space-x-4">
        <button
          className="text-blue-500 hover:text-blue-600"
          onClick={() => onEdit?.(note.id)}
        >
          {note.isArchived ? null : "✏️"}
        </button>
        <button
          className="text-green-500 hover:text-green-600"
          onClick={() => onArchive?.(note.id)}
        >
          {note.isArchived ? "📤" : "📥"}
        </button>
        <button
          className="text-red-500 hover:text-red-600"
          onClick={handleDelete}
        >
          🗑️
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold text-gray-800">
              ¿Estás seguro?
            </h3>
            <p className="text-gray-600 mt-2">
              Esta acción eliminará permanentemente la nota.
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                onClick={cancelDelete}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={confirmDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
