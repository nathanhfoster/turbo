import React from 'react';
import dynamic from 'next/dynamic';
import type { FormCheckboxProps } from './types';

const Checkbox = dynamic(() => import('../../atoms/Checkbox'));

const FormCheckbox: React.FC<FormCheckboxProps> = props => {
  return <Checkbox {...props} />;
};

export default FormCheckbox;
