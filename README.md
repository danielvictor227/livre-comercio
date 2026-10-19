# Livre Comércio

Frontend da Fase 02 do Projeto Integrador de Engenharia de Software. Consolidação do catálogo e das vitrines enviados pelo Gabriel com a implementação do mapa e da organização geográfica desenvolvidas para a parte do Sandro.

## Executar no Windows 11

1. Clique com o botão direito em `Livre_Comercio_Integrado_Gabriel_Sandro.zip` e selecione **Extrair tudo**. Evite executar dentro da visualização do ZIP.
2. Abra a pasta extraída `Livre-Comercio`. Ela precisa conter `package.json`, `package-lock.json`, `index.html` e `src`.
3. No Visual Studio Code, escolha **Arquivo → Abrir Pasta** e selecione essa pasta. Depois, **Terminal → Novo Terminal**. Também é possível abrir PowerShell na pasta pelo Explorador de Arquivos.
4. Confira a pasta atual usando `Get-Location` e a existência do arquivo usando `Test-Path package.json`. Se necessário, use `cd "C:\caminho\Livre-Comercio"`.
5. Use Node.js 22.12 ou superior (a entrega foi validada com Node 24.19.0). Confira `node --version` e `npm.cmd --version`.
6. Instale as dependências (requer acesso ao registro npm):

```powershell
npm.cmd install
```

7. Inicie a aplicação:

```powershell
npm.cmd run dev
```

8. Abra o endereço **Local** exibido pelo Vite, normalmente `http://localhost:5173/` ou `http://127.0.0.1:5173/`. Mantenha o terminal aberto. O catálogo usa rotas com `#`, por exemplo `/#/explorar`.
9. Para encerrar o servidor, pressione **Ctrl+C** no terminal. Confirme se o PowerShell solicitar.

Use `npm.cmd` em todos os comandos: isso evita o bloqueio de `npm.ps1` sem precisar alterar a política de segurança do PowerShell.

## Build e testes

```powershell
npm.cmd test
npm.cmd run build
npm.cmd run preview
```

O build fica em `dist/`. `preview` serve o build para conferência local; não é um servidor de produção. Para instalação reproduzível, use `npm.cmd ci` com o lock entregue. Não abra `index.html` com duplo clique: a aplicação requer servidor HTTP.

## Problemas comuns

- **ENOENT / package.json não encontrado:** você está na pasta errada. Volte à pasta que contém `package.json`.
- **npm.ps1 bloqueado:** use `npm.cmd`, inclusive no terminal do VS Code.
- **node ou npm.cmd não encontrado:** reinstale a versão LTS compatível do Node e reabra o VS Code.
- **Porta ocupada/bloqueada / EACCES:** tente `npm.cmd run dev -- --port 4173`. Foi a alternativa usada neste ambiente, onde 5173 estava bloqueada. Abra a porta exibida pelo terminal.
- **Não foi possível conectar:** mantenha o servidor rodando e confirme o endereço e a porta. Não exponha o servidor à internet para executar esta demonstração.
- **Falha de instalação:** confira conexão, proxy e acesso ao registro npm. Não desative TLS. Execute novamente `npm.cmd install` após resolver a conexão.
- **Favoritos desapareceram:** eles pertencem ao navegador e à origem (host + porta). Mudar de `localhost` para `127.0.0.1`, trocar a porta, usar modo privado ou limpar dados cria outro armazenamento.
- **Navegador bloqueia armazenamento:** a aplicação mostra um aviso e mantém os favoritos somente durante a sessão.

## Funcionalidades

Home, categorias, catálogo de oito itens, quatro vitrines, detalhes, busca por nome/descrição/categoria sem distinção de acentos, filtros combinados por categoria/preço/disponibilidade, ordenação por preço/nome, estado vazio, favoritos persistentes e mapa interativo em Estabelecimentos com marcadores das mesmas quatro lojas fictícias, busca e localização por permissão. Rotas inexistentes e IDs desconhecidos recebem tela de recuperação.

Todas as ilustrações são vetoriais locais no componente `Artwork`, sem downloads ou imagens de terceiros. A fonte usa a pilha do sistema (Inter, se instalada, seguida de Segoe UI e Arial), sem requisições externas. Os ícones vêm de Lucide, incluído no bundle.

## Integração em equipe

Consulte `docs/IMPLEMENTACAO_FRONTEND.md` para as seções acadêmicas 16 e 22.1, contratos e pendências. Consulte `docs/TESTES.md` para os testes executados e seus limites.

Não há login, cadastro, pagamentos, administração nem conexão ativa com Firestore. Há consulta de geolocalização somente mediante clique e permissão do usuário, não persistida. Os mosaicos do mapa são carregados do OpenStreetMap pela internet; não é necessário Google Maps API nem chave para o mapa demonstrativo. Não existem contatos reais no catálogo; nenhuma ação de contato fictícia é apresentada. Copiar `.env.example` não ativa serviços: é necessário implementar os adaptadores, configurar os projetos e validar as regras no backend. Não coloque segredos em variáveis `VITE_*`, que são públicas no frontend.

O ZIP inclui fonte, lock e documentação; exclui `node_modules`, `dist`, `.git` e arquivos temporários. O build pode ser reproduzido pelos comandos acima.


## Consolidação Gabriel + Sandro (Fase 02)

A página `/#/lojas` contém agora o mapa React Leaflet/Leaflet. A `src/data/catalog.js` continua sendo a fonte única dos quatro estabelecimentos e seus produtos; foram incluídas coordenadas *fictícias* para testes. O mapa apresenta marcadores e links para as vitrines, permite buscar por nome/categoria/descrição e, com autorização do navegador, indica posição e distância aproximada em linha reta.

Arquivos centrais da contribuição de dados/mapa: `src/components/StoreMap.jsx`, `src/services/estabelecimentos.js`, `src/utils/geolocalizacao.js` e respectivos testes. Nada aqui representa estoque, localização de loja real ou rotas por ruas. A aplicação usa os tiles públicos do OpenStreetMap: é necessário internet e respeitar a política de utilização e atribuição do provedor.

O frontend anterior com Firebase Authentication era uma prova de conceito separada. O frontend consolidado com as vitrines do Gabriel **não contém autenticação ativa**, e não foi afirmada integração real com o Firestore. Essas funções continuam pendentes de adaptação e testes com um projeto Firebase configurado. O arquivo `.env.example` não é necessário para executar o mapa atual e não ativa serviços.

Testes locais: `npm.cmd test`. A geração do build `npm.cmd run build` deve ser conferida em uma máquina com acesso ao registro npm, pois a instalação não pôde ser concluída no ambiente desta consolidação.
