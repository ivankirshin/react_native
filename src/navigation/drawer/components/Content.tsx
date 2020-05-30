import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer/lib/typescript/src/types';
import React, { useCallback, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Btn, { BtnTypes } from 'src/components/uikit/btns/Btn';
import { getUser } from 'src/store/personal/selectors';
import { signOut } from 'src/store/personal/thunks';
import { AppDispatch } from 'src/store/types';
import { DrawerActions } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: 'center',
  },
});

const Content: React.FC<DrawerContentComponentProps> = props => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(getUser);
  const [isLoading, setIsLoading] = useState(false);

  const pressHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(signOut());
      // Need to use DrawerActions because of bug in typings
      // @see https://github.com/react-navigation/react-navigation/issues/6790
      props.navigation.dispatch(DrawerActions.jumpTo('Posts'));
    } catch (e) {
      Alert.alert(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, props.navigation]);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {user && (
        <View style={styles.container}>
          <Btn type={BtnTypes.SECONDARY} onPress={pressHandler} isLoading={isLoading}>
            Sign out
          </Btn>
        </View>
      )}
    </DrawerContentScrollView>
  );
};

export default Content;
