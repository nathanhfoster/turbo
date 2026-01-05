import {
  DatabaseConfig,
  ObjectStoreConfig,
  DatabaseError,
} from "../types/index.js";

/**
 * Database interface following Dependency Inversion Principle
 * Depend on abstractions, not concretions
 */
export interface IDatabase {
  /**
   * Opens a connection to the database
   */
  open(): Promise<IDBDatabase>;

  /**
   * Closes the database connection
   */
  close(): void;

  /**
   * Gets the database configuration
   */
  getConfig(): DatabaseConfig;

  /**
   * Creates an object store if it doesn't exist
   */
  createObjectStore(config: ObjectStoreConfig): Promise<void>;

  /**
   * Checks if the database is available
   */
  isAvailable(): boolean;
}


