import { useActionSheet } from '@expo/react-native-action-sheet';
import React, { useCallback } from 'react';
import { HeaderButton, HeaderButtons } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import withAuth from 'src/HOC/withAuth';
import { getUser } from 'src/store/personal/selectors';

const options = ['Edit information', 'Edit avatar', 'Cancel'];
const cancelButtonIndex = 2;

const actionSheetOptions = {
  options,
  cancelButtonIndex,
};

const MenuToggle: React.FC = () => {
  const { showActionSheetWithOptions } = useActionSheet();

  const pressHandler = useCallback(() => {
    showActionSheetWithOptions(actionSheetOptions, actionIndex => {
      switch (actionIndex) {
        case 0:
          console.log(1);
          break;
        case 1:
          console.log(2);
      }
    });
  }, [showActionSheetWithOptions]);

  return (
    <HeaderButtons>
      <HeaderButton onPress={pressHandler} title="favorite" IconComponent={Ionicons} iconName="ios-settings" color="tomato" iconSize={22} />
    </HeaderButtons>
  );
};

export default withAuth(MenuToggle);
