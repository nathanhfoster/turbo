import { CookieOptions } from '../types/index.js'

/**
 * Cookie Manager interface following Dependency Inversion Principle
 * Depend on abstractions, not concretions
 */
export interface ICookieManager<T> {
	/**
	 * Gets the cookie value as a parsed object
	 */
	getObject(): T | undefined

	/**
	 * Sets the cookie value from an object
	 */
	setObject(value: T, options?: CookieOptions): void

	/**
	 * Deletes the cookie
	 */
	deleteCookie(): void

	/**
	 * Gets all cookies as a key-value object
	 */
	getCookies(): Record<string, string>
}


