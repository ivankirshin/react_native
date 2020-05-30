import React from 'react';
import { useSelector } from 'react-redux';
import { getUser } from 'src/store/personal/selectors';

const withAuth = <T extends object>(Component: React.FC<T>): React.FC<T> => props => {
  const user = useSelector(getUser);
  const isAuth = Boolean(user);

  return <>{isAuth && <Component {...props} />}</>;
};

export default withAuth;
