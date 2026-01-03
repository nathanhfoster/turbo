import NextScript from 'next/script';
import type { ScriptProps } from './types';

const Script: React.FC<ScriptProps> = ({
  strategy = 'afterInteractive',
  async = true,
  children,
  ...props
}) => {
  // For inline scripts with dangerouslySetInnerHTML, ensure async is set
  const scriptProps = {
    strategy,
    ...props,
    ...(props.dangerouslySetInnerHTML && { async }),
  };

  return <NextScript {...scriptProps}>{children}</NextScript>;
};

export default Script;
