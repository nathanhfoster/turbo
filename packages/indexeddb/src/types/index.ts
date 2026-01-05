export interface DatabaseConfig {
  name: string;
  version: number;
}

export interface ObjectStoreConfig {
  name: string;
  keyPath: string;
  autoIncrement?: boolean;
  indexes?: IndexConfig[];
}

export interface IndexConfig {
  name: string;
  keyPath: string | string[];
  unique?: boolean;
}

export interface DatabaseError {
  message: string;
  code?: number;
}

