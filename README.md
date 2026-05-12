# Diet Plan Vue App

Esta aplicação Vue.js foi criada para gerenciar um plano alimentar dinâmico com substituições reativas e persistência local.

## Publicação no GitHub Pages

### Opção 1: usar pasta `docs` no branch `main`
1. Ajuste `VITE_BASE_PATH` se o nome do repositório for diferente de `dietPlan`.
2. Rode:
   ```bash
   npm install
   npm run build:docs
   ```
3. Commit e faça push do projeto com a pasta `docs` incluída.
4. No GitHub, configure Pages para servir a partir de `main` / `docs`.

### Opção 2: usar branch `gh-pages`
- A aplicação já foi preparada com `base` dinâmico no `vite.config.ts`.
- Se desejar, você pode adicionar um fluxo de deploy automatizado mais tarde.

## Scripts úteis

- `npm run dev` - inicia o servidor de desenvolvimento.
- `npm run build` - gera o build tradicional em `dist`.
- `npm run build:docs` - gera o site para GitHub Pages em `docs`.

## Observação

O `VITE_BASE_PATH` está configurado em `vite.config.ts` para suportar deploy em páginas de projeto. Se o repositório não for `dietPlan`, altere para `/<nome-do-repo>/`.
