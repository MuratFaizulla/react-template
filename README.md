# React + TypeScript Starter Template

A clean, scalable, and production-ready starter template for building React applications.

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
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
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

## Project Structure

```
src/
├── @types/             # Global TypeScript declarations
├── common/             # Shared UI components
│   ├── buttons/        # Button components
│   └── fields/         # Input components (Input, PasswordInput, CheckBox)
├── features/           # Feature modules (isolated, self-contained)
│   ├── intl/           # Internationalization (i18n)
│   └── theming/        # Theme management (light / dark)
├── pages/              # Route-level page components
├── static/             # Static assets
│   ├── css/            # Global styles & fonts
│   ├── images/         # Image assets
│   ├── locales/        # Translation files (ru, kk, en-US)
│   └── theme/          # CSS Modules per theme (light / dark)
├── utils/              # Utilities, hooks, helpers
│   ├── api/            # HTTP client (fetch-based)
│   ├── constants/      # App-wide constants
│   ├── helpers/        # Pure helper functions
│   └── hooks/          # Custom React hooks (useForm, useQuery, useMutation)
├── App.tsx             # Root component
└── main.tsx            # Entry point
```

---

## Path Aliases

Configured in `vite.config.ts`.

```typescript
// Instead of relative paths
import { Button } from '../../../common/buttons';

// Use aliases
import { Button } from '@common/buttons';
import { useForm } from '@utils/hooks';
import { LoginPage } from '@pages';
```

| Alias | Resolves to |
|-------|-------------|
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

## Internationalization (i18n)

Built-in lightweight i18n system supporting **Russian**, **Kazakh**, and **English**.

Translation files are in `src/static/locales/`. Locale is auto-detected from `navigator.language`, falls back to `ru`.

**Supported locales:** `ru` · `kk` · `en-US`

### Usage

```tsx
// Simple text
<IntlText path='button.signIn' />

// With variable substitution
<IntlText path='page.greeting' values={{ name: 'Murat' }} />

// With rich text tags
<IntlText
  path='page.registration.passwordRules.containNumbers'
  values={{ rule: (text) => <strong>{text}</strong> }}
/>

// Programmatic
const { translateMessage } = useIntl();
const label = translateMessage('field.input.username.label');
```

Translation key format in JSON:

```json
{
  "button.signIn": "Sign in",
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

Theme CSS variables are in:
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
  onSubmit: (values) => api.post('auth', values),
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

Fires on mount, cancels on unmount.

```tsx
const { data, isLoading, error } = useQuery(
  () => api.get('users'),
  [userId] // re-fetch when userId changes
);
```

### `useQueryLazy`

Same as `useQuery` but triggered manually.

```tsx
const { query, data, isLoading } = useQueryLazy(() => api.get('profile'));

await query(); // call when needed
```

---

## HTTP Client

A thin wrapper around the native `fetch` API in `src/utils/api/instance.ts`. Sends cookies with every request (`credentials: 'include'`). Base URL: `http://localhost:3000/api/`.

```typescript
// GET
const response = await api.get<User[]>('users');

// POST
const response = await api.post<User>('auth/login', { username, password });
```

All responses follow a unified type:

```typescript
type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;

// Success
{ success: true,  data: T,                  status: number }

// Failure
{ success: false, data: { message: string }, status: number }
```

---

## Auth Flow

Auth state is determined on app load by reading the `react-template-auth-token` cookie.

- **Unauthenticated** → `AuthRoutes` (`/auth`, `/registration`)
- **Authenticated** → `MainRoutes`

After a successful login, call `onAuthSuccess()` — the app switches to `MainRoutes` without a page reload.

Session expiry is controlled by the `react-template-isNotMyDevice` cookie (30-minute TTL when "not my device" is checked).

---

## Git Workflow

Direct pushes to `main` are blocked by a local `pre-push` hook and GitHub branch protection rules.

```bash
# 1. Create a feature branch
git checkout -b feat/your-feature

# 2. Make changes and commit
git add .
git commit -m "feat: your feature description"

# 3. Push the branch
git push origin feat/your-feature

# 4. Open a PR on GitHub → main
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
| `pull.rebase` | `true` | `git pull` uses rebase instead of merge — keeps history linear |
| `rebase.autoStash` | `true` | Auto-stashes uncommitted changes before rebase, restores after |
| `rerere.enabled` | `true` | Remembers conflict resolutions and reapplies them automatically |

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

```bash
feat: add user profile page
fix: resolve token expiration on refresh
chore: upgrade vite to v7
docs: update README with theming section
```

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
