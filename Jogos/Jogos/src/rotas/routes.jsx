import { BrowserRouter, Route, Routes } from "react-router-dom"
import CadastroGenero from "../pages/cadastroGenero/cadastroGenero"
import Login from "../pages/login/login.jsx"
import CadastroJogo from "../pages/cadastroJogo/cadastroJogo.jsx"
import PrivateRoute from "./PrivateRoute.jsx"

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element=
                {
                    <Login/>
            }
                 path="/"/> 

                <Route element=
                
                {
                    <PrivateRoute>

                        <CadastroJogo/>
                    </PrivateRoute>
            } 
                path="/jogos"/> 

                <Route element=

                {
                <PrivateRoute>

                    <CadastroGenero/>
                </PrivateRoute> 
            }
                 path="/Generos"/> 

            </Routes>
        </BrowserRouter>
    )
}

export default Rotas