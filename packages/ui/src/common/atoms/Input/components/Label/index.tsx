import { FC } from 'react';
import Typography from '../../../Typography';
import { LABEL_STYLES } from './constants';
import { InputLabelProps } from './types';

const InputLabel: FC<InputLabelProps> = ({ name, label, required }) => {
  return (
    <Typography variant="label" htmlFor={name} className={LABEL_STYLES}>
      {label}
      {required && (
        <Typography color="error" size="text-sm" ml="ml-1">
          *
        </Typography>
      )}
    </Typography>
  );
};

export default InputLabel;
