import { IndexedDatabase } from '../implementations/IndexedDatabase.js'
import { DatabaseConfig, ObjectStoreConfig } from '../types/index.js'

/**
 * Factory function to create and initialize a database with object stores
 * Following Single Responsibility Principle - handles database initialization
 */
export async function createDatabase(
	config: DatabaseConfig,
	objectStores: ObjectStoreConfig[],
): Promise<IndexedDatabase> {
	return new Promise((resolve, reject) => {
		if (typeof window === 'undefined' || !('indexedDB' in window)) {
			reject(new Error('IndexedDB is not available in this environment'))
			return
		}

		const request = indexedDB.open(config.name, config.version)

		request.onerror = () => {
			reject(
				new Error(
					`Failed to open database: ${request.error?.message || 'Unknown error'}`,
				),
			)
		}

		request.onsuccess = () => {
			const database = new IndexedDatabase(config, request.result)
			resolve(database)
		}

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result

			objectStores.forEach((storeConfig) => {
				if (!db.objectStoreNames.contains(storeConfig.name)) {
					const objectStore = db.createObjectStore(storeConfig.name, {
						keyPath: storeConfig.keyPath,
						autoIncrement: storeConfig.autoIncrement || false,
					})

					// Create indexes if provided
					if (storeConfig.indexes) {
						storeConfig.indexes.forEach((index: { name: string; keyPath: string | string[]; unique?: boolean }) => {
							objectStore.createIndex(index.name, index.keyPath, {
								unique: index.unique || false,
							})
						})
					}
				}
			})
		}
	})
}

