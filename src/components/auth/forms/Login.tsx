import { Formik, FormikConfig, useFormikContext } from 'formik';
import React, { useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Btn, { BtnTypes } from 'src/components/uikit/btns/Btn';
import FormInput from 'src/components/uikit/inputs/FormInput';
import { signIn } from 'src/store/personal/thunks';
import { AppDispatch } from 'src/store/types';
import { ValuesType } from 'utility-types';
import * as yup from 'yup';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  wrapperInputs: {
    marginBottom: 10,
  },
  btn: {
    marginBottom: 10,
  },
});

type FormValues = {
  email: string;
  password: string;
};

const initialValues: FormValues = {
  email: '',
  password: '',
};

const formikConfig = {
  initialValues,
  validationSchema: yup.object<FormValues>({
    email: yup
      .string()
      .required()
      .email('Please insert a correct email address!'),
    password: yup
      .string()
      .required()
      .matches(/^\w+$/i, 'You should use only english letters')
      .min(8, 'Password should be at least 8 symbols!'),
  }),
};

const Form: React.FC = () => {
  const { submitForm, isValid, isSubmitting } = useFormikContext<FormValues>();

  return (
    <View style={styles.container}>
      <View style={styles.wrapperInputs}>
        <FormInput name="email" placeholder="Email" />
        <FormInput name="password" autoCompleteType="password" secureTextEntry={true} textContentType="password" placeholder="Password" />
      </View>
      <Btn type={BtnTypes.PRIMARY} onPress={submitForm} isDisabled={!isValid} isLoading={isSubmitting} style={styles.btn}>
        Login
      </Btn>
    </View>
  );
};

type Props = {
  onSuccess(): void;
};

const Login: React.FC<Props> = ({ onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();

  const submitHandler: ValuesType<Pick<FormikConfig<FormValues>, 'onSubmit'>> = useCallback(
    async ({ email, password }) => {
      try {
        await dispatch(signIn(email, password));
        onSuccess();
      } catch (e) {
        Alert.alert(e.message);
      }
    },
    [onSuccess, dispatch]
  );

  return (
    <Formik {...formikConfig} onSubmit={submitHandler}>
      <Form />
    </Formik>
  );
};

export default Login;
