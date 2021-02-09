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

const logout = async () => {
  try {
    await firebase.auth().signOut();
    return { ok: true };
  } catch (error) {
    return { data: { error: 'Error signing out!' } };
  }
}

export default { login, logout };
