# Diet Plan Vue App

Esta aplicação Vue.js foi criada para gerenciar um plano alimentar dinâmico com substituições reativas e persistência local.

## Publicação no GitHub Pages

O deploy é feito automaticamente via GitHub Actions ao fazer push no branch `main`.

1. No GitHub, vá em **Settings → Pages → Source** e selecione **GitHub Actions**.
2. Faça push para `main` — o workflow `.github/workflows/deploy.yml` faz o build e publica automaticamente.
3. O site ficará disponível em `https://<usuario>.github.io/dietPlan/`.

## Scripts úteis

- `npm run dev` - inicia o servidor de desenvolvimento.
- `npm run build` - gera o build tradicional em `dist`.
- `npm run build:docs` - gera o site para GitHub Pages em `docs`.

## Observação

O `VITE_BASE_PATH` está configurado em `vite.config.ts` para suportar deploy em páginas de projeto. Se o repositório não for `dietPlan`, altere para `/<nome-do-repo>/`.
