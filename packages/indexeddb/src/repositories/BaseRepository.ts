import { IDatabase } from "../interfaces/IDatabase.js";
import { IRepository } from "../interfaces/IRepository.js";

/**
 * Base repository implementation following Open/Closed Principle
 * Open for extension, closed for modification
 */
export abstract class BaseRepository<T> implements IRepository<T> {
  protected database: IDatabase;
  protected storeName: string;

  constructor(database: IDatabase, storeName: string) {
    this.database = database;
    this.storeName = storeName;
  }

  async getAll(): Promise<T[]> {
    const db = await this.database.open();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result as T[]);
      };

      request.onerror = () => {
        reject(new Error(`Failed to get all from ${this.storeName}`));
      };
    });
  }

  async getById(id: number | string): Promise<T | undefined> {
    const db = await this.database.open();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result as T | undefined);
      };

      request.onerror = () => {
        reject(new Error(`Failed to get ${id} from ${this.storeName}`));
      };
    });
  }

  async save(entity: T): Promise<number | string> {
    const db = await this.database.open();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.put(entity);

      request.onsuccess = () => {
        resolve(request.result as number | string);
      };

      request.onerror = () => {
        reject(new Error(`Failed to save to ${this.storeName}`));
      };
    });
  }

  async saveMany(entities: T[]): Promise<void> {
    const db = await this.database.open();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);

      entities.forEach((entity) => {
        store.put(entity);
      });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => {
        reject(new Error(`Failed to save many to ${this.storeName}`));
      };
    });
  }

  async delete(id: number | string): Promise<void> {
    const db = await this.database.open();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => {
        reject(new Error(`Failed to delete ${id} from ${this.storeName}`));
      };
    });
  }

  async deleteAll(): Promise<void> {
    const db = await this.database.open();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => {
        reject(new Error(`Failed to delete all from ${this.storeName}`));
      };
    });
  }
}
