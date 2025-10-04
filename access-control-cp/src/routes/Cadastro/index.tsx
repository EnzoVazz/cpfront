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