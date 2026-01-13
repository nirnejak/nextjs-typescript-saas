# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this Next.js TypeScript SaaS repository.

## Development Commands

### Core Commands

- `bun run dev` - Start development server (http://localhost:3000)
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run format` - Format with Prettier
- `bun run type-check` - Run TypeScript type checking

### Database Commands (Drizzle ORM)

- `bun run db:generate` - Generate migrations from schema changes
- `bun run db:migrate` - Run pending migrations
- `bun run db:push` - Push schema changes directly to database
- `bun run db:studio` - Open Drizzle Studio for database management

### Git Hooks

- `bun run prepare` - Setup Husky pre-commit hooks (runs automatically on install)

## Testing

**No testing framework is currently configured.** When adding tests:

1. Choose between Jest or Vitest
2. Add appropriate configuration files
3. Install testing dependencies
4. Follow the project's existing code patterns

## Code Style Guidelines

### File Structure

```
app/                    # Next.js App Router (pages, API routes, layouts)
├── admin/             # Admin pages
├── api/               # API routes
├── auth/              # Authentication pages
└── blog/              # Blog/MDX content
components/            # React components
├── atoms/            # Basic UI components (Button, etc.)
hooks/                # Custom React hooks
lib/                  # Library configurations (auth)
utils/                # Utility functions
styles/               # Global CSS
@types/               # TypeScript type definitions
```

### Component Patterns

- Use functional components with `React.FC` type annotation
- Props interfaces should extend HTML attributes and `VariantProps` when applicable
- Use Class Variance Authority (CVA) for component variants
- Implement custom `classNames` utility for conditional styling

```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import classNames from "@/utils/classNames"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  // Additional props
}

const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <button className={classNames(buttonVariants({ variant }), className)} {...props} />
  )
}
```

### Import Patterns

```typescript
import * as React from "react" // Explicit namespace import
import { cva, type VariantProps } from "class-variance-authority"
import classNames from "@/utils/classNames"
import * as motion from "motion/react-client"
```

### Naming Conventions

- **Components**: PascalCase (Button, Card, useTheme)
- **Variables**: camelCase (buttonVariants, BASE_TRANSITION)
- **Constants**: UPPER_SNAKE_CASE (BASE_TRANSITION, THEME_OPTIONS)
- **Types**: PascalCase (THEME_HOOK, Props, ButtonProps)
- **Files**: PascalCase for components (Button.tsx), camelCase for utilities (classNames.ts)

### TypeScript Guidelines

- Use strict mode with proper type annotations
- Leverage path aliasing with `@/` prefix for absolute imports
- Define interfaces for component props extending HTML attributes when appropriate
- Use `type` for type aliases, `interface` for object shapes that may be extended

### Error Handling Patterns

#### API Routes

```typescript
export async function POST(request: Request) {
  try {
    // API logic
    return NextResponse.json({ message: "Success" }, { status: 200 })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      { message: "Something went wrong!", error: "Failed to process request" },
      { status: 400 }
    )
  }
}
```

#### Hooks and Components

- Use `console.error` for error logging
- Implement graceful fallbacks
- Provide type-safe error responses
- Handle loading and error states appropriately

### Styling Guidelines

- Use Tailwind CSS with custom theme configuration
- Leverage `@theme` directive for CSS-in-JS patterns
- Implement dark mode support using CSS custom properties
- Use consistent transition and animation patterns
- Follow the existing design system for spacing, colors, and typography

### Database Patterns

- Use Drizzle ORM with PostgreSQL (Neon)
- Follow schema-first approach with TypeScript types
- Implement proper migrations for schema changes
- Use Better Auth for authentication patterns

### State Management

- Prefer React hooks (useState, useEffect) for local state
- Create custom hooks for complex logic reuse
- Use localStorage for client-side persistence (theme, preferences)
- Follow React best practices for state updates and effects

## Development Workflow

1. **Before making changes**: Run `bun run type-check` to ensure baseline type safety
2. **During development**: Use `bun run dev` for hot reloading
3. **Before committing**:
   - Run `bun run lint` to check code quality
   - Run `bun run format` to ensure consistent formatting
   - Run `bun run type-check` to verify type safety
4. **Database changes**: Use `bun run db:generate` and `bun run db:migrate` for schema updates

## Tool Configuration

- **Package Manager**: Bun (preferred over npm/yarn)
- **Linting**: ESLint with Love config + Next.js rules
- **Formatting**: Prettier with Tailwind plugin
- **Type Checking**: TypeScript with strict mode
- **Git Hooks**: Husky for pre-commit quality checks
- **Database**: Drizzle ORM with PostgreSQL (Neon)
- **Authentication**: Better Auth
- **Styling**: Tailwind CSS with custom theme

## Quality Assurance

Always run these commands before considering work complete:

- `bun run lint` - Ensure no linting errors
- `bun run type-check` - Verify TypeScript compilation
- `bun run format` - Check code formatting consistency

If any command fails, fix the issues before proceeding.
