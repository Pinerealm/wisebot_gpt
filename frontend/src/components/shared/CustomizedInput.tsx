/**
 * A customized input component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the input field.
 * @param {string} props.type - The type of the input field.
 * @param {string} props.label - The label for the input field.
 * @returns {JSX.Element} The customized input component.
 */
import { TextField } from '@mui/material';

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: 'rgb(211, 206, 206)' } }}
      name={props.name}
      label={props.label}
      type={props.type}
      InputProps={{
        style: {
          width: '400px',
          borderRadius: '10px',
          fontSize: 20,
          color: 'white',
        },
      }}
    ></TextField>
  );
};

export default CustomizedInput;
