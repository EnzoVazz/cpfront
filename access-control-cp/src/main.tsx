import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Erro from './routes/Erro/index.tsx';
import Login from './routes/Login/index.tsx';
import Cadastro from './routes/Cadastro/index.tsx';
import Home from './routes/Home/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>, 
    errorElement:<Erro/>,
    children:[
      {
        path:"/",
        element:<Login/>,
      },
      {
        path:"/login",
        element:<Login/>,
      },
      {
        path:"/cadastro",
        element:<Cadastro/>
      },
      {
        path:"/home",
        element:<Home/>
      }
    ],
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)