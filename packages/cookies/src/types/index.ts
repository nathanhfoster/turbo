import type { GetServerSidePropsContext, NextPageContext } from "next";

export interface CookieOptions {
  path?: string;
  maxAge?: number;
  expires?: Date;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

export interface CookieManagerConstructorArgs<T> {
  name: string;
  context?: GetServerSidePropsContext | NextPageContext;
  value?: T;
}



