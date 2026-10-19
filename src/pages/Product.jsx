import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Heart, Check, Store } from "lucide-react";
import { money } from "../utils/catalog";
import Artwork from "../components/Artwork";
import { Grid } from "../components/CatalogUI";
import { NotFound } from "./NotFound";
export function Product({ products, stores, favorites }) {
  const { id } = useParams(),
    p = products.find((p) => p.id === id);
  if (!p) return <NotFound />;
  const store = stores.find((s) => s.id === p.storeId),
    liked = favorites.ids.includes(p.id);
  return (
    <div className="container page">
      <div className="breadcrumb">
        <Link to="/explorar">Explorar</Link> / {p.name}
      </div>
      <div className="detail-grid">
        <div className={`detail-image art-${p.art}`}>
          <Artwork type={p.art} />
        </div>
        <div className="detail-copy">
          <Link className="eyebrow" to={`/loja/${store.id}`}>
            {store.name} <ArrowUpRight size={15} />
          </Link>
          <h1>{p.name}</h1>
          <span className="detail-category">{p.category}</span>
          <strong className="detail-price">{money(p.price)}</strong>
          <span className={p.available ? "stock" : "unavailable"}>
            {p.available ? <Check size={16} /> : null}
            {p.available
              ? "Disponível no catálogo"
              : "Indisponível no catálogo"}
          </span>
          <p>{p.description}</p>
          <button
            className={`btn ${liked ? "saved" : ""}`}
            onClick={() => favorites.toggle(p.id)}
            aria-pressed={liked}
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
            {liked ? "Salvo nos favoritos" : "Adicionar aos favoritos"}
          </button>
          <Link className="btn outline" to={`/loja/${store.id}`}>
            <Store size={18} />
            Visitar vitrine da loja <ArrowRight size={18} />
          </Link>
          <div className="detail-note">
            Demonstração acadêmica. Sem compra, reserva ou contato ativo. Preços
            e disponibilidade são fictícios.
          </div>
        </div>
      </div>
      <section className="section">
        <div className="section-heading">
          <h2>Continue descobrindo</h2>
          <Link className="text-link" to="/explorar">
            Explorar catálogo <ArrowRight size={16} />
          </Link>
        </div>
        <Grid
          items={products.filter((item) => item.id !== id).slice(0, 4)}
          stores={stores}
          favorites={favorites}
        />
      </section>
    </div>
  );
}
