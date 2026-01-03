import dynamic from 'next/dynamic';
import React from 'react';
import type { FormSwitchProps } from './types';

const Switch = dynamic(() => import('../../atoms/Switch'));

const FormSwitch: React.FC<FormSwitchProps> = props => {
  return <Switch {...props} />;
};

export default FormSwitch;
