---
id: DEF-0032
date: 2026-09-15
found_in: layer-guardian sobre el menú en cascada de TaskFlow
prevented_by: none
reason: distinguir en un layout las clases estructurales de las que pintan color, radio o tipo exigiría un inventario de utilidades Tailwind que este repositorio no mantiene, y ninguna puerta de arquitectura lee className
---

# DEF-0032 El layout de la barra decide color, radio y tipo

## Qué pasó

`apps/web/src/layouts/navbar-layout.tsx` coloca el hamburguesa, la tarjeta de navegación y la cabecera, y en el mismo fichero aplica utilidades de color, radio y tipo (`bg-accent`, `rounded-xl`, `text-base`). `docs/layers/web.md` reserva el layout para estructura y comportamiento responsivo; el aspecto vive en `src/ui`. Las utilidades están ligadas a tokens, no a valores crudos, pero siguen siendo una decisión visual tomada en el anillo equivocado.

## Por qué ninguna puerta existente lo vio

`scripts/architecture/check-source.ts` comprueba importaciones, comentarios y primitivas crudas (`button`, `input`). No lee `className`. Un layout que solo usa `Button` e `Input` de `src/ui` pasa esa puerta aunque pinte la pantalla. Inventar un inventario de utilidades visuales frente a estructurales duplicaría el catálogo de Tailwind y no pertenece a este repositorio.

## Cómo se impide que vuelva

No hay gate ni test. El arreglo de verdad es dar a las primitivas de `src/ui` el aspecto por defecto y dejar que el layout solo coloque. Hasta entonces, layer-guardian lo sigue viendo a ojo.
