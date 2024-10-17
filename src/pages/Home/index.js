import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./Home.css";

// URL DA API: /movie/now_playing?api_key=cb9758b2831246c2b6d22e8529f9cc1b&language=pt-BR

export default function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "Sua API",
          language: "pt-BR",
          page: 1,
        },
      });

      //console.log(response.data.result.slice(0, 15));
      setFilmes(response.data.results.slice(0, 40));
      setLoading(false);
    }

    loadFilmes();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h1>Carregando filmes...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme}>
              <strong>{`🎞️ ${filme.title} | 📉 ${filme.vote_average.toFixed(
                2,
                0
              )}`}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt={filme.title}
              ></img>
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
