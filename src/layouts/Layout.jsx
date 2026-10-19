import React from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Heart, MapPin, ArrowUpRight, Store } from "lucide-react";
import { useEffect } from "react";
export default function Layout({ favorites }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main").focus();
        }}
        className="skip"
      >
        Ir para o conteúdo
      </a>
      <div className="announcement">
        Grandes descobertas começam perto.{" "}
        <span>Valorize o comércio local.</span>
      </div>
      <header>
        <div className="container header-inner">
          <Link className="brand" to="/">
            <span className="brand-icon">
              <Store size={23} />
            </span>
            <span>
              livre<span className="brand-light">comércio</span>
              <small>O MELHOR DA SUA REGIÃO</small>
            </span>
          </Link>
          <nav aria-label="Principal">
            <NavLink to="/" end>
              Início
            </NavLink>
            <NavLink to="/explorar">Explorar</NavLink>
            <NavLink to="/lojas">Estabelecimentos</NavLink>
          </nav>
          <div className="header-actions">
            <span className="location">
              <MapPin size={16} /> Região demonstrativa
            </span>
            <NavLink
              to="/favoritos"
              className="favorite-link"
              aria-label={`Favoritos, ${favorites.ids.length} itens`}
            >
              <Heart size={20} />
              <span>{favorites.ids.length}</span>
            </NavLink>
          </div>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer>
        <div className="container footer-top">
          <Link className="brand" to="/">
            livre<span className="brand-light">comércio</span>
          </Link>
          <p>
            Conexões locais.
            <br />
            Novas possibilidades.
          </p>
          <div>
            <Link to="/explorar">
              Explore o catálogo <ArrowUpRight size={16} />
            </Link>
            <Link to="/lojas">
              Conheça os negócios <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} Livre Comércio · Projeto Integrador —
            Fase 02
          </span>
          <span>Ambiente demonstrativo · Dados e negócios fictícios</span>
        </div>
      </footer>
      {favorites.error && (
        <div role="status" className="toast">
          {favorites.error}
        </div>
      )}
    </>
  );
}
