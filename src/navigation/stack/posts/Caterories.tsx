import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DrawerToggle from 'src/navigation/stack/components/DrawerToggle';
import NewPost from 'src/navigation/stack/components/NewPost';
import options from 'src/navigation/stack/posts/options';
import { StackCategories } from 'src/navigation/types';
import Details from 'src/screens/posts/Details';
import PostsByCategory from 'src/screens/posts/PostsByCategory';
import CategoriesList from 'src/screens/posts/Categories';

const Stack = createStackNavigator<StackCategories>();

const Categories: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="PostCategories" screenOptions={options}>
      <Stack.Screen
        name="PostCategories"
        component={CategoriesList}
        options={{
          title: 'Categories',
          headerLeft: () => <DrawerToggle />,
          headerRight: () => <NewPost />,
        }}
      />
      <Stack.Screen name="PostList" component={PostsByCategory} />
      <Stack.Screen name="PostDetails" component={Details} options={{ title: '' }} />
    </Stack.Navigator>
  );
};

export default Categories;
