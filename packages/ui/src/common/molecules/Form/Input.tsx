import React from 'react';
import dynamic from 'next/dynamic';
import type { FormInputProps } from './types';

const Input = dynamic(() => import('../../atoms/Input'));

const FormInput: React.FC<FormInputProps> = props => {
  return <Input {...props} />;
};

export default FormInput;
