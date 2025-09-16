import React from 'react';
import Link from '../Link';
import type { MailToLinkProps } from './types';

const MailToLink: React.FC<MailToLinkProps> = ({
  email,
  subject,
  body,
  className = 'underline text-primary',
  children,
  color = 'primary',
  ...props
}) => {
  const mailtoUrl = React.useMemo(() => {
    const params = new URLSearchParams();
    if (subject) params.append('subject', subject);
    if (body) params.append('body', body);

    const queryString = params.toString();
    return `mailto:${email}${queryString ? `?${queryString}` : ''}`;
  }, [email, subject, body]);

  return (
    <Link href={mailtoUrl} {...props} className={className} color={color}>
      {children || email}
    </Link>
  );
};

export default MailToLink;
