import React from 'react';
import dynamic from 'next/dynamic';
import type { FormButtonProps } from './types';

const Button = dynamic(() => import('../../atoms/Button'));

const FormButton: React.FC<FormButtonProps> = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export default FormButton;
