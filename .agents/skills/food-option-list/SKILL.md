---
name: food-option-list
description: Documenta FoodOptionList, componente base de opcoes de alimento, modos radio/select e emit select. Usar ao alterar selecao unica, renderizacao de opcoes ou comportamento de substituicao.
---

# FoodOptionList

## Localizacao

[src/components/food/FoodOptionList.vue](../../../src/components/food/FoodOptionList.vue)

## API do componente

| Prop/Emit | Tipo | Descricao |
| --- | --- | --- |
| `options` | `FoodOption[]` | Opcoes disponiveis. |
| `selected` | `string` | `id` selecionado. |
| `mode` | `'radio' \| 'select'` | Padrao visual; sem valor usa radio. |
| emit `select` | `(optionId: string)` | Disparado ao selecionar uma opcao. |

## Dependencias

- Tipo `FoodOption` em [src/types/index.ts](../../../src/types/index.ts).

## Ao modificar / estender

- Preserve o contrato por `option.id`; componentes pais atualizam store.
- Se adicionar modo visual novo, mantenha emit `select` compativel.
- Evite acoplar este componente ao Pinia; ele e base reutilizavel.

## Referencias

- [food-selector skill](../food-selector/SKILL.md)
- [meal-card skill](../meal-card/SKILL.md)
