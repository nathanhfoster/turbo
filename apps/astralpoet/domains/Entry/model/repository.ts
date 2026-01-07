import {
  createDatabase,
  BaseRepository,
  type IDatabase,
} from "@nathanhfoster/indexeddb";
import type { Entry } from "./types";

/**
 * Entry repository for IndexedDB persistence
 * Following FSD pattern - domain-level repository
 */
export class EntryRepository extends BaseRepository<Entry> {
  constructor(database: IDatabase) {
    super(database, "entries");
  }
}

/**
 * Initialize the entry database and repository
 * This is the single source of truth for all entry-related data
 */
export async function initializeEntryDatabase(): Promise<EntryRepository> {
  const database = await createDatabase(
    {
      name: "AstralPoet",
      version: 1,
    },
    [
      {
        name: "entries",
        keyPath: "id",
        autoIncrement: true,
        indexes: [
          {
            name: "date_created",
            keyPath: "date_created",
            unique: false,
          },
          {
            name: "date_updated",
            keyPath: "date_updated",
            unique: false,
          },
          {
            name: "author",
            keyPath: "author",
            unique: false,
          },
        ],
      },
    ],
  );

  return new EntryRepository(database);
}

