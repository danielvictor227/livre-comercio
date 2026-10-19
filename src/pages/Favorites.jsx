import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Grid, Empty } from "../components/CatalogUI";
export function Favorites({ products, stores, favorites }) {
  const items = products.filter((p) => favorites.ids.includes(p.id));
  return (
    <div className="container page">
      <div className="page-heading">
        <span className="eyebrow">SUAS MELHORES DESCOBERTAS</span>
        <h1>Guardados com carinho.</h1>
        <p>
          {items.length} favoritos · Salvos neste navegador, para encontrar de
          novo.
        </p>
      </div>
      {items.length ? (
        <Grid items={items} stores={stores} favorites={favorites} />
      ) : (
        <Empty
          title="Sua coleção começa com um achado"
          text="Toque no coração de um produto para guardá-lo aqui."
          action={
            <Link className="btn" to="/explorar">
              Explorar produtos <ArrowRight size={18} />
            </Link>
          }
        />
      )}
    </div>
  );
}
