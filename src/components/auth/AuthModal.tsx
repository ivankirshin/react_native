import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import Btn, { BtnTypes } from 'src/components/uikit/btns/Btn';
import Login from 'src/components/auth/forms/Login';
import Registration from 'src/components/auth/forms/Registration';
import { closeModalAuth } from 'src/store/modal/actions';
import { AppDispatch, useTypedSelector } from 'src/store/types';

enum Forms {
  LOGIN,
  REGISTRATION,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'seashell',
    flex: 1,
  },
  scrollArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 25,
    paddingHorizontal: 20,
    textAlign: 'center',
    color: 'lightcoral',
  },
  wrapperInputs: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 10,
  },
  btn: {
    marginBottom: 10,
  },
});

// Should be inside screen to use context from Registration form
const AuthModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isShow, message, onClose } = useTypedSelector(state => state.modal.auth);
  const [form, setForm] = useState(Forms.LOGIN);
  const isLogin = form === Forms.LOGIN;

  const closeHandler = useCallback(() => {
    setForm(Forms.LOGIN);
    onClose && onClose();
    dispatch(closeModalAuth());
  }, [onClose, dispatch]);

  const changeFormHandler = useCallback(() => {
    setForm(isLogin ? Forms.REGISTRATION : Forms.LOGIN);
  }, [isLogin]);

  const successHandler = useCallback(() => {
    closeHandler();
  }, [closeHandler]);

  const FormElem = isLogin ? Login : Registration;

  const defaultTitleSignUp = 'Fill the form to create new account';
  const defaultTitleSignIn = 'Fill the form to sign in';
  const title = isLogin ? message ?? defaultTitleSignIn : defaultTitleSignUp;

  return (
    <Modal visible={isShow} animationType="slide">
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView centerContent={true} contentContainerStyle={styles.scrollArea}>
            <Text style={styles.title}>{title}</Text>
            <FormElem onSuccess={successHandler} />
            <Btn type={BtnTypes.SECONDARY} onPress={changeFormHandler} style={styles.btn}>
              {isLogin ? 'Go to registration' : 'Go to login'}
            </Btn>
            <Btn type={BtnTypes.CANCEL} onPress={closeHandler}>
              Close
            </Btn>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

export default AuthModal;
