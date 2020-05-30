import { useField } from 'formik';
import React from 'react';
import Input, { Props as InputProps } from 'src/components/uikit/inputs/Input';

type PropsToOmit = 'value' | 'onChangeText' | 'onBlur' | 'error';

type Props = {
  name: string;
} & Omit<InputProps, PropsToOmit>;

const FormInput: React.FC<Props> = ({ name, ...props }) => {
  const [field, meta] = useField(name);

  const error = meta.touched ? meta.error : null;

  return <Input value={field.value} onChangeText={field.onChange(name)} onBlur={field.onBlur(name)} error={error} {...props} />;
};

export default FormInput;
