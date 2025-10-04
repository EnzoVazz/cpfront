import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import "./globals.css";

interface TipoUsuario{
  id: number;
  nome: string;
  nomeUsuario: string;
  email: string;
}

export default function App(){
  const [usuario, setUsuario] = useState<TipoUsuario | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLogado = sessionStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
      setUsuario(JSON.parse(usuarioLogado));
    }
  }, []);

    const handleLogout = () => {
    sessionStorage.removeItem('usuarioLogado');
    setUsuario(null);
    alert("Você foi desconectado.");
    navigate('/login');
  };

  return(
    <div className="bg-gray-900 text-gray-200 min-h-screen font-sans">
      <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Controle de acessos</h1>
        {usuario ?(
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-white">Bem-vindo, {usuario.nome}</p>
              <p className="text-sm text-gray-400">{usuario.email}</p>
            </div>
            <button onClick={handleLogout}>Sair</button>
          </div>
        ) : (
          <nav>
            <Link to="/login">Login</Link>
          </nav>
        )}
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}