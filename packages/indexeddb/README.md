# @nathanhfoster/indexeddb

A type-safe IndexedDB wrapper with repository pattern for offline-first data persistence.

## Purpose

This package provides a clean, type-safe interface for working with IndexedDB, enabling offline-first applications with persistent client-side storage.

## Installation

This package is part of the monorepo workspace. Install dependencies from the root:

```bash
pnpm install
```

## Usage

### Basic Database Setup

```typescript
import { createDatabase, IndexedDatabase } from '@nathanhfoster/indexeddb';

// Define your data schema
interface User {
  id: string;
  name: string;
  email: string;
}

// Create database instance
const db = await createDatabase({
  name: 'MyAppDB',
  version: 1,
  stores: [
    {
      name: 'users',
      keyPath: 'id',
      indexes: [
        { name: 'email', keyPath: 'email', unique: true },
      ],
    },
  ],
});

// Use the database
const user = await db.add('users', {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
});
```

### Repository Pattern

```typescript
import { BaseRepository, createDatabase } from '@nathanhfoster/indexeddb';

interface Resume {
  id: string;
  name: string;
  content: string;
  createdAt: Date;
}

class ResumeRepository extends BaseRepository<Resume> {
  constructor(database: IndexedDatabase) {
    super(database, 'resumes');
  }

  // Add custom methods
  async findByName(name: string): Promise<Resume | null> {
    const index = this.database.getIndex(this.storeName, 'name');
    return index?.get(name) || null;
  }

  async findAllByDateRange(
    start: Date,
    end: Date
  ): Promise<Resume[]> {
    // Custom query logic
    const all = await this.findAll();
    return all.filter(
      (resume) =>
        resume.createdAt >= start && resume.createdAt <= end
    );
  }
}

// Usage
const db = await createDatabase({
  name: 'ResumeDB',
  version: 1,
  stores: [
    {
      name: 'resumes',
      keyPath: 'id',
      indexes: [
        { name: 'name', keyPath: 'name' },
        { name: 'createdAt', keyPath: 'createdAt' },
      ],
    },
  ],
});

const resumeRepo = new ResumeRepository(db);

// Use repository methods
await resumeRepo.add({
  id: '1',
  name: 'Software Engineer Resume',
  content: '...',
  createdAt: new Date(),
});

const resume = await resumeRepo.get('1');
const allResumes = await resumeRepo.findAll();
await resumeRepo.update('1', { ...resume, content: 'Updated...' });
await resumeRepo.delete('1');
```

### Direct Database Operations

```typescript
import { IndexedDatabase, createDatabase } from '@nathanhfoster/indexeddb';

const db = await createDatabase({
  name: 'MyDB',
  version: 1,
  stores: [
    {
      name: 'items',
      keyPath: 'id',
    },
  ],
});

// Add item
await db.add('items', { id: '1', name: 'Item 1' });

// Get item
const item = await db.get('items', '1');

// Update item
await db.put('items', { id: '1', name: 'Updated Item 1' });

// Delete item
await db.delete('items', '1');

// Get all items
const allItems = await db.getAll('items');

// Clear store
await db.clear('items');
```

### Index Queries

```typescript
const db = await createDatabase({
  name: 'UserDB',
  version: 1,
  stores: [
    {
      name: 'users',
      keyPath: 'id',
      indexes: [
        { name: 'email', keyPath: 'email', unique: true },
        { name: 'age', keyPath: 'age' },
      ],
    },
  ],
});

// Query by index
const userByEmail = await db.getByIndex('users', 'email', 'user@example.com');

// Get all items with index value
const usersByAge = await db.getAllByIndex('users', 'age', 25);
```

## API Reference

### createDatabase

Factory function to create a database instance.

```typescript
function createDatabase(config: DatabaseConfig): Promise<IndexedDatabase>;
```

#### DatabaseConfig

```typescript
interface DatabaseConfig {
  name: string; // Database name
  version: number; // Database version
  stores: StoreConfig[]; // Store configurations
}

interface StoreConfig {
  name: string; // Store name
  keyPath: string; // Primary key path
  indexes?: IndexConfig[]; // Index configurations
}

interface IndexConfig {
  name: string; // Index name
  keyPath: string; // Index key path
  unique?: boolean; // Whether index is unique
}
```

### IndexedDatabase

Main database class.

```typescript
class IndexedDatabase {
  name: string;
  version: number;

  // Store operations
  add(storeName: string, value: any): Promise<any>;
  get(storeName: string, key: any): Promise<any>;
  put(storeName: string, value: any): Promise<any>;
  delete(storeName: string, key: any): Promise<void>;
  getAll(storeName: string): Promise<any[]>;
  clear(storeName: string): Promise<void>;

  // Index operations
  getByIndex(storeName: string, indexName: string, key: any): Promise<any>;
  getAllByIndex(storeName: string, indexName: string, key: any): Promise<any[]>;

  // Utility
  getIndex(storeName: string, indexName: string): IDBIndex | null;
}
```

### BaseRepository

Base repository class for common CRUD operations.

```typescript
class BaseRepository<T> {
  constructor(database: IndexedDatabase, storeName: string);

  // CRUD operations
  add(value: T): Promise<T>;
  get(key: any): Promise<T | null>;
  update(key: any, value: Partial<T>): Promise<T>;
  delete(key: any): Promise<void>;
  findAll(): Promise<T[]>;
  clear(): Promise<void>;

  // Index queries
  getByIndex(indexName: string, key: any): Promise<T | null>;
  getAllByIndex(indexName: string, key: any): Promise<T[]>;
}
```

## Best Practices

1. **Use Repository Pattern** - Extend `BaseRepository` for domain-specific logic
2. **Type Safety** - Define interfaces for your data structures
3. **Error Handling** - Wrap operations in try-catch blocks
4. **Version Management** - Increment version when schema changes
5. **Indexes** - Create indexes for frequently queried fields
6. **Transactions** - Use transactions for multiple operations

## Examples

### Resume Storage (Real-World Example)

```typescript
import { BaseRepository, createDatabase } from '@nathanhfoster/indexeddb';

interface Resume {
  id: string;
  name: string;
  content: string;
  fileName?: string;
  createdAt: Date;
  updatedAt: Date;
}

class ResumeRepository extends BaseRepository<Resume> {
  constructor(database: IndexedDatabase) {
    super(database, 'resumes');
  }

  async findByFileName(fileName: string): Promise<Resume | null> {
    const index = this.database.getIndex(this.storeName, 'fileName');
    if (!index) return null;
    return this.getByIndex('fileName', fileName);
  }

  async findAllSortedByDate(): Promise<Resume[]> {
    const all = await this.findAll();
    return all.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }
}

// Initialize database
const db = await createDatabase({
  name: 'ResumeBuilderDB',
  version: 1,
  stores: [
    {
      name: 'resumes',
      keyPath: 'id',
      indexes: [
        { name: 'fileName', keyPath: 'fileName', unique: true },
        { name: 'updatedAt', keyPath: 'updatedAt' },
      ],
    },
  ],
});

const resumeRepo = new ResumeRepository(db);

// Use in your application
export async function saveResume(resume: Resume) {
  resume.updatedAt = new Date();
  return resumeRepo.add(resume);
}

export async function getResume(id: string) {
  return resumeRepo.get(id);
}

export async function getAllResumes() {
  return resumeRepo.findAllSortedByDate();
}
```

## Architecture

This package follows the monorepo's [FRONTEND_ARCHITECTURE.md](../../FRONTEND_ARCHITECTURE.md) principles:

- **Type Safety** - Full TypeScript support
- **Repository Pattern** - Clean data access layer
- **Framework Agnostic** - Works with any framework

## Related Packages

- `@nathanhfoster/resurrection` - State management (can use IndexedDB for persistence)
- `@nathanhfoster/utils` - Utility functions

## Browser Support

IndexedDB is supported in all modern browsers. This package requires:
- Chrome/Edge 24+
- Firefox 16+
- Safari 10+
- iOS Safari 10+
