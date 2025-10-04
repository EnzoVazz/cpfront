import { Outlet } from "react-router-dom";

interface TipoUsuario{
  id: number;
  nome: string;
  nomeUsuario: string;
  email: string;
}

export default function App(){

  

  
  return(
    <div>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}