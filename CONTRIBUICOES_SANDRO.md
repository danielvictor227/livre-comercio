# Contribuições da Fase 02 — Sandro

- **Mapa em Estabelecimentos** (`/#/lojas`): pontos fictícios das mesmas quatro vitrines do Gabriel, seleção e navegação para a loja, pesquisa e localização opcional.
- **Dados**: coordenadas de demonstração em `src/data/catalog.js`, normalização/validação em `src/services/estabelecimentos.js` e distância aproximada em `src/utils/geolocalizacao.js`.
- **Testes**: casos unitários dos utilitários geográficos e verificação de consistência dos identificadores.
- **Documentação**: Parte 02, seção 18.3, tecnologias (21) e frontend (22.1).

**Limites**: catálogo demonstrativo, sem Firestore/Auth integrados nesta versão. O OpenStreetMap precisa de internet. Distâncias em linha reta não são tempo de trajeto. Para execução, instale dependências com `npm ci` e rode `npm run dev` com Node compatível.
