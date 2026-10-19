import React from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, Clock, Store } from "lucide-react";
import { Grid } from "../components/CatalogUI";
import { NotFound } from "./NotFound";
export function Shop({ products, stores, favorites }) {
  const { id } = useParams();
  const store = stores.find((s) => s.id === id);
  if (!store) return <NotFound />;
  return (
    <div className="container page">
      <div className="breadcrumb">
        <Link to="/lojas">Estabelecimentos</Link> / {store.name}
      </div>
      <div className="shop-cover" style={{ background: store.color }}>
        <span>{store.initials}</span>
        <div>
          FEITO COM IDENTIDADE.
          <br />
          <strong>Descubra {store.name}.</strong>
        </div>
        <Store size={100} strokeWidth={1} />
      </div>
      <div className="shop-info">
        <div>
          <span className="eyebrow">
            {store.category} · VITRINE DEMONSTRATIVA
          </span>
          <h1>{store.name}</h1>
          <p>{store.description}</p>
        </div>
        <div className="shop-facts">
          <p>
            <MapPin size={18} />
            {store.address}
          </p>
          <p>
            <Clock size={18} />
            {store.hours}
          </p>
          <small>Contato não informado no catálogo demonstrativo.</small>
        </div>
      </div>
      <div className="section-heading">
        <h2>Na vitrine</h2>
        <span>
          {products.filter((p) => p.storeId === id).length} produtos e serviços
        </span>
      </div>
      <Grid
        items={products.filter((p) => p.storeId === id)}
        stores={stores}
        favorites={favorites}
      />
    </div>
  );
}
