import "./Botao.css"

const Botao = (props) => {
    return(

        <button className="botao" 
        type={props.btnEditar  || props.btnLogin ? "button" : "submit"}
        onClick={()=>{
            if (props.btnEditar) {
                props.cancelarEdicao()
                return false 
            }else if (props.btnLogin) {
                props.fnLogin()
                return false
            }else {
                null
            }
        }

        }
        >{props.nomeDoBotao}</button>

    )
}

export default Botao;