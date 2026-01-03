import type { LinkProps } from '../Link/types';

export interface MailToLinkProps extends Omit<LinkProps, 'href'> {
  /** The email address to send to */
  email: string;
  /** Optional subject line for the email */
  subject?: string;
  /** Optional body content for the email */
  body?: string;
}
