import "./Lista.css";

// Importação de imagens:
import Editar from "../../assets/img/edit.png";
import Excluir from "../../assets/img/trash.png";
import faltadecartaz from "../../assets/imagem-preta.webp"
import Visualizar from "../../assets/img/mdi_eye.png";

import {apiPort} from "../../services/services"

const Lista = (props) => {
    return (
        <section className="layout_grid">
            <div className="listagem">

                <h1>{props.tituloLista}</h1>
                <hr />
                <div className="tabela">
                    <table>
                        {/* cabeçalho da tabela: */}
                        <thead>
                            {/* tr => table row */}
                            <tr className="table_cabecalho">
                                {/* th => table head */}
                                <th style={{ display: props.visibilidade }}>Imagem</th>
                                <th>Nome</th>
                                <th style={{ display: props.visibilidade }}>Gênero</th>
                                <th>Editar</th>

                                {props.fnResumo && <th>Resumo</th>}

                                <th>Excluir</th>
                            </tr>
                        </thead>
                        {/* tbody => corpo da tabela */}
                        <tbody>
                            {/* Verifica se a lista existe e tem itens */}
                            {props.lista && props.lista.length > 0 ? (
                                // Se houver itens, faz um map (laço) para renderizar cada item da lista
                                props.lista.map((item) => (
                                    <tr className="item_lista" key={props.tipoLista === "filme" ? item.idFilme : item.idGenero}>
                                        {/* {console.log(index)} */}
                                        {/* {console.log(item.idGenero)} */}
                                        <td data-cell="Imagem" style={{ display: props.visibilidade }}>
                                            {/* Primeira célula da linha: mostra o nome (se for gênero) ou título (se for filme) */}
                                            {/* titulo == filme */}
                                            {/* {props.tipoLista === "genero" ? item.nome : item.titulo} */}
                                            <img className="img_cartaz" src={(`https://localhost:${apiPort}/imagens/${item.imagem}` == `https://localhost:${apiPort}/imagens/` || `https://localhost:${apiPort}/imagens/${item.imagem}` == `https://localhost:${apiPort}/imagens/null` || `https://localhost:${apiPort}/imagens/${item.imagem}` == `https://localhost:${apiPort}/imagens/undefined`) ? faltadecartaz : `https://localhost:${apiPort}/imagens/${item.imagem}` } alt="" />
                                        </td>
                                        <td data-cell="Nome">
                                            {/* Primeira célula da linha: mostra o nome (se for gênero) ou título (se for filme) */}
                                            {/* titulo == filme */}
                                            {props.tipoLista === "genero" ? item.nome : item.titulo}
                                        </td>
                                        <td data-cell="Gênero" style={{ display: props.visibilidade }}>
                                            {/* Segunda célula: mostra o nome do gênero caso o tipo da lista seja "filme".*/}
                                            {/* adicionar essa linha depois de fazer o metd de lista filme: */}
                                            {props.tipoLista === "filme" ? (item.idGeneroNavigation?.nome || '-') : '-'}
                                        </td>
                                        <td data-cell="Editar">
                                            <button className="icon" onClick={() => (props.funcEditar(item))}>
                                                <img src={Editar} alt="Caneta" />
                                            </button>
                                        </td>

                                        {/* vizualizar resumo */}
                                        {props.fnResumo && (
                                            <td data-cell="Vizualizar">
                                                <button className="icon" onClick={() => (props.fnResumo(item))}>
                                                    <img src={Visualizar} alt="Olho" />
                                                </button>
                                            </td>
                                        )}
                                        <td data-cell="Excluir">
                                            <button className="icon" onClick={() => props.funcExcluir(item)}>
                                                <img src={Excluir} alt="Lixeira" />
                                            </button>
                                        </td>
                                    </tr>
                                )) 
                            ) : (
                                    // Caso a lista esteja vazia ou não exista, mostra uma linha dizendo que não há registros
                                    <tr>
                                        <td>Nenhum registro encontrado.</td>
                                    </tr>
                                )
                            }
                                
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default Lista;