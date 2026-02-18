---
name: companycam-backend
description: CompanyCam Rails backend development conventions covering Docker, Sidekiq, coding philosophy, review standards, testing with RSpec, and Ruby style. Use when working on CompanyCam Rails code, writing models, controllers, migrations, or RSpec tests.
---

# CompanyCam Backend Development

Ruby on Rails conventions for the CompanyCam backend. Follows The Rails Way: MVC, fat model, skinny controller.

## Docker & Local Development

All Rails commands use `dip`:

```bash
dip rails console
dip bundle install
dip rspec
dip rails db:migrate
dip rails generate migration AddFieldToModel
```

## Background Jobs

Sidekiq for async work:

```ruby
class ExampleWorker
  include Sidekiq::Worker

  def perform(arg1, arg2)
    # Async work here
  end
end
```

## Coding Philosophy

- **DRY**: Eliminate duplication when clear patterns reveal themselves
- **Concise**: Every line should earn its place
- **Expressive**: Code should read like well-written prose
- **Idiomatic**: Embrace Ruby and Rails conventions
- **Self-documenting**: Comments explain *why*, not *what*
- **Tell, Don't Ask**: Favor message sending over data grabbing
- **Stable Interfaces, Small Objects**: Build trustworthy seams

## Review Standards

- Idiomatic Ruby (`unless`, trailing conditionals)
- Use Rails conventions (scopes, callbacks, concerns) thoughtfully
- Prefer declarative style
- Extract complex logic into well-named private methods
- Fat models, skinny controllers
- Favor composition over inheritance; inject dependencies for testability

### CRITICAL: No Service Objects

- Avoid generic "service objects" and the `app/services/` directory entirely
- Instead, extract meaningful domain objects named after what they represent, not what they do
- When SRP conflicts with "fat model", favor Rails patterns:
  - Add methods to existing models
  - Use concerns for shared behavior
  - Create value objects for domain concepts
  - Use callbacks, validators, observers before new abstractions

### Namespace External Integrations

Group related domain objects under descriptive modules rather than polluting the top-level namespace.

### Deprecated Patterns

- v1 API endpoints — use v3
- Interactors and Input Objects — do not create new ones
- GraphQL types/queries/mutations — use v3 API endpoints

## Database Migrations

- Scrutinize for reversibility and performance
- Merge migrations in standalone PRs
- If a migration introduces a new table, include a basic model class with schema annotations

## API Design

Be strict on RESTful design. Controllers in the v3 namespace tested with Swagger specs in `spec/swagger/v3/`. Run `cocam rswag` after implementation.

### Swagger Schema Best Practices

Avoid inline schemas. Use reusable components in `spec/swagger/v3/schemas/*.rb` with `$ref`. This ensures proper TypeScript type generation in `data/v3/data-contracts.ts`.

## Testing

RSpec exclusively. Test behaviors, not entities — test the pattern once; repetitive tests are duplication.

```ruby
require "rails_helper"

RSpec.describe User, type: :model do
  describe "#full_name" do
    it "returns the user's full name" do
      user = User.new(first_name: "John", last_name: "Doe")
      expect(user.full_name).to eq("John Doe")
    end
  end
end
```

## Ruby Style

Always use double quotes:

```ruby
# Good
puts "Hello, world!"
name = "John"

# Bad
puts 'Hello, world!'
name = 'John'
```

Run `cocam standard` (no arguments) to check compliance.

## Environment Variables

Only define in:
- `config/application.rb`
- `config/environments/{development,production,qa,test}.rb`

Set as config values, access via `Rails.application.config.{key}`:

```ruby
# config/application.rb
config.api_key = ENV.fetch("API_KEY", nil)

# Application code
api_key = Rails.application.config.api_key
```
