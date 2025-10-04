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

      <p>
       <Link to="/login">Já tem uma conta? Faça o login</Link>
      </p>
    </div>
  );
}