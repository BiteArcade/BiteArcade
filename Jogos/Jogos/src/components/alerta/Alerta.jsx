import "./Alerta.css"
import Swal from "sweetalert2"
export const Alerta = 
({
        title,
        text,
        icon,
        showCancelButton = null,
        confirmButtonText = null,
        cancelButtonText = null,
        confirmButtonColor = "#3085d6",
        cancelButtonColor = "#d33",
    
    }) => {

    return Swal.fire(
        {
            title: title,
            text:text,
            icon:icon,
            showCancelButton: showCancelButton,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            confirmButtonColor,
            cancelButtonColor
        })
}

//----------------Versão Normal---------------------

//  Swal.fire(
//         {
//             title: "Cadastro De Gênero",
//             text:`Erro na chamada da API`,
//             icon:"error",
//         })




//--------------Versão dois botoes------------------

// const result = await Swal.fire({
//     title: "Cadastro de Gênero",
//     text: `Deseja realmente apagar o gênero ${item.nome}`,
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Confirmar Exclusão",
//     cancelButtonText: "Cancelar",
// })

// if (!result.isConfirmed) {
//     return false
// }