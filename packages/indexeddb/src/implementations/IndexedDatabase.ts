import { IDatabase } from '../interfaces/IDatabase.js'
import { DatabaseConfig, ObjectStoreConfig, DatabaseError } from '../types/index.js'

/**
 * IndexedDatabase implementation following Single Responsibility Principle
 * This class is responsible only for managing IndexedDB connections
 */
export class IndexedDatabase implements IDatabase {
	protected db: IDBDatabase | null = null
	protected config: DatabaseConfig

	constructor(config: DatabaseConfig, db?: IDBDatabase) {
		this.config = config
		if (db) {
			this.db = db
		}
	}

	getConfig(): DatabaseConfig {
		return this.config
	}

	isAvailable(): boolean {
		return typeof window !== 'undefined' && 'indexedDB' in window
	}

	async open(): Promise<IDBDatabase> {
		if (!this.isAvailable()) {
			throw new Error('IndexedDB is not available in this environment')
		}

		if (this.db) {
			return this.db
		}

		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.config.name, this.config.version)

			request.onerror = () => {
				reject(
					new Error(
						`Failed to open database: ${request.error?.message || 'Unknown error'}`,
					),
				)
			}

			request.onsuccess = () => {
				this.db = request.result
				// Handle database close event
				this.db.onclose = () => {
					this.db = null
				}
				resolve(this.db)
			}

			request.onupgradeneeded = () => {
				this.db = request.result
			}
		})
	}

	async createObjectStore(config: ObjectStoreConfig): Promise<void> {
		// Object stores can only be created during onupgradeneeded
		// This method should be called during database initialization
		// We'll handle this in a factory function that sets up the database properly
		return Promise.resolve()
	}

	close(): void {
		if (this.db) {
			this.db.close()
			this.db = null
		}
	}
}

