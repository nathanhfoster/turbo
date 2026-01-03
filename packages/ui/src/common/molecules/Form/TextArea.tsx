import dynamic from 'next/dynamic';
import React from 'react';
import type { FormTextAreaProps } from './types';

const TextArea = dynamic(() => import('../../atoms/TextArea'));

const FormTextArea: React.FC<FormTextAreaProps> = props => {
  return <TextArea {...props} />;
};

export default FormTextArea;
