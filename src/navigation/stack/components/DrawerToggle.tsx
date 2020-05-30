import React from 'react';
import { HeaderButton, HeaderButtons } from 'react-navigation-header-buttons';
import { useNavigation } from '@react-navigation/native';
import { PostCategoriesNavProp } from 'src/navigation/types';
import { Ionicons } from '@expo/vector-icons';

const DrawerToggle: React.FC = () => {
  const navigation = useNavigation<PostCategoriesNavProp>();

  return (
    <HeaderButtons>
      <HeaderButton
        onPress={navigation.toggleDrawer}
        title="favorite"
        IconComponent={Ionicons}
        iconName="ios-menu"
        color="tomato"
        iconSize={28}
        buttonWrapperStyle={{ paddingLeft: 5 }}
      />
    </HeaderButtons>
  );
};

export default DrawerToggle;
