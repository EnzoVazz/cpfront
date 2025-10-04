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
    <div>
      <h1>Página de Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <input
            {...register("nomeUsuario", { required: "O nome de usuário é obrigatório" })}
            placeholder="Nome de Usuário"
          />
          {errors.nomeUsuario && <small>{errors.nomeUsuario.message}</small>}
        </div>
        <div>
          <input
            type="email"
            {...register("email", { 
                required: "O e-mail é obrigatório",
                pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Formato de e-mail inválido"
                }
            })}
            placeholder="E-mail"
          />
          {errors.email && <small>{errors.email.message}</small>}
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p>
        <Link to="/cadastro">Não tem uma conta? Cadastre-se</Link>
      </p>
    </div>
  );
}