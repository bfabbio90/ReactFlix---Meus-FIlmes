import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import api from "../../services/api";

import "./Filme.css";

import { toast } from "react-toastify";

export default function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "90752caf55e8d913252bd92b9a03d9af",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Filme não encontrado");
          navigate("/", { replace: true });
          return;
        });
    }
    loadFilme();

    return () => {
      console.log("Componente foi desmontado.");
    };
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmesSalvos) => filmesSalvos.id === filme.id
    );

    if (hasFilme) {
      toast.warn("Este filme já está na lista.");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso.");
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="filme-info">
        <h1>{filme.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
          alt={filme.title}
        />
        <h3>Sinopse</h3>
        <span>{filme.overview}</span>
        <strong>Avaliação: {filme.vote_average} / 10 </strong>

        <div className="area-buttons">
          <button onClick={salvarFilme}>Salvar</button>

          <a
            target="blank"
            rel="external"
            href={`https://youtube.com/results?search_query=${filme.title}`}
          >
            Trailer
          </a>
        </div>
      </div>
    </div>
  );
}
