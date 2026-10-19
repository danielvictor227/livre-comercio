import test from "node:test";
import assert from "node:assert/strict";
import { filterProducts, normalize, money } from "./catalog.js";
import { products, stores } from "../data/catalog.js";
test("busca ignora acentos, caixa e espaços externos", () => {
  assert.equal(normalize("CAFÉ"), "cafe");
  assert.equal(filterProducts(products, { query: "  CAFE  " })[0].id, "cafe");
});
test("busca inclui descrição e categoria", () => {
  assert.ok(
    filterProducts(products, { query: "fermentação longa" }).some(
      (p) => p.id === "pao",
    ),
  );
  assert.equal(filterProducts(products, { query: "Serviços" }).length, 1);
});
test("combina busca, categoria, preço e disponibilidade", () => {
  const result = filterProducts(products, {
    query: "artesanal",
    category: "Casa & decoração",
    max: 60,
    available: true,
  });
  assert.equal(result.length, 0);
  assert.deepEqual(
    filterProducts(products, {
      category: "Alimentação",
      max: 30,
      available: true,
    }).map((p) => p.id),
    ["pao"],
  );
});
test("preço limite é inclusivo e disponibilidade é respeitada", () => {
  assert.ok(
    filterProducts(products, { max: 22 }).some((p) => p.id === "sabonete"),
  );
  assert.ok(
    !filterProducts(products, { available: true }).some((p) => !p.available),
  );
});
test("ordena preços nos dois sentidos e nomes em português", () => {
  for (const [sort, sign] of [
    ["low", 1],
    ["high", -1],
  ]) {
    const result = filterProducts(products, { sort });
    assert.ok(
      result.every(
        (p, i) => i === 0 || (p.price - result[i - 1].price) * sign >= 0,
      ),
    );
  }
  const names = filterProducts(products, { sort: "name" }).map((p) => p.name);
  assert.deepEqual(
    names,
    [...names].sort((a, b) => a.localeCompare(b, "pt-BR")),
  );
});
test("não altera o catálogo original", () => {
  const before = JSON.stringify(products);
  filterProducts(products, { sort: "high" });
  assert.equal(JSON.stringify(products), before);
});
test("busca sem correspondência produz estado vazio", () =>
  assert.equal(
    filterProducts(products, { query: "inexistenteXYZ" }).length,
    0,
  ));
test("catálogo possui IDs únicos, vínculos válidos e preço positivo", () => {
  assert.equal(new Set(products.map((p) => p.id)).size, products.length);
  assert.equal(new Set(stores.map((p) => p.id)).size, stores.length);
  for (const p of products) {
    assert.ok(stores.some((s) => s.id === p.storeId));
    assert.ok(p.price > 0);
    assert.ok(p.description && p.name && p.art);
  }
});
test("formatação monetária brasileira", () =>
  assert.match(money(34.9), /34,90/));
