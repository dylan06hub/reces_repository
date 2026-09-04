# Reces S.R.L.

Sitio web de la carnicería Reces S.R.L., construido con React, TypeScript y Vite.

## Estructura

- `src/main.tsx`: entrada de la aplicación.
- `src/App.tsx`: contenedor principal y layout global.
- `src/router.tsx`: rutas disponibles.
- `src/components/`: componentes compartidos entre vistas.
- `src/pages/`: páginas `Home`, `Nosotros` y `Contacto`.
- `src/data/`: catálogo de productos.
- `src/hooks/`: lógica reutilizable de productos y formularios.
- `src/utils/`: formateadores y validaciones.
- `src/styles/global.css`: variables, reset y estilos globales.

## Comandos

```bash
npm run dev
npm run build
npm run lint
```

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
