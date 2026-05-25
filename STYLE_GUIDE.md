# Project Style Guide

Conventions for file structure, naming, and code organization in this project.
Based on the [official Angular Style Guide](https://angular.dev/style-guide) (v1, Folders-by-Feature).

## Folder structure

```
src/app/
├── app.component.{ts,html,scss,spec.ts}
├── app.config.ts
├── app.routes.ts
│
├── core/                     # app-wide singletons (HTTP, auth, interceptors, guards)
│
├── layout/                   # application shell
│   ├── header/
│   └── sidebar/
│
├── shared/                   # truly cross-feature code
│   ├── logo/
│   ├── typography/
│   ├── theme/
│   └── user/
│
└── <feature>/                # one folder per feature (dashboard, auth, portfolio, ...)
    ├── <feature>.component.{ts,html,scss,spec.ts}
    ├── <feature>.routes.ts
    ├── <sub-component>/
    │   └── <sub-component>.component.{ts,html,scss,spec.ts}
    └── shared/               # things used only within this feature
        ├── *.directive.ts
        ├── *.pipe.ts
        ├── *.model.ts
        └── *.mock.ts
```

## Naming

### Files

Use **kebab-case** with a type suffix:

| Type        | Suffix          | Example                          |
| ----------- | --------------- | -------------------------------- |
| Component   | `.component.ts` | `trending-market.component.ts`   |
| Directive   | `.directive.ts` | `change-color.directive.ts`      |
| Pipe        | `.pipe.ts`      | `symbol.pipe.ts`                 |
| Service     | `.service.ts`   | `market.service.ts`              |
| Guard       | `.guard.ts`     | `auth.guard.ts`                  |
| Interceptor | `.interceptor.ts` | `error.interceptor.ts`         |
| Model       | `.model.ts`     | `crypto.model.ts`                |
| Constant    | `.constant.ts`  | `theme.constant.ts`              |
| Mock data   | `.mock.ts`      | `tokens.mock.ts`                 |
| Routes      | `.routes.ts`    | `dashboard.routes.ts`            |
| Test        | `.spec.ts`      | `trending-market.component.spec.ts` |

A component's template and styles share its base name and live in the same folder:

```
trending-market/
├── trending-market.component.ts
├── trending-market.component.html
├── trending-market.component.scss
└── trending-market.component.spec.ts
```

### Classes

PascalCase, matching the file's purpose:

- Component class: `TrendingMarketComponent`
- Directive class: `ChangeColor` (no `Directive` suffix needed if attribute selector makes it obvious)
- Pipe class: `SymbolPipe`
- Service class: `MarketService`
- Model: `interface CryptoToken { ... }`

### Selectors

Prefix all selectors with `app-`:

- Component: `app-trending-market`
- Directive: `[appChangeColor]` (camelCase attribute)

Avoid name duplication like `app-header-component`. The selector is `app-header`, the class is `HeaderComponent`, the folder is `header/`.

## Where to put new code

Ask: **who uses this?**

| Used by                    | Location                            |
| -------------------------- | ----------------------------------- |
| One feature only           | `<feature>/shared/`                 |
| Multiple features          | `shared/`                           |
| App shell (header/sidebar) | `layout/`                           |
| App-wide singleton service | `core/`                             |
| One page of one feature    | `<feature>/<page>/`                 |

### Examples

- A pipe used only in the dashboard table → `dashboard/shared/symbol.pipe.ts`
- A button reused on every page → `shared/button/button.component.ts`
- The HTTP error interceptor → `core/interceptors/error.interceptor.ts`
- The trending market table (a sub-component of dashboard) → `dashboard/trending-market/`

## Dependency rules

Imports may only flow **downward**:

```
feature ─► layout ─► shared ─► core
```

- `core/` and `shared/` **must not** import from features.
- `shared/` **must not** contain business logic — only generic UI primitives, formatting utilities, theme tokens.
- Features may freely import from `shared/`, `layout/`, `core/`.
- One feature **must not** import from another feature. Lift common code to `shared/` instead.

## Component conventions

- All components are **standalone** (no NgModules).
- Use the **signal-based APIs**: `input()`, `output()`, `model()`, `signal()`, `computed()`, `effect()`.
- Inject dependencies with `inject()`, not constructor parameters.
- Mark properties bound from the template as `protected` when they aren't part of the public API.
- Mark Angular-initialized properties (`input()`, `model()`, query results) as `readonly`.

```typescript
@Component({
  selector: 'app-trending-market',
  imports: [MatTableModule, Typography],
  templateUrl: './trending-market.component.html',
  styleUrl: './trending-market.component.scss',
})
export class TrendingMarketComponent {
  protected readonly tokens = CRYPTO_TOKENS;
  protected readonly displayedColumns = ['name', 'symbol', 'lastPrice', 'change24hour'];
}
```

## Avoid

- Generic file names: `utils.ts`, `helpers.ts`, `common.ts`. Name files by what they contain.
- Grouping by type at the top level: no top-level `components/`, `directives/`, `pipes/` folders. Group by feature.
- Barrel `index.ts` files that re-export everything. Import directly from the module that owns the symbol.
- Mixing concerns: keep business logic out of `shared/`, keep UI primitives out of `core/`.
- Long folder paths with redundant names: `header/header.component.ts`, not `header-component/header-component.ts`.
