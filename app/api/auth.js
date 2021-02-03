import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

const login = async ({ email, password }) => {
  try {
    const result = await firebase.auth().signInWithEmailAndPassword(email, password);
    const token = await result.user.getIdToken();
    return { ok: true, data: token };
  } catch (error) {
    return { data: { error: 'Email or password is invalid!' } };
  }
}

export default { login };
