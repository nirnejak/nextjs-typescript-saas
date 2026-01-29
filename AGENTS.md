# AGENTS.md

Guidelines and commands for agentic coding agents working in this Next.js TypeScript SaaS repository.

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

### Testing Commands

**Note**: No testing framework configured. To add Vitest:

```bash
bun add -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Once configured, use:

- `bun run test` - Run all tests
- `bun run test:watch` - Run tests in watch mode
- `bun run test:coverage` - Run tests with coverage
- `bun run test -- path/to/test.spec.ts` - Run single test file

## Code Style Guidelines

### File Structure

```
app/                    # Next.js App Router (pages, API routes, layouts)
├── admin/              # Admin pages
├── api/                # API routes (auth, schema, waitlist)
├── auth/               # Authentication pages
├── blog/               # Blog/MDX content
├── main.css            # Global CSS with Tailwind v4 and custom animations
└── layout.tsx          # Root layout with font loading and theme setup
components/             # React components (organized by atomic design)
├── atoms/              # Basic UI components (Button, etc.)
hooks/                  # Custom React hooks
utils/                  # Utility functions (classNames, db, schema)
@types/                 # TypeScript type definitions
public/                 # Static assets
```

### Import Patterns

```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import classNames from "@/utils/classNames"
import * as motion from "motion/react-client"
```

- Use `import * as React from "react"` (namespace imports)
- Use absolute imports with `@/` prefix for internal files
- Group imports: React → external libraries → internal modules
- Use type-only imports (`import type { Viewport } from "next"`)

### Component Patterns

```typescript
export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button: React.FC<Props> = ({ children, className, variant, size, ...props }) => (
  <button className={classNames(buttonVariants({ variant, size }), className)} {...props}>
    {children}
  </button>
)

export default Button
```

- Use functional components with `React.FC<Props>`
- Props extend HTML attributes and VariantProps from CVA
- Export interface as `Props`, component as default export
- Use `classNames` utility for conditional styling

### Naming Conventions

- **Components**: PascalCase (`Button`, `UserCard`)
- **Hooks**: camelCase with `use` prefix (`useTheme`)
- **Variables**: camelCase (`buttonVariants`)
- **Constants**: UPPER_SNAKE_CASE (`BASE_URL`)
- **Types**: PascalCase (`Props`, `ApiResponse<T>`)
- **Files**: PascalCase for components, camelCase for utilities
- **Database**: snake_case for table/column names

### TypeScript Guidelines

- Strict mode enabled (`strict: true`, `strictNullChecks: true`)
- Use `interface` for object shapes and component props
- Use `type` for unions and complex type expressions
- Use path mapping with `@/*` for absolute imports
- Include return type annotations for hook functions

### Database Patterns

```typescript
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
})
```

- Schema-first with Drizzle ORM and Neon PostgreSQL
- Use foreign keys with cascade delete
- Implement `$onUpdate` for automatic timestamps

### Error Handling

```typescript
export async function POST(request: Request) {
  try {
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

- API routes: Try-catch with `NextResponse.json()`
- Use `console.error` for logging, never expose sensitive data
- Use proper HTTP status codes (200, 400, 500)

### Styling Guidelines

- Tailwind CSS v4 with `@theme` directives in `app/main.css`
- Custom animations using `@keyframes` and `--animate-*` variables
- Use CSS custom properties (`--sans-font`, `--mono-font`)
- Use `dark:` prefix for dark mode variants
- Include `antialiased` for text quality

## Quality Assurance

Always run before completing work:

- `bun run lint` - No ESLint errors
- `bun run type-check` - TypeScript passes
- `bun run format` - Code formatting consistent
- `bun run build` - Production build succeeds

## Project Features

- Next.js 15+ with App Router, React 19, React Compiler
- MDX Support, View Transitions
- Better Auth (session, account, verification tables)
- Drizzle ORM with PostgreSQL (Neon)
- Tailwind CSS v4 with custom animations
- Framer Motion for animations
- Bun package manager
- Husky pre-commit hooks with lint-staged
