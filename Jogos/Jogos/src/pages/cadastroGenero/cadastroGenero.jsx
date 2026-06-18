import "./CadastroGenero.css"
import Header from "../../components/header/Header" 
import Footer from "../../components/footer/Footer"
import Cadastro from "../../components/cadastro/Cadastro"
import {useEffect, useState} from "react"
import api from "../../Services/services"
import Lista from "../../components/lista/Lista"
//bibliotrcas de alertas
import Swal from "sweetalert2"
import { Alerta } from "../../components/alerta/Alerta"





const CadastroGenero = () => {

const [valor, setValor] = useState("")
const [idEditar, setIdEditar] = useState(0)

const [editar, setEditar] = useState(false);
const [listaGeneros, setListaGeneros] = useState([])

const cadastrarGenero = async (e) => {

    e.preventDefault();
    if(valor.trim().length == 0)
    {  
        Alerta({
            title : "Cadastro De Gênero",
            text : "Gênero deve ser preenchido antes de cadastrar!",
            icon :"warning",
            confirmButtonText: "Ok",
        });
        
        
        // alert("Gênero deve ser preenchido antes de cadastrar")
        return false
    }

    const objetoCadastro = {
        nome : valor
    }

    try {
     const retornoAPI = await api.post("/Genero", objetoCadastro)

     if (retornoAPI.status == 201) {

        Alerta({
            title : "Cadastro De Gênero",
            text : `Gênero(${objetoCadastro.nome}) cadastrado com sucesso`,
            icon : "success",
            confirmButtonText: "OK"
        });
        
        limparFormulario();
        getGeneros();
     }else{
         Alerta({
            title: "Cadastro De Gênero",
            text:`Erro na chamada da API`,
            icon:"error",
            confirmButtonText: "OK"
        })
        // alert("Houve algum problema ao cadastrar!")
     }


    } catch (error) {
        Alerta(
        {
            title: "Cadastro De Gênero",
            text:`Erro na chamada da API`,
            icon:"error",
            confirmButtonText: "OK"
        })
        
    }
    
}

const limparFormulario = () => {
    setValor("");
    setEditar(false)
    setIdEditar(0)
}

const preEditar = (item) => {
    
    setIdEditar(item.idGenero)
    setValor(item.nome)
    setEditar(true)
    console.log(item)
}
const editarGenero = async (e) => {
    e.preventDefault()
    // alert(`Agora sim, bora editar: ${valor} | Id: ${idEditar}`)
    const objEditar ={
        nome : valor
    }
    try {
        const retornoAPI = await api.put(`/Genero/${idEditar}`, objEditar)
        console.log(retornoAPI)
        if (retornoAPI.status == 204) {

             Alerta({
            title: "Cadastro De Gênero",
            text:`Genero (${objEditar.nome}) Gênero Alterado com sucesso`,
            icon:"success",
            confirmButtonText: "OK"
        })
            limparFormulario();
            getGeneros()
        }else{
            Alerta(
        {
            title: "Cadastro De Gênero",
            text:`Algum Problema aconteceu ao editar`,
            icon:"error",
            confirmButtonText: "OK"

            
        })
            
        }
    } catch (error) {
            Alerta(
        {
            title: "Cadastro De Gênero",
            text:`Erro ao chamar a API`,
            icon:"error",
            confirmButtonText: "OK"
        })
    }
}


const excluirGenero = async (item) => {
    let confirmaExclusao = false

    const result = await Alerta({
    title: "Cadastro de Gênero",
    text: `Deseja realmente apagar o gênero ${item.nome}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar Exclusão",
    cancelButtonText: "Cancelar",
})

if (!result.isConfirmed) {
    return false
}

//    if (!confirm(`Deseja realmente apagar o gênero(${item.nome})`)) {
//     return false
//    }    
    try {
        const retornoAPI = await api.delete(`/Genero/${item.idGenero}`)

        if (retornoAPI.status == 204 || retornoAPI.status == 200 ) {
            
            limparFormulario();
            getGeneros()
            console.log(retornoAPI)
        }
    } catch (error) {} 
}



useEffect( () => {
    getGeneros();
}, [])

const getGeneros = async  () => {
    
    try {
        const retornoAPI = await api.get("/Genero")
        const dados = retornoAPI.data
         const generosOrdenados = dados.sort((a, b) =>
            a.nome.localeCompare(b.nome)
        )
        setListaGeneros(generosOrdenados)
    } catch (error) {   
        alert("Erro ao buscar gêneros: " + error)
    }
    
}

    return (

        <><Header /> 
        
        <main>
            <Cadastro 
            tituloCadastro="Cadastro de Genero"
            visibilidade="none"
            placeholder= "gênero"
            valor={valor}
            //função que muda o state
            cancelarEdicao={limparFormulario}
            setValor={setValor}
            funcCadastro={editar ? editarGenero : cadastrarGenero}
            btnEditar={editar}
            

            />

             <Lista
                    tituloLista="Lista de Gêneros"
                    visibilidade="none"

                    //Chama o método para validar:
                    lista={listaGeneros}
                    //Identifica o tipo de lista:
                    tipoLista="genero"
                    funcExcluir = {excluirGenero}
                    funcEditar = {preEditar}
                    
                />
        </main>
         <Footer /></>

    )
}

export default CadastroGenero