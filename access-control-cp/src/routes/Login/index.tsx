import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div>
      <h1>Página de Login</h1>
      <Link to="/cadastro">Não tem uma conta? Cadastre-se</Link>
    </div>
  );
}