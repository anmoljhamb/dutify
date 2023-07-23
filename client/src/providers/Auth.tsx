import { RawAxiosRequestHeaders } from "axios";
import {
    User,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
    sendPasswordResetEmail,
} from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";
import { useState, useMemo, useEffect } from "react";
import { AuthContext } from "../contexts";
import { auth, db } from "../firebase";
import { UserDetails } from "../types";
import { LoadingPage } from "../pages";

interface Props {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [firebaseLoading, setFirebaseLoading] = useState<boolean>(true);
    const [firestoreLoading, setFirestoreLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string>("");
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    const loading = firebaseLoading || firestoreLoading;

    const headers = useMemo(() => {
        return {
            Authorization: `Bearer ${token}`,
        } as RawAxiosRequestHeaders;
    }, [token]);

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setFirebaseLoading(false);
        });
        return unsub;
    }, []);

    useEffect(() => {
        const unsub = auth.onIdTokenChanged((user) => {
            user?.getIdToken().then((resp) => {
                setToken(resp);
            });
        });
        return unsub;
    }, []);

    useEffect(() => {
        if (!currentUser) {
            if (!firebaseLoading) setFirestoreLoading(false);
            return;
        }
        const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
            setUserDetails(doc.data() as UserDetails);
            setFirestoreLoading(false);
        });
        return unsub;
    }, [currentUser, firebaseLoading]);

    const logIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        return signOut(auth);
    };

    const updateUserEmail = (email: string) => {
        return updateEmail(currentUser as User, email);
    };

    const updateUserPassword = (password: string) => {
        return updatePassword(currentUser as User, password);
    };

    const reauth = (password: string) => {
        return reauthenticateWithCredential(
            currentUser as User,
            EmailAuthProvider.credential(currentUser?.email as string, password)
        );
    };

    const forgotPassword = (email: string) => {
        return sendPasswordResetEmail(auth, email);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                currentUser,
                logOut,
                logIn,
                updateUserEmail,
                reauth,
                updateUserPassword,
                forgotPassword,
                userDetails,
                headers,
            }}
        >
            {!loading && children}
            {loading && <LoadingPage />}
        </AuthContext.Provider>
    );
};
