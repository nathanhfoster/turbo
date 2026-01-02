/**
 * Represents a successful result from a domain operation
 */
export interface DomainResultSuccess<T> {
  ok: boolean;
  value?: T;
}

/**
 * Represents a failed result from a domain operation
 */
export interface DomainResultFailure<T> extends DomainResultSuccess<T> {
  reason?: string;
}

/**
 * Represents the result of a domain operation
 * Can be either successful or failed
 */
export type DomainResult<T> = DomainResultSuccess<T> | DomainResultFailure<T>;
