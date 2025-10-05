import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import type { TipoCadastro } from '../../types/TipoCadastro';

export default function Cadastro() {
  const{
    register,
    handleSubmit,
    formState:{ errors },
    setError,
  } = useForm<TipoCadastro>();
  const navigate = useNavigate(); 

  const onSubmit = async (data: TipoCadastro) => {
    try{
      const respostaEmail = await fetch(`http://localhost:3001/usuarios?email=${data.email}`);
      const emailData = await respostaEmail.json();
      if (emailData.length > 0) {
        setError("email", { type: "manual", message: "Este e-mail já está em uso." });
        return;
      }
      const respostaUsuario = await fetch(`http://localhost:3001/usuarios?nomeUsuario=${data.nomeUsuario}`);
      const userData = await respostaUsuario.json();
      if (userData.length > 0) {
        setError("nomeUsuario", { type: "manual", message: "Este nome de usuário já está em uso." });
        return;
      }
      const response = await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        navigate('/login'); 
      } else {
        alert("Ocorreu um erro no cadastro.");
      }
    } catch (error) {
      alert("Não foi possível conectar ao servidor.");
    }
  };
    

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">Crie sua Conta</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-1">Nome Completo</label>
          <input 
            id="nome"
            {...register("nome", { required: "O nome é obrigatório" })} 
            placeholder="Seu nome completo" 
            className="w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          {errors.nome && <small className="text-red-400 mt-1 block">{errors.nome.message}</small>}
        </div>
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
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Formato de e-mail inválido"
              }
            })}
            placeholder="voce@exemplo.com"
            className="w-full px-3 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          {errors.email && <small className="text-red-400 mt-1 block">{errors.email.message}</small>}
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition font-semibold"
        >
          Cadastrar
        </button>
      </form>
      <p className="text-center mt-6 text-sm">
        <Link to="/login" className="text-blue-400 hover:underline">
          Já tem uma conta? Faça o login
        </Link>
      </p>
    </div>
  );
}