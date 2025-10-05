import { Link, useNavigate } from 'react-router-dom';
import type { TipoLogin } from '../../types/TipoLogin';
import { useForm } from 'react-hook-form';

export default function Login() {
  const { 
    register,
    handleSubmit, 
    formState: { errors },
    setError,
  } = useForm<TipoLogin>();
  const navigate = useNavigate();


  const onSubmit = async (data: TipoLogin) => {
    try {
      const response = await fetch(`http://localhost:3001/usuarios?nomeUsuario=${data.nomeUsuario}&email=${data.email}`);

      const users = await response.json();

      if (users.length > 0) {
        alert(`Login bem-sucedido! Bem-vindo, ${users[0].nome}`);
        sessionStorage.setItem('usuarioLogado', JSON.stringify(users[0]));
        navigate('/');
        
      } else {
        setError("root", { message: "Nome de usuário ou e-mail inválido." });
      }
    }catch (error) {
      alert("Não foi possível conectar ao servidor.");
    }
  };
     
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <div>
          <label htmlFor="nomeUsuario" className="block text-sm font-medium text-gray-300 mb-1">Nome de Usuário</label>
          <input
            id="nomeUsuario"
            {...register("nomeUsuario", { required: "O nome de usuário é obrigatório" })}
            placeholder="Seu nome de usuário"
            className="w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          {errors.nomeUsuario && <small className="text-red-400 mt-1 block">{errors.nomeUsuario.message}</small>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">E-mail</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "O e-mail é obrigatório",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Formato de e-mail inválido"
              }
            })}
            placeholder="voce@exemplo.com"
            className="w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          {errors.email && <small className="text-red-400 mt-1 block">{errors.email.message}</small>}
        </div>
        
        {errors.root && <small className="text-red-400 mt-1 block text-center">{errors.root.message}</small>}

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold"
        >
          Entrar
        </button>
      </form>
      <p className="text-center mt-6 text-sm">
        <Link to="/cadastro" className="text-blue-400 hover:underline">
          Não tem uma conta? Cadastre-se
        </Link>
      </p>
    </div>
  );
}