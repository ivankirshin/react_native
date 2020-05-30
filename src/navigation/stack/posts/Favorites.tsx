import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DrawerToggle from 'src/navigation/stack/components/DrawerToggle';
import NewPost from 'src/navigation/stack/components/NewPost';
import options from 'src/navigation/stack/posts/options';
import { StackFavorites } from 'src/navigation/types';
import Details from 'src/screens/posts/Details';
import PostsFavorites from 'src/screens/posts/Favorites';

const Stack = createStackNavigator<StackFavorites>();

const Favorites: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="PostList" screenOptions={options}>
      <Stack.Screen
        name="PostList"
        component={PostsFavorites}
        options={{ title: 'Favorite posts', headerLeft: () => <DrawerToggle />, headerRight: () => <NewPost /> }}
      />
      <Stack.Screen name="PostDetails" component={Details} options={{ title: 'Post name should be here' }} />
    </Stack.Navigator>
  );
};

export default Favorites;
