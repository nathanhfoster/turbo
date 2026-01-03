import Typography from "../../../Typography";
import { LABEL_STYLES } from "./constants";
import { InputLabelProps } from "./types";

const InputLabel = ({ name, label, required }: InputLabelProps) => {
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
