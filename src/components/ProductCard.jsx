import React from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowUpRight } from "lucide-react";
import Artwork from "./Artwork";
import { money } from "../utils/catalog";
export default function ProductCard({ product: p, stores, favorites }) {
  const store = stores.find((s) => s.id === p.storeId);
  const liked = favorites.ids.includes(p.id);
  return (
    <article className="product-card">
      <div className={`product-image art-${p.art}`}>
        <Link to={`/produto/${p.id}`} aria-label={`Ver ${p.name}`}>
          <Artwork type={p.art} />
        </Link>
        {p.tag && <span className="tag">{p.tag}</span>}
        <button
          className={`heart ${liked ? "active" : ""}`}
          onClick={() => favorites.toggle(p.id)}
          aria-label={`${liked ? "Remover dos" : "Adicionar aos"} favoritos: ${p.name}`}
          aria-pressed={liked}
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="product-meta">
        <span>{store?.name}</span>
        <span className={p.available ? "stock" : "unavailable"}>
          {p.available ? "Disponível" : "Indisponível"}
        </span>
      </div>
      <Link className="product-title" to={`/produto/${p.id}`}>
        {p.name}
      </Link>
      <div className="price-row">
        <strong>{money(p.price)}</strong>
        <Link to={`/produto/${p.id}`} aria-label={`Detalhes de ${p.name}`}>
          <ArrowUpRight size={19} />
        </Link>
      </div>
    </article>
  );
}
