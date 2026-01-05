import type { GetServerSidePropsContext, NextPageContext } from "next";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ICookieManager } from "../interfaces/ICookieManager.js";
import { CookieManagerConstructorArgs, CookieOptions } from "../types/index.js";

/**
 * CookieManager implementation following Single Responsibility Principle
 * This class is responsible only for managing cookies in Next.js applications
 */
export class CookieManager<T> implements ICookieManager<T> {
  protected name: string;
  protected context?: GetServerSidePropsContext | NextPageContext;
  protected value?: T;

  constructor(args: CookieManagerConstructorArgs<T>) {
    this.name = args.name;
    this.context = args.context;
    this.value = args.value;
  }

  getCookies(): Record<string, string> {
    if (this.context) {
      // Server-side
      return parseCookies(this.context);
    } else {
      // Client-side
      return parseCookies();
    }
  }

  getObject(): T | undefined {
    const cookies = this.getCookies();
    const cookie = cookies[this.name];
    let objectFromCookie: T | undefined;

    try {
      if (cookie) {
        objectFromCookie = JSON.parse(cookie) as T;
      }
    } catch (error) {
      console.error("Failed to parse cookie:", error);
    }

    return objectFromCookie;
  }

  setObject(value: T, options?: CookieOptions): void {
    const valueToStringify = value ?? this.value;

    if (valueToStringify === undefined) {
      console.error(
        "valueToStringify is undefined. Remember to either pass a value as a parameter to setObject or CookieManager constructor",
      );
      return;
    }

    const cookieOptions: CookieOptions = {
      path: "/",
      ...(options && {
        ...options,
      }),
    };

    setCookie(
      this.context,
      this.name,
      JSON.stringify(valueToStringify),
      cookieOptions as any,
    );
  }

  deleteCookie(): void {
    destroyCookie(this.context, this.name, { path: "/" });
  }
}



