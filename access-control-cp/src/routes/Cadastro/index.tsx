import { Link } from 'react-router-dom';

export default function Cadastro() {
  return (
    <div>
      <h1>Página de Cadastro</h1>
       <Link to="/login">Já tem uma conta? Faça o login</Link>
    </div>
  );
}