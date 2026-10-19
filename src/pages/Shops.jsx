import React from "react";
import { StoreCard } from "../components/CatalogUI";
export function Shops({ stores }) {
  return <div className="container page">
    <div className="page-heading">
      <span className="eyebrow">CONEXÕES QUE COMEÇAM PERTO</span>
      <h1>Conheça os negócios locais.</h1>
      <p>Vitrines com personalidade e gente que faz acontecer.</p>
    </div>
    <div className="store-grid">{stores.map(s => <StoreCard key={s.id} store={s} />)}</div>
  </div>;
}
