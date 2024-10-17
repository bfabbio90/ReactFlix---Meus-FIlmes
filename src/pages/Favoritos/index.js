import { useState, useEffect } from "react";

import "./Favoritos.css";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

export default function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@primeflix");
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((item) => {
      return item.id !== id;
    });
    setFilmes(filtroFilmes);
    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
    toast.success("Filme removido com sucesso.");
  }

  return (
    <div className="meus-filmes">
      <h2>Filmes selecionados 🎞️</h2>

      {filmes.length === 0 && (
        <span>Você não possui nenhum filme salvo. 😕</span>
      )}

      <ul>
        {filmes.map((item) => {
          return (
            <li key={item.id}>
              <span>{`🎞️ ${item.title}   »   ${item.vote_average.toFixed(
                2,
                0
              )}`}</span>
              <div>
                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
