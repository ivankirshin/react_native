import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { ReactNode } from 'react';
import AuthModal from 'src/components/auth/AuthModal';
import StackNavigatorCategories from 'src/navigation/stack/posts/Caterories';
import StackNavigatorFavorites from 'src/navigation/stack/posts/Favorites';
import { Tabs } from 'src/navigation/types';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<Tabs>();

const Content: React.FC = () => {
  return (
    <>
      <AuthModal />
      <Tab.Navigator
        initialRouteName="PostCategories"
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen
          name="PostCategories"
          component={StackNavigatorCategories}
          options={{
            title: 'Categories',
            tabBarIcon: (props): ReactNode => {
              return <MaterialCommunityIcons name="newspaper" color={props.color} size={20} />;
            },
          }}
        />
        <Tab.Screen
          name="PostFavorites"
          component={StackNavigatorFavorites}
          options={{
            title: 'Favorites',
            tabBarIcon: (props): ReactNode => {
              return <MaterialCommunityIcons name="star" color={props.color} size={20} />;
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Content;
