import React from "react";
import { Link } from "react-router-dom";
import { Empty } from "../components/CatalogUI";
export function NotFound() {
  return (
    <div className="container page">
      <Empty
        title="Essa descoberta mudou de endereço"
        text="Não encontramos a página solicitada. Explore o catálogo e encontre algo novo."
        action={
          <Link className="btn" to="/explorar">
            Voltar ao catálogo
          </Link>
        }
      />
    </div>
  );
}
