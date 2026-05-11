# React + TypeScript Starter Template

A clean, scalable, production-ready starter template built on **Feature-Sliced Design (FSD)** architecture.

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [React](https://react.dev/) | 19 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.9 | Type safety |
| [Vite](https://vitejs.dev/) | 7 | Build tool & dev server |
| [React Router](https://reactrouter.com/) | 6 | Client-side routing |
| [ESLint](https://eslint.org/) | 9 | Code linting |
| [Prettier](https://prettier.io/) | 3 | Code formatting |

---

## Getting Started

### Prerequisites

- Node.js `>= 18`
- npm `>= 9`

### Installation

```bash
git clone https://github.com/MuratFaizulla/react-template.git
cd react-template
npm install
```

### Development

```bash
npm run dev       # localhost:5173
```

### Build

```bash
npm run build     # tsc -b && vite build
npm run preview   # preview production build
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (localhost:5173) |
| `npm run build` | Type-check + build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npx prettier . --write` | Format all files |
| `npx prettier . --check` | Check formatting without changes |

---

## Architecture — Feature-Sliced Design (FSD)

The project follows canonical **FSD** — each layer can only import from layers below it.

```
app  →  pages  →  widgets  →  features  →  shared
```

### Layer overview

| Layer | Path | Responsibility |
|-------|------|----------------|
| `app` | `src/app/` | Root component, router, providers |
| `pages` | `src/pages/` | Route-level page components |
| `widgets` | `src/widgets/` | Composite UI blocks (Header, Layout) |
| `features` | `src/features/` | Self-contained feature modules (intl, theming) |
| `shared` | `src/shared/` | Reusable primitives, utilities, API client |

### Import rules

```
pages     → can import from widgets, features, shared
widgets   → can import from features, shared
features  → can import from shared only
shared    → no internal project imports (base layer)
```

**Never import upward.** Example: `features` must NOT import from `widgets` or `pages`.

---

## Project Structure

```
src/
├── @types/                        # Global TypeScript declarations
├── app/                           # App entry: root component + providers
│   ├── App.tsx
│   └── index.ts
├── pages/                         # Route-level page components
│   ├── HomePage/
│   ├── LoginPage/
│   ├── RegistrationPage/
│   │   └── PasswordRules/         # Sub-components scoped to this page
│   ├── NotFoundPage/
│   └── index.ts
├── widgets/                       # Composite UI blocks
│   └── layout/
│       └── components/
│           ├── Header/
│           ├── Footer/
│           └── Layout/
├── features/                      # Feature modules (context + hooks + components)
│   ├── intl/                      # Internationalization
│   └── theming/                   # Light / dark theme
├── shared/                        # Base layer — pure utilities and primitives
│   ├── ui/                        # Pure UI components (no feature hooks)
│   │   ├── buttons/               # Button
│   │   └── fields/inputs/         # Input, PasswordInput, CheckBox
│   ├── api/                       # API class and instance
│   ├── config/                    # Constants: COOKIE_NAMES, ROUTES, MIN_LENGTH
│   ├── lib/                       # Helpers and hooks
│   │   ├── cookies/               # getCookie, setCookie, deleteCookie
│   │   ├── intl/                  # getLocale, getMessages
│   │   ├── validations/           # validateIsEmpty
│   │   └── hooks/
│   │       ├── api/               # useQuery, useQueryLazy, useMutation
│   │       └── form/              # useForm
│   └── index.ts
├── static/                        # Static assets (not imported via aliases in logic)
│   ├── css/                       # Global styles & fonts
│   ├── images/                    # Image assets
│   ├── locales/                   # Translation files (ru, kk, en-US)
│   └── theme/                     # CSS Modules per theme (light / dark)
└── main.tsx                       # Entry point
```

---

## Path Aliases

Configured in `vite.config.ts` and `tsconfig.app.json`.

| Alias | Resolves to |
|-------|-------------|
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

```tsx
// Use aliases instead of relative paths
import { Layout } from '@widgets';
import { useTheme, IntlText } from '@features';
import { Button } from '@shared/ui/buttons';
import { api, useForm } from '@shared';
import { ROUTES } from '@shared/config';
```

---

## Internationalization (i18n)

Built-in lightweight i18n supporting **Russian**, **Kazakh**, and **English**.

Locale is auto-detected: cookie → `navigator.language` → fallback `ru`.

**Supported locales:** `ru` · `kk` · `en-US`

Translation files: `src/static/locales/{ru,kk,en-US}.json`

### Usage

```tsx
// Simple text
<IntlText path='button.signIn' />

// With variable substitution
<IntlText path='footer.copyright' values={{ year: 2025 }} />

// With rich text tags
<IntlText
  path='page.registration.passwordRules.containNumbers'
  values={{ rule: (text) => <strong>{text}</strong> }}
/>

// Programmatic
const { translateMessage, setLocale } = useIntl();
const label = translateMessage('field.input.username.label');
setLocale('en-US');
```

Translation key format:

```json
{
  "button.signIn": "Sign in",
  "footer.copyright": "© {year} React Template",
  "page.registration.passwordRules.containNumbers": "Must contain <rule>at least one number</rule>"
}
```

---

## Theming

Supports **light** and **dark** themes. Theme is persisted in a cookie and applied by `ThemeProvider` via CSS Modules.

```tsx
import { useTheme } from '@features';

const { theme, setTheme } = useTheme();
setTheme('dark');
```

CSS variables per theme:
- `src/static/theme/light/light.module.css`
- `src/static/theme/dark/dark.module.css`

---

## Custom Hooks

### `useForm`

Lightweight form state manager with per-field validation.

```tsx
const { values, errors, setFieldValue, handleSubmit, isSubmitting } = useForm({
  initialValues: { username: '', password: '' },
  validateSchema: {
    username: (value) => (!value ? 'Required' : null),
    password: (value) => (!value ? 'Required' : null),
  },
  validateOnChange: false,
  onSubmit: async (values) => { /* ... */ },
});
```

`validateSchema` maps each field to a function returning `string | null` (null = valid).

### `useMutation`

For POST/PUT/DELETE requests with loading and error state.

```tsx
const { mutationAsync, isLoading, error, reset } = useMutation(
  (values) => api.post('auth/login', values)
);

const data = await mutationAsync({ username, password });
```

### `useQuery`

Fires on mount, cancels on unmount, re-fires when deps change.

```tsx
const { data, isLoading, error } = useQuery(
  () => api.get('users'),
  [userId]
);
```

### `useQueryLazy`

Same as `useQuery` but triggered manually.

```tsx
const { query, data, isLoading } = useQueryLazy(() => api.get('profile'));
await query();
```

---

## HTTP Client

Thin wrapper around native `fetch` in `src/shared/api/instance.ts`. Sends cookies with every request (`credentials: 'include'`). Base URL: `http://localhost:3000/api/`.

```typescript
import { api } from '@shared';

const response = await api.get<User[]>('users');
const response = await api.post<User>('auth/login', { username, password });
```

Unified response type:

```typescript
type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;
// { success: true,  data: T,                  status: number }
// { success: false, data: { message: string }, status: number }
```

---

## Auth Flow

Auth state is determined on app load by reading the `react-template-auth-token` cookie.

After a successful login, call `onAuthSuccess()` — the app updates auth state without a page reload.

Session expiry is controlled by the `react-template-isNotMyDevice` cookie (30-minute TTL when "not my device" is checked).

---

## CSS Modules

All component styles use **CSS Modules** (`.module.css`). Class names are scoped to the component automatically.

```tsx
import styles from './Button.module.css';

<button className={styles.button}>Click</button>
```

Naming convention: `snake_case` for class names in CSS Modules.

---

## Barrel Exports

Every folder with multiple files exposes a single `index.ts` for clean imports.

```
shared/ui/buttons/
  Button/Button.tsx
  index.ts             ← export * from './Button/Button'
```

Import via the folder, not the file:
```tsx
import { Button } from '@shared/ui/buttons';   // correct
import { Button } from '@shared/ui/buttons/Button/Button';  // avoid
```

---

## Git Workflow

Direct pushes to `main` are blocked. Always use a feature branch → PR:

```bash
git checkout -b feat/your-feature
git add <files>
git commit -m "feat: your feature description"
git push origin feat/your-feature
# open PR on GitHub → main
```

### Branch naming

| Prefix | When to use |
|--------|-------------|
| `feat/` | New feature |
| `fix/` | Bug fix |
| `refactor/` | Refactoring |
| `chore/` | Config, tooling, dependencies |
| `docs/` | Documentation |

---

## Commit Convention

Follows [Conventional Commits](https://www.conventionalcommits.org/).

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code refactoring without behavior change |
| `style` | Formatting only |
| `chore` | Config, dependencies, tooling |
| `docs` | Documentation changes |
| `perf` | Performance improvement |
| `build` | Build system changes |
| `ci` | CI/CD changes |
| `revert` | Revert a previous commit |

---

## Git Aliases

Configured in global `~/.gitconfig`:

| Alias | Command |
|-------|---------|
| `git lg` | `log --oneline --graph --decorate --all` |
| `git st` | `status` |
| `git co` | `checkout` |
| `git br` | `branch` |
| `git ps` | `push` |
| `git cm` | `commit` |
| `git pl` | `pull` |
| `git ad` | `add` |
| `git sh` | `stash` |
| `git df` | `diff` |
| `git rb` | `rebase` |

---

## Git Config

| Setting | Value | Effect |
|---------|-------|--------|
| `pull.rebase` | `true` | `git pull` uses rebase — keeps history linear |
| `rebase.autoStash` | `true` | Auto-stashes uncommitted changes before rebase |
| `rerere.enabled` | `true` | Remembers and reapplies conflict resolutions |

---

## Deployment

Includes `vercel.json` for deploying to [Vercel](https://vercel.com/) with SPA routing support.

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## License

[MIT](./LICENSE)
