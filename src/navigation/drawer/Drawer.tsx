import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from 'src/navigation/drawer/components/Content';
import Personal from 'src/navigation/stack/personal/Personal';
import Content from 'src/navigation/tabs/Content';
import { Drawer as DrawerType } from 'src/navigation/types';

const DrawerNav = createDrawerNavigator<DrawerType>();

const Drawer: React.FC = () => {
  return (
    <DrawerNav.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <DrawerNav.Screen name="Posts" component={Content} options={{ title: 'Posts' }} />
      <DrawerNav.Screen name="Personal" component={Personal} options={{ title: 'Personal' }} />
    </DrawerNav.Navigator>
  );
};

export default Drawer;
