
import axios from "axios";

const API_KEY = "";

export const gerarResumo = async (titulo) => {
  try {
    const resposta = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        temperature: 0.4,
        max_tokens: 100,
        messages: [
          {
            role: "user",
            content: `Faça um resumo curto, simples e sem spoilers do jogo: ${titulo}, Responda em português do Brasil. não utilize markdown`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return resposta.data.choices?.[0]?.message?.content || "";
  } catch (erro) {
    console.error(erro);
    return "Erro ao gerar resumo.";
  }
};


//  Descrição:
// ${descricao}