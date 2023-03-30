import { signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";

const login = async ({ email, password }) => {
    try {
        const auth = getAuth();
        const result = await signInWithEmailAndPassword(auth, email, password);
        const token = await result.user.getIdToken();
        return { ok: true, data: token };
    } catch (error) {
        return { data: { error: "Email or password is invalid!" } };
    }
};

const logout = async () => {
    try {
        await signOut();
        return { ok: true };
    } catch (error) {
        return { data: { error: "Error signing out!" } };
    }
};

export default { login, logout };
