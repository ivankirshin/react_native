/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

import config from 'src/firebase/config';

firebase.initializeApp(config);

export type FirebaseType = typeof firebase;

export default firebase;
