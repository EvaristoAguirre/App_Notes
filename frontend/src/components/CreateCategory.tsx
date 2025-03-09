import React, { useState } from "react";
import { ICreateCategoryProps } from "../interfaces/createCategoryProps.interface";

export const CreateCategory: React.FC<ICreateCategoryProps> = ({
  onCreate,
}) => {
  const [categoryName, setCategoryName] = useState("");

  const handleCreate = () => {
    if (categoryName.trim()) {
      onCreate(categoryName.trim());
      setCategoryName("");
    }
  };

  return (
    <div className="space-y-2 bg-gray-60 border rounded-lg p-4">
      <label className="block text-sm font-medium mb-1">Nueva Categoría:</label>
      <div className="flex space-x-2">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Nombre de la categoría"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Agregar
        </button>
      </div>
    </div>
  );
};
