import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Leaf,
  ArrowUpRight,
  ArrowRight,
  Store,
  Coffee,
  Armchair,
  Shirt,
  Wrench,
} from "lucide-react";
import { categories } from "../data/catalog";
import Artwork from "../components/Artwork";
import { SearchBox, Grid, StoreCard } from "../components/CatalogUI";
const icons = [Store, Coffee, Armchair, Shirt, Leaf, Wrench];
export function Home({ products, stores, favorites }) {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span /> FEITO AQUI. ESCOLHIDO POR VOCÊ.
            </div>
            <h1>
              Seu próximo achado
              <br />
              está <em>bem perto.</em>
            </h1>
            <p>
              Descubra produtos, serviços e histórias dos pequenos negócios que
              dão vida à sua região.
            </p>
            <SearchBox />
            <div className="hero-proof">
              <span className="avatar-stack">
                <b>CG</b>
                <b>AR</b>
                <b>LL</b>
              </span>
              <span>
                Pequenos negócios.
                <br />
                <strong>Grandes descobertas.</strong>
              </span>
              <span className="local-stamp">
                <MapPin size={15} /> Compre de quem está perto
              </span>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-orbit" />
            <div className="hero-art-label">
              A CURADORIA É LOCAL.
              <br />
              <strong>A descoberta é sua.</strong>
            </div>
            <Artwork type="vase" className="hero-vase" />
            <Artwork type="coffee" className="hero-coffee" />
            <div className="floating-card">
              <span className="floating-icon">
                <Leaf size={20} />
              </span>
              <div>
                De perto, faz mais sentido.
                <small>Conheça quem faz acontecer</small>
              </div>
              <ArrowUpRight size={18} />
            </div>
            <span className="vertical-note">
              OBJETOS, SABORES & NOVAS HISTÓRIAS
            </span>
          </div>
        </div>
      </section>
      <section className="container categories-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ENCONTRE O QUE COMBINA COM VOCÊ</span>
            <h2>Um mundo de possibilidades, aqui.</h2>
          </div>
        </div>
        <div className="category-grid">
          {categories.slice(1).map((c, i) => {
            const Icon = icons[i + 1];
            return (
              <Link key={c} to={`/explorar?categoria=${encodeURIComponent(c)}`}>
                <span>
                  <Icon size={25} strokeWidth={1.4} />
                </span>
                {c}
                <ArrowUpRight size={16} />
              </Link>
            );
          })}
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">VALE A DESCOBERTA</span>
            <h2>Achados da vizinhança</h2>
            <p>Uma seleção especial para você conhecer o que é nosso.</p>
          </div>
          <Link className="text-link" to="/explorar">
            Ver todos os produtos <ArrowRight size={17} />
          </Link>
        </div>
        <Grid
          items={products.slice(0, 4)}
          stores={stores}
          favorites={favorites}
        />
      </section>
      <section className="container discover">
        <div className="discover-graphic">
          <Store size={74} strokeWidth={1} />
          <span>
            seu bairro,
            <br />
            <em>muitas histórias.</em>
          </span>
        </div>
        <div>
          <span className="eyebrow">MAIS DO QUE COMPRAR</span>
          <h2>
            Por trás de cada negócio,
            <br />
            tem alguém da sua região.
          </h2>
          <p>
            Encontre novas lojas, conheça quem empreende e descubra motivos para
            escolher o comércio local.
          </p>
          <Link className="btn light" to="/lojas">
            Conhecer estabelecimentos <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">QUEM FAZ ACONTECER</span>
            <h2>Negócios com identidade</h2>
          </div>
          <Link to="/lojas" className="text-link">
            Ver estabelecimentos <ArrowRight size={17} />
          </Link>
        </div>
        <div className="store-grid">
          {stores.map((s) => (
            <StoreCard key={s.id} store={s} />
          ))}
        </div>
      </section>
      <div className="container demo-note">
        Catálogo de demonstração: produtos, preços, endereços e estabelecimentos
        são fictícios.
      </div>
    </>
  );
}
