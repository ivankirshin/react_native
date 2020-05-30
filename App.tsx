import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import Firebase, { FirebaseProvider } from 'src/firebase';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import RootNavigator from 'src/navigation/Root';
import store from 'src/store';

const App: React.FC = () => (
  <ReduxProvider store={store}>
    <FirebaseProvider value={Firebase}>
      <ActionSheetProvider>
        <RootNavigator />
      </ActionSheetProvider>
    </FirebaseProvider>
  </ReduxProvider>
);

export default App;
