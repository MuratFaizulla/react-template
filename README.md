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
git clone https://github.com/your-username/react-template.git
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
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
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
│   ├── fonts/          # Font files
│   ├── images/         # Image assets
│   ├── locales/        # Translation files (ru, kk, en-US)
│   └── theme/          # CSS variables per theme
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

Configured in both `vite.config.ts` and `tsconfig.app.json`.

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
| `@/*` | `src/*` |
| `@common/*` | `src/common/*` |
| `@pages` | `src/pages` |
| `@static/*` | `src/static/*` |
| `@utils` | `src/utils` |
| `@utils/constants` | `src/utils/constants` |
| `@utils/api` | `src/utils/api` |
| `@utils/helpers` | `src/utils/helpers` |
| `@utils/hooks` | `src/utils/hooks` |
| `@utils/contexts` | `src/utils/contexts` |
| `@features` | `src/features` |

---

## Internationalization (i18n)

Built-in lightweight i18n system supporting **Russian**, **Kazakh**, and **English**.

Translation files are located in `src/static/locales/`.

**Supported locales:** `ru` · `kk` · `en-US`

The locale is detected automatically from `navigator.language`. Falls back to `ru` if not supported.

### Usage

```tsx
// Simple text
<IntlText path='button.signIn' />

// With values
<IntlText path='page.greeting' values={{ name: 'Murat' }} />

// With rich text tags
<IntlText
  path='page.registration.passwordRules.containNumbers'
  values={{ rule: (text) => <strong>{text}</strong> }}
/>
```

Translation keys support inline tag interpolation:

```json
{
  "page.registration.passwordRules.containNumbers": "Must contain <rule>at least one number</rule>"
}
```

---

## Theming

Supports **light** and **dark** themes via CSS custom properties.

Theme is persisted in a cookie and applied via `ThemeProvider`.

```tsx
import { useTheme } from '@features';

const { theme, setTheme } = useTheme();
setTheme('dark');
```

Theme variables are defined in:
- `src/static/theme/light/light.module.css`
- `src/static/theme/dark/dark.module.css`

---

## Custom Hooks

### `useForm`

Lightweight form state manager with validation.

```tsx
const { values, errors, setFieldValue, handleSubmit } = useForm({
  initialValues: { email: '', password: '' },
  validateSchema: {
    email: (value) => (!value ? 'Required' : null),
    password: (value) => (!value ? 'Required' : null),
  },
  onSubmit: (values) => console.log(values),
});
```

### `useMutation`

For POST/PUT/DELETE requests with loading and error state.

```tsx
const { mutationAsync, isLoading, error } = useMutation((values) =>
  api.post('auth/login', values)
);
```

### `useQuery`

For GET requests that run on mount.

```tsx
const { data, isLoading, error } = useQuery(() => api.get('users'));
```

### `useQueryLazy`

Like `useQuery`, but triggered manually.

```tsx
const { query, data, isLoading } = useQueryLazy(() => api.get('profile'));
```

---

## HTTP Client

A thin wrapper around the native `fetch` API located in `src/utils/api/instance.ts`.

```typescript
// GET
const response = await api.get<User[]>('users');

// POST
const response = await api.post<User>('auth/login', { username, password });
```

All responses follow a unified `ApiResponse<T>` type:

```typescript
type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;
```

---

## Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/).

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code refactoring without behavior change |
| `style` | Formatting only (no logic changes) |
| `chore` | Config, dependencies, tooling |
| `docs` | Documentation changes |
| `test` | Tests |
| `perf` | Performance improvement |
| `build` | Build system changes |
| `ci` | CI/CD changes |
| `revert` | Revert a previous commit |

**Examples:**

```bash
feat: add user profile page
fix: resolve token expiration on refresh
refactor: extract form validation to shared hook
chore: upgrade vite to v7
docs: update README with theming section
```

---

## Deployment

The project includes a `vercel.json` configuration for deploying to [Vercel](https://vercel.com/) with client-side routing support.

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## License

[MIT](./LICENSE)