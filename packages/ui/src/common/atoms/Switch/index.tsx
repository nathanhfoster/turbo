import { combineClassNames } from "@nathanhfoster/utils";
import InputLabel from "../Input/components/Label";
import Typography from "../Typography";
import type { SwitchProps } from "./types";

const Switch = ({ label, name, required, disabled, ...props }: SwitchProps) => {
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
            "peer h-6 w-11 rounded-full bg-neutral-200 dark:bg-neutral-700 after:absolute after:top-0 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-neutral-800",
            disabled
              ? "peer-checked:bg-neutral-300 dark:peer-checked:bg-neutral-600"
              : "peer-checked:bg-primary dark:peer-checked:bg-primary-600",
          )}
        ></div>
      </Typography>
    </>
  );
};

export default Switch;
