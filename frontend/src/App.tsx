import "./index.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import ArchivedNotes from "./pages/ArchivedNotes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoutes";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto py-3 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route path="/notes" element={<Notes />} />
              <Route path="/archived-notes" element={<ArchivedNotes />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white py-3">
          <p className="text-center text-sm flex flex-col items-center">
            <span className="mb-1 flex items-center">
              {new Date().getFullYear()} Gestor de Notas
            </span>

            <span>
              Happy New Year. Hecho con <span className="text-red-500">♥</span>{" "}
              por{" "}
              <a
                href="https://www.linkedin.com/in/evaristo-aguirre"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Evaristo Aguirre
              </a>
            </span>
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
