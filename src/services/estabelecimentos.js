// Modelo de apresentação para as vitrines locais (todos os registros são fictícios).
// O catálogo fornecido pelo Gabriel é a fonte única de lojas/produtos na Fase 02.
export function normalizarEstabelecimento(store) {
  const loc = store?.localizacao ?? store?.location;
  const latitude = Number(loc?.latitude), longitude = Number(loc?.longitude);
  if (!store?.id || !store?.name || loc == null || !Number.isFinite(latitude) || !Number.isFinite(longitude) ||
      Math.abs(latitude)>90 || Math.abs(longitude)>180) return null;
  return {
    id: String(store.id),
    nomeFantasia: String(store.name),
    categoria: String(store.category ?? 'Outros'),
    descricao: String(store.description ?? ''),
    localizacao: {latitude, longitude},
    origem: 'demonstracao',
    ativo: true,
  };
}
const semAcento = (x) => String(x).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
export function filtrarEstabelecimentos(estabelecimentos, termo) {
  const chave = semAcento(termo);
  return estabelecimentos.filter(s => s.ativo && semAcento(`${s.nomeFantasia} ${s.categoria} ${s.descricao}`).includes(chave));
}
export function obterEstabelecimentosDoCatalogo(stores) {
  return stores.map(normalizarEstabelecimento).filter(Boolean);
}
