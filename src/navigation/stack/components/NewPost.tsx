import React, { useCallback, useState } from 'react';
import { HeaderButton, HeaderButtons } from 'react-navigation-header-buttons';
import { Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import CreateModal from 'src/screens/posts/CreateModal';
import { showModalAuth } from 'src/store/modal/actions';
import { getUser } from 'src/store/personal/selectors';
import { AppDispatch } from 'src/store/types';

const NewPost: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(getUser);
  const isAuth = Boolean(user);

  const [isVisibleModalCreate, setIsVisibleModalCreate] = useState(false);

  const pressHandler = useCallback(() => {
    isAuth ? setIsVisibleModalCreate(true) : dispatch(showModalAuth({ message: 'You should be logged in to write new post' }));
  }, [dispatch, isAuth, setIsVisibleModalCreate]);

  const closeHandler = useCallback(() => {
    setIsVisibleModalCreate(false);
  }, [setIsVisibleModalCreate]);

  return (
    <>
      <CreateModal isVisible={isVisibleModalCreate} onClose={closeHandler} />
      <HeaderButtons>
        <HeaderButton
          onPress={pressHandler}
          title="favorite"
          IconComponent={Entypo}
          iconName="new-message"
          color="tomato"
          iconSize={20}
          buttonWrapperStyle={{ paddingLeft: 5 }}
        />
      </HeaderButtons>
    </>
  );
};

export default NewPost;
