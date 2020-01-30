import { User, auth } from 'firebase';
import { useState } from 'react';
import Firebase from '../firebase';

const useAuth = (firebaseUser: User | null = null) => {
  const [user, setUser] = useState<User | null>(firebaseUser);
  const [pending, setPending] = useState(true);
  const signOut = () => auth().signOut();

  Firebase.auth().onAuthStateChanged((authUser: User | null) => {
    if (authUser) {
      // const token = await authUser.getIdToken(true);
      // console.log(`Bearer ${token}`);

      setUser(authUser);
      setPending(false);

      // loadSignUpsSaga(store.dispatch)();
    } else {
      setUser(null);
      setPending(false);
    }
  });

  return { user, pending, signOut };
};

export default useAuth;