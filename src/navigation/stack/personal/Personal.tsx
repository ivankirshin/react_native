import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthModal from 'src/components/auth/AuthModal';
import DrawerToggle from 'src/navigation/stack/components/DrawerToggle';
import MenuToggle from 'src/navigation/stack/personal/components/MenuToggle';
import User from 'src/screens/personal/User';
import { StackPersonal } from 'src/navigation/types';

const Stack = createStackNavigator<StackPersonal>();

const Personal: React.FC = () => (
  <>
    <AuthModal />
    <Stack.Navigator>
      <Stack.Screen
        name="User"
        component={User}
        options={{
          title: 'User profile',
          headerLeft: () => <DrawerToggle />,
          headerRight: () => <MenuToggle />,
          cardStyle: { backgroundColor: 'snow' },
        }}
      />
    </Stack.Navigator>
  </>
);

export default Personal;
