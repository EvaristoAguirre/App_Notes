import { useEffect, useState } from "react";
import { Note } from "../components/Note";
import { INote } from "../interfaces/note.interface";
import {
  getArchivedNotes,
  deleteNote,
  unArchivedNote,
} from "../services/notesService";

const ArchivedNotes = () => {
  const [archivedNotes, setArchivedNotes] = useState<INote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArchivedNotes = async () => {
      try {
        const notes = await getArchivedNotes();
        setArchivedNotes(notes);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar notas archivadas:", error);
      }
    };
    fetchArchivedNotes();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      setArchivedNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
    }
  };

  const handleUnarchive = async (id: string) => {
    try {
      await unArchivedNote(id);
      setArchivedNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== id)
      );
    } catch (error) {
      console.error("Error al desarchivar la nota:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-medium text-gray-600">
          Cargando notas archivadas...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Notas Archivadas</h1>
          <button
            onClick={() => (window.location.href = "/notes")}
            className="text-blue-600 hover:underline"
          >
            Volver a Notas
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {archivedNotes.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center">
              No hay notas archivadas.
            </p>
          ) : (
            archivedNotes.map((note) => (
              <Note
                key={note.id}
                note={note}
                onDelete={handleDelete}
                onArchive={handleUnarchive}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchivedNotes;
