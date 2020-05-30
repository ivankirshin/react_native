import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Btn, { BtnTypes } from 'src/components/uikit/btns/Btn';
import { showModalAuth } from 'src/store/modal/actions';
import { AppDispatch } from 'src/store/types';

const styles = StyleSheet.create({
  containerNoAuth: {
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  message: {
    fontWeight: '600',
  },
  btnLogin: {
    marginTop: 20,
  },
});

type Props = {
  message?: string;
};

const NoAuth: React.FC<Props> = ({ message = 'You should be signed in to access this page' }) => {
  const dispatch = useDispatch<AppDispatch>();

  const pressHandler = useCallback(() => {
    dispatch(showModalAuth({ message }));
  }, [dispatch, showModalAuth, message]);

  return (
    <View style={styles.containerNoAuth}>
      <Text style={styles.message}>{message}</Text>
      <Btn type={BtnTypes.PRIMARY} onPress={pressHandler} style={styles.btnLogin}>
        Login
      </Btn>
    </View>
  );
};

export default NoAuth;
