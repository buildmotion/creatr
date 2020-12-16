export class FirebaseConfig implements IFirebaseConfig {
  apiKey: string;
  appId: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}

export interface IFirebaseConfig {
  apiKey: string;
  appId: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}
