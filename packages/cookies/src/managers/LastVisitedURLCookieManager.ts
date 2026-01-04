import { GetServerSidePropsContext, NextPageContext } from 'next/types'
import { CookieManager } from '../implementations/CookieManager'

/**
 * LastVisitedURLCookieManager following Open/Closed Principle
 * Extends CookieManager for specific last visited URL functionality
 */
export class LastVisitedURLCookieManager extends CookieManager<string> {
	public static readonly COOKIE_NAME = 'lastVisitedURL'
	public static readonly MAX_AGE_IN_SECONDS = 1800 // 30 minutes

	constructor(
		context?: GetServerSidePropsContext | NextPageContext,
		lastVisitedUrl?: string,
	) {
		super({
			name: LastVisitedURLCookieManager.COOKIE_NAME,
			context,
			value: lastVisitedUrl,
		})
	}

	getLastVisitedURLFromCookies(): string | undefined {
		return this.getObject()
	}

	setLastVisitedUrlCookie(lastVisitedUrl: string): void {
		this.setObject(lastVisitedUrl, {
			maxAge: LastVisitedURLCookieManager.MAX_AGE_IN_SECONDS,
		})
	}
}


