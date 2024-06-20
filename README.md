A simple API set up to use my preferred technologies

- NextJs
- ts-rest
- Mikro ORM
- Tailwind
- Jest

With support for

- Automatic transactions around all api endpoints
- Logging
- Error handling
- Services
- Fake services for testing
- Test database truncation

# Commands

- Reset Database: `npx mikro-orm migration:fresh`
- Migrate Up: `npx mikro-orm migration:up`
- New Migration: `npx mikro-orm migration:create --blank`
- Commands in test env: `NODE_ENV=test ...`

# TODO

- Fix env files not working
- Switch to vitest
- Latest version of next
- better way to write tests without calling `mikro` everywhere
