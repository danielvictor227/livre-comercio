export const normalize = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export const money = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );
export function filterProducts(
  items,
  {
    query = "",
    category = "Todos",
    max = 200,
    available = false,
    sort = "featured",
  } = {},
) {
  const result = items.filter(
    (p) =>
      normalize(p.name + " " + p.description + " " + p.category).includes(
        normalize(query.trim()),
      ) &&
      (category === "Todos" || p.category === category) &&
      p.price <= Number(max) &&
      (!available || p.available),
  );
  return [...result].sort((a, b) =>
    sort === "low"
      ? a.price - b.price
      : sort === "high"
        ? b.price - a.price
        : sort === "name"
          ? a.name.localeCompare(b.name, "pt-BR")
          : 0,
  );
}
