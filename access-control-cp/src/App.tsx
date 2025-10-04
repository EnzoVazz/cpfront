import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";

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
    <div>
      <header>
        <h1>Controle de acessos</h1>
        {usuario ?(
          <div>
            <div>
              <p>Bem-vindo, {usuario.nome}</p>
              <p>{usuario.email}</p>
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