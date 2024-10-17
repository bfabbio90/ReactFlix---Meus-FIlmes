import axios from "axios";

// Base da API: https://api.themoviedb.org/3/
// URL DA API: /movie/now_playing?api_key=90752caf55e8d913252bd92b9a03d9af&language=pt-BR

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default api;
