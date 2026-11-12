# DataBrasil Explorer

Painel com dados abertos do IBGE: localidades (regiões, estados, municípios), malhas territoriais em mapa interativo, frequência de nomes no Censo e notícias. Projeto de front-end em React com foco em **usabilidade (Heurísticas de Nielsen)** e **acessibilidade (WCAG)**.

- **Deploy:** _preencher após publicar (Vercel/Netlify)_
- **Repositório:** _preencher_

## Tecnologias
React 19, TypeScript, Vite, React Router, TanStack Query, Tailwind CSS, Recharts, Vitest + Testing Library.

## Como rodar
```bash
pnpm install
pnpm dev        # desenvolvimento
pnpm test       # testes
pnpm build      # build de produção (pasta dist/)
```

## Rotas
| Rota | Conteúdo |
|------|----------|
| `/` | Seletores de localidade, mapa do estado/município e notícias |
| `/nomes` | Explorador de nomes (gráfico + tabela) |
| `/sobre` | Sobre o projeto, recursos de acessibilidade e atalhos do mapa |

## API utilizada
Base: `https://servicodados.ibge.gov.br/api` (pública, sem autenticação).

| Uso | Exemplo |
|-----|---------|
| Regiões | `GET /v1/localidades/regioes` |
| Estados | `GET /v1/localidades/estados` |
| Municípios de um estado | `GET /v1/localidades/estados/35/municipios` |
| Malha SVG (estado) | `GET /v4/malhas/estados/35?intrarregiao=municipio&qualidade=intermediaria (Accept: image/svg+xml)` |
| Malha SVG / metadados (município) | `GET /v4/malhas/municipios/3550308` · `GET /v4/malhas/municipios/3550308/metadados` |
| Frequência de nomes | `GET /v2/censos/nomes/maria` |
| Notícias | `GET /v3/noticias/?qtd=6` |

Documentação: https://servicodados.ibge.gov.br/api/docs

## Deploy
`vercel.json` já contém o rewrite para SPA. Importar o repositório na Vercel (build: `pnpm build`, saída: `dist`). Em Netlify, adicionar `/* /index.html 200` em `public/_redirects`.

## Relatório de usabilidade e acessibilidade
Ver [`docs/relatorio.md`](docs/relatorio.md).
