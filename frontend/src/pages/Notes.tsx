import { useState, useEffect } from "react";
import Note from "../components/Note";
import NoteModal from "../components/NoteModal";
import {
  getNotes,
  archiveNote,
  editNote,
  deleteNote,
  createNote,
  filterNotes,
} from "../services/notesService";
import { INote } from "../interfaces/note.interface";
import { ICategory } from "../interfaces/category.interface";
import { createCategory, getCategories } from "../services/categoryService";
import { useNavigate } from "react-router-dom";
import { CreateCategory } from "../components/CreateCategory";

const Notes = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [noteToEdit, setNoteToEdit] = useState<INote | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const [fetchedNotes, fetchedCategories] = await Promise.all([
          getNotes(),
          getCategories(),
        ]);
        setNotes(fetchedNotes);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleArchive = async (id: string) => {
    try {
      await archiveNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error al archivar la nota:", error);
    }
  };

  const handleEdit = (id: string) => {
    const note = notes.find((note) => note.id === id);
    if (note) {
      setNoteToEdit(note);
      setShowModal(true);
    }
  };

  const handleSaveEdit = async (updatedNote: INote) => {
    try {
      const savedNote = await editNote(
        updatedNote.id,
        updatedNote.title,
        updatedNote.description,
        updatedNote.isArchived,
        updatedNote.categories
      );

      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === savedNote.id ? savedNote : note))
      );

      setShowModal(false);
      setNoteToEdit(null);
    } catch (error) {
      console.error("Error al guardar la nota editada:", error);
    }
  };

  const handleCreateNote = async (newNote: INote) => {
    try {
      const createdNote = await createNote(
        newNote.title,
        newNote.description,
        newNote.categories
      );
      setNotes((prevNotes) => [...prevNotes, createdNote]);
      setShowModal(false);
    } catch (error) {
      console.error("Error al crear la nota:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNoteToEdit(null);
  };

  const handleCategorySelection = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleFilterNotes = async () => {
    setLoading(true);
    try {
      if (selectedCategories.length === 0) {
        const allNotes = await getNotes();
        setNotes(allNotes);
      } else {
        const filteredNotes = await filterNotes(selectedCategories);
        setNotes(filteredNotes);
      }
    } catch (error) {
      console.error("Error al filtrar notas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryCreate = async (newCategoryName: string) => {
    try {
      const newCategory = await createCategory(newCategoryName);
      setCategories([...categories, newCategory]);
    } catch (error) {
      console.error("Error al crear categoría:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-medium text-gray-600">
          Cargando notas...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-1">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tus Notas</h1>
          <div className="space-x-4">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded hover:bg-gray-300"
              onClick={() => navigate("/archived-notes")}
            >
              Ver Archivadas
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
              onClick={() => setShowModal(true)}
            >
              Crear Nota
            </button>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            Filtrar por Categorías:
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelection(category.id)}
                className={`px-3 py-1 rounded ${
                  selectedCategories.includes(category.id)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleFilterNotes}
          >
            Aplicar Filtros
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              onArchive={handleArchive}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
        <div className="mt-4">
          <CreateCategory onCreate={handleCategoryCreate} />
        </div>
      </div>
      {showModal && (
        <NoteModal
          isOpen={showModal}
          onClose={handleModalClose}
          onSubmit={noteToEdit ? handleSaveEdit : handleCreateNote}
          categories={categories}
          noteToEdit={noteToEdit}
        />
      )}
    </div>
  );
};

export default Notes;
