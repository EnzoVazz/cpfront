import { Link } from 'react-router-dom';
import type { TipoLogin } from '../../types/TipoLogin';
import { useForm } from 'react-hook-form';

export default function Login() {
  const { 
    register,
    handleSubmit, 
    formState: { errors },
  } = useForm<TipoLogin>();

  const onSubmit = (data: TipoLogin) => {
     
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