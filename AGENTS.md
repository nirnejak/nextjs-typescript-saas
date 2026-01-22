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

**Note**: No testing framework configured yet. When adding Vitest:

- Install: `bun add -D vitest @testing-library/react @testing-library/jest-dom jsdom`

## Code Style Guidelines

### File Structure

```
app/                    # Next.js App Router (pages, API routes, layouts)
├── admin/             # Admin pages
├── api/               # API routes (auth, schema, waitlist)
├── auth/              # Authentication pages
├── blog/              # Blog/MDX content
├── main.css           # Global CSS with Tailwind v4 and custom animations
└── layout.tsx         # Root layout with font loading and theme setup
components/            # React components (organized by atomic design)
├── atoms/            # Basic UI components (Button, etc.)
hooks/                # Custom React hooks
utils/                # Utility functions (classNames, db, schema)
@types/               # TypeScript type definitions (when needed)
drizzle/              # Database migrations and generated types
public/               # Static assets
```

### Component Patterns

- Use functional components with `React.FC<Props>` interface
- Props interfaces extend HTML attributes and `VariantProps` from CVA
- Use Class Variance Authority (CVA) for variant-based styling
- Export interface as `Props`, component as default export
- Use custom `classNames` utility for conditional styling

```typescript
export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button: React.FC<Props> = ({ children, className, variant, size, ...props }) => (
  <button className={classNames(buttonVariants({ variant, size }), className)} {...props}>
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

- Explicit namespace imports for React (`import * as React from "react"`)
- Namespace imports for multi-export libraries (motion, etc.)
- Absolute imports with `@/` prefix for internal files
- Group imports: React → external libraries → internal modules
- Type-only imports for TypeScript types (`import type { Viewport } from "next"`)

### Naming Conventions

- **Components**: PascalCase (`Button`, `UserCard`)
- **Hooks**: camelCase with `use` prefix (`useTheme`, `useLocalStorage`)
- **Variables**: camelCase (`buttonVariants`, `userData`)
- **Constants**: UPPER_SNAKE_CASE (`BASE_URL`, `API_TIMEOUT`)
- **Types**: PascalCase (`Props`, `ApiResponse<T>`, `THEME_HOOK`)
- **Files**: PascalCase for components (`Button.tsx`), camelCase for utilities (`classNames.ts`)
- **Database**: snake_case for table/column names (`user_id`, `email_verified`)

### TypeScript Guidelines

- Strict mode enabled with `strict: true` and `strictNullChecks: true`
- Use `interface` for object shapes and component props
- Use `type` for unions, aliases, and complex type expressions
- Prefer `const` assertions and `as const` for literal types
- Leverage path mapping with `@/*` for absolute imports
- Use `React.ComponentProps<typeof Component>` for extracting component props
- Include return type annotations for hook functions
- Use type imports for better tree-shaking (`import type { Viewport } from "next"`)

### Database Patterns

- Schema-first approach with Drizzle ORM and Neon PostgreSQL
- Use proper foreign key relationships with cascade delete
- Implement `$onUpdate` for automatic timestamp updates

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

- API routes: Try-catch blocks with `NextResponse.json()` for structured error responses
- Components: Graceful fallbacks, loading states, and error boundaries
- Use `console.error` for logging errors, never expose sensitive data
- Implement proper HTTP status codes (200, 400, 500) and descriptive messages

```typescript
export async function POST(request: Request) {
  try {
    // ... operation
    return NextResponse.json({ message: "Success!" }, { status: 200 })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 400 }
    )
  }
}
```

### Styling Guidelines

- Tailwind CSS v4 with custom `@theme` directives in `app/main.css`
- Custom animations defined using `@keyframes` and `--animate-*` variables
- Use CSS custom properties for theme variables (`--sans-font`, `--mono-font`)
- Leverage `classNames` utility for conditional classes
- Follow established design tokens (zinc color palette, consistent spacing)
- Use `dark:` prefix for dark mode variants
- Include `antialiased` and `text-rendering: geometricPrecision` for text quality

### State Management

- React hooks for local component state (`useState`, `useEffect`)
- Custom hooks for shared logic (`useTheme`, `useLocalStorage`, `useModal`)
- Context providers for app-wide state (when needed)
- Server state with React Query/SWR (when added)
- Local storage for theme preferences and user settings

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
