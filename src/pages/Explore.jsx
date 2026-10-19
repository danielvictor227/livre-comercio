import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import { categories } from "../data/catalog";
import { filterProducts, money } from "../utils/catalog";
import { Grid, Empty } from "../components/CatalogUI";
export function Explore({ products, stores, favorites }) {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "",
    category = params.get("categoria") || "Todos",
    max = params.get("max") || 200,
    available = params.get("disponivel") === "1",
    sort = params.get("ordem") || "featured";
  function update(key, value) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        value ? next.set(key, value) : next.delete(key);
        return next;
      },
      { replace: true },
    );
  }
  const result = filterProducts(products, {
    query,
    category,
    max,
    available,
    sort,
  });
  return (
    <div className="container page">
      <div className="breadcrumb">
        <Link to="/">Início</Link> / Explorar
      </div>
      <div className="page-heading">
        <span className="eyebrow">SEU BAIRRO TEM MUITO A OFERECER</span>
        <h1>Encontre seu próximo achado.</h1>
        <p>Produtos e serviços locais, reunidos em um só lugar.</p>
      </div>
      <div className="explore-search">
        <Search size={20} />
        <input
          aria-label="Pesquisar no catálogo"
          placeholder="Busque por nome ou palavra-chave…"
          value={query}
          onChange={(e) => update("q", e.target.value)}
        />
      </div>
      <div className="explore-layout">
        <aside className="filters">
          <h3>
            <SlidersHorizontal size={18} /> Filtrar descoberta
          </h3>
          <fieldset>
            <legend>Categorias</legend>
            {categories.map((c) => (
              <label key={c}>
                <input
                  type="radio"
                  name="category"
                  checked={category === c}
                  onChange={() => update("categoria", c)}
                />
                {c}
              </label>
            ))}
          </fieldset>
          <label className="range-label" htmlFor="price">
            Preço até <strong>{money(Number(max))}</strong>
          </label>
          <input
            id="price"
            type="range"
            min="0"
            max="200"
            step="1"
            value={max}
            onChange={(e) => update("max", e.target.value)}
          />
          <label className="check-label">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) =>
                update("disponivel", e.target.checked ? "1" : "")
              }
            />{" "}
            Somente disponíveis
          </label>
          <button className="reset" onClick={() => setParams({})}>
            <RotateCcw size={15} />
            Limpar filtros
          </button>
        </aside>
        <div>
          <div className="results-bar">
            <span>
              <strong>{result.length}</strong> resultados encontrados
            </span>
            <label>
              Ordenar:{" "}
              <select
                aria-label="Ordenar resultados"
                value={sort}
                onChange={(e) => update("ordem", e.target.value)}
              >
                <option value="featured">Destaques</option>
                <option value="low">Menor preço</option>
                <option value="high">Maior preço</option>
                <option value="name">Nome: A a Z</option>
              </select>
            </label>
          </div>
          {result.length ? (
            <Grid items={result} stores={stores} favorites={favorites} />
          ) : (
            <Empty
              title="Nenhum achado por aqui"
              text="Experimente outra busca ou ajuste os filtros."
              action={
                <button className="btn" onClick={() => setParams({})}>
                  Limpar busca e filtros
                </button>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
