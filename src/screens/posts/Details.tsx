import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeaderButtons, HeaderButton } from 'react-navigation-header-buttons';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import GoBack from 'src/components/uikit/btns/GoBack';
import PostModel from 'src/models/Post';
import { PostDetailsNavProp, PostDetailsRouteProp } from 'src/navigation/types';
import { showModalAuth } from 'src/store/modal/actions';
import { getUser } from 'src/store/personal/selectors';
import { addToFavorites, deleteFromFavorites } from 'src/store/personal/thunks';
import { getPostById } from 'src/store/posts/selectors';
import { AppDispatch, useTypedSelector } from 'src/store/types';

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  textContainer: {
    flex: 1,
    padding: 5,
  },
  activityContainer: {
    paddingHorizontal: 18,
  },
  image: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
  },
  title: {
    paddingVertical: 15,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
});

type PostProps = {
  post: PostModel;
};

const PostDetailView: React.FC<PostProps> = ({ post }) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(getUser);
  const isAuth = Boolean(user);
  const [isLoading, setLoading] = useState(false);
  const isFavorite = useTypedSelector(state => state.personal.favorites.includes(post.id));

  const navigation = useNavigation<PostDetailsNavProp>();

  useEffect(() => {
    navigation.setOptions({
      title: post.title,
      headerTitleStyle: {
        width: 180,
        textAlign: 'center',
      },
      headerRight() {
        const iconName = isFavorite ? 'star' : 'star-outline';
        const iconColor = isFavorite ? 'gold' : 'grey';

        const favoriteHandler = async () => {
          if (isAuth) {
            try {
              setLoading(true);
              await dispatch(isFavorite ? deleteFromFavorites(post.id) : addToFavorites(post.id));
            } finally {
              setLoading(false);
            }
          } else {
            dispatch(showModalAuth({ message: 'You should be logged in to have favorites' }));
          }
        };

        return isLoading ? (
          <View style={styles.activityContainer}>
            <ActivityIndicator size="small" color="gold" />
          </View>
        ) : (
          // This plugin don't support custom components
          <HeaderButtons>
            <HeaderButton
              onPress={favoriteHandler}
              title="favorite"
              IconComponent={MaterialCommunityIcons}
              iconName={iconName}
              color={iconColor}
              iconSize={23}
            />
          </HeaderButtons>
        );
      },
    });
  }, [isFavorite, navigation, post, dispatch, isLoading, setLoading, isAuth]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={{ uri: post.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.text}>{post.content.trim()}</Text>
      </View>
    </ScrollView>
  );
};

const PostNotFound: React.FC = () => (
  <View style={styles.notFoundContainer}>
    <GoBack />
  </View>
);
type ScreenProps = {
  route: PostDetailsRouteProp;
};

const Details: React.FC<ScreenProps> = ({ route }) => {
  const { postId } = route.params;
  const post = useTypedSelector(state => getPostById(state, postId));

  if (post) return <PostDetailView post={post} />;

  Alert.alert('Post not found');

  return <PostNotFound />;
};

export default Details;
