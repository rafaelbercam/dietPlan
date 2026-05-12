# Review — Checklist de Verificação e Rollback

## Pré-Deploy Checklist

Antes de fazer merge de qualquer PR, verifique os itens abaixo:

### 1. Build
- [ ] `npm run build` passa sem erros (`tsc` + `vite build`)
- [ ] Nenhum warning de TypeScript nos arquivos alterados

### 2. Dados e Migração (localStorage)
- [ ] Se alterou `meals.ts`, `carbs.ts`, `vegetables.ts`, `meats.ts`, `fruits.ts` ou `desserts.ts`:
  - [ ] Incrementou `CURRENT_VERSION` em `mealPlan.store.ts`
  - [ ] A função `migrateMeals()` trata os novos dados corretamente
  - [ ] Testou **sem limpar o localStorage** — a migração deve rodar automaticamente
  - [ ] Testou **limpando o localStorage** — os dados default devem carregar corretamente
- [ ] Se adicionou/removeu itens da lista de opções:
  - [ ] `options` é sincronizado dos defaults na migração
  - [ ] `selectedOptions` / `selectedOption` defaults fazem sentido
- [ ] Se alterou tipos (`types/index.ts`):
  - [ ] Todos os componentes que usam o tipo foram atualizados
  - [ ] Mapas de categoria no `MealCard.vue` incluem a nova categoria (icon, bg, color, badge, label)

### 3. Componentes
- [ ] Se criou novo componente:
  - [ ] Está importado e usado onde necessário
  - [ ] Props e emits estão tipados corretamente
- [ ] Se alterou componente existente:
  - [ ] Verificou impacto em outros componentes que o utilizam

### 4. Funcionalidade
- [ ] Multi-select (vegetais/carboidratos): selecionar 2+ opções, chips aparecem, remover funciona
- [ ] Single-select (frutas/carnes/sobremesa): dropdown funciona, seleção persiste
- [ ] Salvar cardápio por período: dados salvos corretamente incluindo multi-seleções
- [ ] Dados da nutricionista: exibição, edição e badge de validade

### 5. Visual
- [ ] Background limpo (sem gradientes pesados)
- [ ] Badges de categoria com cores corretas
- [ ] Layout responsivo (desktop e mobile)
- [ ] Menu lateral funciona (toggle e navegação)

---

## Verificação Pós-Deploy

Após o merge e deploy no GitHub Pages:

1. Abrir https://rafaelbercam.github.io/dietPlan/
2. **Sem limpar localStorage:**
   - [ ] App carrega sem erros no console
   - [ ] Dados migram automaticamente (novas opções aparecem)
   - [ ] Seleções anteriores do usuário são preservadas
3. **Limpar localStorage e recarregar:**
   - [ ] App carrega com dados default corretos
   - [ ] Todos os dropdowns e multi-selects funcionam

---

## Rollback

### Opção 1: Reverter PR no GitHub
1. Abrir o PR mergeado no GitHub
2. Clicar em **"Revert"** para criar um PR de reversão
3. Fazer merge do PR de reversão
4. O deploy roda automaticamente via GitHub Actions

### Opção 2: Reverter via Git
```bash
# Identificar o commit do merge
git log --oneline -10

# Reverter o commit de merge
git revert -m 1 <commit-hash>

# Push para main
git push origin main
```

### Opção 3: Forçar dados no browser do usuário
Se o problema é apenas no localStorage do browser:
1. Abrir DevTools (F12) → Application → Local Storage
2. Deletar as chaves:
   - `meal-plan-state` — dados das refeições
   - `meal-plan-version` — versão da migração
   - `meal-plan-periods` — cardápios salvos (cuidado: apaga histórico)
   - `meal-plan-consult` — dados da nutricionista
3. Recarregar a página

### Opção 4: Forçar migração
Se a migração não rodou corretamente:
1. Abrir DevTools → Console
2. Executar:
```javascript
localStorage.removeItem('meal-plan-version')
location.reload()
```
Isso força a migração a rodar novamente sem perder os dados do usuário.

---

## Versionamento da Migração

| Versão | PR  | Mudanças |
|--------|-----|----------|
| 1      | #5  | Versão inicial com seletores |
| 2      | #7  | Multi-select para vegetais e carboidratos |
| 3      | #9  | Laticínio, sobremesa selecionável, Feijão nos carbs |
| 4      | #10 | Fix: sincroniza options dos defaults sempre |

Ao fazer mudanças nos dados, **sempre incremente `CURRENT_VERSION`** em `src/stores/mealPlan.store.ts`.
