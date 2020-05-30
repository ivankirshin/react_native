import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import Category from 'src/models/Category';
import Post from 'src/models/Post';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';

// Root tabs
export type Tabs = {
  PostCategories: undefined;
  PostFavorites: undefined;
};

// Stack categories
export type StackCategories = {
  PostCategories: undefined;
  PostList: {
    category: Category;
  };
  PostDetails: {
    postId: string;
  };
};

export type PostCategoriesNavProp = CompositeNavigationProp<StackNavigationProp<StackCategories, 'PostCategories'>, DrawerPostsNavProp>;

export type PostListRouteProp = RouteProp<StackCategories, 'PostList'>;

export type PostDetailsNavProp = StackNavigationProp<StackCategories, 'PostDetails'>;
export type PostDetailsRouteProp = RouteProp<StackCategories, 'PostDetails'>;

// Stack favorites
export type StackFavorites = {
  PostList: undefined;
  PostDetails: {
    post: Post;
  };
};

// Stack personal
export type StackPersonal = {
  User: undefined;
};

// Drawer
export type Drawer = {
  Posts: undefined;
  Personal: undefined;
};

export type DrawerPostsNavProp = DrawerNavigationProp<Drawer, 'Posts'>;
export type DrawerPersonalNavProp = DrawerNavigationProp<Drawer, 'Personal'>;
