import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Avatar from 'src/components/personal/Avatar';
import { getUser } from 'src/store/personal/selectors';

const styles = StyleSheet.create({
  imageWrapper: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullnameWrapper: {
    marginLeft: 30,
  },
  fullname: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 3,
  },
  about: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    shadowColor: 'lightgrey',
    shadowOpacity: 10,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 22,
  },
  email: {
    color: 'lightgrey',
    fontSize: 15,
  },
});

const Information: React.FC = () => {
  const user = useSelector(getUser);

  if (!user) throw new Error('Auth error. This component should not be rendered');

  return (
    <View>
      <View style={styles.imageWrapper}>
        <Avatar />
        <View style={styles.fullnameWrapper}>
          <Text style={styles.fullname}>{user.fullname}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
      <View style={styles.about}>
        <Text style={styles.aboutText}>{user.about ?? 'Not implemented in this version. Information about user can be here'}</Text>
      </View>
    </View>
  );
};

export default Information;
