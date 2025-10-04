import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import type { TipoCadastro } from '../../types/TipoCadastro';

export default function Cadastro() {
  const{
    register,
    handleSubmit,
    formState:{ errors },
  } = useForm<TipoCadastro>();

  const onSubmit = (data: TipoCadastro) => {
    
  };

  return (
    <div>
      <h1>Página de Cadastro</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
                <input {...register("nome", { required: "O nome é obrigatório" })} placeholder="Nome Completo" />
                {errors.nome && <small>{errors.nome.message}</small>}
            </div>
            <div>
                <input {...register("nomeUsuario", { required: "O nome de usuário é obrigatório" })} placeholder="Nome de Usuário" />
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
            <button type="submit">Cadastrar</button>
      </form>
      <p>
       <Link to="/login">Já tem uma conta? Faça o login</Link>
      </p>
    </div>
  );
}