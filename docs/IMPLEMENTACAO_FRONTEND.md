# Implementação do frontend — Fase 02

Texto de apoio às seções 16 e 22.1. A numeração dos requisitos funcionais do documento original não foi fornecida; as relações abaixo usam os nomes dos requisitos, sem inventar identificadores oficiais.

## 16 — Tecnologias e arquitetura

React 19 e JavaScript organizam a interface; Vite 7 executa o ambiente e produz o bundle; React Router 7 controla a navegação; Lucide React fornece ícones. HTML5 semântico, CSS3 com grid/flex e media queries compõem o layout. Node e npm são ferramentas de desenvolvimento. O arquivo de lock fixa as versões transitivas.

A identidade usa verde profundo, superfícies claras, tons naturais e ilustrações SVG locais. Estados de foco, seleção e hover, link para pular ao conteúdo e redução de movimento são previstos. O estilo adapta grades e filtros às larguras de tela. Não foi realizada auditoria completa de conformidade WCAG.

```text
src/
  components/     Artwork, ProductCard e elementos de catálogo reutilizáveis
  data/           catálogo fictício e relações entre produtos e lojas
  hooks/          estado e persistência de favoritos
  layouts/        cabeçalho, navegação, rodapé e área principal
  pages/          uma implementação por tela e arquivo de exportações
  routes/         carregamento inicial e configuração das rotas
  services/       contrato assíncrono de leitura do catálogo
  styles/         identidade visual e regras responsivas
  utils/          normalização, formatação, filtros e testes
docs/             documentação e relatório de validação
```

As ilustrações de assets são implementadas em `components/Artwork.jsx`; não há necessidade de uma pasta vazia `assets/`. As páginas recebem catálogo e favoritos por propriedades. O layout é compartilhado. Funções puras implementam os filtros sem modificar os dados. Os filtros ficam em parâmetros da URL, permitindo compartilhar a busca e usar o histórico do navegador.

## 22.1 — Telas e fluxo de navegação

| Tela / rota | Implementação e relação com os requisitos |
| --- | --- |
| Início `/#/` | Pesquisa em destaque, categorias, produtos selecionados e negócios locais |
| Explorar `/#/explorar` | Pesquisa por nome/palavra-chave, categoria, preço máximo, disponibilidade, ordenação, contagem e limpeza |
| Estabelecimentos `/#/lojas` | Lista de negócios e mapa interativo React Leaflet com marcadores, busca, foco na loja, localização opcional e links às vitrines |
| Vitrine `/#/loja/:id` | Capa gráfica, identidade, descrição, endereço e horário fictícios; apenas produtos associados ao estabelecimento |
| Produto `/#/produto/:id` | Ilustração, nome, preço, descrição, categoria, disponibilidade, loja e favorito |
| Favoritos `/#/favoritos` | Lista dos itens salvos neste navegador e remoção pelo coração |
| Rota ou ID inexistente | Mensagem e link de recuperação para o catálogo |

O consumidor parte da Home, pesquisa ou escolhe uma categoria, ajusta filtros, consulta o produto e visita a vitrine responsável. Também pode conhecer negócios diretamente. O coração adiciona/remove um item e atualiza todas as telas. Favoritos usam a chave `livre:favorites` no localStorage. A remoção de dados do navegador apaga a coleção. Não há sincronização entre dispositivos ou entre abas já abertas.

## Concluído

- Navegação frontend, oito produtos/serviços e quatro estabelecimentos consistentes.
- Busca com normalização de acentos, filtros combinados e ordenação.
- Vitrines, detalhes, estados vazios e tratamento de rotas inválidas.
- Favoritos com leitura defensiva de dados e aviso quando a gravação falha.
- Skeleton no carregamento inicial e recuperação de erro de leitura do catálogo.
- Assets locais, CSS responsivo e build de produção validado.

O catálogo local retorna rapidamente; o skeleton e o erro são caminhos preparados, sem atrasos artificiais. Eles não comprovam uma integração remota.

## Pendências e integração

### Cloud Firestore

Substituir `catalogService.getCatalog()` por um adaptador que retorne `{ products, stores }` com os campos usados em `data/catalog.js`. Hoje o método retorna uma Promise com dados locais. Produtos usam `storeId` para vincular a vitrine e `available` booleano; preços são números em reais. Validar o esquema e normalizar os documentos antes de renderizar.

Para uma base real, incluir paginação, consultas indexadas, limites, tratamento de indisponibilidade e regras de autorização. Os filtros atuais são executados no cliente e são apropriados ao pequeno catálogo demonstrativo; não representam uma solução de consulta para um catálogo grande. Cadastrar comerciantes e gerenciar produtos dependerá de telas e permissões futuras.

### Firebase Authentication

Não há SDK instalado ou autenticação simulada neste frontend consolidado. A equipe deverá configurar o projeto, instalar o SDK oficial, implementar um serviço de sessão e suas telas, observar o estado de autenticação e proteger ações também por regras no servidor. O localStorage de favoritos não representa sessão autenticada. Sincronização de favoritos deverá definir uma estratégia de migração e união da coleção local.

### Mapa (React Leaflet e OpenStreetMap)

O mapa da tela Estabelecimentos já está implementado com React Leaflet e mosaicos do OpenStreetMap (ver "Complemento da integração geográfica" ao final). A Google Maps JavaScript API foi usada apenas na prova de conceito do 4º período e não é utilizada nesta versão, por isso não há chave de API a configurar. Com dados reais, as coordenadas das lojas virão do Firestore, e a geocodificação de endereços deverá respeitar a política de uso do serviço escolhido.

### Contatos

O catálogo não fornece telefone, e-mail ou site reais. Por isso não há botão de WhatsApp, ligação ou mensagem. Quando o backend fornecer dados válidos, validar formato e protocolo e construir as ações correspondentes. Não existe compra, reserva ou agendamento implementado.

## Limites acadêmicos

Esta entrega é uma base frontend funcional. Não deve ser descrita como sistema com banco conectado, autenticação, geolocalização ou gerenciamento comercial concluídos. O mapeamento definitivo para requisitos numerados e a integração com o repositório da equipe dependem da documentação e do código compartilhados pelos demais integrantes.


## Complemento da integração geográfica — Sandro

A listagem de estabelecimentos passou a conter `StoreMap.jsx`, integrado em `pages/Shops.jsx`. Foi utilizado React Leaflet 5 com Leaflet 1.9 e mosaicos públicos OpenStreetMap (não Google Maps API). As quatro lojas do catálogo do Gabriel receberam coordenadas de demonstração no próprio `data/catalog.js`, garantindo que vitrine, lista e marcador se refiram ao mesmo identificador. A camada `services/estabelecimentos.js` valida e normaliza esses registros e implementa a busca local sem distinção de acentos. O módulo `utils/geolocalizacao.js` oferece cálculo de Haversine, com valores explicitamente aproximados em linha reta.

O mapa pode centralizar a loja selecionada e solicitar a posição do usuário apenas mediante clique e consentimento. O navegador pode negar o acesso sem impedir a navegação. A posição não é enviada ao Firestore nem gravada no localStorage. A aplicação usa exclusivamente registros fictícios. A integração real com Firebase Authentication/Cloud Firestore e cadastro de comerciantes permanece fora do escopo desta versão consolidada.
