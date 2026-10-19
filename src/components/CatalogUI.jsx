import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import ProductCard from "./ProductCard";
export function SearchBox({ initial = "" }) {
  const [query, setQuery] = useState(initial);
  return (
    <form
      className="search-box"
      action="/"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.hash = `/explorar?q=${encodeURIComponent(query)}`;
      }}
    >
      <Search size={22} />
      <input
        aria-label="Buscar produtos e serviços"
        placeholder="O que você quer encontrar por perto?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn" type="submit">
        Buscar <ArrowRight size={17} />
      </button>
    </form>
  );
}
export function StoreCard({ store: s }) {
  return (
    <Link to={`/loja/${s.id}`} className="store-card">
      <div className="store-monogram" style={{ background: s.color }}>
        {s.initials}
        <span>LOCAL</span>
      </div>
      <div>
        <small>{s.category}</small>
        <h3>{s.name}</h3>
        <p>
          <MapPin size={13} />
          {s.address.split("·")[1]}
        </p>
      </div>
      <ArrowUpRight className="store-arrow" size={20} />
    </Link>
  );
}
export function Grid({ items, stores, favorites }) {
  return (
    <div className="product-grid">
      {items.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          stores={stores}
          favorites={favorites}
        />
      ))}
    </div>
  );
}
export function Empty({ title, text, action }) {
  return (
    <div className="empty">
      <Search size={35} strokeWidth={1} />
      <h2>{title}</h2>
      <p>{text}</p>
      {action}
    </div>
  );
}
