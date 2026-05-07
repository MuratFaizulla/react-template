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

## Architecture

### App Entry & Routing (`src/App.tsx`)

Auth state is determined by the `doggee-auth-token` cookie. Unauthenticated users see `AuthRoutes` (`/auth`, `/registration`); authenticated users see `MainRoutes`. Theme and locale are also read from cookies on load.

The app wraps everything in `ThemeProvider` → `IntlProvider` → `BrowserRouter`.

### Features (`src/features/`)

- **theming** — `ThemeProvider` applies a CSS Module class (`dark.module.css` or `light.module.css`) to a wrapper div. Theme is persisted in cookie `COOKIE_NAMES.THEME`. Toggle via `useTheme()` hook.
- **intl** — `IntlProvider` loads locale messages from `src/static/locales/{locale}.json` (supports `en-US`, `ru`, `kk`). Locale is detected via `getLocale()` helper. Use `useIntl()` or `<IntlText>` component for translations. Message keys use dot-notation (e.g. `"button.signIn"`). Rich text in messages uses `<rule>...</rule>` tags.

### API Layer (`src/utils/api/`)

`API` class wraps `fetch` with `credentials: 'include'`. Base URL is `http://localhost:3000/api/`. All responses are typed as `ApiResponse<T>` (see `src/@types/api.d.ts`).

Data-fetching hooks in `src/utils/hooks/api/`:
- `useQuery` — fires on mount, cancels on unmount
- `useQueryLazy` — fires manually
- `useMutation` — for POST/PUT/DELETE

### Form Handling (`src/utils/hooks/form/useForm.ts`)

`useForm<Values>({ initialValues, validateSchema, validateOnChange, onSubmit })` returns `{ values, errors, setFieldValue, setFieldsError, handleSubmit, isSubminting, setIsSubmiting }`.

`validateSchema` maps field keys to validator functions returning `string | null`.

### Common Components (`src/common/`)

Reusable UI: `Button`, `Input`, `PasswordInput`, `CheckBox`. Each uses CSS Modules co-located with the component file.

### Constants (`src/utils/constants/`)

- `COOKIE_NAMES` — cookie key names
- `ROUTES` — route path strings
- `validations` — shared validation functions

### Static Assets (`src/static/`)

- `locales/` — i18n JSON files
- `theme/light/` and `theme/dark/` — theme CSS modules and SVG assets (icons change per theme)
- `css/` — global CSS and font imports
