# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this Next.js TypeScript SaaS repository.

## Development Commands

### Core Commands

- `bun run dev` - Start development server (http://localhost:3000)
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run lint:fix` - Run ESLint with automatic fixes
- `bun run format` - Format with Prettier (includes Tailwind sorting)
- `bun run format:check` - Check if files are formatted correctly
- `bun run type-check` - Run TypeScript type checking

### Database Commands (Drizzle ORM)

- `bun run db:generate` - Generate migrations from schema changes
- `bun run db:migrate` - Run pending migrations
- `bun run db:push` - Push schema changes directly to database (development only)
- `bun run db:studio` - Open Drizzle Studio for database management

### Testing Commands (When Framework Added)

- `bun run test` - Run all tests
- `bun run test:watch` - Run tests in watch mode
- `bun run test:coverage` - Run tests with coverage report
- `bun run test -- path/to/test.spec.ts` - Run single test file
- `bun run test -- --run --reporter=verbose` - Run with detailed output

**Note**: No testing framework configured yet. Use Vitest for modern Next.js projects.

## Code Style Guidelines

### File Structure

```
app/                    # Next.js App Router (pages, API routes, layouts)
├── admin/             # Admin pages
├── api/               # API routes (auth, schema, waitlist)
├── auth/              # Authentication pages
└── blog/              # Blog/MDX content
components/            # React components (atoms/, molecules/, etc.)
hooks/                # Custom React hooks
lib/                  # Library configurations (auth, database)
utils/                # Utility functions
styles/               # Global CSS with Tailwind v4
@types/               # TypeScript type definitions
drizzle/              # Database migrations and generated types
public/               # Static assets
```

### Component Patterns

- Use functional components with `React.FC<Props>`
- Props interfaces extend HTML attributes and `VariantProps`
- Use Class Variance Authority (CVA) for variants
- Export interface as `Props`, component as default
- Use custom `classNames` utility for conditional styling

```typescript
export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button: React.FC<Props> = ({ children, className, variant, size, ...props }) => (
  <button {...props} className={classNames(buttonVariants({ variant, size }), className)}>
    {children}
  </button>
)
```

### Import Patterns

```typescript
import * as React from "react" // Namespace imports for React
import { cva, type VariantProps } from "class-variance-authority"
import classNames from "@/utils/classNames"
import * as motion from "motion/react-client"
```

- Explicit namespace imports for React and multi-export libraries
- Absolute imports with `@/` prefix for internal files
- Group: React → external libs → internal modules

### Naming Conventions

- **Components**: PascalCase (`Button`, `UserCard`)
- **Hooks**: camelCase with `use` prefix (`useTheme`, `useLocalStorage`)
- **Variables**: camelCase (`buttonVariants`, `userData`)
- **Constants**: UPPER_SNAKE_CASE (`BASE_URL`, `API_TIMEOUT`)
- **Types**: PascalCase (`UserProps`, `ApiResponse<T>`)
- **Files**: PascalCase for components, camelCase for utilities

### TypeScript Guidelines

- Strict mode enabled with `strictNullChecks: true`
- Use `interface` for object shapes, `type` for unions/aliases
- Prefer `const` assertions and `as const` for literals
- Leverage path mapping with `@/*` for absolute imports
- Use `React.ComponentProps<typeof Component>` for prop extraction

### Database Patterns

- Schema-first approach with Drizzle ORM
- Use Neon PostgreSQL with proper foreign key relationships
- Implement `$onUpdate` for automatic timestamp updates
- Use `references()` with cascade delete where appropriate

```typescript
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
})
```

### Error Handling

- API routes: Try-catch with `NextResponse.json()` for errors
- Components: Graceful fallbacks and loading states
- Use `console.error` for logging, avoid exposing sensitive data
- Implement proper HTTP status codes and error messages

### Styling Guidelines

- Tailwind CSS v4 with custom `@theme` directives
- Custom animations defined in `styles/main.css`
- Use CSS custom properties for theme variables
- Leverage `classNames` utility for conditional classes
- Follow established design tokens for consistency

### State Management

- React hooks for local component state
- Custom hooks for shared logic (`useLocalStorage`, `useAuth`)
- Context providers for app-wide state
- Server state with React Query/SWR (when added)

## Development Workflow

1. **Setup**: Run `bun run prepare` to install Husky hooks
2. **Development**: Use `bun run dev` with hot reloading
3. **Code Quality**: Always run lint, format, and type-check before commits
4. **Database**: Use `db:generate` → `db:migrate` for schema changes
5. **Testing**: Add tests when implementing features (Vitest + Testing Library)

## Tool Configuration

- **Package Manager**: Bun (faster than npm/yarn)
- **Linting**: ESLint + Next.js rules + Prettier + Better Tailwind CSS
- **Formatting**: Prettier with Tailwind plugin (`tailwindFunctions: ["classNames"]`)
- **TypeScript**: Strict mode with path aliases
- **Git Hooks**: Husky pre-commit checks (lint-staged for JS/TS files)

## Project Features

- **Next.js 15+** with App Router, React 19, and React Compiler
- **MDX Support** for content pages
- **View Transitions** for smooth navigation
- **Better Auth** for authentication (session, account, verification tables)
- **Drizzle ORM** with PostgreSQL (Neon) and schema migrations
- **Tailwind CSS v4** with custom animations and typography plugin
- **Framer Motion** for animations with custom keyframes

## Quality Assurance

Always run these commands before considering work complete:

- `bun run lint` - No ESLint errors
- `bun run type-check` - TypeScript compilation passes
- `bun run format` - Code formatting consistent
- `bun run build` - Production build succeeds

Fix any failures before proceeding. Use `bun run lint:fix` for auto-fixes.
