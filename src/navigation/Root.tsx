import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import AuthModal from 'src/components/auth/AuthModal';
import Drawer from 'src/navigation/drawer/Drawer';
import { restoreSignStatus } from 'src/store/personal/thunks';
import firebase from 'src/firebase';

const styles = StyleSheet.create({
  wrapperActivity: {
    flex: 1,
    justifyContent: 'center',
  },
});

const Root: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async () => {
      await dispatch(restoreSignStatus());
      setLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.wrapperActivity}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <>
        <StatusBar barStyle="dark-content" />
        <Drawer />
      </>
    </NavigationContainer>
  );
};

export default Root;
