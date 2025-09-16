import dynamic from 'next/dynamic';
import type { FormComponent } from './types';

const Box = dynamic(() => import('../../atoms/Box'));

// Import subcomponents
const Field = dynamic(() => import('./Field'));
const Label = dynamic(() => import('./Label'));
const Input = dynamic(() => import('./Input'));
const TextArea = dynamic(() => import('./TextArea'));
const Checkbox = dynamic(() => import('./Checkbox'));
const Button = dynamic(() => import('./Button'));
const Switch = dynamic(() => import('./Switch'));

const Form: FormComponent = ({ children, className, ...props }) => {
  return (
    <Box variant="form" method="POST" fullWidth className={className} {...props}>
      {children}
    </Box>
  );
};

// Attach subcomponents
Form.Field = Field;
Form.Label = Label;
Form.Input = Input;
Form.TextArea = TextArea;
Form.Checkbox = Checkbox;
Form.Switch = Switch;
Form.Button = Button;

export default Form;
