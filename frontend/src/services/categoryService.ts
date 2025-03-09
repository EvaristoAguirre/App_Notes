import { ICategory } from "../interfaces/category.interface";
const API_URL = import.meta.env.VITE_API_URL;
export const getCategories = async () => {
  const response = await fetch(`${API_URL}/category`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(
      `Error al cargar categorias: ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
};

export const createCategory = async (name: string): Promise<ICategory> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error(
      `Error al cargar categorias: ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
};
