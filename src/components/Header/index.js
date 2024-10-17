import "./Header.css";
import { Link } from "react-router-dom";

export default function index() {
  return (
    <header>
      <Link className="logo" to="/">
        ReactFlix 🎬
      </Link>
      <Link className="favorito" to="favoritos">
        Meus filmes 🎞️
      </Link>
    </header>
  );
}
