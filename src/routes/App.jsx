import React from "react";
import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { catalogService } from "../services/catalogService";
import { useFavorites } from "../hooks/useFavorites";
import Layout from "../layouts/Layout";
import {
  Home,
  Explore,
  Shops,
  Shop,
  Product,
  Favorites,
  NotFound,
} from "../pages/Pages";
export default function App() {
  const favorites = useFavorites();
  const [catalog, setCatalog] = useState(null),
    [error, setError] = useState(false);
  useEffect(() => {
    catalogService
      .getCatalog()
      .then(setCatalog)
      .catch(() => setError(true));
  }, []);
  if (error)
    return (
      <div className="empty">
        <h1>Não foi possível carregar o catálogo.</h1>
        <button className="btn" onClick={() => window.location.reload()}>
          Tentar novamente
        </button>
      </div>
    );
  if (!catalog)
    return (
      <div
        className="container skeleton"
        aria-busy="true"
        aria-label="Carregando catálogo"
      >
        <div />
        <div />
        <div />
      </div>
    );
  const props = { ...catalog, favorites };
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout favorites={favorites} />}>
          <Route index element={<Home {...props} />} />
          <Route path="explorar" element={<Explore {...props} />} />
          <Route path="lojas" element={<Shops {...props} />} />
          <Route path="loja/:id" element={<Shop {...props} />} />
          <Route path="produto/:id" element={<Product {...props} />} />
          <Route path="favoritos" element={<Favorites {...props} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
