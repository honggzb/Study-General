# Copilot Instructions

## Package Manager

Use **npm** exclusively. Do not use `bun` despite the `bun.lock` file present at root. `package-lock.json` is gitignored and not committed.

## Commands

```bash
npm run dev           # Dev server at http://localhost:3000/dvi-ui
npm run build         # Production build
npm run build:local   # prettier --write . then next build
npm run lint          # ESLint
npm run fix:eslint    # Auto-fix ESLint issues
npm run format        # Prettier format
npm run test          # Jest with coverage (slow by default)
npm run test:watch    # Jest watch mode
npm run test:coverage # Jest coverage report
npm run test:ci       # Jest CI mode
npm run copy:assets   # Copy images, favicons, fonts, scripts, and wysiwyg dist from node_modules into public/
```

**Run a single test file:**
```bash
npx jest --config ./jest.config.ts path/to/test/file.test.tsx
npx jest --config ./jest.config.ts --testPathPattern="access-management"
npx jest --config ./jest.config.ts -t "test name pattern"
```

**TypeScript check** (no dedicated script):
```bash
npx tsc --noEmit
```

**After every `npm install`**, run `npm run copy:assets` to populate `public/` with fonts, favicons, images, scripts, and wysiwyg dist files.

## Setup Quirks

- **Node 18 required** — `.nvmrc` pins `18`.
- **Custom npm registry** — `npmrc` (no leading dot, committed to repo) points to a private Azure Artifacts feed for `@ongov/ontario-design-system-complete-styles`. Requires a PAT token; `npm install` will fail without it.
- **`react-draft-wysiwyg` is a local `.tgz`** at `./public/react-draft-wysiwyg/react-draft-wysiwyg-1.15.2.tgz`. This file must exist before running `npm install`.
- **`.env.development` is gitignored.** Key required vars: `DVI_APP_BASE_PATH`, `DVI_API_BASE_PATH`, `DVI_API_APIM_BASE_PATH`, `OPS_SECURE_CLIENTID`, `OPS_SECURE_CLIENTSECRET`, `OPS_SECURE_DOMAIN`, `OPS_SECURE_ISSUER`, `OPS_SECURE_CALLBACK_URI`, `NEXTAUTH_SECRET`. Additional vars: `DVI_API_USER_ENDPOINT`, `OCP_APIM_KEY`, `NEXTAUTH_SESSION_DURATION`, `IDLE_SESSION_TIMEOUT_DURATION`, `APPLICATIONINSIGHTS_CONNECTION_STRING`, and others. Get values from a team member.

## Architecture

### Framework
Next.js 15 with **Pages Router only**. No App Router, no Server Actions. App is served at base path `/dvi-ui`. The root `/` redirects to `/home?3=3` — the `?3=3` is intentional.

### Import alias
`~/` maps to `src/`. Always use `~/path/to/module`, never relative `../../../`.

### Service layer
```
Component/Hook → DviService / [FeatureApiService] → HttpService (Axios) → Backend
```
- Never instantiate services with `new` in application code. Resolve from the tsyringe container via the service hooks in `~/services/helpers/use-dvi-service.ts`:
  - `useDviService()` — general driver/vehicle operations
  - `useOfficeService()` — office API
  - `useProductManagementService()`, `useAttributeService()`, `useCatalogueService()`, `useCategoryService()`, `useFeeCodeService()`, `useTransactionService()` — product management
  - `useFinancialProductService()`, `useSegmentService()` — financial
  - `useComplianceService()` — compliance monitoring
  - `useRoleMappingService()` (`~/services/helpers/use-role-mapping-service.ts`) — role mapping
- All services are registered once at startup via `bootstrap()` in `src/utils/bootstrap.util.ts`, which is called at the top of `pages/_app.tsx`.
- `reflect-metadata` **must be the first import** in any file that uses DI decorators (including every test file that exercises DI).

### API responses
All backend calls return `ApiResponse<T>` (`src/services/api/api-response.ts`):
```ts
type ApiResponse<T> = { data: T; statusCode: number; message: string; errorCodes?: string[] }
```
**Always check `errorCodes` before accessing `data`** — the service layer never throws.

### State management — three separate systems
| System | Location | Use |
|---|---|---|
| React Query (TanStack v5) | `~/react-query/` | Server/async state |
| React Context + reducer | `~/store/store.tsx` | App-wide UI state (`useStateValue()`) |
| Zustand (`^5.0.0-rc.2`) | `~/store/*Store.ts` | Domain-specific client state (no provider needed) |


## Folder Layout

```
pages/                        # Next.js Pages Router — one file per route
  _app.tsx                    # App entry point; calls bootstrap() and sets up providers
  _document.tsx
  home/                       # /home route (default landing)
  access-management/          # User/group/role management screens
  audit/                      # Audit log screens
  notifications-management/   # Notification templates and management
  logout/                     # Sign-out handler
  unauthorized/               # Access denied (query codes: ?1=1, ?2=2, ?3=3)
  … (auth/, sitemap/, api/ helper routes)

src/
  assets/
    icons/                    # SVG icon assets

  components/
    ontario-ui/               # ⭐ Standard reusable UI components (Ontario Design System wrappers)
      accordion/              # Expandable accordion
      aside/                  # Side-panel aside
      back-button/            # Back navigation button
      back-to-top/            # Scroll-back-to-top button
      badge/                  # Status/count badge
      blockquote/             # Styled blockquote
      button/                 # Primary/secondary/icon buttons
      callout/                # Callout/highlight box
      card/                   # Content card
      chips/                  # Chip/tag elements
      command/                # Command palette
      critical-alert/         # Critical alert banner
      date-calendar/          # Calendar date picker
      dialog/                 # Modal dialog
      footer/                 # Page footer
      form-elements/          # checkbox, date-picker, dropdown, dropMenu, error-messaging,
                              # field-set, hint-text, label, mult-select, multi-text,
                              # radio-button, step-indicator, table-single-dropdown,
                              # text-input, textarea, time-picker
      loading-indicator/      # Spinner / loading state
      page-alert/             # Info/success/warning/error page alerts
      pagination/             # Pagination controls
      popup/                  # Popup overlay
      search-box/             # Search input box
      table/                  # Data table

    common/                   # Shared app-level UI building blocks (accordions, cards,
                              # dialogs, dropdowns, headers, pagination, step-indicators,
                              # tables, tabs, tooltips, spinners, etc.)
    ui/                       # Feature-specific composite components (licence status,
                              # progress steps, form descriptions, loading containers)
    access-management/        # Access-management feature components
    audit/                    # Audit log components
    driver/                   # Driver feature components
    driver-record-summary/    # Driver record summary components
    financial-management/     # Financial management components
    form/                     # Generic form layout components
    form-elements/            # Custom form primitives (separate from ontario-ui/form-elements/):
                              # advanceSearch, button, checkbox, dropdown-control, fieldset,
                              # form-group, hint-expander, hint-text, inline-error, label,
                              # legend, multi-select-dropdown, radio-button, radio-button-group,
                              # search-component, select-input, suggestion-box, text-area,
                              # text-input, text-input-copy
    icons/                    # Icon components
    monitor-compliance/       # Compliance monitoring components
    notification/             # Notification components
    office-financial/         # Office financial components
    orders/                   # Orders components
    payment/                  # Payment components
    plate/                    # Plate components
    product-management/       # Product management components
    renew-driver-licence/     # Licence renewal flow components
    schedule-jobs/            # Scheduled jobs components
    search/                   # Search components
    vehicle/                  # Vehicle components
    has-access.tsx            # Permission gate — wraps children based on user attributes

  constants/                  # App-wide constants

  context/                    # React context providers (beyond the main store)

  hooks/                      # Custom React hooks (useUserPermission, useScreenAttributes, etc.)

  mocks/                      # Mock data for tests and development

  models/                     # TypeScript interfaces/types organized by domain
    audit/ auth/ driver/ dvi/ financial-management/ group/ notifications/
    office/ permission/ product/ role/ user/ …

  notificationTemplateContext/ # React context for notification template editing

  react-query/                # TanStack Query v5 setup (query-client-provider, query-key)

  role-mapping/               # Role-to-permission mapping logic (constants, hooks, types)

  services/
    api/                      # Domain API service classes:
                              #   dvi-api.service.ts, common-service.ts, error-response.ts,
                              #   financial-product-service.ts, monitor-compliance-service.ts,
                              #   rola-mapping-api.service.ts, schedule-services.ts,
                              #   segment.service.ts, office/ (OfficeAPiService),
                              #   product-management/ (Attribute, Catalogue, Category, FeeCode,
                              #   Transaction, ProductManagement services)
                              #   api-response.ts — ApiResponse<T> type
    endpoints/                # API endpoint constants
    helpers/                  # Service resolver hooks (useDviService, useOfficeService,
                              # useProductManagementService, useComplianceService, etc.)
                              # use-role-mapping-service.ts — useRoleMappingService()
    hooks/                    # useGetHooks, useMutation data-fetching hooks
    http-service/             # Axios HttpService wrapper
    permitted-values/         # Permitted-values service
    dvi.service.ts            # Main DVI service
    feature-flags.service.ts
    role-mapping.service.ts
    runtime-config.service.ts

  store/
    store.tsx                 # React Context + reducer (useStateValue)
    actions.ts / reducers.ts / state.ts / types.ts
    notificationStore.ts      # Zustand stores (domain-specific client state)
    orderStore.ts
    uamStore.ts
    userPermissionStore.ts

  theme/                      # Styled-components global style and design tokens.
                              # Exports: color, spacing, typography, media (breakpoints),
                              # fonts, visibility, layout primitives (OntarioRow, OntarioColumn,
                              # TextParagraph, Heading1–6, etc.)

  types/                      # Shared TypeScript utility types

  utils/                      # Utility functions (date, format, auth, driver, url, etc.)
    bootstrap.util.ts         # DI container registration — called once in _app.tsx

styles/                       # Global CSS / SCSS stylesheets

__test__/
  pages/                      # Page-level Jest tests (mirrors pages/ structure)
```

## Component Reuse Policy

**Before creating ANY new component, you MUST search and analyze the existing components in this repository.** The project already has a comprehensive library of reusable UI components following the Ontario Design System. Creating duplicate or custom components when existing ones are available is strictly prohibited.

### Where to look (in order)

1. **`src/components/ontario-ui/`** — Standard Ontario Design System wrappers for buttons, form elements, tables, dialogs, pagination, alerts, cards, chips, badges, and more. Use these whenever the requirement can be satisfied by a standard UI primitive.
2. **`src/components/common/`** — App-level shared components (accordions, dropdowns, headers, step-indicators, spinners, tabs, tooltips, etc.).
3. **`src/components/ui/`** — Feature-level composite components.
4. **`src/components/form-elements/`** — Additional custom form element wrappers.

Only create a new component when no existing component meets the requirement.

### Rules

1. **Always search first.** Before writing a new styled-component, custom element, or wrapper, check the directories above for an existing solution.
2. **Compose, don't recreate.** If a component partially fits your need, wrap or extend it — don't rebuild from scratch.
3. **Use theme tokens.** Import `color`, `spacing`, `typography`, `media` from `~/theme` for consistent styling. Never hardcode Ontario Design System values when tokens exist.
4. **Prefer ODS CSS classes.** When Ontario Design System CSS classes already handle the layout (e.g. `ontario-accordion`, `ontario-form-group`), use those classes rather than re-implementing with styled-components.
5. use '.github\skills\vercel-react-best-practices\SKILL.md' and '.github\skills\react-component-performance\SKILL.md' as an auxiliary role

## Key Conventions

### Test file boilerplate
Every test file **must** start with:
```typescript
import 'reflect-metadata'; // MUST be first

jest.mock('next/router', () => ({
    useRouter: () => ({ query: {}, push: jest.fn(), prefetch: jest.fn() }),
}));
jest.mock('next-auth/react', () => ({
    useSession: () => ({ data: { user: { permission: [] } }, status: 'authenticated' }),
    signIn: jest.fn(),
    signOut: jest.fn(),
}));
jest.mock('~/store/store', () => ({
    useStateValue: () => [{ /* initial state */ }, jest.fn()],
}));
```

### Test locations
- Page-level tests live in `__test__/pages/` (mirroring the `pages/` structure).
- Component-level tests are colocated in `src/components/` or in a `test/` subfolder next to the component.
- Coverage thresholds are enforced at **80%** across branches, functions, lines, and statements.

### Data fetching hooks
Two internal hooks exist alongside React Query:
- `useGetHooks` (`~/services/hooks/use-get-request.ts`): wraps async fetches with `loading`/`error`/`refetch` state, waits for `router.isReady`.
- `useMutation` (`~/services/hooks/use-mutation.ts`): wraps mutations with `loading`/`error`/`data` and `onSuccess`/`onError` callbacks.

### i18n
`i18next` is installed but **not active** — no locale files exist. All strings are hardcoded English. Do not build features expecting working translation infrastructure.

### HasAccess component — conditional UI rendering
Use `<HasAccess screen={ScreenName.X} allowedAttribute="ATTR_NAME">` to conditionally render UI elements based on the user's attribute-level permissions. Super-admins always see everything. Located at `~/components/has-access.tsx`.

### Husky pre-commit hooks
The pre-commit hook is entirely commented out. Run lint/format manually before pushing:
```bash
npm run lint && npm run format
```

## CI

- **Azure DevOps** (`devops/azure-pipelines.yml`). Trigger is **manual** (`trigger: none`).
- Stages: Build → DEV → IST → UAT → STG → PROD (plus a parallel Stream2 track for DEV2/IST2/UAT2).
- The pipeline does **not run tests or lint** — it only does Docker build + Kubernetes deploy.
