import { ICategory } from "../interfaces/category.interface";
import { INote } from "../interfaces/note.interface";

const API_URL = import.meta.env.VITE_API_URL;

export const getNotes = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }
  const response = await fetch(`${API_URL}/note`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Error al cargar notas: ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
};

export const createNote = async (
  title: string,
  description: string,
  categories: ICategory[]
) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }
  const response = await fetch(`${API_URL}/note`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, categories }),
  });
  if (!response.ok) {
    throw new Error(
      `Error al crear nota: ${response.status} ${response.statusText}`
    );
  }
  return await response.json();
};

export const archiveNote = async (id: string) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }
  const response = await fetch(`${API_URL}/note/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isArchived: true }),
  });

  if (!response.ok) {
    throw new Error(
      `Error al archivar nota: ${response.status} ${response.statusText}`
    );
  }
};

export const editNote = async (
  id: string,
  title: string,
  description: string,
  isArchived: boolean,
  categories: ICategory[]
) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }
  const response = await fetch(`${API_URL}/note/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id, title, description, isArchived, categories }),
  });

  if (!response.ok) {
    throw new Error(
      `Error al editar nota: ${response.status} ${response.statusText}`
    );
  }

  const updatedNote: INote = await response.json();
  return updatedNote;
};

export const deleteNote = async (id: string) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }
  const response = await fetch(`${API_URL}/note/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Error al eliminar nota: ${response.status} ${response.statusText}`
    );
  }
};

export const getArchivedNotes = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }
  const response = await fetch(`${API_URL}/note/archived`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(
      `Error al cargar notas archivadas: ${response.status} ${response.statusText}`
    );
  }
  return await response.json();
};

export const unArchivedNote = async (id: string) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }
  const response = await fetch(`${API_URL}/note/un-archived/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error(
      `Error al editar nota: ${response.status} ${response.statusText}`
    );
  }

  const updatedNote: INote = await response.json();
  return updatedNote;
};

export const filterNotes = async (categoryIds: string[]) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No se encontró el token de autenticación.");
  }
  const query = categoryIds.join(",");

  const response = await fetch(
    `${API_URL}/note/by-categories?categories=${encodeURIComponent(query)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(
      `Error al filtrar notas archivadas: ${response.status} ${response.statusText}`
    );
  }
  return await response.json();
};
