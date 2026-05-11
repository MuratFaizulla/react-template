# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite, localhost:5173)
npm run build      # Type-check + build for production (tsc -b && vite build)
npm run lint       # ESLint
npm run preview    # Preview production build
```

No test runner is configured.

## Path Aliases

All aliases resolve from `src/`:

| Alias | Path |
|---|---|
| `@` | `src/` |
| `@app` | `src/app/` |
| `@pages` | `src/pages/` |
| `@widgets` | `src/widgets/` |
| `@features` | `src/features/` |
| `@shared` | `src/shared/` |
| `@shared/ui` | `src/shared/ui/` |
| `@shared/api` | `src/shared/api/` |
| `@shared/config` | `src/shared/config/` |
| `@shared/lib` | `src/shared/lib/` |
| `@static` | `src/static/` |

---

## Architecture — Full FSD (Feature-Sliced Design)

This project uses **canonical FSD** architecture. Each layer can only import from layers below it.

### Layer hierarchy (top → bottom):

```
app → pages → widgets → features → shared
```

**Never import a higher layer into a lower one.**

---

### Layer: `src/app/`

**Application entry point: router, providers, global setup.**

```
src/app/
  App.tsx        ← root component (router + providers)
  App.css
  index.ts
```

---

### Layer: `src/pages/`

**Route-level page components. One folder per page.**

```
src/pages/
  LoginPage/
    LoginPage.tsx
    LoginPage.module.css
  RegistrationPage/
    RegistrationPage.tsx
    RegistrationPage.module.css
    PasswordRules/           ← sub-components local to this page
      PasswordRules.tsx
      PasswordRule/
        PasswordRule.tsx
        PasswordRule.module.css
  index.ts
```

**Rules for `pages`:**
- Each page in its own folder
- Sub-components only used by that page live inside the page folder
- Can import from `@widgets`, `@features`, `@shared`

---

### Layer: `src/widgets/`

**Composite UI blocks that assemble features into page sections.**

Use for: Header, Footer, Sidebar, Layout wrappers — components that use multiple features.

```
src/widgets/
  layout/
    components/
      Header/
        Header.tsx
        Header.module.css
      Footer/
        Footer.tsx
        Footer.module.css
      Layout/
        Layout.tsx
        Layout.module.css
      index.ts
    index.ts
  index.ts
```

**Rules for `widgets`:**
- Can import from `@features` and `@shared`
- Cannot import from `@pages`
- Import via `@widgets`: `import { Layout } from '@widgets'`

---

### Layer: `src/features/`

**Self-contained feature modules with their own state, context, hooks, and components.**

Use for: anything that has its own context/provider, uses other feature hooks, or has business logic.

```
src/features/
  theming/
    context/
      ThemeContext.ts
      ThemeProvider.tsx
      index.ts
    hooks/
      useTheme.ts
      index.ts
    index.ts
  intl/
    context/
      IntlContext.ts
      IntlProvider.tsx
      index.ts
    hooks/
      useIntl.ts
      index.ts
    components/
      IntlText.tsx
      index.ts
    index.ts
```

**Rules for `features`:**
- Each feature folder has its own `index.ts` barrel export
- Sub-folders (`context/`, `hooks/`, `components/`) each have their own `index.ts`
- All features are re-exported from `src/features/index.ts`
- Can import from `@shared` only
- Import via `@features`: `import { useTheme } from '@features'`

**How to decide: `shared/ui` vs `features`?**

| Question | Answer |
|---|---|
| Does it use `useTheme`, `useIntl`, or any context? | → `features` |
| Does it only receive props, no feature hooks? | → `shared/ui` |
| Does it have its own Context/Provider? | → `features` |
| Is it a pure UI primitive (button, input)? | → `shared/ui` |

---

### Layer: `src/shared/`

**Reusable primitives with no business logic. Base layer — imports nothing from above.**

```
src/shared/
  ui/                        ← pure UI components (no hooks, no context)
    buttons/
      Button/
        Button.tsx
        Button.module.css
      index.ts
    fields/
      inputs/
        Input/Input.tsx
        PasswordInput/PasswordInput.tsx
        CheckBox/CheckBox.tsx
        index.ts
      index.ts
    index.ts
  api/                       ← API class and api instance
    instance.ts
    index.ts
  config/                    ← constants: COOKIE_NAMES, ROUTES, MIN_LENGTH
    cookies.ts
    routes.ts
    validations.ts
    index.ts
  lib/                       ← pure helpers and hooks
    cookies/                 ← getCookie, setCookie, deleteCookie
    intl/                    ← getLocale, getMessages
    validations/             ← validateIsEmpty
    hooks/
      api/                   ← useQuery, useQueryLazy, useMutation
      form/                  ← useForm
      index.ts
    index.ts
  index.ts
```

**Rules for `shared`:**
- `shared/ui` components must NOT use `useTheme`, `useIntl`, or any feature hook
- `shared/ui` must NOT import from `@features` or `@widgets`
- Import via `@shared`: `import { api, useForm } from '@shared'`
- Import sub-paths: `import { Button } from '@shared/ui/buttons'`

---

### Adding a new widget — checklist

1. Create folder `src/widgets/your-widget/`
2. Add `components/` sub-folder with component files
3. Each sub-folder gets its own `index.ts`
4. Create `src/widgets/your-widget/index.ts`
5. Add `export * from './your-widget'` to `src/widgets/index.ts`

### Adding a new feature — checklist

1. Create folder `src/features/your-feature/`
2. Add sub-folders as needed: `context/`, `hooks/`, `components/`
3. Each sub-folder gets its own `index.ts`
4. Create `src/features/your-feature/index.ts` that re-exports everything
5. Add `export * from './your-feature'` to `src/features/index.ts`

### Adding a new shared/ui component — checklist

1. Create folder `src/shared/ui/group/ComponentName/`
2. Add `ComponentName.tsx` and `ComponentName.module.css` inside
3. Export from the group `index.ts`
4. Component must NOT import from `@features` or `@widgets`

### Adding a new page — checklist

1. Create folder `src/pages/PageName/`
2. Add `PageName.tsx` (and `PageName.module.css` if needed)
3. Export from `src/pages/index.ts`
4. Add route in `src/app/App.tsx`

---

## API Layer (`src/shared/api/`)

`API` class wraps `fetch` with `credentials: 'include'`. Base URL is `http://localhost:3000/api/`.

```typescript
type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;
```

Data-fetching hooks in `src/shared/lib/hooks/api/`:
- `useQuery(request, deps)` — fires on mount, re-fires when deps change, cancels on unmount
- `useQueryLazy(request)` — fires manually via returned `query()` function
- `useMutation(request)` — returns `mutationAsync`, `isLoading`, `error`, `reset`

## Form Handling

`useForm<Values>({ initialValues, validateSchema, validateOnChange, onSubmit })` returns `{ values, errors, setFieldValue, setFieldsError, handleSubmit, isSubmitting, setIsSubmitting }`.

`validateSchema` maps field keys to functions returning `string | null` (null = valid).

## i18n (intl feature)

- Locale auto-detected from cookie → `navigator.language` → fallback `ru`
- Message files: `src/static/locales/{ru,kk,en-US}.json`
- Keys use dot-notation: `"button.signIn"`, `"page.login.createNewAccont"`
- Rich text: `"must contain <rule>numbers</rule>"` — rendered via `values={{ rule: (t) => <b>{t}</b> }}`
- Switch locale at runtime: `const { setLocale } = useIntl(); setLocale('en-US')`

## Theming

- Two themes: `light` | `dark` — persisted in `COOKIE_NAMES.THEME` cookie
- CSS variables defined in `src/static/theme/light/light.module.css` and `dark/dark.module.css`
- Toggle: `const { theme, setTheme } = useTheme(); setTheme('dark')`

## Static Assets (`src/static/`)

- `locales/` — i18n JSON files (ru, kk, en-US)
- `theme/light/` and `theme/dark/` — CSS Modules + SVG icons per theme
- `css/` — global CSS and font imports

---

## CSS Modules

All component styles use CSS Modules (`.module.css`). Rules:
- File co-located with the component in the same folder
- Class names use `snake_case`: `.form_container`, `.input_container`
- No global class names inside modules — everything is scoped
- Import as `styles`: `import styles from './Button.module.css'`

```tsx
<div className={styles.page}>
  <div className={styles.form_container}>
```

---

## TypeScript Conventions

- Interfaces for object shapes: `interface LoginPageProps { onAuthSuccess: () => void }`
- `type` for unions, aliases: `type Theme = 'light' | 'dark'`
- No `any` — use generics or proper types
- Global declarations (shared across the codebase) go in `src/@types/*.d.ts`
- Component props type declared just above the component: `interface Props { ... }`
- Always type the return of functions that aren't obvious

---

## Barrel Exports

Every folder that exposes multiple things has an `index.ts`:

```
shared/ui/buttons/
  Button/Button.tsx
  index.ts          ← export * from './Button/Button'
```

Import via the folder, never via the internal file path:
```ts
import { Button } from '@shared/ui/buttons';    // correct
import { Button } from '@shared/ui/buttons/Button/Button';  // wrong
```

---

## Naming Conventions

| What | Convention | Example |
|------|-----------|---------|
| Components | `PascalCase` | `LoginPage`, `Button` |
| Hooks | `camelCase` + `use` prefix | `useForm`, `useTheme` |
| Constants | `UPPER_SNAKE_CASE` | `COOKIE_NAMES`, `ROUTES` |
| CSS classes | `snake_case` | `.form_container` |
| Files/folders | `PascalCase` for components, `camelCase` for hooks/utils | `Button.tsx`, `useForm.ts` |
| i18n keys | dot-notation | `"page.login.title"` |

---

## Component Patterns

### Page component

```tsx
export const LoginPage = ({ onAuthSuccess }: LoginPageProps) => {
  // hooks at the top
  // derived state / memos
  // handlers
  // render
};
```

### Feature with context

Each feature that needs global state uses React Context + Provider pattern:
1. `context/FeatureContext.ts` — creates the context with default value
2. `context/FeatureProvider.tsx` — manages state, wraps children
3. `hooks/useFeature.ts` — consumes context, throws if used outside provider
4. `index.ts` — re-exports everything

### Validation schema

```ts
const validateSchema = {
  username: (value: string) => (!value ? 'Required' : null),
  password: (value: string) => (value.length < 8 ? 'Too short' : null),
};
```

---

## Adding a new entity (future: `src/entities/`)

When the project grows to include domain models, add a new `entities/` layer between `features` and `shared`:

```
app → pages → widgets → features → entities → shared
```

Entity structure:
```
src/entities/
  patient/
    model/          ← types, interfaces
    api/            ← API calls for this entity
    ui/             ← entity-specific UI (PatientCard)
    index.ts
```

---

## Git Workflow

Direct pushes to `main` are blocked. Always use a feature branch → PR:

```bash
git checkout -b feat/your-feature
# make changes and commit
git push origin feat/your-feature
# open PR on GitHub → main
```

Branch naming: `feat/`, `fix/`, `chore/`, `refactor/`, `docs/` prefixes.

### Commit convention

```
feat: add patient search page
fix: resolve token expiration on refresh
refactor: migrate to full FSD architecture
chore: update vite config aliases
docs: update README with FSD architecture
```
