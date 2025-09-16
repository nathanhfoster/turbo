import Typography from '../Typography';
import { CheckboxProps } from './types';

const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  if (!label) {
    return <input type="checkbox" {...props} />;
  }

  return (
    <label className="flex items-center space-x-2">
      <input type="checkbox" {...props} />
      <Typography variant="caption">{label}</Typography>
    </label>
  );
};

export default Checkbox;
