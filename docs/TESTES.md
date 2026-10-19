# Relatório de validação

Data de referência da sessão: 18/10/2026, America/Sao_Paulo.

## Ambiente

Windows / PowerShell, Node 24.19.0, npm 11.17.0. Catálogo local: oito produtos/serviços e quatro estabelecimentos. Não havia código de projeto anterior disponível na pasta inicial.

## Comandos executados

| Verificação | Resultado |
| --- | --- |
| `npm.cmd install --no-audit --no-fund` | Sucesso, 22 pacotes instalados e lock gerado |
| `npm.cmd test` | 9 testes aprovados, 0 falhas; repetido após organização final |
| `npm.cmd run build` | Sucesso, repetido após correções e organização final |
| `npm.cmd run dev` | Porta 5173 bloqueada com EACCES neste ambiente |
| `npm.cmd run dev -- --port 4173` | Servidor iniciado; HTTP 200 confirmado; aplicação inspecionada no navegador |
| `npm.cmd run preview -- --port 4180` | Servidor informou início; conferência adicional pelo navegador interrompida e leitura HTTP posterior bloqueada por permissão de soquete |

O build final gerou aproximadamente 260,26 kB de JavaScript e 20,90 kB de CSS antes de gzip. O bundler emitiu dois avisos sobre diretivas `use client` do React Router ignoradas no bundle cliente. O processo terminou com código zero. A instalação exibiu aviso de política de scripts do esbuild, mas o build executou corretamente. Não houve auditoria de vulnerabilidades ou lint nesta validação.

## Testes automatizados

Os testes ficam em `src/utils/catalog.test.js`, usando o executor nativo de Node:

1. Busca ignora acentos, caixa e espaços externos.
2. Busca inclui descrições e categorias.
3. Filtros de busca, categoria, preço e disponibilidade combinam corretamente.
4. Limite de preço é inclusivo e disponibilidade é respeitada.
5. Ordenação crescente/decrescente por preço e alfabética em português.
6. Ordenação não modifica o catálogo original.
7. Termo inexistente produz lista vazia.
8. IDs únicos, relacionamentos de loja válidos e preços positivos.
9. Formatação monetária brasileira.

## Verificações reais no navegador

Executadas na aplicação em desenvolvimento, incluindo conferências após a separação final das páginas:

- Home renderizada com ilustrações, categorias e produtos. Na primeira abertura ocorreu `React is not defined`; a configuração de JSX e imports foi corrigida e a página passou a renderizar. O build foi refeito depois da correção.
- Pesquisa `cafe` pela Home abriu Explorar com dois resultados (o café e a caneca, cuja descrição menciona café).
- Selecionar “Somente disponíveis” reduziu essa busca a um resultado.
- Adicionar café aos favoritos, abrir Favoritos e recarregar manteve o item salvo.
- Produto abriu os dados correspondentes; “Visitar vitrine” abriu Casa do Grão com seus dois produtos e informações demonstrativas.
- Categoria Alimentação mostrou dois itens; ordenar por menor preço colocou pão de R$ 28,00 antes do café de R$ 34,90.
- Preço máximo zero mostrou estado vazio; “Limpar busca e filtros” restaurou os oito itens.
- Remover café dos favoritos e recarregar preservou a coleção vazia.
- Rota `/#/pagina-inexistente` mostrou a página de recuperação.
- Layout da Home inspecionado em 390 × 844 e 1440 × 1000; filtros e estado vazio também inspecionados no celular. Medição do documento não apresentou largura horizontal excedente nas duas larguras verificadas.
- Capturas completas da Home foram salvas em `Previa_Mobile.png` e `Previa_Desktop.png`, junto ao ZIP na pasta de entrega.

## Limites e pendências

- Não houve validação em aparelho físico, matriz de navegadores, leitor de tela ou auditoria completa WCAG.
- Não houve teste de backend, login, cadastro, Firebase, Google Maps, pagamento ou contato: essas integrações não existem nesta versão.
- Falhas de carregamento remoto, armazenamento indisponível e dados locais corrompidos têm tratamento no código, mas não foram forçados no navegador nesta sessão.
- A execução visual foi validada no servidor de desenvolvimento; o build foi compilado, mas sua inspeção visual adicional pelo servidor `preview` não foi concluída por limitação do ambiente.
- As interações no navegador foram verificações assistidas, não uma suíte E2E entregue. A suíte repetível entregue cobre as regras do catálogo.
- Não foi realizada comparação com a versão anterior ou integração no repositório da equipe, pois esses materiais não foram fornecidos.
- Nenhuma integração externa é apresentada como concluída. Dados, preços e endereços são fictícios.

## Reproduzir

Na pasta com `package.json`, execute `npm.cmd ci`, `npm.cmd test` e `npm.cmd run build`. Depois use `npm.cmd run dev` e percorra os fluxos acima. Se a porta padrão estiver bloqueada, use `npm.cmd run dev -- --port 4173`. As instruções detalhadas de Windows estão no README.


## Testes adicionais da consolidação do mapa

Foram acrescentados testes unitários de distância geográfica, validação de coordenadas, formatação e coerência de IDs entre vitrines e marcadores. Execute `npm test` para repetir o conjunto. A validação do mapa em navegador e o build do projeto completo ainda precisam ser realizados com dependências instaladas e internet para os tiles.
