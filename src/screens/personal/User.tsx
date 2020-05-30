import React from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import NoAuth from 'src/components/auth/NoAuth';
import Information from 'src/components/personal/Information';
import { getUser } from 'src/store/personal/selectors';

const User: React.FC = () => {
  const user = useSelector(getUser);
  const isAuth = Boolean(user);

  const content = isAuth ? <Information /> : <NoAuth />;

  return <ScrollView>{content}</ScrollView>;
};

export default User;
