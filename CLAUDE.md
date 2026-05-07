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
| `@common` | `src/common/` |
| `@pages` | `src/pages/` |
| `@static` | `src/static/` |
| `@utils` | `src/utils/` |
| `@utils/constants` | `src/utils/constants/` |
| `@utils/api` | `src/utils/api/` |
| `@utils/helpers` | `src/utils/helpers/` |
| `@utils/hooks` | `src/utils/hooks/` |
| `@features` | `src/features/` |

---

## Architecture — Simplified FSD (Feature-Sliced Design)

This project uses a **simplified FSD** architecture. FSD divides code into layers where each layer has a strict responsibility and can only import from layers below it.

### Layer rules (MUST follow):

```
pages      → can import from features, common, utils
features   → can import from common, utils
common     → can import from utils only — NO features imports
utils      → no internal project imports
```

**Never import a higher layer into a lower one.**
Example: `common` must NOT import from `features`. If a component needs `useTheme` or `useIntl` — it belongs in `features`, not `common`.

---

### Layer: `src/common/`

**Pure UI components with no business logic and no feature dependencies.**

Use for: buttons, inputs, checkboxes, modals, cards — anything that only receives props.

```
src/common/
  buttons/
    Button/
      Button.tsx
      Button.module.css
    index.ts
  fields/
    inputs/
      Input/
        Input.tsx
        Input.module.css
      PasswordInput/
        PasswordInput.tsx
        PasswordInput.module.css
      CheckBox/
        CheckBox.tsx
        CheckBox.module.css
      index.ts
    index.ts
```

**Rules for `common` components:**
- Each component lives in its own folder named after it
- CSS Module is co-located in the same folder as the component
- Group-level `index.ts` re-exports everything
- Must NOT use `useTheme`, `useIntl`, or any feature hook
- Must NOT import from `@features`

---

### Layer: `src/features/`

**Self-contained feature modules with their own state, context, hooks, and components.**

Use for: anything that has its own context/provider, uses other feature hooks, or has business logic.

Each feature follows this internal structure:

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
```

**Rules for `features`:**
- Each feature folder has its own `index.ts` barrel export
- Sub-folders (`context/`, `hooks/`, `components/`) each have their own `index.ts`
- All features are re-exported from `src/features/index.ts`
- Components with state or feature-hook dependencies go here, NOT in `common`
- Import features via `@features`: `import { useTheme } from '@features'`

**How to decide: `common` vs `features`?**

| Question | Answer |
|---|---|
| Does it use `useTheme`, `useIntl`, or any context? | → `features` |
| Does it only receive props, no feature hooks? | → `common` |
| Does it have its own Context/Provider? | → `features` |
| Is it a pure UI primitive (button, input)? | → `common` |

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
- Can import from `@features`, `@common`, `@utils`

---

### Layer: `src/utils/`

**Pure utilities: no React components, no context, no business logic.**

```
src/utils/
  api/
    instance.ts      ← API class and api instance
    index.ts
  constants/
    cookies.ts       ← COOKIE_NAMES
    routes.ts        ← ROUTES
    validations.ts   ← MIN_LENGTH etc.
    index.ts
  helpers/
    cookies/         ← getCookie, setCookie, deleteCookie
    intl/            ← getLocale, getMessages
    valdiations/     ← validateIsEmpty
    index.ts
  hooks/
    api/             ← useQuery, useQueryLazy, useMutation
    form/            ← useForm
    index.ts
  index.ts
```

---

### Adding a new feature — checklist

1. Create folder `src/features/your-feature/`
2. Add sub-folders as needed: `context/`, `hooks/`, `components/`
3. Each sub-folder gets its own `index.ts`
4. Create `src/features/your-feature/index.ts` that re-exports everything
5. Add `export * from './your-feature'` to `src/features/index.ts`

### Adding a new common component — checklist

1. Create folder `src/common/group/ComponentName/`
2. Add `ComponentName.tsx` and `ComponentName.module.css` inside
3. Export from the group `index.ts`
4. Component must NOT import from `@features`

### Adding a new page — checklist

1. Create folder `src/pages/PageName/`
2. Add `PageName.tsx` (and `PageName.module.css` if needed)
3. Export from `src/pages/index.ts`
4. Add route in `src/App.tsx`

---

## API Layer (`src/utils/api/`)

`API` class wraps `fetch` with `credentials: 'include'`. Base URL is `http://localhost:3000/api/`.

```typescript
type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;
```

Data-fetching hooks in `src/utils/hooks/api/`:
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

## Git Workflow

Direct pushes to `main` are blocked. Always use a feature branch → PR:

```bash
git checkout -b feat/your-feature
# make changes and commit
git push origin feat/your-feature
# open PR on GitHub → main
```

Branch naming: `feat/`, `fix/`, `chore/`, `refactor/`, `docs/` prefixes.
