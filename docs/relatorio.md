# Relatório: Heurísticas de Nielsen e WCAG

> Itens marcados com **[coletar]** precisam de evidência (print/vídeo) tirada no navegador antes da entrega.

## 1. Heurísticas de Nielsen (problema → evidência → correção)

| # | Heurística | Problema encontrado | Correção aplicada |
|---|-----------|---------------------|-------------------|
| 1 | Visibilidade do status | Loading só em texto solto, sem anúncio; mapa sem indicação ao carregar | `Carregando` com `role="status"` e skeleton do mapa |
| 2 | Correspondência com o mundo real | Data das notícias crua (`05/11/2026 10:30:00`) | Formatada em pt-BR por extenso (`formatarData`) |
| 3 | Controle e liberdade | Zoom por rolagem prendia a rolagem da página | Zoom só com Ctrl/⌘ + rolagem; botão e tecla "restaurar" |
| 4 | Consistência e padrões | Botão de busca verde diferente do restante; textos de erro variados | Cor única `emerald-700/800`; componente `ErroMensagem` padrão |
| 5 | Prevenção de erros | Busca vazia disparava requisição | Validação com mensagem antes de buscar |
| 6 | Reconhecimento > memorização | Selects sem rótulo (apenas a 1ª opção) | `<label>` visível em Região/Estado/Município; instrução "Escolha um estado primeiro" |
| 7 | Flexibilidade e eficiência | Mapa só com mouse | Atalhos de teclado (setas, +, -, 0) |
| 8 | Design estético e minimalista | Página única longa | Separada em rotas: Início, Nomes, Sobre |
| 9 | Recuperação de erros | Erro sem saída | Botão "Tentar novamente" em todos os blocos de API |
| 10 | Ajuda e documentação | Sem explicação de uso do mapa | Dica no mapa + página "Sobre" com atalhos |

Evidências: **[coletar]** prints antes/depois de cada item (2ª rodada de avaliação heurística, aula de 13/11).

## 2. Critérios WCAG 2.2 aplicados

| Critério | Nível | Aplicação | Onde |
|----------|-------|-----------|------|
| 1.1.1 Conteúdo não textual | A | SVG do mapa com `role="img"` e `aria-label`; gráfico com resumo textual e tabela; ícones `aria-hidden` | `MapaSvg`, `GraficoFrequencia` |
| 1.3.1 Informações e relações | A | Labels associados, `<nav>`, `<main>`, `<section aria-labelledby>`, tabela com `th scope` | todo o app |
| 1.4.3 Contraste (mínimo) | AA | Textos `slate-500` → `slate-600`; botão `emerald-600` → `emerald-700`; links `emerald-800` | **[coletar]** medir com DevTools/WebAIM |
| 1.4.11 Contraste não textual | AA | Contorno `emerald-800` no mapa; destaque também por espessura do traço (não só cor) | `MapaSvg` |
| 2.1.1 Teclado | A | Mapa focável com setas/+/-/0; seleção de município via `<select>` | `MapaSvg` |
| 2.1.2 Sem armadilha de teclado | A | Nenhum elemento prende o foco | **[coletar]** vídeo de navegação por Tab |
| 2.4.1 Ignorar blocos | A | Link "Ir para o conteúdo principal" | `App` |
| 2.4.2 Título da página | A | `document.title` por rota | `App` |
| 2.4.3 Ordem do foco | A | Foco movido para `<main>` ao trocar de rota | `App` |
| 2.4.7 Foco visível | AA | `:focus-visible` com contorno azul de 3px | `index.css` |
| 2.3.3 / movimento | AAA | `prefers-reduced-motion` desativa animações | `index.css` |
| 3.1.1 Idioma | A | `lang="pt-BR"` | `index.html` |
| 3.2.5 / 2.4.4 Finalidade do link | A/AAA | Links externos informam "abre em nova aba" | `NoticiaCard`, `Sobre` |
| 3.3.1 / 3.3.2 Erros e rótulos | A | Mensagens com `role="alert"`, `aria-invalid`, `aria-describedby` | `GraficoFrequencia` |
| 4.1.3 Mensagens de status | AA | `role="status"` / `aria-live` para loading, resultados e detalhes do município | `Carregando`, `LocalidadeSelector` |

## 3. Como verificar (evidências a coletar)
1. **Teclado:** navegar com Tab/Shift+Tab/setas por todas as rotas; gravar vídeo curto.
2. **Contraste:** DevTools → Accessibility, ou https://webaim.org/resources/contrastchecker/; anexar print dos pares principais.
3. **Leitor de tela:** NVDA (Windows) ou VoiceOver; checar labels, alertas e o mapa.
4. **Lighthouse (Accessibility):** rodar em `/`, `/nomes` e `/sobre`; anexar a pontuação.
5. **Zoom 200% e 320px:** conferir que não há perda de conteúdo (1.4.4 e 1.4.10).

## 4. Limitações conhecidas
- Seleção de município diretamente no mapa só é possível por ponteiro; a alternativa por teclado é a lista "Município".
- O arrastar do mapa em telas touch bloqueia a rolagem vertical sobre o mapa.
- `pnpm lint` não roda: `typescript-eslint` ainda não suporta TypeScript 7.0 (problema anterior a este trabalho).
