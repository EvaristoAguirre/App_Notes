import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Bienvenido a la App de Notas</h1>
      <div className="space-x-4">
        <Link to="/login">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Iniciar Sesión
          </button>
        </Link>
        <Link to="/register">
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Registrarse
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
