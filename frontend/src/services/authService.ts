const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Error al registrarse. Intenta nuevamente.");
  }

  return response.json();
};

export const loginUser = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Usuario o contraseña incorrectos.");
  }

  return response.json();
};
