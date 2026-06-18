
import "./login.css";
import Botao from "../../components/botao/Botao.jsx";
import Logo from "../../assets/img/logo.png";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsuarioContext } from "../../components/context/UsuarioContext.jsx";
import api from "../../services/services.js";
import {Alerta} from "../../components/alerta/Alerta.jsx";
import { jwtDecode } from "jwt-decode";

const Login = () => {

    const { setUsuario } = useContext(UsuarioContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const login = async () => {
    

        if (email.trim().length === 0 || senha.trim().length === 0) {
            Alerta({
                title: "Login",
                text: "Preencha todos os campos",
                icon: "warning",
                confirmButtonText: "OK"
            })
            return;

        }

        const dadosLogin = {
            email: email,
            senha: senha
        }

        try {
            const retornoAPI = await api.post("/Login", dadosLogin)
            // console.log(retornoAPI.data);
            const token = await retornoAPI.data.token;
            const usuarioDecode = jwtDecode(token);
            setUsuario(usuarioDecode);
            localStorage.setItem("usuario", JSON.stringify(usuarioDecode));
            setEmail("");
            setSenha("");

            navigate("/jogos");

        } catch (error) {
            Alerta({
                title: "Login",
                text: "Usuario nao encontrado " + error,
                icon: "error",
                confirmButtonText: "OK"
            })
        }
    };

    const verificaLogin = () => {
        const logado = JSON.parse(localStorage.getItem("usuario"));

        if (logado != undefined || logado != null) {
            setUsuario(logado);
            navigate("/");
        }
    };

    useEffect(() => {
        verificaLogin();
    }, [])

    return (
        <main className="main_login">
            <div className="banner"></div>

            <section className="section_login">
                <img src= {Logo} alt="Logo do BITE ARCADE" />

                <form className="form_login" onSubmit={login}>

                    <div className="campos_login">

                        <div className="campo_input">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="campo_input">
                            <label htmlFor="senha">Senha:</label>
                            <input
                                type="password"
                                name="senha"
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>

                    </div>

                    <Botao nomeDoBotao="Entrar" btnLogin={true} fnLogin={login} />
                </form>

            </section>
        </main>
    );
};

export default Login;