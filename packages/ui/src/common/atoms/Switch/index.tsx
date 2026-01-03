import { combineClassNames } from '@monkey-tilt/utils';
import React from 'react';
import InputLabel from '../Input/components/Label';
import Typography from '../Typography';
import type { SwitchProps } from './types';

const Switch: React.FC<SwitchProps> = ({ label, name, required, disabled, ...props }) => {
  return (
    <>
      {label && <InputLabel name={name} label={label} required={required} />}
      <Typography
        variant="label"
        display="inline-flex"
        items="items-center"
        className="relative cursor-pointer"
      >
        <input
          name={name}
          type="checkbox"
          className="peer sr-only"
          disabled={disabled}
          {...props}
        />
        <div
          className={combineClassNames(
            "peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-gray-800",
            disabled ? 'peer-checked:bg-gray-300' : 'peer-checked:bg-primary'
          )}
        ></div>
      </Typography>
    </>
  );
};

export default Switch;
