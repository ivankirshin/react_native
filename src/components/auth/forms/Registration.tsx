import { Formik, FormikConfig, useFormikContext } from 'formik';
import React, { useCallback } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import Btn, { BtnTypes } from 'src/components/uikit/btns/Btn';
import FormInput from 'src/components/uikit/inputs/FormInput';
import { withFirebaseHOC } from 'src/firebase';
import { FirebaseType } from 'src/firebase/firebase';
import { DrawerPersonalNavProp } from 'src/navigation/types';
import { signUp } from 'src/store/personal/thunks';
import { AppDispatch } from 'src/store/types';
import { ValuesType } from 'utility-types';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  wrapperInputs: {
    marginBottom: 5,
  },
  btn: {
    marginBottom: 10,
  },
});

type FormValues = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialValues: FormValues = {
  name: '',
  surname: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const formikConfig = {
  initialValues,
  validationSchema: yup.object<FormValues>({
    name: yup
      .string()
      .required()
      .matches(/^\w+$/i, 'You should use only english letters'),
    surname: yup
      .string()
      .required()
      .matches(/^\w+$/i, 'You should use only english letters'),
    email: yup
      .string()
      .required()
      .email('Please insert a correct email address!'),
    password: yup
      .string()
      .required()
      .matches(/^\w+$/i, 'You should use only english letters')
      .min(8, 'Password should be at least 8 symbols!'),
    confirmPassword: yup
      .string()
      .required()
      .matches(/^\w+$/i, 'You should use only english letters')
      .min(8, 'Password should be at least 8 symbols!')
      .oneOf([yup.ref('password')], 'Passwords should be equal!'),
  }),
};

const Form: React.FC = () => {
  const { submitForm, isValid, isSubmitting } = useFormikContext<FormValues>();

  return (
    <View style={styles.container}>
      <View style={styles.wrapperInputs}>
        <FormInput name="name" placeholder="Name" />
        <FormInput name="surname" placeholder="Surname" />
        <FormInput name="email" placeholder="Email" />
        <FormInput name="password" autoCompleteType="password" secureTextEntry={true} textContentType="password" placeholder="Password" />
        <FormInput
          name="confirmPassword"
          autoCompleteType="password"
          secureTextEntry={true}
          textContentType="password"
          placeholder="Confirm password"
        />
      </View>
      <Btn type={BtnTypes.PRIMARY} onPress={submitForm} isDisabled={!isValid} isLoading={isSubmitting} style={styles.btn}>
        Sign up
      </Btn>
    </View>
  );
};

type Props = {
  onSuccess(): void;
};

const Registration: React.FC<Props> = ({ onSuccess }) => {
  const navigation = useNavigation<DrawerPersonalNavProp>();
  const dispatch = useDispatch<AppDispatch>();

  const submitHandler: ValuesType<Pick<FormikConfig<FormValues>, 'onSubmit'>> = useCallback(
    async ({ name, surname, email, password }) => {
      try {
        await dispatch(signUp(name, surname, email, password));

        navigation.navigate('Personal');
        onSuccess();
      } catch (e) {
        Alert.alert(e.message);
      }
    },
    [navigation, onSuccess, dispatch]
  );

  return (
    <Formik {...formikConfig} onSubmit={submitHandler}>
      <Form />
    </Formik>
  );
};

export default Registration;
