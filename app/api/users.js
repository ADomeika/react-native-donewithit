import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const register = async ({ email, password, name }) => {
    try {
        const result = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);
        await firebase.database().ref(`users/${result.user.uid}`).set({
            name,
        });
        const token = await result.user.getIdToken();
        return { ok: true, data: token };
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            return { data: { error: "This email address is already in use!" } };
        }

        if (error.code === "auth/invalid-email") {
            return { data: { error: "This email address is invalid!" } };
        }

        return { data: { error: "Something went wrong, please try again!" } };
    }
};

export default { register };
