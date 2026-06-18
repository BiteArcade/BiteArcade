import "./header.css";
import Logo from "../../assets/img/logo.png"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UsuarioContext } from "../context/UsuarioContext";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const { setUsuario } = useContext(UsuarioContext);
    const navigate = useNavigate();

    const realizarLogout = () => {
        localStorage.setItem("usuario", null);

        setUsuario(null);

        navigate("/");
    };


    return (
        <header>
            <div className="layout_grid cabecalho">
                {/* Ao clicar no link, redireciona para a tela login */}
                <Link to="/">
                    <img src={Logo} alt="Logo do Filmoteca" />
                </Link>

                <nav className="nav_header">
                    <Link className="link_header" to="/Jogos">Jogos</Link>
                    <Link className="link_header" to="/Generos">Gêneros</Link>
               
                <button className="btn_logout"
                onClick ={() => realizarLogout()}>
                Sair
                </button>
                
                </nav>
            </div>
            
        </header>
    )
}

export default Header;