import React, { createContext } from 'react';
import { FirebaseType } from 'src/firebase/firebase';
import { Subtract } from 'utility-types';

const FirebaseContext = createContext<FirebaseType>({} as FirebaseType);

export const FirebaseProvider = FirebaseContext.Provider;

export const FirebaseConsumer = FirebaseContext.Consumer;

type HOCProps = {
  firebase: FirebaseType;
};

export const withFirebaseHOC = <T extends HOCProps>(Component: React.FC<T>): React.FC<Subtract<T, HOCProps>> => {
  return props => <FirebaseConsumer>{state => <Component {...(props as T)} firebase={state} />}</FirebaseConsumer>;
};
