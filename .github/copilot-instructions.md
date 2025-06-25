# GitHub Copilot Instructions for the T3 Chat Repository

Hey Copilot! When generating, refactoring, or suggesting TypeScript code, please strictly adhere to the following best practices and conventions. Our goal is to maintain a codebase that is type-safe, readable, maintainable, and consistent.

---

## 1. Type System

-   **Prefer `interface` for Object Definitions**: Use `interface` for defining the shape of objects or classes.

    ```typescript
    // Good
    interface User {
      id: number;
      name: string;
    }

    // Avoid
    type User = {
      id: number;
      name: string;
    };
    ```

-   **Use `type` for Primitives, Unions, and Intersections**: Use `type` aliases for unions, intersections, mapped types, or simple primitive aliases.

    ```typescript
    type UserId = string | number;
    type UserWithRoles = User & { roles: string[] };
    type StringMap = { [key: string]: string };
    ```

-   **Avoid `any`**: Never use `any`. If a type is truly unknown, use `unknown` and perform the necessary type-checking before using the variable.

    ```typescript
    // Good
    function processValue(value: unknown) {
      if (typeof value === "string") {
        console.log(value.toUpperCase());
      }
    }

    // Bad
    function processValue(value: any) {
      console.log(value.toUpperCase()); // Unsafe
    }
    ```

-   **Assume Strict Mode**: All code should be written as if `strict: true` is enabled in `tsconfig.json`. This includes `strictNullChecks`, `noImplicitAny`, etc.

-   **Use Utility Types**: Leverage TypeScript's built-in utility types like `Partial<T>`, `Readonly<T>`, `Pick<T, K>`, and `Omit<T, K>` to avoid redundant type definitions.

-   **Use Generics**: Employ generics to create reusable, type-safe functions, classes, and components.

    ```typescript
    function createArray<T>(items: T[]): T[] {
      return new Array().concat(items);
    }
    ```

---

## 2. Naming Conventions

-   **Types/Interfaces**: Use `PascalCase`. (e.g., `interface UserProfile`, `type AuthState`).
-   **Variables/Functions**: Use `camelCase`. (e.g., `const userProfile`, `function getUser()`).
-   **Constants**: Use `UPPER_CASE` with snake_case for constants that are hard-coded and reused. (e.g., `const MAX_LOGIN_ATTEMPTS = 5`).
-   **Booleans**: Use descriptive prefixes like `is`, `has`, or `can`. (e.g., `const isLoading = true`, `const hasError = false`).
-   **React Props**: Prefix the interface name with the component name and suffix with `Props`. (e.g., `interface ButtonProps { ... }`).

---

## 3. Code Organization

-   **Co-location**: Keep type definitions close to where they are used. For a React component, its `Props` interface should be in the same file.
-   **Shared Types**: If types are shared across multiple features, place them in a dedicated `types.ts` or `interfaces.ts` file within a shared directory (e.g., `src/types/` or `src/lib/types.ts`).
-   **Barrel Exports**: Use `index.ts` files to consolidate and re-export modules from a directory, simplifying import paths.
-   **Component Props**: Always define a component's props interface directly above the component definition.

---

## 4. Functions

-   **Explicit Return Types**: All public and exported functions must have an explicit return type.
-   **Arrow Functions**: Prefer arrow functions for callbacks and class methods to ensure lexical scoping of `this`.
-   **Async/Await**: Always prefer `async/await` syntax for asynchronous operations over Promise chains (`.then()`/`.catch()`).
-   **Function Overloads**: Use function overloads for functions that can accept different argument types and have different return types based on the input.

---

## 5. Best Practices

-   **Immutability**: Use the `readonly` modifier for properties that should not be changed after initialization.

    ```typescript
    interface Config {
      readonly apiKey: string;
    }
    ```

-   **Discriminated Unions**: Use discriminated unions for modeling states or variants of a type. This is excellent for state management and error handling.

    ```typescript
    type NetworkState =
      | { status: "idle" }
      | { status: "loading" }
      | { status: "success"; data: any[] }
      | { status: "error"; error: Error };
    ```

-   **Type Guards**: Use type guards (like `typeof`, `instanceof`, or custom predicate functions) for runtime type checking, especially with `unknown` or union types.

-   **Null Checking**: Always check for `null` and `undefined` explicitly. Avoid the non-null assertion operator (`!`) unless it is absolutely necessary and its safety is commented.

-   **Type Assertions**: Avoid type assertions (`as Type`). If you must use one, add a comment explaining why it is safe and why type inference failed.

---

## 6. Error Handling

-   **Custom Error Types**: Create custom error classes extending `Error` for domain-specific issues.

    ```typescript
    class ApiError extends Error {
      constructor(message: string, public statusCode: number) {
        super(message);
        this.name = "ApiError";
      }
    }
    ```

-   **Result Types**: For operations that can fail, consider returning a `Result` discriminated union instead of throwing an error directly.

    ```typescript
    type Result<T, E> =
      | { success: true; value: T }
      | { success: false; error: E };
    ```

-   **Typed `catch` Clauses**: When using `try...catch`, type the caught error as `unknown` and perform a type check.

    ```typescript
    try {
      // ...
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        // ...
      }
    }
    ```

-   **Handle Promise Rejections**: Ensure every promise has a rejection handler, either via a `.catch()` block or a `try...catch` block with `async/await`.

---

## 7. Design Patterns

-   **Repository Pattern**: Abstract data access logic (API calls, database queries) into repositories. This decouples your business logic from the data source.
-   **Factory Pattern**: Use factories to abstract the logic of creating objects.
-   **Dependency Injection**: Pass dependencies (like services or repositories) into functions or classes as parameters instead of creating them internally.
-   **Builder Pattern**: For objects with complex construction logic or many optional fields, suggest the Builder pattern.