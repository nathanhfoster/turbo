---
name: rswag-schema-migration
description: Migrate inline Swagger schemas to reusable schema components that generate proper TypeScript types. Use when fixing Rswag/InlineSchema violations, creating reusable Swagger schemas, or generating TypeScript types from Rails API specs.
---

# Rswag Schema Migration

Migrates **one Swagger spec file at a time** from inline schemas to reusable schema components defined in `spec/swagger/v3/schemas/*.rb`, ensuring TypeScript types are generated in `data/v3/data-contracts.ts`.

## Workflow

### 1. Identify Violations

```bash
dip bundle exec standardrb spec/swagger/v3/path/to/file_spec.rb
```

### 2. Analyze the Spec File

For each inline schema, note: endpoint, HTTP method, response status code, schema structure (properties, types, examples). Group related schemas that could share a reusable component.

### 3. Create or Update Schema Files

Target: `spec/swagger/v3/schemas/<resource_name>_schema.rb`

```ruby
module ResourceNameSchema
  def self.schema
    {
      resource_name_response: {
        type: :object,
        properties: {
          data: {
            type: :object,
            properties: {
              id: { type: :string, example: "123" },
              type: { type: :string, example: "resource_name" },
              attributes: {
                type: :object,
                properties: {
                  name: { type: :string, example: "Example Name" },
                  status: { type: :string, example: "active" }
                }
              }
            }
          },
          errors: { "$ref" => "#/components/schemas/errors_map" },
          meta: { "$ref" => "#/components/schemas/meta_camel_case_object" }
        },
        required: %w[data errors meta]
      }
    }
  end
end
```

**Naming conventions**: `<resource>_response` (single), `<resource>_list_response` (collection), `<resource>_error_response` (error).

**Always include the full response wrapper** (`data`, `errors`, `meta`) for complete TypeScript type generation.

### 4. Register in Swagger Helper

In `spec/swagger/v3/swagger_helper.rb`:

```ruby
components: {
  schemas: SwaggerSchema
    .new
    .add(ResourceNameSchema)  # alphabetical order
    .add(ExistingSchema)
    .schema
}
```

### 5. Update Spec to Use $ref

```ruby
# Before
response "200", "Resource retrieved" do
  schema type: :object, properties: { ... }
  run_test!
end

# After
response "200", "Resource retrieved" do
  schema "$ref" => "#/components/schemas/resource_name_response"
  run_test!
end
```

### 6. Run Rswag and Verify

```bash
cocam rswag
```

This validates schema references, generates `swagger/v3/swagger.yaml`, TypeScript types in `data/v3/data-contracts.ts`, and MSW handlers in `__tests__/mocks/handlers/v3/generated.ts`.

### 7. Verify No Violations Remain

```bash
dip bundle exec standardrb spec/swagger/v3/path/to/file_spec.rb
cocam standard  # full codebase check
```

### 8. Frontend Usage

Generated types can be used directly without custom wrappers:

```typescript
import type { PipelineLeadListResponse } from 'data/v3/data-contracts';

export const usePipelineLeads = () => {
  return useQuery<PipelineLeadListResponse, V3ApiError>({
    queryKey: ['pipelineLeads'],
    queryFn: async () => {
      const response = await request({ url: 'crm/pipeline_leads' });
      return response.data;
    }
  });
};
```

## Rules

- Preserve all schema details (properties, types, examples, required fields, nested structures)
- Follow existing schema file patterns in `spec/swagger/v3/schemas/`
- Always run `cocam rswag` to verify the schema is valid and types are generated
- Migrate one file at a time to keep PRs manageable
- Use double quotes in Ruby, erb, and jbuilder files
