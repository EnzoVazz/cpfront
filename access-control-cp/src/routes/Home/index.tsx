import { useEffect, useState } from 'react';

interface TipoUsuario {
  id: number;
  nome: string;
  nomeUsuario: string;
  email: string;
}

export default function Home() {
  const [usuario, setUsuario] = useState<TipoUsuario | null>(null);

  useEffect(() => {
    const usuarioLogado = sessionStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
      setUsuario(JSON.parse(usuarioLogado));
    }
  }, []);

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-md text-center">
      {usuario ? (
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Login bem-sucedido!</h1>
          <p className="text-xl text-gray-300">
            Bem-vindo, <span className="font-semibold text-blue-400">{usuario.nome}</span>!
          </p>
        </div>
      ) : (
        <h1 className="text-2xl font-bold text-gray-400">Faça login para acessar essa página</h1>
      )}
    </div>
  );
}