import React, { useCallback } from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GoBack: React.FC = () => {
  const navigation = useNavigation();

  const pressHandler = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return <Button title="Go back" onPress={pressHandler} />;
};

export default GoBack;
