# Standard: Clean Code

**Reference:** *Clean Code* — Robert C. Martin  
**Enforced by:** `/acps-execute` (at write time) · `/acps-homologate` (verification)

## Naming

- **Intention-revealing** — `elapsedTimeInDays` not `d`
- **Pronounceable** — `generationTimestamp` not `genymdhms`
- **Searchable** — avoid single-letter names except loop counters in tiny scopes
- **No encodings** — `name` not `strName`, `IShapeFactory` not `ShapeFactory`
- **Class names:** nouns — `Customer`, `Account`, `AddressParser`
- **Method names:** verbs — `postPayment`, `deletePage`, `save`
- **No cute names** — `kill()` not `whack()`, `abort()` not `eatMyShorts()`

## Functions

- **Do one thing** — if you can extract a meaningful function from it, it does more than one thing
- **≤ 20 lines** — the smaller the better; functions that need scrolling are too long
- **No flag arguments** — `render(true)` is a sign the function does two things; split it
- **No side effects** — a function named `checkPassword` should not initialize a session
- **Command/query separation** — a function either does something or answers something, not both
- **No output arguments** — if you must change the state of something, change the state of its owning object

## Comments (see also: code-comments.md)

- Comment the WHY, never the WHAT
- Good comment: explains a non-obvious constraint, workaround, or business rule
- Bad comment: restates what the code already says clearly

## Formatting

- **Vertical density** — related code is close together; unrelated code is separated by a blank line
- **Dependent functions** — the caller appears before the called function in the file
- **Horizontal limit** — keep lines to ≤ 120 characters
- **Indentation:** one level per scope — never collapse onto a single line to save space

## Error handling

- **Exceptions over error codes** — error codes require the caller to check them immediately;
  exceptions decouple error handling from the happy path
- **Don't return null** — returning null propagates nulls through the codebase; throw or use a special case object
- **Don't pass null** — if a method may receive null, make null impossible at the call site
- **Don't swallow errors silently** — an empty `catch` block is a bug waiting to be found in production

## Tests

- **One assert per test** — a test with five asserts is five tests waiting to be written
- **One concept per test** — tests verify one behavior; mixed concerns produce confusing failures
- **Fast** — unit tests run in milliseconds; slow tests are skipped
- **Independent** — tests do not depend on each other; any test can run in isolation
- **Repeatable** — same result in any environment, any time

## Classes

- **Small** — classes have one responsibility; if you can name two, split the class
- **Cohesion** — methods use the class's instance variables; low cohesion signals a hidden class
- **Open/closed** — open for extension, closed for modification; add behavior by adding code, not changing it

## Code smells (catalog)

| Smell | Description |
|-------|-------------|
| Long method | Method does more than one thing |
| Large class | Class has more than one responsibility |
| Long parameter list | Function takes > 3 parameters — use a parameter object |
| Duplicate code | Same code in two or more places — extract to a shared location |
| Dead code | Code that is never called — delete it |
| Speculative generality | Abstractions for hypothetical future use — delete until needed |
| Feature envy | Method uses data from another class more than its own |
| Data clumps | Same group of fields/args appears repeatedly — extract to a class |
| Primitive obsession | Using primitives for domain concepts (phone numbers, currencies) |
| Magic numbers | Numeric literals with no named constant |

## Definition of Done (Clean Code applied)

A story is done when:

- [ ] All functions are ≤ 20 lines with intention-revealing names
- [ ] No magic numbers — all constants are named
- [ ] No dead code, commented-out code, or speculative abstractions
- [ ] All error paths are handled explicitly
- [ ] All commits follow conventional commit format
- [ ] All comments explain WHY, not WHAT
- [ ] Tests exist for every acceptance criterion that is testable
