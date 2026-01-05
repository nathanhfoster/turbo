/**
 * Repository interface following Interface Segregation Principle
 * Many specific interfaces are better than one general interface
 */
export interface IRepository<T> {
  /**
   * Gets all entities
   */
  getAll(): Promise<T[]>;

  /**
   * Gets an entity by ID
   */
  getById(id: number | string): Promise<T | undefined>;

  /**
   * Saves an entity (insert or update)
   */
  save(entity: T): Promise<number | string>;

  /**
   * Saves multiple entities
   */
  saveMany(entities: T[]): Promise<void>;

  /**
   * Deletes an entity by ID
   */
  delete(id: number | string): Promise<void>;

  /**
   * Deletes all entities
   */
  deleteAll(): Promise<void>;
}


